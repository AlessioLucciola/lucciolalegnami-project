import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/layout';
import { Homepage, Products, NoPage } from './pages';

import './dist/css/bootstrap.css';
import './App.scss';

const App = () => {
    return (
        <div className="app">
            <BrowserRouter forceRefresh={true}>
                <Routes>
                    <Route path='/' element={<Layout />} >
                        <Route index element={<Homepage />} />
                        <Route path='prodotti' element={<Products />} />
                        <Route path='*' element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>

        
    )
}

export default App