import './App.css'
import { Outlet } from 'react-router-dom';
import { Header } from './component/header';
import { Footer } from './component/footer';
import { Toaster } from 'react-hot-toast';

function App() {
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
