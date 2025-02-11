import { useEffect, useState } from "react"
import { useLocation, useNavigate,Link } from "react-router-dom"
import Axios from "../utils/Axios"
import summaryApi from "../common/summaryApi"
import toast from "react-hot-toast"
import AxiosToastError from "../utils/AxiosToastError"
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";


const ResetPassword = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [data,setData] = useState({
        email:"",
        newPassword:"",
        confirmPassword:"",
    })

    // click icon show and confirm password
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)

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

  

    const handleSubmit = async(e)=>{
        e.preventDefault()
    
        try {
    
          const response = await Axios({
            ...summaryApi.reset_password,
            data:data
          })
    
          if (response.data.error) {
            toast.error(response.data.message)
          }
    
          if (response.data.success) {
            toast.success(response.data.message)
            navigate("/login")
            setData({
                email : "",
                newPassword : "",
                confirmPassword : ""
            })
            
            
          }

          console.log("response",response)
    
        } catch (error) {
        AxiosToastError(error)
        }
    
    }


    //condition for button active
  const valideValue = Object.values(data).every(el=>el)

//   check condition for location(can remove)
    useEffect(()=>{
        if(!(location?.state?.data?.success)){
            navigate("/")
        }
        if (location?.state?.email) {
            setData((preve)=>{
                return{
                    ...preve,
                    email: location?.state?.email
                }
            })
        }
    },[location,navigate])

    console.log("data resetpasssword ",data)


  return (
    <div className="backdrop-blur-sm fixed top-0 left-0 -right-0 bottom-0 bg-black/20 z-50  ">
      <div className="bg-white mt-28  max-w-sm mx-auto rounded-2xl p-4  shadow-md">

        <p className="ml-[20px] font-bold text-2xl text-gray-700">Reset Password for <span className="text-yellow-400">Binkey<span className="text-green-400">it</span> </span> </p>

        <form className="grid gap-4 mt-6" action="" onSubmit={handleSubmit}>

          
          <div className="grid gap-1">
                      <label className="font-medium" htmlFor="newPassword">New Password : </label>
                      <div className="bg-blue-50 p-2 border-[2px] flex items-center gap-1 rounded-lg focus-within:border-yellow-200">
                        <input 
                          id="newPassword"
                          type= {showPassword ? "text" : "password"}
                          className="w-full bg-transparent outline-none"
                          value={data.newPassword}
                          name="newPassword"
                          onChange={handleChange}
                          placeholder="Enter your password"
                          required
                        />
          
                        <div className="cursor-pointer" onClick={()=>setShowPassword(preve => !preve)}>
                          {
                            showPassword ? (
                              <FaRegEye />
                            ) :
                            (
                              <FaRegEyeSlash />
                            )
                          }
                        </div>
                    </div>
            </div>

            <div className="grid gap-1">
            <label className="font-medium" htmlFor="confirmPassword">Confirm New Password : </label>
            <div className="bg-blue-50 p-2 border-[2px] flex items-center gap-1 rounded-lg focus-within:border-yellow-200">
              <input 
                id="confirmPassword"
                type= {showConfirmPassword ? "text" : "password"}
                className="w-full bg-transparent outline-none"
                value={data.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Enter your confirm password"
                required
              />

              <div className="cursor-pointer" onClick={()=>setShowConfirmPassword(preve => !preve)}>
                {
                  showConfirmPassword ? (
                    <FaRegEye />
                  ) :
                  (
                    <FaRegEyeSlash />
                  )
                }
              </div>
            </div>
          </div>
          
          <button  className={` ${valideValue ? "bg-green-600" :"bg-gray-500"} text-white py-2 rounded font-semibold my-3 hover:scale-105 transition-all duration-300 hover:bg-green-900  `}>Reset Password</button>
          
        </form>

        <p className="py-2 font-circular-wed">
          Already have account ? <Link className="text-green-500 underline" to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default ResetPassword