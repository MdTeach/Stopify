import React from "react";
import {BrowserRouter} from 'react-router-dom';

import LandingPage from "./components/landing_page/landing_page"

const  App = ()=>{
  return (
    <BrowserRouter>
      <LandingPage/>
    </BrowserRouter>
  );

}

export default App;
