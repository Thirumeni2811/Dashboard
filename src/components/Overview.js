import React, { useState, useRef, useEffect, useCallback } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import { FadeLoader } from "react-spinners";
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const Overview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [editingKeyword, setEditingKeyword] = useState(null);
  const dropdownRef = useRef(null);

  const fetchKeywords = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Keyword"));
      const fetchedKeywords = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Fetched Keywords:', fetchedKeywords); 
      setKeywords(fetchedKeywords);
    } catch (error) {
      console.error("Error fetching keywords:", error);
    }
  };

  useEffect(() => {
    fetchKeywords();
  }, []);

  const openDeleteModal = (project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    if (selectedProject) {
      try {
        await deleteDoc(doc(db, "Keyword", selectedProject.id));
        console.log('Deleted project:', selectedProject);
        setKeywords(keywords.filter(keyword => keyword.id !== selectedProject.id));
        closeDeleteModal();
      } catch (error) {
        console.error("Error deleting keyword:", error);
      }
    }
  };

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleEditClick = (keyword) => {
    setEditingKeyword(keyword.id);
  };

  const handleEditSave = async (id, newKeyword) => {
    try {
      await updateDoc(doc(db, "Keyword", id), { Keywords: newKeyword });
      setKeywords(keywords.map(keyword => keyword.id === id ? { ...keyword, Keywords: newKeyword } : keyword));
      setEditingKeyword(null);
    } catch (error) {
      console.error("Error updating keyword:", error);
    }
  };

  const handleEditCancel = () => {
    setEditingKeyword(null);
  };

  return (
    <>
      <section>
        <div>
          <h1 className='font-extrabold mb-2 text-4xl'>Overview</h1>
        </div>

        <div className='grid gap-4 mt-4 md:grid-cols-2 xl:grid-cols-3'>
          <div className='border-2 border-[#121312] flex justify-center items-center rounded-lg'>
            <div className='flex p-10 py-12 cursor-pointer'>
              <AddIcon />
              <Link to='/keywords?showForm=true' className='font-bold'>Add Keyword</Link>
            </div>
          </div>

          {keywords.length > 0 ? (
            keywords.map((keyword) => (
              <div key={keyword.id} className='border-2 border-[#121312] rounded-lg'>
                <div className='flex justify-between p-4 cursor-pointer'>
                  {editingKeyword === keyword.id ? (
                    <div className='flex'>
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleEditSave(keyword.id, e.target.textContent)}
                        className='border border-gray-300 p-2 rounded w-full'
                      >
                        {keyword.Keywords}
                      </div>
                      <div className='grid'>
                        <CheckCircleIcon onClick={(e) => handleEditSave(keyword.id, e.target.previousSibling.textContent)} className='cursor-pointer ml-2' />
                        <CancelIcon onClick={handleEditCancel} className='cursor-pointer ml-2' />
                      </div>
                    </div>
                  ) : (
                    <h1 className='font-extrabold text-xl'>{keyword.Keywords}</h1>
                  )}
                  <div className='grid'>
                    <EditIcon onClick={() => handleEditClick(keyword)} className='cursor-pointer' />
                    <DeleteIcon onClick={() => openDeleteModal(keyword)} className='cursor-pointer' />
                  </div>
                </div>
                <div className='mx-4 my-2'>
                  <h3 className='font-extrabold'>Replies</h3>
                  <div className='flex justify-around my-1'>
                    <p>Last month : <strong>0</strong></p>
                    <p>Last 24h : <strong>0</strong></p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center mt-32">
              <FadeLoader />
            </div>
          )}
        </div>
      </section>

      <Modal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        aria-labelledby="delete-confirmation-modal-title"
        aria-describedby="delete-confirmation-modal-description"
      >
        <Box className='flex items-center justify-center min-h-screen'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 id="delete-confirmation-modal-title" className='text-xl font-semibold mb-4'>
              Confirm Deletion
            </h2>
            <p id="delete-confirmation-modal-description" className='mb-6'>
              Are you sure you want to delete this keyword?
            </p>
            <div className='flex justify-end space-x-4'>
              <button
                className='bg-[#FEFBD8] px-4 py-2 rounded-md'
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className='bg-[#121312] text-white px-4 py-2 rounded-md'
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Overview;
