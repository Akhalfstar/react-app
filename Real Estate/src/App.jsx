import { Outlet } from 'react-router'
import './App.css'
import { Footer, Nav } from './Component/Comp'

function App() {

  return (
    <>
    <Nav/>
      <Outlet/>
    <Footer/>
    </>
  )
}

export default App
