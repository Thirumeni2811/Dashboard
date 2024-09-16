import React, { useEffect, useState } from 'react'
import DoneIcon from '@mui/icons-material/Done';
import Instance from './Instance';

const benefits =[
    '5 keywords',
    '20 replies/month',
    '1 project',
    'Auto-replies',
    'Sentiment analysis',
    'Notifications',
    'Reports',
    '24/7 Support'
]

const Month = () => {

    const [features, setFeatures] = useState([])

    //api integration
    useEffect(() => {
        const getPlandetails = async(e) => {
            try{
                const response = await Instance.get('api_url')
                setFeatures(response.data)
                console.log(response.data)
            }catch(error){
                if (error.response) {
                    console.error('Response Error:', error.response.data);
                    console.error('Response Status:', error.response.status);
                    console.error('Response Headers:', error.response.headers);
                } else if (error.request) {
                    console.error('Request Error:', error.request);
                } else {
                    console.error('Error Message:', error.message);
                }
            }
        }
        getPlandetails()
    },[])

    return (
        <>
            <section className='flex justify-center'>
                <div className='grid gap-4 lg:gap-8 lg:grid-cols-2 xl:grid-cols-3 xl:gap-0'>

                    {/* 1st */}
                    <div className='border-[#121312] border-4 rounded-3xl text-[#121312] p-4 w-fit xl:border-r-0 xl:ml-1 xl:px-10 xl:rounded-l-3xl'>
                        <div>
                            <h1 className='text-3xl font-extrabold'>Small</h1>
                            <h1 className='text-2xl font-extrabold'>$10 / month</h1>
                        </div>
                        {benefits.map((benefit, index) => (
                            <div key={index} className='flex my-2 font-extrabold'>
                                <DoneIcon className='mr-3'/>
                                <p className='text-lg'>{benefit}</p>
                            </div>
                        ))}

                        {/* through api */}

                        {
                            features.map((plan) => (
                                <div key={plan.id} className='flex my-2 font-extrabold'>
                                    <DoneIcon />
                                    <div className='text-2xl'>
                                        <p>{plan.keywords}</p>
                                        <p>{plan.replies}</p>
                                        <p>{plan.project}</p>
                                        <p>{plan.auto}</p>
                                        <p>{plan.analysis}</p>
                                        <p>{plan.notification}</p>
                                        <p>{plan.reports}</p>
                                        <p>{plan.support}</p>
                                    </div>
                                </div>
                            ))
                        }

                        <div className="my-4">
                            <button 
                                type="submit"
                                className="bg-[#121312] text-[#FEFBD8] font-bold px-4 py-1.5 rounded-md"
                            >
                                Subscribe
                            </button>
                        </div>

                    </div>

                    {/* 2nd */}
                    <div className='border-[#121312] border-4 rounded-3xl text-[#121312] p-4 w-fit  xl:px-10 '>
                        <div>
                            <h1 className='text-3xl font-extrabold'>Small</h1>
                            <h1 className='text-2xl font-extrabold'>$10 / month</h1>
                        </div>
                        {benefits.map((benefit, index) => (
                            <div key={index} className='flex my-2 font-extrabold'>
                                <DoneIcon className='mr-3'/>
                                <p className='text-lg'>{benefit}</p>
                            </div>
                        ))}

                        {/* through api */}

                        {
                            features.map((plan) => (
                                <div key={plan.id} className='flex my-2 font-extrabold'>
                                    <DoneIcon />
                                    <div className='text-2xl'>
                                        <p>{plan.keywords}</p>
                                        <p>{plan.replies}</p>
                                        <p>{plan.project}</p>
                                        <p>{plan.auto}</p>
                                        <p>{plan.analysis}</p>
                                        <p>{plan.notification}</p>
                                        <p>{plan.reports}</p>
                                        <p>{plan.support}</p>
                                    </div>
                                </div>
                            ))
                        }

                        <div className="my-4">
                            <button 
                                type="submit"
                                className="bg-[#121312] text-[#FEFBD8] font-bold px-4 py-1.5 rounded-md"
                            >
                                Subscribe
                            </button>
                        </div>

                    </div>

                    {/* 3rd */}
                    <div className='border-[#121312] border-4 text-[#121312] p-4 w-fit xl:border-l-0 rounded-3xl xl:px-10 xl:rounded-r-3xl'>
                        <div>
                            <h1 className='text-3xl font-extrabold'>Small</h1>
                            <h1 className='text-2xl font-extrabold'>$10 / month</h1>
                        </div>
                        {benefits.map((benefit, index) => (
                            <div key={index} className='flex my-2 font-extrabold'>
                                <DoneIcon className='mr-3'/>
                                <p className='text-lg'>{benefit}</p>
                            </div>
                        ))}

                        {/* through api */}

                        {
                            features.map((plan) => (
                                <div key={plan.id} className='flex my-2 font-extrabold'>
                                    <DoneIcon />
                                    <div className='text-2xl'>
                                        <p>{plan.keywords}</p>
                                        <p>{plan.replies}</p>
                                        <p>{plan.project}</p>
                                        <p>{plan.auto}</p>
                                        <p>{plan.analysis}</p>
                                        <p>{plan.notification}</p>
                                        <p>{plan.reports}</p>
                                        <p>{plan.support}</p>
                                    </div>
                                </div>
                            ))
                        }

                        <div className="my-4">
                            <button 
                                type="submit"
                                className="bg-[#121312] text-[#FEFBD8] font-bold px-4 py-1.5 rounded-md"
                            >
                                Subscribe
                            </button>
                        </div>

                    </div>
         
                </div>
            </section>
        </>
    )
}

export default Month