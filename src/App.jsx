import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberallowed, setNumberallowed] = useState(false)
  const [characterallowed, setCharacterallowed] = useState(false)
  const [password, setPassword] = useState('')

  // const passwordGenerator= useCallback(()=>{
  //   let pass= ''
  //   let str= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  //   if (numberallowed) str+= '0123456789'
  //   if (characterallowed) str += '!@#$%^&*()_+{}|:<>?'

  //   for (let index = 0; index < length; index++) {
  //     let char= Math.floor( Math.random()*str.length +1)
  //     pass+= str.charAt(char)
  //   }

  // setPassword(pass)

  // }, [length, numberallowed, characterallowed, setPassword]) //setPassword is a dependency which is optional but it is good for memoization and optimization. if given password there will be infinite loop loop because it will change everytime.


  //can be done with useEffect only 
  useEffect(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberallowed) str += '0123456789'
    if (characterallowed) str += '!@#$%^&*()_+{}|:<>?'

    for (let index = 0; index < length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberallowed, characterallowed])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99); //optional just to get the whole text selected
    window.navigator.clipboard.writeText(password)

  }
    , [password])

  //using useRef

  const passwordRef = useRef(null);

  return (
    <>
    <div className=' h-screen flex justify-center items-center bg-slate-600 '>
      <div className=" bg-black h-[20rem] w-[30rem] flex flex-wrap flex-col justify-center items-center text-blue-600 rounded-xl p-3 shadow-md shadow-slate-50  ">
        <h1 className='text-4xl font-bold mb-9 '>Password Generator</h1>
        <div className="flex mt-2 shadow rounded-lg overflow-hidden ">

          <input type="text"
            value={password}

            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent "
            placeholder='Your Password'
            readOnly
            ref={passwordRef}
          />


          <button className='px-2 bg-blue-600 py-1 outline-none text-white hover:bg-blue-700'
            onClick={copyPassword}
          >Copy</button>
        </div>
        <div className="flex text-sm gap-x-2 mt-9">
          <div className="flex  gap-x-1">
            <input type="range"
              min={8}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}

            />
        
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className="flex gap-x-1">
            <input type="checkbox"
              defaultChecked={numberallowed}
              id='number'
              onChange={(e) => setNumberallowed(e.target.checked)}
            />
            <label htmlFor="number">Number</label>
          </div>
          <div className="flex gap-1">
            <input type="checkbox" id='characters' defaultChecked={characterallowed}
              onChange={() => setCharacterallowed((checked) => !checked)}
            />
            <label htmlFor="characters">Characters</label>
          </div>

        </div>

      </div>
      </div>
    </>
  )
}

export default App
