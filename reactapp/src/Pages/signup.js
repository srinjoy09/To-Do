import React, { Component } from 'react';
//import Logo from '../Components/logo';
import '../css/signup.css';
/*import { FaUserCircle } from "react-icons/fa";
import {HiOutlineMail} from "react-icons/hi";
import { AiOutlineLock } from "react-icons/ai";*/
import { Link } from 'react-router-dom';
import {ReactNotifications} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {Notification} from '../Components/Notification';
import axios from 'axios';
import Loader from '../Components/loader';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            userName:"",
            email:"",
            password:"",
            confirmPassword:""
        }
    }

    onsubmitForm=(e)=>{
        e.preventDefault();
        if(this.state.email.trim()===""||this.state.password.trim()===""||this.state.userName.trim()===""){
            Notification({
                title:'Error',
                message:'Please fill all the fields',
                type:'danger'
            })
        }
        else if(!(this.state.password===this.state.confirmPassword)){
            Notification({
                title:'Error',
                message:'Match the passwords correctly',
                type:'danger'
            })
        }
        else{
            this.setState({...this.state,loading:true});
            axios({
                method:'POST',
                url:'http://localhost:5000/user/signup',
                headers:{
                    'content-type':'application/json',
                    'accept':'*/*'
                },
                data:{
                    "userName":this.state.userName,
                    "email":this.state.email,
                    "password":this.state.password
                }
            })
                .then(res=>{
                    this.setState({...this.state,loading:false});

                    res.data.accessToken!==""?
                        Notification({
                            title:'Successful',
                            message:"Registered Successfully",
                            type:'success'
                        }):
                        Notification({
                            title:'Error',
                            message:res.data,
                            type:'danger'
                        })
                })
                .catch(err=>
                {
                    this.setState({...this.state,loading:false});
                    console.log(err);
                    Notification({
                        title:'Error',
                        message:err.response.data,
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
                        <div className="container d-flex justify-content-center" style={{height:'100vh'}}>
                            <div className="bg-white p-5" style={{height:'fitContent',borderRadius:"40px"}}>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <div className="mt-3 mb-5 text-center">
                                    <h1 className="login-title">Create a new account</h1>
                                </div>
                                <form className="mt-4" onSubmit={this.onsubmitForm}>
                                    <div className="row mx-0 px-0">
                                        <div className="col-6 pe-1 ps-0">
                                            <div className="form-group">
                                                <label className="control-label mplus text-muted mb-2" style={{fontSize:'13px'}} >
                                                    UserName
                                                </label>
                                                <div>
                                                    {/*< FaUserCircle className="position-absolute mt-3 ms-3 text-muted" style={{fontSize:'26px'}}/>*/}
                                                    <input type="text" value={this.state.userName} onChange={(e)=>this.setState({...this.state,userName:e.target.value})} className="form-control ps-5 py-3 shadow-none" placeholder="Enter username" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mx-0 px-0 mt-4">
                                        <div className="col-6 pe-1 ps-0">
                                            <div className="form-group">
                                                <label className="control-label mplus text-muted mb-2" style={{fontSize:'13px'}} >
                                                    Email
                                                </label>
                                                <div>
                                                    {/*< HiOutlineMail className="position-absolute mt-3 ms-3 text-muted" style={{fontSize:'26px'}}/>*/}
                                                    <input type="email" value={this.state.email} onChange={(e)=>this.setState({...this.state,email:e.target.value})} className="form-control ps-5 py-3 shadow-none" placeholder="Enter email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mx-0 px-0 mt-4">
                                        <label className="control-label mplus text-muted mb-2" style={{fontSize:'13px'}} >
                                            Password
                                        </label>
                                        <div>
                                            {/*< AiOutlineLock className="position-absolute mt-3 ms-3 text-muted" style={{fontSize:'26px'}}/>*/}
                                            <input type="password" value={this.state.password} onChange={(e)=>this.setState({...this.state,password:e.target.value})} className="form-control ps-5 py-3 shadow-none" placeholder="Enter your password" />
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row mx-0 px-0 mt-4">
                                        <label className="control-label mplus text-muted mb-2" style={{fontSize:'13px'}} >
                                            Confirm Password
                                        </label>
                                        <div>
                                            {/*< AiOutlineLock className="position-absolute mt-3 ms-3 text-muted" style={{fontSize:'26px'}}/>*/}
                                            <input type="password" value={this.state.confirmPassword} onChange={(e)=>this.setState({...this.state,confirmPassword:e.target.value})} className="form-control ps-5 py-3 shadow-none" placeholder="Enter your password" />
                                        </div>
                                    </div>
                                    <br/>
                                    <br/>
                                    <div className="mt-3 ">
                                        <Link to="/login" style={{textDecoration:'none',fontSize:'12px'}}>Already having account?</Link>
                                    </div>
                                    <button type="submit" className="btn py-3 w-100 mt-4 text-white" style={{background:'#188AFA'}}>Sign Up</button>
                                </form>
                            </div>
                        </div>
                    </div>
                }

            </>
        );
    }
}

export default SignUp;