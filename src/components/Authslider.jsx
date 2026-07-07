"use client"

import { useState } from "react"
import { Github, Linkedin } from "lucide-react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"


const AuthSlider = () => {
  const [isSignIn, setIsSignIn] = useState(true)
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const navigate = useNavigate()
  const [loggingIn, setLoggingIn] = useState(false)

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    const url = isSignIn ? "https://mynotes-manager-backend.onrender.com/api/auth/login" : "https://mynotes-manager-backend.onrender.com/api/auth/createuser"

    const body = isSignIn
      ? { email: credentials.email, password: credentials.password }
      : { name: credentials.name, email: credentials.email, password: credentials.password }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    const json = await response.json()
    console.log(json)
    if (json.success) {
      setLoggingIn(true)
      setTimeout(() => {
        localStorage.setItem("token", json.authtoken)
        setTimeout(() => {
          toast.success("Logged in Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            progressStyle: {
              background: "linear-gradient(to right, #36d1dc, #5b86e5)",
            },
            style: {
              top: "70px",
              background: "#1e40af",
              color: "#fff",
              borderRadius: "8px",
              padding: "16px",
              fontSize: "14px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            },
          })
        }, 2000)

        setCredentials({ name: "", email: "", password: "", cpassword: "" })
        navigate("/")
      }, 2000)
    } else {
      toast.error("Invalid Details", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        progressStyle: {
          background: "linear-gradient(to right, #36d1dc, #5b86e5)",
        },
        style: {
          top: "70px",
          background: "#1e40af",
          color: "#fff",
          borderRadius: "8px",
          padding: "16px",
          fontSize: "14px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        },
      })
    }
  }

  const handleSocial = () => {
    toast.info("Social login is currently unavailable. Please sign in using your email.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      progressStyle: {
        background: "linear-gradient(to right, #36d1dc, #5b86e5)",
      },
      style: {
        top: "70px",
        background: "#1e40af",
        color: "#fff",
        borderRadius: "8px",
        padding: "16px",
        fontSize: "14px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
      },
    })
  }

  return (
    <div className="h-screen w-screen fixed inset-0 flex flex-col bg-gradient-to-br from-blue-300 via-purple-200 to-pink-200">
      {/* Navbar */}
      <nav className="h-15 w-full flex items-center justify-between px-6">
        <img src="./logo2.png" alt="Logo" className="h-12 w-15" />
        <h1
          className="text-xl md:text-3xl font-bold text-white backdrop-blur-xl mt-3 bg-white/10 p-3 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(128,0,128,0.6)]"
          style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)" }}
        >
          Let's Start Your Journey with <span className="text-purple-500">myNotes</span>
        </h1>
        <div></div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center mt-2">
        {/* Desktop Version with Sliding Panel */}
        <div className="relative hidden sm:block w-[730px] h-[420px] bg-white rounded-[30px] shadow-2xl overflow-hidden">
          {/* Wrapper for Forms */}
          <div
            className={`absolute top-0 left-0 w-[200%] h-full flex transition-transform duration-700 ease-in-out z-10 ${
              isSignIn ? "translate-x-0" : "-translate-x-1/2"
            }`}
          >
            {/* Sign In Form */}
            <div className="w-1/2 h-full bg-white flex items-center flex-start p-8">
              <div className="w-full max-w-[300px]">
                <h2 className="text-3xl font-bold mb-4 text-center">Sign In</h2>
                <div className="flex gap-4 justify-center mb-4">
                  <button
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                    onClick={handleSocial}
                  >
                    G+
                  </button>
                  <button
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                    onClick={handleSocial}
                  >
                    f
                  </button>
                  <button
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                    onClick={handleSocial}
                  >
                    <Github className="h-4 w-4" />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                    onClick={handleSocial}
                  >
                    <Linkedin className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 text-center mb-4">Use your email password</p>
                <form onSubmit={handleSignup}>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-base"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      value={credentials.password}
                      className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-base"
                    />
                  </div>
                  <button type="button" className="text-sm mt-3 text-gray-600 hover:underline block mx-auto" disabled>
                    Forget Your Password?
                  </button>
                  <button
                    type="submit"
                    className="mt-4 w-full px-5 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors duration-300 text-lg"
                  >
                    SIGN IN
                  </button>
                </form>
              </div>
            </div>

            {/* Sign Up Form */}
            <div className="w-1/2 h-full bg-white flex items-center justify-end p-8">
              <div className="w-full max-w-[300px]">
                <h2 className="text-3xl font-bold mb-4 text-center">Create Account</h2>
                <div className="flex gap-4 justify-center mb-4">
                  <button
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                    onClick={handleSocial}
                  >
                    G+
                  </button>
                  <button
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                    onClick={handleSocial}
                  >
                    f
                  </button>
                  <button
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                    onClick={handleSocial}
                  >
                    <Github className="h-4 w-4" />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                    onClick={handleSocial}
                  >
                    <Linkedin className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 text-center mb-4">Use your email for registration</p>
                <form onSubmit={handleSignup}>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={credentials.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-base"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-base"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-4 w-full px-5 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors duration-300 text-lg"
                  >
                    SIGN UP
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Sliding Panel */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-purple-700 to-purple-900 text-white p-10 transition-transform duration-700 ease-in-out flex flex-col items-center justify-center z-20 ${
              isSignIn ? "translate-x-full rounded-l-[80px]" : "translate-x-0 rounded-r-[80px]"
            }`}
          >
            <h2 className="text-3xl font-bold mb-4 text-center">{isSignIn ? "Hello, Friend!" : "Welcome Back!"}</h2>
            <p className="text-center mb-4 text-sm">
              {isSignIn
                ? "Register with your personal details to use all of site features"
                : "Enter your personal details to use all of site features"}
            </p>
            <button
              className="px-5 py-2 rounded-full border-2 border-white text-white text-base hover:bg-white/10 transition-colors duration-300"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn ? "SIGN UP" : "SIGN IN"}
            </button>
          </div>
        </div>

        {/* Mobile Version - Clean Form without Sliding Panel */}
        <div className="sm:hidden w-[95%] bg-white rounded-[30px] shadow-2xl overflow-hidden">
          {isSignIn ? (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
              <p className="text-sm text-gray-500 text-center mb-4">Use your email password</p>
              <form onSubmit={handleSignup}>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-base"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={credentials.password}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-base"
                  />
                </div>
                <button type="button" className="text-sm mt-3 text-gray-600 hover:underline block mx-auto" disabled>
                  Forget Your Password?
                </button>
                <button
                  type="submit"
                  className="mt-4 w-full px-5 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors duration-300 text-lg"
                >
                  SIGN IN
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-2">Don't have an account?</p>
                <button
                  className="px-5 py-2 bg-transparent border-2 border-purple-700 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors duration-300"
                  onClick={() => setIsSignIn(false)}
                >
                  SIGN UP
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
              <p className="text-sm text-gray-500 text-center mb-4">Use your email for registration</p>
              <form onSubmit={handleSignup}>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={credentials.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-base"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-base"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full px-5 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors duration-300 text-lg"
                >
                  SIGN UP
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-2">Already have an account?</p>
                <button
                  className="px-5 py-2 bg-transparent border-2 border-purple-700 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors duration-300"
                  onClick={() => setIsSignIn(true)}
                >
                  SIGN IN
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {loggingIn && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-purple-700 px-6 py-4 rounded-xl shadow-xl text-lg font-semibold">
            Logging In...
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="h-10 mt-4 w-full bg-purple-600 flex items-center justify-center shadow-md">
        <p className="text-sm text-gray-200">&copy; 2025 All Rights Reserved. Developed by M Umar Alam</p>
      </footer>
    </div>
  )
}

export default AuthSlider

