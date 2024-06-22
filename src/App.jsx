import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { login, logout } from './context/authSlice'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { PreLoader } from './components'
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import './App.css'


function App() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => {
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const toggleHeaderVisibility = () => {
    setIsHeaderVisible(!isHeaderVisible); // Toggle header visibility
  };

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-zinc-950'>
      <div className='w-full block'>
        <div className='fixed z-50 top-5 left-4 text-3xl block sm:hidden' onClick={toggleHeaderVisibility}>
          {isHeaderVisible ? <RxCross1 /> : <RxHamburgerMenu />}
        </div>
        <Header isVisible={isHeaderVisible} />
        <main className='pt-20'>
          {loading ?
            <div className='custom-h my-8 flex justify-center items-center'>
              <PreLoader type="bars" color="gray" height={60} width={60} />
            </div> : <Outlet />}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
