import React, { Component } from 'react';
//import Logo from '../Components/logo';
import '../css/signin.css';
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import { Link } from 'react-router-dom';
import {ReactNotifications} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {Notification} from '../Components/Notification';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Loader from '../Components/loader';



class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            email:"",
            password:""
        }
    }
    onSubmitForm=(e)=>{
        e.preventDefault();
        if(this.state.email.trim()===""||this.state.password.trim()===""){
            Notification({
                title:'Error',
                message:'Please fill all the fields',
                type:'danger'
            })
        }
        else{
            this.setState({...this.state,loading:true});
            let formData = new FormData();
            formData.append('email', this.state.email);
            formData.append('password', this.state.password);
            axios({
                method:'POST',
                url:'http://localhost:8080/user/login',
                /*headers:{
                    'content-type':'application/json',
                    'accept':'application/json',
                    'Access-Control-Allow-Origin': '*',
                },*/
                data: formData
            })
                .then(res=>{
                    this.setState({...this.state,loading:false});
                    const cookies = new Cookies();
                    if(res.data.access_token !== ""){
                        cookies.set('access_token', res.data.access_token, { path: '/' });
                        cookies.set('id', res.data.user.id, { path: '/' });
                        cookies.set('userName', res.data.user.userName, { path: '/' });
                        cookies.set('email', res.data.user.email, { path: '/' });
                        cookies.set('role', res.data.user.userRole, { path: '/' });
                        Notification({
                            title:'Successful',
                            message:'Logged in!',
                            type:'success'
                        })
                        if(res.data.user.userRole==="CUSTOMER") window.location="/home"
                        else window.location="/admin/users"
                    }
                    else{
                        Notification({
                            title:'Error',
                            message:'Error!',
                            type:'danger'
                        })
                    }
                })
                .catch(err=> {
                    this.setState({...this.state,loading:false});
                    Notification({
                        title:'Error',
                        message:"Failed To Sign In!",
                        type:'danger'
                    })});
        }
    }

    render() {
        return (
            <>
                {
                    this.state.loading===true&&
                    <Loader/>
                }
                {
                    this.state.loading===false&&
                    <div className="py-5" style={{backgroundImage:'linear-gradient(to bottom right, #CDEFFE, #EAF6FE)'}}>
                        <ReactNotifications isMobile='true' breakpoint='700px'/>
                        <div className="container d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
                            <div className="bg-white p-5" style={{height:'fitContent',borderRadius:"40px"}}>
                                <div className="mt-5">
                                    <h1 className="login-title">Log in to your account</h1>
                                    <p className="mt-3 text-muted mplus" style={{maxWidth:'400px'}}>Log in now to access all your tasks.</p>
                                </div>
                                <form className="mt-4" onSubmit={this.onSubmitForm}>
                                    <div className="form-group">
                                        <label className="control-label mplus text-muted mb-2" style={{fontSize:'13px'}}>
                                            Email
                                        </label>
                                        <div>
                                            < FaUserCircle className="position-absolute mt-3 ms-3 text-muted" style={{fontSize:'26px'}}/>
                                            <input type="email" value={this.state.email} onChange={(e)=>this.setState({...this.state,email:e.target.value})} className="form-control ps-5 py-3 shadow-none" name="username" placeholder="Enter Email" />
                                        </div>
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className="control-label mplus text-muted mb-2" style={{fontSize:'13px'}}>
                                            Password
                                        </label>
                                        <div>
                                            < AiOutlineLock className="position-absolute mt-3 ms-3 text-muted" style={{fontSize:'26px'}}/>
                                            <input type="password" value={this.state.password} onChange={(e)=>this.setState({...this.state,password:e.target.value})} className="form-control ps-5 py-3  shadow-none" name="password" placeholder="Enter password" />
                                        </div>
                                    </div>
                                    <div className="mt-3 ">
                                        <Link to="/signup" style={{textDecoration:'none',fontSize:'12px'}}>Create a new account</Link>
                                        <Link to="/" className="float-end mt-1" style={{textDecoration:'none',fontSize:'12px'}}>Forgot password?</Link>
                                    </div>
                                    <button type="submit" className="btn py-3 w-100 mt-4 text-white" style={{background:'#188AFA'}}>Sign In</button>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }
}

export default Login;