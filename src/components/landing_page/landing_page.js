import React from 'react'
import Navigation from "./navigation.js";
import Body from "./body";
import Footer from "./footer";
import NavBar from "./nav_bar";

const App = ()=>{  
    return (
        <React.Fragment >
        <NavBar />
        <Body />
        <Footer />
        </React.Fragment>
    );
}

export default App;
