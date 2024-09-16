import React from 'react'
import XIcon from '@mui/icons-material/X';

const navbarHeight = '112px';

const Account = () => {
  return (
    <>
        <section className={`flex items-center justify-center`} style={{ height: `calc(100vh - ${navbarHeight})` }}>
            <div className='flex justify-center'>
                <button className='flex items-center justify-center gap-2 bg-black py-2 px-4 rounded-3xl'>
                    <XIcon className='text-[#d63384]'/>
                    <p className='font-extrabold text-2xl text-white'>
                        Connect with Twitter
                    </p>
                </button>
            </div>
        </section>
    </>
  )
}

export default Account
