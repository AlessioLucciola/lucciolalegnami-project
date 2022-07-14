import React from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar, TopButton, ImageSlider } from '../components';
import { Footer } from '../containers';

function layout() {
  return (
    <>
        <Navbar />
        <ImageSlider />
        <Outlet />
        <TopButton />
        <Footer />
    </>
  )
}

export default layout