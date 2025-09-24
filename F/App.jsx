import React from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './components/Pages/Shop';
import Product from './components/Pages/Product'
import ShopCategory from './components/Pages/ShopCategory';
import LoginSignup from './components/Pages/LoginSignup'
import Cart from './components/Pages/Cart';
import Footer from './components/Footer/Footer';
import men_banner from './components/Assets/banner_mens.png'
import women_banner from './components/Assets/banner_women.png'
import kid_banner from './components/Assets/banner_kids.png'
import Checkout from './components/Pages/Checkout';

function App() {
  return (
   <>
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path='/' element={<Shop/>}/>
    <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
    <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
    <Route path='/kids' element={<ShopCategory banner={kid_banner} category ="kid"/>}/>
    <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
    </Route>
    <Route path='cart' element={<Cart/>}/>
    <Route path ='checkout' element ={<Checkout/>}/>
    <Route path='login' element={<LoginSignup/>}/>
   </Routes>
   <Footer/>
   </BrowserRouter>
   
   </>
  );
}

export default App;
