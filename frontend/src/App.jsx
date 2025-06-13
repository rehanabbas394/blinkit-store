import './App.css'
import { Outlet } from 'react-router-dom';
import { Header } from './component/header';
import { Footer } from './component/footer';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fetchUserDetail from './utils/fetchUserDetail';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch()

  const fetchUser = async() => {
    const userData = await fetchUserDetail()
    console.log("data from app", userData)
    dispatch(setUserDetails(userData.data))
  }

  useEffect(() => {
    fetchUser()
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
