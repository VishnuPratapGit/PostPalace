import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { login, logout } from './context/authSlice'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import './App.css'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }))
        else dispatch(logout())
      })
      .finally(() => setLoading(false))
  })

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-zinc-900'>
      <div className='w-full block'>
        <Header />
        <main className='pt-20'>
          {loading ?
            <div className='custom-h my-8 flex justify-center items-center'>
              <p className=' text-2xl'>Loading...</p>
            </div> : <Outlet />}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
