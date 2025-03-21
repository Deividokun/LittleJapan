import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Filter from './components/filter/filter'
import Footer from './components/footer/footer'
import Header from './components/Header/Header'
import ScrollToTop from './hooks/ScrollToTop' // Importamos ScrollToTop
import AddAlojamientoForm from './pages/accommodationReg/accommodationReg'
import ArrayInverse from './pages/array/array'
import ContactUs from './pages/contactUs/contactUs'
import FilterHome from './pages/filterHome/filterHome'
import HelpComponent from './pages/help/help'
import Heroe from './pages/heroe/heroe'
import HostingCard from './pages/hostingView/hostingView'
import LoginUser from './pages/login/login'
import MyProfile from './pages/myProfile/myprofile'
import RegisterUser from './pages/register/register'
import ReservationDetail from './pages/ResAndFav/resandfav'

function App() {
  const location = useLocation()

  // Rutas donde NO quieres que aparezca el filtro
  const noFilterRoutes = [
    '/reserves/:id',
    '/help',
    '/contactUs',
    '/login',
    '/register',
    '/add-house',
    '/resandfav',
    '/myProfile',
    '/array'
  ]
  const isDetailPage = location.pathname.startsWith('/detail/')

  return (
    <div className='app-container'>
      <ScrollToTop />{' '}
      {/* Asegura que la página siempre vuelva arriba al cambiar de ruta */}
      <Header />
      {/* Renderiza el filtro solo si la ruta actual no está en la lista y no es la página de detalles */}
      {!noFilterRoutes.includes(location.pathname) && !isDetailPage && (
        <Filter />
      )}
      <Routes>
        <Route path='/' element={<Heroe />} />
        <Route path='/help' element={<HelpComponent />} />
        <Route path='/contactUs' element={<ContactUs />} />
        <Route path='/filterhome' element={<FilterHome />} />
        <Route path='/detail/:id' element={<HostingCard />} />
        <Route path='/login' element={<LoginUser />} />
        <Route path='/register' element={<RegisterUser />} />
        <Route path='/add-house' element={<AddAlojamientoForm />} />
        <Route path='/myProfile' element={<MyProfile />} />
        <Route path='/reserves/:id' element={<ReservationDetail />} />
        <Route path='/array' element={<ArrayInverse />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
