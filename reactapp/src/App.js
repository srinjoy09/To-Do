import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Pages/login';
import SignUp from './Pages/signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from "react";
import Home from './Pages/home';
import LandingPage from "./Pages/landingpage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Components/navbar";
import Contact from "./Pages/contact";
import isAuthenticated from "./Helper/isAuthenticated";
// import Footer from "./Components/footer";
class App extends Component {
    const
    loggedin=isAuthenticated();
    render() {
        return (
            <Router>
                <Navbar isAuth={this.loggedin}></Navbar>
                <Routes>
                    <Route exact path="/" element={<LandingPage/>}></Route>
                    <Route exact path="/login" element={<Login/>}></Route>
                    <Route exact path="/signup" element={<SignUp/>}></Route>
                    <Route exact path="/home" element={<Home/>}></Route>
                    <Route exact path="/contact" element={<Contact/>}></Route>
                </Routes>
            </Router>
        );
    }
}

export default App;