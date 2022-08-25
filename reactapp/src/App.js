import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Pages/login';
import SignUp from './Pages/signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from "react";
import Home from './Pages/home';

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<Login/>}></Route>
                    <Route exact path="/login" element={<Login/>}></Route>
                    <Route exact path="/signup" element={<SignUp/>}></Route>
                    <Route exact path="/home" element={<Home/>}></Route>
                </Routes>
            </Router>
        );
    }
}

export default App;