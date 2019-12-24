import React,{useContext} from "react";
import {BrowserRouter} from 'react-router-dom';

import { AuthProvider,AuthContext } from "./auth/Auth";


import LandingPage from "./components/landing_page/landing_page"
import PrivateRoute from "./routes/PrivateRoute"

import Home from "./components/user/home"

const  App = ()=>{
  const currentUser = useContext(AuthContext);
  return (
    <AuthProvider>
      <BrowserRouter>
        
        <PrivateRoute exact path="/" component={Home} />
        <LandingPage/>


        
      </BrowserRouter>
    </AuthProvider>
  );

}

export default App;
