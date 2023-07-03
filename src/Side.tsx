import React,{Dispatch} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons"


const Sidebar:React.FC=()=>{
    const [state,setState]=React.useState<boolean>(false)
    const toggle_self=()=> setState((prevstate)=>prevstate=!prevstate)



    return(<>
    {state ?
    <div className="sidebar_container p-4 ">
    say hello
    </div>: 
      <FontAwesomeIcon icon={faEye} className="eye_toggler" onClick={()=>{
        toggle_self()
      }}/> }
    
      
    </>)
}




export default Sidebar