


import { div } from 'framer-motion/client'
import React from 'react'

export const AvatarPulse = ({source}:{source:string}) => {
    return (
        <div className='relative bg-[#111111] mx-auto content-center rounded-full w-40 h-40  md:h-56  md:w-56'>
            <div className='rounded-full absolute inset-0 content-center z-40 bg-[#111111] w-40 h-40 md:h-56  md:w-56 animate-ping' >
                {/* <div className='text-white flex justify-center text-center'>
                </div> */}
            </div>

            <img src={source} className='rounded-full absolute inset-0 w-40 h-40 md:w-56  md:h-56 z-50 ' ></img>
        </div>
    
    )
}
