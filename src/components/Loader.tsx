import { useState, useEffect } from 'react'
import { Droplets, Database, Wifi, CheckCircle } from 'lucide-react'

type LoaderProps = {
  showProgress?: boolean
  onComplete?: () => void
}

const loadingMessages = [
  'Connecting to sensors',
  'Fetching water quality data',
  'Checking reservoir levels',
  'Monitoring flow rates',
  'Validating system pressure',
  'Syncing with cloud',
  'Rendering dashboard',
  'Finishing setup',
]

const Loader = ({ showProgress = true, onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + Math.random() * 10, 100)
        return next
      })
    }, 700)

    const messageTimer = setInterval(() => {
      setStep((prev) => Math.min(prev + 1, loadingMessages.length - 1))
    }, 2500)

    return () => {
      clearInterval(progressTimer)
      clearInterval(messageTimer)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setFadeOut(true)
      setTimeout(() => {
        setVisible(false)
        onComplete?.()
      }, 1000)
    }
  }, [progress, onComplete])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#0a0f1d] to-[#020617] transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className='w-full max-w-md p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 shadow-2xl text-white'>
        {/* Water Ring Animation */}
        <div className='relative w-24 h-24 mx-auto mb-6'>
          <div className='absolute inset-0 rounded-full border-4 border-cyan-500 border-dashed animate-spin-slow'></div>
          <div className='absolute inset-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center'>
            <Droplets className='w-8 h-8 text-white drop-shadow-lg animate-pulse' />
          </div>
        </div>

        {/* System Title */}
        <div className='text-center mb-6'>
          <h1 className='text-2xl font-bold tracking-tight'>Initializing System</h1>
          <p className='text-sm text-cyan-400 mt-1'>Water Management Dashboard</p>
        </div>

        {/* Timeline Loading Steps */}
        <div className='space-y-3 mb-6'>
          {loadingMessages.map((msg, index) => (
            <div key={index} className='flex items-center gap-3 text-sm'>
              {index < step ? (
                <CheckCircle className='w-4 h-4 text-green-400' />
              ) : (
                <div className='w-3 h-3 rounded-full border border-cyan-400 animate-pulse' />
              )}
              <span
                className={`${
                  index === step ? 'text-cyan-300 font-medium' : 'text-gray-400'
                }`}
              >
                {msg}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className='mt-4'>
            <div className='w-full bg-gray-800 rounded-full h-3 overflow-hidden shadow-inner'>
              <div
                className='h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700 rounded-full'
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className='text-right text-xs text-gray-400 mt-1'>
              {Math.floor(progress)}%
            </p>
          </div>
        )}

        {/* Footer Status */}
        <div className='flex justify-between items-center mt-6 text-xs text-gray-400'>
          <div className='flex items-center gap-1'>
            <Database className='w-4 h-4 text-green-400' />
            <span>DB</span>
          </div>
          <div className='flex items-center gap-1'>
            <Wifi className='w-4 h-4 text-green-400' />
            <span>Online</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader
