import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { KEY_FOR_TOKEN_API } from './utils/constant'

function App() {
  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem(KEY_FOR_TOKEN_API))
  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [])
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
