import React from 'react'
import { Link } from 'react-router-dom'


const Settings = () => {
  return (
    <>
      <section className='m-3'>
        <div>
          <h1 className='font-extrabold mb-2 text-4xl'>Settings </h1>
          <h3 className='font-semibold mb-2 text-2xl'>
            First
            <Link to='/overview' className='text-blue-600 cursor-pointer ml-2'>
              create a project 
            </Link>
          </h3>
        </div>
      </section>
    </>
  )
}

export default Settings