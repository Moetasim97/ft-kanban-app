import React,{Dispatch} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons"


const Sidebar:React.FC=()=>{
    const [state,setState]=React.useState<boolean>(false)
    const toggle_self=()=> setState((prevstate)=>prevstate=!prevstate)



    return(<>
    {state ?
    <div className="sidebar_container p-4 ">
        <div className="d-flex flex-column justify-content-between h-100 pb-3 pt-1">
       <div className="d-flex w-100 justify-content-start align-items-baseline marginal_left">
       <div className="mediumFont text-secondary inner_space ">
            All Boards
            </div>
            <div className="text-secondary font_small">( {3} )</div>
             </div>
            <div className="d-flex w-100 justify-content-start marginal_left align-items-center">
         
            <FontAwesomeIcon icon={faEyeSlash} className="furys_eye mx-2" onClick={()=>{
                toggle_self()
            }}/>
            <div className="boldFont font_small text-secondary ">Hide Sidebar</div>
            </div>
    </div>
    </div>
    : 
      <FontAwesomeIcon icon={faEye} className="eye_toggler" onClick={()=>{
        toggle_self()
      }}/> }
    
      
    </>)
}




export default Sidebar