import React,{useState,useEffect} from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
/*import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import {HiOutlineMail,HiDeviceMobile } from "react-icons/hi";*/
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const ModalComponent=(props)=>{
    const [taskData,setTaskData]=useState({
        name:props.Data.name?props.Data.name:"",
        description:props.Data.description?props.Data.description:"",
        status:props.Data.status?props.Data.status:""
    })
    useEffect(()=>{
        setTaskData({
            name:props.Data.name?props.Data.name:"",
            description:props.Data.description?props.Data.description:"",
            status:props.Data.status?props.Data.status:""
        })
    },[props.Data.name,props.Data.description,props.Data.status])
    return(

        <Modal open={props.showModal} onClose={props.closeModal} center>
            <h2>{props.heading}</h2>
            <form className="mt-4" onSubmit={props.selected==="add"?(e)=>{e.preventDefault();props.AddTasks(taskData)}:(e)=>{e.preventDefault();props.EditTask(taskData)}}>
                <div className="form-group">
                    <label className="control-label mplus text-muted mb-2" style={{fontSize:'13px'}} >
                        Name
                    </label>
                    <div>
                        <input type="text" value={taskData.name} onChange={(e)=>setTaskData({...taskData,name:e.target.value})} className="form-control ps-5 py-3 shadow-none" placeholder="Enter Name" />
                    </div>
                </div>
                <div className="form-group mt-3">
                    <label className="control-label mplus text-muted mb-2" style={{fontSize:'13px'}} >
                        Description
                    </label>
                    <div>
                        <input type="text" value={taskData.description} onChange={(e)=>setTaskData({...taskData,description:e.target.value})} className="form-control ps-5 py-3 shadow-none" placeholder="Enter Description" />
                    </div>
                </div>
                <div className="form-group mt-3">
                    <label className="control-label mplus text-muted mb-2" style={{fontSize:'13px'}}>
                        Status
                    </label>
                    <div>
                        <input type="text" value={taskData.status} onChange={(e)=>setTaskData({...taskData,status:e.target.value})} className="form-control ps-5 py-3 shadow-none" name="username" placeholder="Enter Status" />
                    </div>
                </div>
                {/*<div className="form-group mt-3">
                    <label className="control-label mplus text-muted mb-2" style={{fontSize:'13px'}} >
                        Mobile No.
                    </label>
                    <div>
                        < HiDeviceMobile className="position-absolute mt-3 ms-3 text-muted" style={{fontSize:'26px'}}/>
                        <input type="number" value={userData.mobileNum} onChange={(e)=>setUserData({...userData,mobileNum:e.target.value})} className="form-control ps-5 py-3 shadow-none" placeholder="Enter Mobile no." />
                    </div>
                </div>*/}
                {/*{
                    props.selected==="add"&&
                    <div className="form-group mt-3">
                        <label className="control-label mplus text-muted mb-2" style={{fontSize:'13px'}} >
                            Password
                        </label>
                        <div>
                            < AiOutlineLock className="position-absolute mt-3 ms-3 text-muted" style={{fontSize:'26px'}}/>
                            <input type="password" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})} className="form-control ps-5 py-3 shadow-none" placeholder="Enter Password..." />
                        </div>
                    </div>
                }*/}
                <button type="submit" className="btn py-3 w-100 mt-4 text-white" style={{background:'#188AFA'}}>{props.selected==="edit"?'Update':'Add'}</button>
            </form>
        </Modal>
    )
}

export default ModalComponent;