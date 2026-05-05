import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, handleRegister } = useAuth()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleRegister({ username, email, password })
    if (result.success) {
      toast.success("Account created successfully 🚀");
      navigate('/')
    } else {
      toast.error(result.message);
    }
  }


  if (loading) {
    return (<main><h1>Loading......</h1></main>)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-14 transition-colors duration-300">
      <div className="form-container w-full max-w-[92%] sm:max-w-md md:max-w-lg lg:max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-7 md:p-9 lg:p-11 transition-all duration-300 h-auto flex flex-col justify-center ">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-7 sm:mb-9 md:mb-11 uppercase">
          Register-Form
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 sm:space-y-7 md:space-y-8">
          <div className="input-group space-y-2 sm:space-y-2.5 ">
            <label
              htmlFor="username"
              className="block text-sm sm:text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              onChange={(e) => { setUsername(e.target.value) }}
              type="text"
              id='username'
              name='username'
              autoComplete='current-username'
              placeholder='Enter your Username'
              className="w-full px-4 sm:px-5 h-[5vh] py-3 sm:py-3.5 text-sm sm:text-base bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
            />
          </div>
          <div className="input-group space-y-2 sm:space-y-2.5 ">
            <label
              htmlFor="email"
              className="block text-sm sm:text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              onChange={(e) => { setEmail(e.target.value) }}
              type="email"
              id='email'
              name='email'
              placeholder='Enter your email address'
              className="w-full px-4 sm:px-5 h-[5vh] py-3 sm:py-3.5 text-sm sm:text-base bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
            />
          </div>
          <div className="input-group space-y-2 sm:space-y-2.5">
            <label
              htmlFor="password"
              className="block text-sm sm:text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              onChange={(e) => { setPassword(e.target.value) }}
              type="password"
              id='password'
              name='password'
              autoComplete='current-password'

              placeholder='Enter your password'
              className="w-full px-4 sm:px-5 py-16 h-[5vh] sm:py-3.5 text-sm sm:text-base bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
            />
          </div>
          <button className='button primary-button  w-full mt-2 '>Login</button>
        </form>

        {/* <p>Already have an account? <Link to={'/login'} className='text-blue-600 font-bold underline text-[.8vw]'>Login</Link> </p> */}
        <p className='pt-[1vh] text-[1.3vw] font-bold'>Already have an account <Link to={'/login'} className='text-blue-600 font-bold underline text-[1.5vw] '>Register</Link> </p>

      </div>
    </main>
  )
}

export default Register
