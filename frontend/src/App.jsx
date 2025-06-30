import './App.css'
import { Outlet } from 'react-router-dom';
import { Header } from './component/header';
import { Footer } from './component/footer';

function App() {
  return (
   <>
      <Header/>
      <main className=' min-h-[75vh]' >
        <Outlet/>
      </main>
      <Footer/>
   </>
  )
}

export default App
