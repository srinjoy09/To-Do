import React from "react";
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./navbarelements";
import Home from "../Pages/home";

const Navbar = props => {
    if(props.isAuth===true){
    return (
        <>
            <Nav>
                <NavLogo to="/">
                    To-Do
                </NavLogo>
                <Bars />

                <NavMenu>
                    <NavLink
                        to="/home"
                        activeStyle={{ color:'white' }}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/contact"
                        activeStyle={{ color: 'white' }}
                    >
                        Contact
                    </NavLink>
                    <NavBtn onClick={()=>Home.logout()}>
                        <NavBtnLink to="/login">Logout</NavBtnLink>
                    </NavBtn>
                </NavMenu>
            </Nav>
        </>
    );
}
else{
        return (
            <>
                <Nav>
                    <NavLogo to="/">
                        To-Do
                    </NavLogo>
                    <Bars />

                    <NavMenu>
                        <NavLink
                            to="/"
                            activeStyle={{ color:'white' }}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/contact"
                            activeStyle={{ color: 'white' }}
                        >
                            Contact
                        </NavLink>
                        <NavBtn>
                            <NavBtnLink to="/login">Log In</NavBtnLink>
                        </NavBtn>
                        <NavBtn>
                            <NavBtnLink to="/signup">Sign Up</NavBtnLink>
                        </NavBtn>
                    </NavMenu>
                </Nav>
            </>
        );
    }
};
export default Navbar;