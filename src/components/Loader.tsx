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
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + Math.random() * 12
      })
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
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-8'>
      <div className='bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full border border-blue-100'>
        {/* Animated Water Drop with Ripple Effect */}
        <div className='relative mx-auto mb-8 w-28 h-28'>
          <div className='absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full animate-pulse shadow-lg'></div>
          <div className='absolute inset-3 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full animate-bounce shadow-md'></div>
          <div className='absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20'></div>
          <Droplets className='absolute inset-0 m-auto w-14 h-14 text-white animate-pulse drop-shadow-lg' />
        </div>

        {/* System Title */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-3 tracking-tight'>
            Water Management System
          </h1>
          <div className='h-16 flex items-center justify-center'>
            <p className='text-blue-600 font-semibold text-lg animate-pulse'>
              {loadingMessages[currentMessage]}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className='mb-8'>
            <div className='flex justify-between text-sm font-medium text-gray-700 mb-3'>
              <span>System Initialization</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner'>
              <div
                className='h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-full transition-all duration-700 ease-out relative overflow-hidden shadow-sm'
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className='absolute inset-0 bg-white opacity-30 animate-pulse'></div>
                <div className='absolute top-0 left-0 right-0 h-1 bg-white opacity-50 rounded-full'></div>
              </div>
            </div>
          </div>
        )}

        {/* System Status Grid */}
        <div className='grid grid-cols-3 gap-6 mb-8'>
          <div className='flex flex-col items-center space-y-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200'>
            <div className='relative'>
              <Gauge
                className='w-10 h-10 text-blue-600 animate-spin'
                style={{ animationDuration: '4s' }}
              />
              <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
            </div>
            <div className='text-center'>
              <span className='text-sm font-semibold text-blue-800'>
                Pressure
              </span>
              <div className='text-xs text-blue-600 mt-1'>Monitoring</div>
            </div>
          </div>

          <div className='flex flex-col items-center space-y-3 p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl border border-cyan-200'>
            <div className='relative'>
              <Waves className='w-10 h-10 text-cyan-600 animate-bounce' />
              <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
            </div>
            <div className='text-center'>
              <span className='text-sm font-semibold text-cyan-800'>
                Flow Rate
              </span>
              <div className='text-xs text-cyan-600 mt-1'>Active</div>
            </div>
          </div>

          <div className='flex flex-col items-center space-y-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200'>
            <div className='relative'>
              <Activity className='w-10 h-10 text-blue-600 animate-pulse' />
              <div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
            </div>
            <div className='text-center'>
              <span className='text-sm font-semibold text-blue-800'>
                Quality
              </span>
              <div className='text-xs text-blue-600 mt-1'>Analyzing</div>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div className='flex justify-center space-x-8 text-sm'>
          <div className='flex items-center space-x-2'>
            <Database className='w-4 h-4 text-green-600' />
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
            <span className='text-gray-700 font-medium'>
              Database Connected
            </span>
          </div>
          <div className='flex items-center space-x-2'>
            <Wifi className='w-4 h-4 text-green-600' />
            <div
              className='w-2 h-2 bg-green-500 rounded-full animate-pulse'
              style={{ animationDelay: '0.5s' }}
            ></div>
            <span className='text-gray-700 font-medium'>Sensors Online</span>
          </div>
        </div>

        {/* Loading Animation Dots */}
        <div className='flex justify-center mt-8 space-x-2'>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className='w-3 h-3 bg-blue-500 rounded-full animate-bounce'
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s',
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loader