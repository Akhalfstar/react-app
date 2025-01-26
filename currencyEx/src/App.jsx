import { useState } from 'react'
import { InputBox } from './comp'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className=' flex h-screen justify-center items-center text-2xl text-white'>
        <InputBox/>
      </div>
    </>
  )
}

export default App
