import React, { use, useState } from 'react'
import { Link, useLoaderData, useLocation, useNavigate, useNavigation } from 'react-router'
import { AuthContext } from '../../../Context/AuthContext';
export const LoginRegister = () => {


const {signInWithGoogle,createUser, signInUser}=use(AuthContext)


  const location=useLocation();
  const navigate = useNavigate()
console.log(location)

  const [activeTab, setActiveTab] = useState("login"); // 'login' or 'register'


   const handleLogin=(e)=>{
    e.preventDefault();
    const email = e.target.email.value;
     const password=e.target.password.value
   signInUser(email,password)
   .then(result=>{
    console.log(result)
    navigate(location.state|| '/')
   })
   .catch(error=>{
    console.log(error)
   })

   }


  const handleWithGoogle = (e) => {
    e.preventDefault();

     signInWithGoogle()
     .then(result=>{
        console.log(result)
        navigate(location.state|| '/')
     })
     .catch(error=>{
        console.log(error)
     })
  };



  const handleRegister = (e) => {
    e.preventDefault();
     const name = e.target.name.value;
     const email = e.target.email.value;
     const password=e.target.password.value
     const photoUrl = e.target.photoURL.value

  const newUser ={name, email, password, photoUrl}
  console.log(newUser)
    createUser(email,password)
    .then(result=>{
        console.log(result)
    })
    .catch(error=>{
        console.log(error)
    })
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="shadow-2xl  p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-2 text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-400 bg-clip-text text-transparent hidden sm:block">
          Welcome to TradeHub
        </h1>
        <p className="text-center text-xl mb-4 font-normal  text-gray-500">
          Login or create an account to continue
        </p>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 rounded-l-lg ${
              activeTab === "login"
                ? "bg-orange-100 text-orange-700 font-semibold"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2 rounded-r-lg ${
              activeTab === "register"
                ? "bg-orange-100 text-orange-700 font-semibold"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {activeTab === "login" && (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Email</label>
              <input

              name="email"
                type="email"
                placeholder="your@email.com"
                className="w-full border rounded-md px-3 py-2"
               
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Password</label>
              <input
                name='password'
                type="password"
                placeholder="•••••••"
                className="w-full border rounded-md px-3 py-2"
              
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
            >
              Login
            </button>
           <div className='py-3 text-blue-600'><a href="#">Forgot Password ?</a></div>
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-gray-400 text-sm">OR CONTINUE WITH</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <button
             onClick={handleWithGoogle}
              type="submit"
              className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-50"
            >
             <svg
                className="w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#EA4335"
                  d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
                <path
                  fill="#34A853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285F4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#FBBC05"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
              </svg>
            
              Google
            </button>
          </form>
        )}

        {/* Register Form */}
        {activeTab === "register" && (
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Name</label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full border rounded-md px-3 py-2"
              
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Email</label>
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                className="w-full border rounded-md px-3 py-2"
           
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Photo URL (optional)</label>
              <input
                name="photoURL"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Password</label>
              <input

                name="password"
                type="password"
                placeholder="•••••••"
                className="w-full border rounded-md px-3 py-2"
             
              />
              <p className="text-gray-400 text-xs mt-1">
                Must be at least 6 characters 
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
            >
              Register
            </button>
            <div className='py-3 text-blue-600'><a href="#">Forgot Password ?</a></div>

            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-gray-400 text-sm">OR CONTINUE WITH</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <button onClick={handleWithGoogle}
              type="submit" 
              className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-50"
            >
    
              <svg 
                className="w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#EA4335"
                  d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
                <path
                  fill="#34A853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285F4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#FBBC05"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
              </svg>
              Google
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
