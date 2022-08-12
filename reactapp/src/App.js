import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import isAuthenticated from './Helper/isAuthenticated';
//import Home from './Pages/Home';
import Login from './Pages/login';
import SignUp from './Pages/signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
//import Profile from './Pages/profile';
//import AdminHome from './admin/home';
//import ProtectedRoutes from './Components/ProtectedRoutes';
//import ReactNotification from 'react-notifications-component';

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    exact path="/"
                    render={() => {
                        return (
                            !isAuthenticated() ?
                                <Navigate to="/home" replace={true} /> :
                                <Navigate to="/login" replace={true} />
                        )
                    }}
                />
                <Route exact path="/login" element={<Login />}></Route>
                <Route exact path="/signup" element={<SignUp />}></Route>
            </Routes>
        </Router>
    );
}

export default App;