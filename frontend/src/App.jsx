import { useState } from 'react'
// import './App.css'
import UserLogin from './pages/UserLogin'

function App() {
  
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-white'>
        <UserLogin/>
      </div>
    </>
  )
}

export default App
