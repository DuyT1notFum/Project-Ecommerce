

import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";

const Otpverification = () => {

  const [data,setData] = useState(["", "" ,"" ,"" ,"", ""])
   

  
  
  const navigate = useNavigate()
  const inputRef = useRef([])
  const location = useLocation()

  console.log("location",location)

  useEffect(()=>{
    if (!location?.state?.email) {
        navigate("/forgot-password")
    }
  },[location, navigate])

  

  //condition for button active
  const valideValue = data.every(el=>el)  

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try {

      const response = await Axios({
        ...summaryApi.forgot_password_otp_verification,
        data:{
          email: location?.state?.email,
          otp: data.join("")
        }
      })

      if (response.data.error) {
        toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message)
        setData(["", "" ,"" ,"" ,"", ""])
        navigate("/reset-password",{
          state:{
            data: response.data,
            email: location?.state?.email,
          }
        })
        
      }

      

    } catch (error) {
    AxiosToastError(error)
    }

  }


  return (
    <div className="backdrop-blur-sm fixed top-0 left-0 -right-0 bottom-0 bg-black/20 z-50  ">
      <div className="bg-white mt-28  max-w-sm mx-auto rounded-2xl p-4  shadow-md">

        <p className="ml-[50px] font-bold text-2xl text-gray-700">Enter Otp for <span className="text-yellow-400">Binkey<span className="text-green-400">it</span> </span> </p>

        <form className="grid gap-4 mt-6" action="" onSubmit={handleSubmit}>

          
          <div className="grid gap-1">
            <label className="font-medium" htmlFor="otp">Enter Your Otp : </label>

            <div className="flex items-center gap-4" >
                {
                    data.map((element,index)=>{
                        return(
                           <input  
                                id="otp"
                                type="otp"
                                key={"otp"+index}
                                value={data[index]}
                                ref={(ref)=>{
                                    inputRef.current[index] = ref
                                    return ref
                                }} 
                                onChange={(e)=>{
                                    const value = e.target.value
                                    console.log("value",value)

                                    const newData = [...data]
                                    newData[index] = value
                                    setData(newData)

                                    if (value && index < 5) {
                                        inputRef.current[index+1].focus()
                                    }
                                    
                                }}
                                maxLength={1}
                                className="bg-blue-100 p-2 w-10  focus-within:outline-yellow-200 rounded-lg text-center "
                                required
                            /> 
                        )
                    })
                }
            </div>
            
          </div>

          <button  className={` ${valideValue ? "bg-green-600" :"bg-gray-500"} text-white py-2 rounded font-semibold my-3 hover:scale-105 transition-all duration-300 hover:bg-green-900  `}>Verify Otp</button>
          
        </form>

        <p className="py-2 font-circular-wed">
          Already have account ? <Link className="text-green-500 underline" to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Otpverification