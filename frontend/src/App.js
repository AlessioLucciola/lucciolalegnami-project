import React from 'react';

import { Navbar, TopButton, ImageSlider } from './components';
import { Footer } from './containers';
import './dist/css/bootstrap.css';
import './App.scss';



const App = () => {
    return (
        <div className="app">
            <Navbar />
            <ImageSlider />
            <TopButton />
            <Footer />
        </div>
    )
}

export default App