import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import bgimg from '../assets/background.jpg'

function home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
        <img
          src={bgimg}
          alt="Background"
          className="h-[500px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Deploy your React App
          </h1>
          <p className="text-lg text-white/90 mb-8">
            First deployment is <span className="font-semibold">free!!</span>
          </p>
          <a
            href="/create-project"
            className="inline-flex rounded-lg bg-blue-600 hover:bg-blue-700 px-8 py-3 text-base font-semibold text-white shadow-lg transition duration-200"
          >
            Host App
          </a>
          <div className="mt-10 pt-8 border-t border-white/30">
            <p className="text-sm text-white/80 mb-3">Sample hosted App</p>
            <a 
              href='http://chubby-ambitious-bed.localhost:8000' 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 px-6 py-2 text-sm font-semibold text-white transition duration-200 backdrop-blur-sm border border-white/40"
            >
              Movie App
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default home
