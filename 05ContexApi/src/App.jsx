import './App.css'
import { Outlet } from 'react-router'
import UserConPro from './Context/UserConpro'

function App() {

  return (
    <>
      <UserConPro>
        <Outlet/>
      </UserConPro>
    </>
  )
}

export default App
