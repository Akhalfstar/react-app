import { useState , useCallback , useEffect , useRef } from 'react'
import './App.css'

function App() {

  const [pass, setpass] = useState("pass")
  const [lng, setlng] = useState(8)
  const [num, setnum] = useState(false)
  const [ch, setch] = useState(false)

  const update = useCallback(
      () => {
        let s = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
        if(num) s+= "1234567890"
        if(ch) s+="!@#$%^&*()_+"
        let str ="";
        for (let i = 0; i < lng; i++) {
          let x = Math.floor(Math.random()*s.length)
          str += s[x]; 
        }
        setpass(str)
      },
      [lng,num , ch , setpass],
    )

    const passref = useRef(null)
    

    useEffect(() => {
        update()
    }, [lng ,ch , num , setpass])

    function copypass(){
      passref.current?.select();
      window.navigator.clipboard.writeText(pass)
    }
    
   

  return (
    <>
      <div className=' flex h-screen bg-gray-700 justify-center w-screen'>
        <div className='flex px-20 mt-3 bg-blue-950 rounded-xl flex-col justify-center h-40 gap-2'>
          <div className=' flex w-full  '>
            <input className=' bg-amber-900 rounded-xl w-full p-2' readOnly value={pass} type='text' placeholder='pass gen' ref={passref}></input>
            <button className=' bg-black cursor-pointer' onClick={copypass}>
              Copy
            </button>
          </div>
          <div className='flex gap-10 w-150'>
            <div className=' w-60'>
              <input type='range' min={8} max={64} value={lng} className=' cursor-pointer' onChange={(e)=>{setlng(e.target.value)}}></input>
              <label className='' > Lenght( {lng} )</label>
            </div>
            
            <div>
              <input type='checkbox' defaultChecked = {num} onChange={()=> setnum((num) => !num)} ></input>
              <label> Numbers </label>
            </div>

            <div>
              <input type='checkbox' defaultChecked = {ch} onChange={()=> setch((ch) => !ch)} ></input>
              <label> Special Charecters </label>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default App
