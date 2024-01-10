import React from 'react'
import background from '../../assets/background.jpeg'

export default function Background() {
    return (
        <div className='w-full h-full'>
            <div className='ml-5 gap-y-3'>
                <img src={background} className='rounded-lg opacity-60 sm:h-[86vh] object-cover '>

                </img>
            </div>
        </div>
    )
}
