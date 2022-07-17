import React from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar, TopButton} from '../components';
import { Footer } from '../containers';

function layout() {
  return (
    <>
        <Navbar />
        <Outlet />
        <TopButton />
        <Footer />
    </>
  )
}

export default layout