import { Outlet } from 'react-router'
import './App.css'
import { Footer, Nav } from './Component/Comp'

function App() {

  return (
    <>
    <div className=' bg-gray-100 '>
    <Nav/>
      <Outlet/>
    <Footer/>
    </div>
    </>
  )
}

export default App
