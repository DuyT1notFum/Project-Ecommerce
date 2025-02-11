
import { useState } from "react"
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";

const ForgotPassword = () => {

  const [data,setData] = useState({
    email:"",
    
  })

  // click icon show and confirm password
  
  const navigate = useNavigate()

  // update value data
  const handleChange = (e)=>{
    const {name,value} = e.target
    setData((preve)=>{
      return{
        ...preve,
        [name]:value
      }
    })
  }

  //condition for button active
  const valideValue = Object.values(data).every(el=>el)  

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try {

      const response = await Axios({
        ...summaryApi.forgot_password,
        data:data
      })

      if (response.data.error) {
        toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message)
        
        navigate("/verification-otp",{
          state:data
        })
        setData({
          email:"",
        })
        
      }

      console.log("response",response)

    } catch (error) {
    AxiosToastError(error)
    }

  }


  return (
    <div className="backdrop-blur-sm fixed top-0 left-0 -right-0 bottom-0 bg-black/20 z-50  ">
      <div className="bg-white mt-28  max-w-sm mx-auto rounded-2xl p-4  shadow-md">

        <p className="ml-[20px] font-bold text-2xl text-gray-700">Forgot Password for <span className="text-yellow-400">Binkey<span className="text-green-400">it</span> </span> </p>

        <form className="grid gap-4 mt-6" action="" onSubmit={handleSubmit}>

          
          <div className="grid gap-1">
            <label className="font-medium" htmlFor="email">Email : </label>
            <input 
              id="email"
              type="email"
              className="bg-blue-50 p-2 focus-within:outline-yellow-200 rounded-lg "
              value={data.email}
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
    
          
          
          <button  className={` ${valideValue ? "bg-green-600" :"bg-gray-500"} text-white py-2 rounded font-semibold my-3 hover:scale-105 transition-all duration-300 hover:bg-green-900  `}>Send Otp</button>
          
        </form>

        <p className="py-2 font-circular-wed">
          Already have account ? <Link className="text-green-500 underline" to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword