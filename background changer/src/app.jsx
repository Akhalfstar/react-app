import './app.css'
import {useState} from 'react'


export function App() {
  const [col , setcol] = useState("aqua");

  function fun(col){
    setcol();
  }

  return (
    <>
      <div className='bd' style={{backgroundColor : col} }>
        <div class="full" style="display: flex; justify-content: center; align-items: end; height: 90vh; ">
          <div style="display: flex; justify-content:space-evenly ;  width: 70vw; ">
            <button onClick={()=> setcol("red")}>Red</button>
            <button onClick={()=> setcol("black")}>black</button>
            <button onClick={()=> setcol("green")}> green</button>
            <button onClick={()=> setcol("yellow")}> yellow</button>
            <button onClick={()=> setcol("blue")}>blue</button>
            <button onClick={()=> setcol("white")}>white</button>
          </div>
        </div>
  </div>
    </>
  )
}
