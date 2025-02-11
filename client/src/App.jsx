import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Toaster} from "react-hot-toast"
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import { useEffect } from "react";
import { setAllCategory,setAllSubCategory,setLoadingCategory } from "./store/productSlice";
import AxiosToastError from "./utils/AxiosToastError";
import Axios from "./utils/Axios";
import summaryApi from "./common/summaryApi";
import GlobalProvider from './provider/GlobalProvider';
import CartMobileLink from './components/CartMobile';

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  // get value user details
  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }
  

  // get value category data
  const fetchCategory = async()=>{
    try {
        dispatch(setLoadingCategory(true))
        const response = await Axios({
            ...summaryApi.getCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllCategory(responseData.data))
        }
        console.log("category",responseData)
    } catch (error) {
        AxiosToastError(error)
    }finally{
      dispatch(setLoadingCategory(false))
    }

  }
  const fetchSubCategory = async()=>{
    try {
        const response = await Axios({
            ...summaryApi.getSubCategory
        })
        const { data : responseData } = response

        if(responseData.success){
          dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  
  // test logic
  useEffect(()=>{
    fetchUser()
    fetchCategory()
    fetchSubCategory()
  },[])

  return (
    <GlobalProvider>
      <div className="font-circular-wed">
        <Header/>
        <main className="min-h-[80vh]">
          <Outlet/>
        </main>
        <Footer/>
        <Toaster/>
        {
          location.pathname !== '/checkout' && (
            <CartMobileLink/>
          )
        }
      </div>
    </GlobalProvider>
    
  );
};

export default App;
