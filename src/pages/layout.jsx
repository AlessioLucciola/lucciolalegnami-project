import React from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar, News, TopButton } from '../components';
import { Footer } from '../containers';

function layout() {
  return (
    <>
        <Navbar />
        <Outlet />
        <TopButton />
        <News />
        <Footer />
    </>
  )
}

export default layout