import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/layout';
import { Homepage, Products, Product, Contacts, Quote, WoodDescription, NoPage } from './pages';

import './dist/css/bootstrap.css';
import './App.scss';

const App = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />} >
                        <Route index element={<Homepage />} />
                        <Route path='prodotti' element={<Products />} />
                        <Route path='prodotti/:productname' element={<Product />} />
                        <Route path='legnoutilizzato' element={<WoodDescription />} />
                        <Route path='contatti' element={<Contacts />} />
                        <Route path='preventivo' element={<Quote />} />
                        <Route path='*' element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>

        
    )
}

export default App