import React from 'react'

import {Route} from 'react-router';

import Body from "./body";
import Footer from "./footer";
import NavBar from "./nav_bar";

import Login from "./logins/login";
import Register from "./logins/register";

const App = ()=>{  
    return (        
        <React.Fragment >
            <NavBar/>
            <Route exact path="/"><Body/></Route>
            <Route exact path="/contact" render={() => <h1>Contact Page Comming soon..</h1>}/>
            <Route exact path="/help" render={() => <h1>Help Page Comming soon..</h1>}/>
            <Route exact path="/login"><Login/></Route>
            <Route exact path="/register"><Register/></Route>
            <Footer />
        </React.Fragment>

    );
}

export default App;
