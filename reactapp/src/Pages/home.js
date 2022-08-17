import React, { Component } from 'react';
//import Logo from '../Components/logo';
import {FaUserEdit ,FaUserPlus} from 'react-icons/fa'
import {HiUserRemove} from 'react-icons/hi';
import ModalComponent from '../Components/modal';
import Loader from '../Components/loader';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {ReactNotifications} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {Notification} from '../Components/Notification'
import {Link} from "react-router-dom";

class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            Loading:true,
            showModal:false,
            selectedTask:{},
            selectedType:'',
            heading:'',
            tasks:[]
        }
    }

    SetModal=(task,selected,title)=>{
        //let splitString=user.username.split(" ");
        let taskData={
            id:task.id,
            name:task.name,
            description:task.description,
            status:task.status,
            timeAdded:task.timeAdded
        }
        this.setState({...this.state,showModal:!this.state.showModal,selectedTask:taskData,selectedType:selected,heading:title})
    }
    closeModal=()=>{
        this.setState({...this.state,showModal:!this.state.showModal,selectedUser:{},selectedType:'',heading:''})
    }

    logout = () => {
        const cookie=new Cookies();
        cookie.set('access_token'," ", { path: '/' });
    };

    //////////GetUsers/////////////////////
    GetTask=()=>{
        const cookie=new Cookies();
        axios({
            method:'GET',
            url:'http://localhost:8080/user/allTasks',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                //'Access-Control-Allow-Origin': '*',
                'Authorization':`Bearer ${cookie.get('access_token')}`
            }
        })
            .then(res=>{

                if(res.status===200){
                    this.setState({
                        ...this.state,
                        tasks:res.data,
                        Loading:false
                    })
                }
                else{
                    window.location="/login"
                }
            })
            .catch(err=>window.location="/login")
    }


    //////////AddUsers///////////

    AddTasks=(taskData)=>{
        const cookie=new Cookies();
        let SendData={
            name:taskData.name,
            status:taskData.status,
            description:taskData.description
        }
        this.setState({...this.state,Loading:true})
        axios({
            method:'POST',
            url:'http://localhost:8080/user/addTask',
            headers:{
                "Content-Type": "application/json",
                'Accept': "application/json",
                //'Access-Control-Allow-Origin': '*',
                'Authorization':`Bearer ${cookie.get('access_token')}`
            },
            data:SendData
        })
            .then(res=>{
                this.setState({
                    ...this.state,
                    Loading:false,
                    showModal:false
                })
                this.GetTask()
                res.status===200?
                    Notification({
                        title:'Successful',
                        message:'Task Added',
                        type:'success'
                    }):
                    Notification({
                        title:'Error',
                        message:res.data,
                        type:'danger'
                    })

            })
            .catch(err=>Notification({
                title:'Error',
                message:"Failed To Add",
                type:'danger'
            }))
    }

    ////Edit User//////

     EditTask=(taskData)=>{
         const cookie=new Cookies();
         let SendData={
             name:taskData.name,
             status:taskData.status,
             description:taskData.description
         }
         this.setState({...this.state,Loading:true})
         axios({
             method:'PUT',
             url:`http://localhost:8080/user/task/${this.state.selectedTask.id}/update`,
             headers:{
                 "Content-Type": "application/json",
                 'Accept': "application/json",
                 //'Access-Control-Allow-Origin': '*',
                 'Authorization':`Bearer ${cookie.get('access_token')}`
             },
             data:SendData
         })
             .then(res=>{
                 this.setState({
                     ...this.state,
                     Loading:false,
                     showModal:false
                 })
                 this.GetTask()
                 res.status===200?
                     Notification({
                         title:'Successful',
                         message:"Updated Successfully!",
                         type:'success'
                     }):
                     Notification({
                         title:'Error',
                         message:res.data,
                         type:'danger'
                     })

             })
             .catch(err=>{
                 Notification({
                     title:'Error',
                     message:"Failed To Update",
                     type:'danger'
                 })
             })
     }

    ///Delete User/////

    DeleteUser=(id)=>{
        const cookie=new Cookies();
        this.setState({...this.state,Loading:true})
        axios({
            method:'DELETE',
            url:`http://localhost:8080/user/task/${id}/delete`,
            headers:{
                "Content-Type": "application/json",
                'Accept': "application/json",
                //'Access-Control-Allow-Origin': '*',
                'Authorization':`Bearer ${cookie.get('access_token')}`
            }
        })
            .then(res=>{
                this.setState({
                    ...this.state,
                    Loading:false,
                })
                this.GetTask()
                res.status===200?
                    Notification({
                        title:'Successful',
                        message:res.data,
                        type:'success'
                    }):
                    Notification({
                        title:'Error',
                        message:res.data,
                        type:'danger'
                    })

            })
            .catch(err=>{
                Notification({
                    title:'Error',
                    message:"Failed To Delete",
                    type:'danger'
                })
            })
    }


    componentDidMount(){
        this.GetTask();
    }

    render(){
        return(

            <>
                {
                    this.state.Loading===true?
                        <Loader/>:
                        <>

                            <ModalComponent AddTasks={this.AddTasks} EditTask={this.EditTask} Data={this.state.selectedTask} selected={this.state.selectedType} heading={this.state.heading} closeModal={this.closeModal} showModal={this.state.showModal} setModal={this.SetModal}/>

                            <ReactNotifications isMobile='true' breakpoint='700px'/>
                            <div className='container-fluid mt-4'>
                                <div className='d-flex row'>
                                    <div className='col-3 text-center'>
                                        <button type="button" onClick={()=>this.SetModal({
                                            name:'',
                                            description:'',
                                            status:''
                                        },'add','Add Task')} className="btn btn-outline-primary">Add Task</button>
                                    </div>
                                    <div className='container'>
                                        <div style={{background:'#F3F3F3'}} className='mt-3 rounded'>
                                            <table class="table">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Task Name</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Time Added</th>
                                                    <th scope="col">Edit</th>
                                                    <th scope="col">Delete</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.tasks.map(task=>
                                                        <tr key={task.id}>
                                                            <th scope="row">{task.name}</th>
                                                            <td>{task.description}</td>
                                                            <td>{task.status}</td>
                                                            <td>{task.timeAdded}</td>

                                                            <td><FaUserEdit onClick={()=>this.SetModal(task,'edit','Edit Task')} style={{cursor:'pointer'}}/></td>

                                                            <td><HiUserRemove onClick={()=>this.DeleteUser(task.id)} style={{cursor:'pointer'}}/></td>
                                                        </tr>
                                                    )
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="mt-3 ">
                                            {/*<button onClick={()=>this.logout()} style={{cursor:'pointer'}} href="/login">Log Out</button>*/}
                                            <button style={{cursor:'pointer'}}>
                                            <Link to="/login" style={{textDecoration:'none',fontSize:'12px'}} onClick={()=>this.logout()}>Log Out</Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </>
        )
    }
}

export default Home;