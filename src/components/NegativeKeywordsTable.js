import React, { useState, useEffect } from 'react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase'; 

const NegativeKeywordsTable = () => {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const q = query(
          collection(db, "Negative_Keyword"),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        const querySnapshot = await getDocs(q);
        const keywordsList = querySnapshot.docs.map(doc => doc.data());
        setKeywords(keywordsList);
      } catch (error) {
        console.error("Error fetching keywords: ", error);
      }
    };

    fetchKeywords();
  }, []);

  return (
    <section className='p-4'>
      <div className='border border-slate-200 rounded-lg'>
        <table className='table-auto w-full border-collapse'>
          <thead className='bg-[#d63384] text-white '>
            <tr className='text-2xl'>
              <th className='py-4 px-4 font-extrabold rounded-tl-lg border-b border-r border-slate-300 xs:text-base'>S No</th>
              <th className='py-4 px-4 font-extrabold rounded-tr-lg border-b border-slate-300 xs:text-base'>Negative Keywords</th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((keyword, index) => (
              <tr key={index} className='border-b border-slate-300'>
                <td className='p-2 px-4 font-extrabold text-2xl xs:text-base border-r border-slate-300'>{index + 1}</td>
                <td className='p-2 px-16 font-extrabold text-2xl xs:text-base'>{keyword.Keywords}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default NegativeKeywordsTable;
