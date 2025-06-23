import { useState, useEffect } from 'react'
import { Droplets, Waves, Gauge, Activity, Database, Wifi } from 'lucide-react'

const Loader = ({ showProgress = true }) => {
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)

  const loadingMessages = [
    'Connecting to water sensors...',
    'Analyzing water quality parameters...',
    'Checking reservoir levels...',
    'Monitoring flow rates...',
    'Validating pressure readings...',
    'Synchronizing real-time data...',
    'Updating system dashboard...',
    'Finalizing water management reports...',
  ]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + Math.random() * 12))
    }, 600)

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length)
    }, 2500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }
  }, [])

  return (
    <div className='flex min-h-screen bg-gradient-to-r from-blue-100 via-white to-cyan-100'>
      {/* Sidebar Section */}
      <div className='w-1/2 flex flex-col justify-center px-10 py-12 bg-white border-r border-blue-200'>
        <h1 className='text-4xl font-extrabold text-blue-700 mb-6'>
          Water Management System
        </h1>
        <p className='text-lg text-blue-600 font-medium mb-10 animate-pulse'>
          {loadingMessages[currentMessage]}
        </p>

        <div className='grid grid-cols-2 gap-6'>
          {/* Info Tile */}
          <div className='flex items-center gap-4 p-4 bg-blue-50 rounded-xl shadow'>
            <Gauge className='w-8 h-8 text-blue-500 animate-spin' />
            <div>
              <p className='text-sm font-semibold text-blue-800'>Pressure</p>
              <p className='text-xs text-gray-600'>Monitoring</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-4 bg-cyan-50 rounded-xl shadow'>
            <Waves className='w-8 h-8 text-cyan-600 animate-bounce' />
            <div>
              <p className='text-sm font-semibold text-cyan-800'>Flow Rate</p>
              <p className='text-xs text-gray-600'>Active</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-4 bg-blue-50 rounded-xl shadow'>
            <Activity className='w-8 h-8 text-blue-600 animate-pulse' />
            <div>
              <p className='text-sm font-semibold text-blue-800'>Quality</p>
              <p className='text-xs text-gray-600'>Analyzing</p>
            </div>
          </div>
        </div>

        {/* Connection Indicators */}
        <div className='mt-12 flex gap-6'>
          <div className='flex items-center space-x-2'>
            <Database className='w-5 h-5 text-green-600' />
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
            <span className='text-sm text-gray-700 font-medium'>
              DB Connected
            </span>
          </div>
          <div className='flex items-center space-x-2'>
            <Wifi className='w-5 h-5 text-green-600' />
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
            <span className='text-sm text-gray-700 font-medium'>
              Sensors Online
            </span>
          </div>
        </div>
      </div>

      {/* Loader Section */}
      <div className='w-1/2 flex items-center justify-center p-10 relative'>
        <div className='relative bg-white/40 backdrop-blur-xl border border-blue-200 shadow-2xl rounded-3xl p-12 max-w-md w-full'>
          {/* Central Drop Animation */}
          <div className='relative mx-auto mb-10 w-32 h-32'>
            <div className='absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full animate-ping opacity-20'></div>
            <div className='absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full animate-pulse shadow-lg'></div>
            <Droplets className='absolute inset-0 m-auto text-white w-14 h-14 animate-pulse drop-shadow-xl' />
          </div>

          {/* Progress Bar */}
          {showProgress && (
            <div className='mb-6'>
              <p className='text-sm font-medium text-gray-700 mb-2'>
                Initializing...
              </p>
              <div className='w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner'>
                <div
                  className='h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-700 ease-in-out'
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Dots Animation */}
          <div className='flex justify-center mt-8 space-x-2'>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className='w-3 h-3 bg-blue-500 rounded-full animate-bounce'
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader
