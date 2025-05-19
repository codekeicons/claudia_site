


import { div } from 'framer-motion/client'
import React from 'react'

export const AvatarPulse = ({source}:{source:string}) => {
    return (
        <div className='relative bg-gray-500 rounded-full h-60 w-60'>
            <div className='rounded-full absolute inset-0 content-center z-40 bg-gray-600 h-60 w-60 animate-ping' >
                <div className='text-white flex justify-center text-center'>
                    {/* <img src='public/img/avatar1.jpg' className='w-60 h-60' alt="" /> */}
                </div>
            </div>

            <img src={source} className='rounded-full absolute inset-0 w-60 h-60 z-50 ' ></img>
        </div>
        

        // <div className="flex justify-center items-center ">
        //     <div className="relative inline-flex">
        //         <div className="w-60 h-60 mx-a bg-gray-600 rounded-full"></div>
        //         <div className="w-60 h-60 bg-gray-600 rounded-full absolute top-0 left-0 animate-ping"></div>
        //         <div className="w-60 h-60 bg-gray-600 rounded-full absolute top-0 left-0 animate-pulse"></div>
        //     </div>
        // </div>
    )
}
