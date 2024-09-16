import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { addDoc, collection } from "firebase/firestore"; 
import { db } from '../firebase'; 
import NegativeKeywordsTable from './NegativeKeywordsTable';
const NegativeKeywords = () => {
  const [showForm, setShowForm] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState([]);
  const navigate = useNavigate()
  const handleAddKeywordClick = () => {
    setShowForm(true);
  };

  const addKeyword = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "Negative_Keyword"), {
        Keywords: keyword,
        timestamp: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      setKeywords([...keywords, { Keywords: keyword }]);
      setKeyword('');
      setShowForm(false);
      navigate('/replies')
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  };

  return (
    <section className='m-3'>
      <h1 className='font-extrabold mb-2 text-4xl'>Negative Keywords</h1>
        <div className='my-4 lg:flex justify-around text-center'>
          <div className='my-4'>
            <NegativeKeywordsTable keywords={keywords} />
          </div>
          <div>
            {showForm ? (
              <form className='my-4 flex flex-col items-center' onSubmit={addKeyword}>
                <Box
                  component="div"
                  noValidate
                  autoComplete="off"
                  className="flex flex-col sm:w-5/6 lg:w-80 xl:w-96 space-y-4"
                >
                  <TextField
                    id="outlined-keyword"
                    label="Keyword"
                    variant="outlined"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    required
                  />
                </Box>
                <div className='flex space-x-4'>
                  <button 
                    type="submit"
                    className="bg-[#121312] text-white font-bold m-4 px-4 py-2.5 rounded-md"
                  >
                    Add
                  </button>
                  <button 
                    type="button"
                    className="bg-[#121312] text-white font-bold m-4 px-4 py-2.5 rounded-md"
                    onClick={() => setShowForm(false)} 
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button 
                type="button"
                className="bg-[#121312] text-white font-bold m-4 px-4 py-1.5 rounded-md"
                onClick={handleAddKeywordClick}
              >
                <AddIcon />
                Add another negative keyword
              </button>
            )}
          </div>
        </div>
    </section>
  );
};

export default NegativeKeywords;
