import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/layout';
import { Homepage, Products, Product, Contacts, Quote, WoodDescription, NoPage } from './pages';

import './dist/css/bootstrap.css';
import './App.scss';

const App = () => {
    return (
        <>
            <div className="app">
                <BrowserRouter basename='/'>
                    <Routes>
                        <Route path='/' element={<Layout />} exact>
                            <Route index element={<Homepage />} />
                            <Route path='prodotti'>
                                <Route index={true} element={<Products />} />
                                <Route index={false} path=':productname' element={<Product />} />
                            </Route>
                            <Route path='legnoutilizzato' element={<WoodDescription />} />
                            <Route path='contatti' element={<Contacts />} />
                            <Route path='preventivo' element={<Quote />} />
                            <Route path='*' element={<NoPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App