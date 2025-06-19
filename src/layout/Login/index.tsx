import { useState, useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Droplet, Zap, Wifi, CheckIcon } from 'lucide-react'

import { Form } from '../../components/ui/form'
import { Button } from '../../components/ui/button'
import CustomInput from '../../components/CustomInput'
import { useUserStore } from '../../store/useAuthStore'
import { loginFormSchema } from '../../lib/validators'

const SplashScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white text-3xl z-50">
    Loading...
  </div>
)

const LogIn = () => {
  const navigate = useNavigate()
  const { loginUser, loading } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const toggleDark = () => setDarkMode(prev => !prev)



  const schema = loginFormSchema()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  })

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsLoading(true)
    try {
      await loginUser({
        identifier: data.identifier,
        password: data.password,
      })
      navigate('/')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Header */}
      <header className="relative w-full max-w-7xl mx-auto px-8 py-6 flex items-center justify-between min-h-[80px]">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute top-1/2 left-1/2 w-[280px] h-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 dark:from-sky-700 dark:to-indigo-900 opacity-30 pointer-events-none blur-3xl"
          style={{ zIndex: 0 }}
        />
        <div className="relative z-10 flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.15 }}>
            <Droplet className="w-12 h-12 text-sky-500 dark:text-sky-400 drop-shadow-lg" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 dark:from-sky-400 dark:to-indigo-400">
              Druk Water Authority System (DWAS)
            </h1>
            <p className="text-xs font-medium text-sky-600 dark:text-sky-400 italic tracking-wide">
              DWAS water intelligence
            </p>
          </div>
        </div>
        <div className="relative z-10 flex items-center space-x-6">
          <motion.div
            animate={{ rotate: [0, 15, -15, 15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            whileHover={{ rotate: 10 }}
            className="cursor-pointer"
          >
            <Zap className="w-6 h-6 text-sky-400 dark:text-sky-300 drop-shadow-md" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            whileHover={{ y: -10 }}
            className="cursor-pointer"
          >
            <Wifi className="w-6 h-6 text-sky-400 dark:text-sky-300 drop-shadow-md" />
          </motion.div>

          <button
            onClick={toggleDark}
            className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-md"
            aria-label="Toggle dark mode"
          >
            <span
              className={`w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5 left-0.5 transition-transform duration-300 ease-in-out ${
                darkMode ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {showSplash ? (
          <SplashScreen key="splash" />
        ) : (
          <motion.main
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={`min-h-screen flex items-center justify-center px-6 sm:px-12 ${
              darkMode
                ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white'
                : 'bg-gradient-to-br from-sky-50 via-cyan-100 to-blue-200 text-gray-900'
            }`}
          >
            <div className="flex flex-col md:flex-row max-w-6xl w-full gap-12 mx-auto px-4 py-12">
              {/* Left Section */}
              <section className="flex flex-col justify-center max-w-lg space-y-8 md:pr-4">
                <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 drop-shadow-lg">
                  Welcome to DWAS
                </h2>
                <p className="text-xl leading-relaxed text-sky-800 dark:text-sky-200 tracking-wide">
                  Connect with communities, track usage, and explore AI-powered water intelligence.
                </p>
                <ul className="space-y-4 text-sky-700 dark:text-sky-200 text-lg">
                  {[
                    'Real-time water monitoring',
                    'Secure and easy login',
                    'Community-driven insights',
                  ].map((feature) => (
                    <li key={feature} className="flex items-center space-x-3">
                      <CheckIcon className="w-6 h-6 text-green-400" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm italic text-sky-500 dark:text-sky-300">
                  Join thousands making smarter water decisions.
                </p>
              </section>

              {/* Right Section - Login Form */}
              <section className="w-full max-w-md p-10 rounded-3xl bg-white/60 dark:bg-[#1e1e2f] backdrop-blur-xl shadow-2xl border border-blue-100 dark:border-gray-700 text-gray-800 dark:text-gray-100 transition-all">
                <Form {...form}>
                  <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <CustomInput
                      control={form.control}
                      name="identifier"
                      label="CID Number"
                      placeholder="Enter your CID or Phone Number"
                      type="text"
                    />
                    <CustomInput
                      control={form.control}
                      name="password"
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                    />
                    <Button
                      type="submit"
                      disabled={isLoading || loading}
                      className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-3 rounded-2xl font-bold tracking-wide shadow-lg transition transform hover:scale-[1.03] disabled:opacity-50"
                    >
                      {isLoading ? 'Logging in...' : 'Log In'}
                    </Button>
                  </form>
                </Form>
                <p className="text-center text-sm mt-6 text-sky-500 dark:text-sky-400 font-medium tracking-wide">
                  - Join the blue movement. Make every drop count.
                </p>
              </section>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}

export default LogIn