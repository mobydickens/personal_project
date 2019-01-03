import React from 'react';

function Loading() {
  return (
    <div className='pin bg-palette-white'>
      <div className='flex justify-center'>
        <div className='border-t-4 border-l-4 rounded-full h-16 w-16 loader'></div> 
      </div>
    </div>
  )
}

export default Loading;