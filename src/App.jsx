import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Card from './components/Card';
import ContatUs from './components/ContatUs';
import AboutUs from './components/AboutUs';
import Privacy from './components/Privacy';
import Refund from './components/Refund';
import Disclaimer from './components/Disclaimers';
import Terms from './components/Terms';
import Blog from './components/Blog';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Shop from './components/Shop';
import Pay from './components/Pay';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/card' element={<Card />}/>
        <Route path='/contact' element={<ContatUs/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/privacy' element={<Privacy/>}/>
        <Route path='/refund' element={<Refund/>}/>
        <Route path='/disclaimers' element={<Disclaimer/>}/>
        <Route path='/terms' element={<Terms/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/pay' element={<Pay/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
      </Routes>
      <Footer/>
      <Sidebar/>
    </Router>

  )
}

export default App


