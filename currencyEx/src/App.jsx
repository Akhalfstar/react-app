import { useState } from 'react'
import { InputBox } from './comp'
import useCurrinfo from './hook/useCurrinfo'


function App() {
  const [to, setto] = useState("inr");
  const [from, setfrom] = useState("usd")
  const [Amount, setAmount] = useState(0)
  const [Converted, setConverted] = useState(0)
  const data = useCurrinfo(from)
  const options = Object.keys(data);
  
  function convert(){
    setConverted(Amount*data[to])
  }
  console.log(from , to)

  const swp = ()=>{
    setto(from);
    setfrom(to);
    setConverted(Amount)
    setAmount(Converted)
    
  }

  return (
    <>
      <div className=' flex flex-col h-screen justify-center items-center text-2xl text-white '>
        <InputBox 
        label = "From"
        options = {options}
        cc = {from}
        dis = {false}
        fun = {setfrom}
        Amount = {Amount}
        onAmountChange={(amount) => setAmount(amount)}
        />
        <button onClick={swp} className=' border-amber-200 text-2xl px-4 py-2 border-2 rounded-sm bg-amber-900 -m-2.5 z-2 cursor-pointer '> SWAP </button>
        <InputBox 
        label = "To"
        options = {options}
        cc = {to}
        dis = {true}
        fun = {setto}
        Amount = {Converted}
        />
        <button 
        onClick={convert}
        className=' text-xl font-medium px-4 py-2 m-2 bg-green-400 rounded-md cursor-pointer '  >Convert</button>
      </div>
    </>
  )
}

export default App
