import React from 'react'

function Loader() {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

export default Loader
