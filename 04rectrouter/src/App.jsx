import './App.css'
import { Nav , Footer, Home } from './component/Comp'
import { Outlet } from 'react-router-dom'

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
