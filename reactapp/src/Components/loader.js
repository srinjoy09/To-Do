import '../css/loader.css'
import React from "react";
const Loader=()=>{
    return(
        <div className="spinner-container">
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
        </div>
    )
}


export default Loader;