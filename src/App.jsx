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
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
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
    setIsHeaderVisible(!isHeaderVisible);
  };

  return (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <div className='text-white sticky top-0 p-3 z-50 bg-zinc-950 text-2xl block sm:hidden' onClick={toggleHeaderVisibility}>
          {isHeaderVisible ? <RxCross1 /> : <RxHamburgerMenu />}
        </div>
        <Header isVisible={isHeaderVisible} setVisible={setIsHeaderVisible} />
        <main className='sm:pt-20'>
          {loading ?
            <div className='my-8 custom-h flex justify-center items-center'>
              <PreLoader type="bars" color="gray" height={60} width={60} />
            </div> : <Outlet />}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;