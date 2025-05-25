


import { div } from 'framer-motion/client'
import React from 'react'

export const AvatarPulse = ({source}:{source:string}) => {
    return (
        <div className='relative bg-gray-500 content-center rounded-full h-56 w-56'>
            <div className='rounded-full absolute inset-0 content-center z-40 bg-gray-600 h-56 w-56 animate-ping' >
                {/* <div className='text-white flex justify-center text-center'>
                </div> */}
            </div>

            <img src={source} className='rounded-full absolute inset-0 w-56 h-56 z-50 ' ></img>
        </div>
    
    )
}
