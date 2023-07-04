import React,{Dispatch} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEyeSlash,faPlus } from "@fortawesome/free-solid-svg-icons"
import {createBoard} from "./TrelloApis"

const Sidebar:React.FC=()=>{
    const [state,setState]=React.useState<boolean>(false)
    const toggle_self=()=> setState((prevstate)=>prevstate=!prevstate)
    const trial= async ()=>{
        try {
            const newBoard = await createBoard();
            console.log('Created board:',newBoard);
          } catch (error:any) {
            console.log( error.message);
          }

    }

    



    return(<>
    {state ?
    <div className="sidebar_container p-4 ">
        <div className="d-flex flex-column justify-content-between h-100 pb-3 pt-1">
       <div className="d-flex flex-column">
       <div className="d-flex w-100 justify-content-start align-items-baseline marginal_left">
       <div className="mediumFont text-secondary inner_space ">
            All Boards
            </div>
            <div className="text-secondary font_small">( {0} )</div>
             </div>
             <div className="d-flex align-items-center modal_trigger">
             <svg  viewBox="0 0 24 24" className="boardSplit" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6.25C3 4.45507 4.45507 3 6.25 3H17.75C19.5449 3 21 4.45507 21 6.25V17.75C21 19.5449 19.5449 21 17.75 21H6.25C4.45507 21 3 19.5449 3 17.75V6.25ZM4.5 12.5V17.75C4.5 18.7165 5.2835 19.5 6.25 19.5H14V12.5L4.5 12.5ZM14 11V4.5H6.25C5.2835 4.5 4.5 5.2835 4.5 6.25V11L14 11ZM19.5 9.5H15.5V14.5H19.5V9.5ZM19.5 16H15.5V19.5H17.75C18.7165 19.5 19.5 18.7165 19.5 17.75V16ZM19.5 8V6.25C19.5 5.2835 18.7165 4.5 17.75 4.5H15.5V8L19.5 8Z"/>
            </svg>
            <FontAwesomeIcon icon={faPlus} className="plus_dims" />
            <div className=" boldFont font_small" onClick={()=>{
                trial()
            }}>Create New Board</div>
            </div>
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