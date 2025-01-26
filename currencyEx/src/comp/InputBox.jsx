import React from 'react'

function InputBox({
    label,
    options,
    fun,
    cc,
    Amount,
    onAmountChange,
    dis,
}) {


  return (
    <>
        <div className='flex bg-white p-3 rounded-md flex-col text-black'>
            <div className='flex justify-between text-gray-600 text-sm w-100 font-semibold '>
                <div>
                    {label}
                </div>
                <div>
                    currency Change
                </div>
            </div>
            <div className=' flex justify-between'>
                <input value={Amount}
                onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                type='number'
                disabled ={dis}
                className=' border-dashed'  ></input>
                <select value={cc} className=' text-sm' onChange={(e)=>fun(e.target.value)}>
                    {options.map( ( curr )=>{
                        return <option key={curr} value={curr} > {curr}</option>
                    } )}
                </select>

            </div>
        </div>
    </>
  )
}

export default InputBox;