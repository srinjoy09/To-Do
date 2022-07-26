import React,{useState,useEffect} from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

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
                        <input type="text" value={taskData.name} onChange={(e)=>setTaskData({...taskData,name:e.target.value})} className="form-control ps-5 py-3 shadow-none" placeholder="Enter Name" required />
                    </div>
                </div>
                <div className="form-group mt-3">
                    <label className="control-label mplus text-muted mb-2" style={{fontSize:'13px'}} >
                        Description
                    </label>
                    <div>
                        <input type="text" value={taskData.description} onChange={(e)=>setTaskData({...taskData,description:e.target.value})} className="form-control ps-5 py-3 shadow-none" placeholder="Enter Description" required/>
                    </div>
                </div>
                <div className="form-group mt-3">
                    <label className="control-label mplus text-muted mb-2" style={{fontSize:'13px'}}>
                        Status
                    </label>
                    <div>

                        {/*<select value={taskData.status} onChange={(e)=>setTaskData({...taskData,status:e.target.value})}>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>*/}
                        <input list="status" value={taskData.status} onChange={(e)=>setTaskData({...taskData,status:e.target.value})}/>
                        <datalist id="status">
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </datalist>
                    </div>
                </div>
                <button type="submit" className="btn py-3 w-100 mt-4 text-white" style={{background:'#188AFA'}}>{props.selected==="edit"?'Update':'Add'}</button>
            </form>
        </Modal>
    )
}

export default ModalComponent;