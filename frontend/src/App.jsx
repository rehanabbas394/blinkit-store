import './App.css'
import { Outlet } from 'react-router-dom';
import { Header } from './component/header';
import { Footer } from './component/footer';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fetchUserDetail from './utils/fetchUserDetail';
import { setUserDetails } from './store/userSlice';
import Api_endpoints from './common/api-details';
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/productSlice';
import { Axios } from './utils/Axios';

function App() {
  const dispatch = useDispatch()

  const fetchUser = async() => {
    const userData = await fetchUserDetail()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async()=>{
    try {
        dispatch(setLoadingCategory(true))
        const response = await Axios({
            ...Api_endpoints.getCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
        
    }finally{
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategory = async()=>{
    try {
        const response = await Axios({
            ...Api_endpoints.getSubCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
        
    }finally{
    }
  }

  useEffect(() => {
    fetchUser()
    fetchCategory()
    fetchSubCategory()
  })
  return (
   <>
      <Header/>
      <main className=' min-h-[75vh]' >
        <Outlet/>
      </main>
      <Footer/>
      <Toaster />
   </>
  )
}

export default App
