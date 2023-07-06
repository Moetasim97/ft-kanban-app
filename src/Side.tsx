import React,{Dispatch, SetStateAction, useEffect, useRef, useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEyeSlash,faPlus,faTimes } from "@fortawesome/free-solid-svg-icons"
import {retrieveAllBoards} from "./TrelloApis"
import { retrieve_boardNames,retrieve_current_board,addBoard, retrieve_initial_boards} from './store/actionCreator';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { AnotherContext } from "./ThemeContext";
import { ThemeContext } from "./ThemeContext";
import { useContext } from "react";
import Modal from "./Modal";
import { createBoard,createList } from "./TrelloApis";
import {useForm,SubmitHandler} from "react-hook-form"


type FormValues={
  fieldName:string
  
  
}
const Sidebar:React.FC=()=>{
  const {register,handleSubmit,formState:{errors}}=useForm<FormValues>()
  
  //Defining the submithandler that will retrieve the data of the boardcreator input field
  const onSubmit:SubmitHandler<FormValues>=(data)=>{
    const text=data.fieldName
  
   
    const BoardCreate=async()=>{
      try{
        const board= await createBoard(text)
        const newerBoards=await retrieveAllBoards()
        dispatch(retrieve_initial_boards(newerBoards))
      }
      catch(error){
        throw error
      }
    }
    BoardCreate()
    
  }
    const themeSetter:Dispatch<SetStateAction<boolean>>=useContext(AnotherContext)
    const Theme:boolean=useContext(ThemeContext)
    const primaryTheme={
        backgroundColor:Theme? 'white':'#2b2c37'
    }
    const secondaryTheme={
       backgroundColor:Theme ? '#f4f7fd':'#20212c'
     }
    const inputTheme={
      backgroundColor:Theme? 'white':'#20212c'
    }
     const buttonTheme={
      backgroundColor:Theme? '#d8d7f1':'white'
     }
    const [state,setState]=React.useState<boolean>(false)
    const toggle_self=()=> setState((prevstate)=>prevstate=!prevstate)
    const dispatch=useDispatch()

    const board_no=useSelector((store:any)=>store.kanBanReducer.board_no)
    const names_of_boards=useSelector((store:any)=>store.kanBanReducer.boards_names)
    const allBoards=useSelector((store:any)=>store.kanBanReducer.all_boards)
    const [boardModal,setBoardModal]=React.useState<boolean>(false)
    const inputRef=useRef<HTMLInputElement>(null)
    const [genericArray,incrementArray]=React.useState<null[]>([])
    const boardCreator=useRef<HTMLButtonElement>(null)
    
    const toggleBoardModal=()=>{
     
      setBoardModal((prevModal)=>prevModal=!prevModal)
    }


    useEffect(()=>{
      dispatch(retrieve_boardNames(allBoards))
    },[allBoards])



    

    

    



    return(<>
    {state ?
    <div className="sidebar_container  " style={primaryTheme}>
        <div className="d-flex flex-column justify-content-between h-100 pb-3 pt-1">
       <div className="d-flex flex-column">
       <div className="d-flex w-100 justify-content-start align-items-baseline padding_left">
       <div className="mediumFont text-secondary inner_space mb-3 ">
            All Boards
            </div>
           
            <div className="text-secondary font_small">( {board_no} )</div>
             </div>
             {names_of_boards? names_of_boards.map((nam:string)=>{
              return(
                <div className="d-flex boardTitle_container align-items-center padding_left" onClick={(e)=>{
                 const targ=e.target as HTMLDivElement
                 const targText=targ.textContent;
                
                  dispatch(retrieve_current_board(targText,allBoards))
                }}>
                      <svg  viewBox="0 0 24 24" className="boardSplit" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6.25C3 4.45507 4.45507 3 6.25 3H17.75C19.5449 3 21 4.45507 21 6.25V17.75C21 19.5449 19.5449 21 17.75 21H6.25C4.45507 21 3 19.5449 3 17.75V6.25ZM4.5 12.5V17.75C4.5 18.7165 5.2835 19.5 6.25 19.5H14V12.5L4.5 12.5ZM14 11V4.5H6.25C5.2835 4.5 4.5 5.2835 4.5 6.25V11L14 11ZM19.5 9.5H15.5V14.5H19.5V9.5ZM19.5 16H15.5V19.5H17.75C18.7165 19.5 19.5 18.7165 19.5 17.75V16ZM19.5 8V6.25C19.5 5.2835 18.7165 4.5 17.75 4.5H15.5V8L19.5 8Z"/>
                      </svg>
                      <div className="board_title font_small boldFont">{nam}</div>
                </div>
          
              )
          
             }):
              <div className="text-secondary">No available boards</div>           
               }
             <div className="d-flex align-items-center modal_trigger padding_left">
             <svg  viewBox="0 0 24 24" className="boardSplit" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6.25C3 4.45507 4.45507 3 6.25 3H17.75C19.5449 3 21 4.45507 21 6.25V17.75C21 19.5449 19.5449 21 17.75 21H6.25C4.45507 21 3 19.5449 3 17.75V6.25ZM4.5 12.5V17.75C4.5 18.7165 5.2835 19.5 6.25 19.5H14V12.5L4.5 12.5ZM14 11V4.5H6.25C5.2835 4.5 4.5 5.2835 4.5 6.25V11L14 11ZM19.5 9.5H15.5V14.5H19.5V9.5ZM19.5 16H15.5V19.5H17.75C18.7165 19.5 19.5 18.7165 19.5 17.75V16ZM19.5 8V6.25C19.5 5.2835 18.7165 4.5 17.75 4.5H15.5V8L19.5 8Z"/>
            </svg>
            <FontAwesomeIcon icon={faPlus} className="plus_dims" />
            <div className=" boldFont font_small" onClick={toggleBoardModal}>Create New Board</div>
            </div>
       </div>
       {/* here is the modal that will add a new board */}
       <Modal isOpen={boardModal} onClose={toggleBoardModal} >
               <div className="d-flex flex-column align-items-start pt-2 pb-2 padding_left">
                <p className="boldFont special_style font_small">Add new board</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="d-flex flex-column align-items-start">
                  <label htmlFor="inputField" className="text-secondary font_small mediumFont mb-1">Name</label>
                  
                <input type="text" id="inputField"  className="custom_input" style={inputTheme} placeholder="e.g. Web Design"   {...register( "fieldName",{required:"A full word is required",minLength:{value:5,message:"Minimum length should be at least 5 characters"}})}/>
                {errors.fieldName?<label htmlFor="inputField" className="errorLabel" >{errors.fieldName.message}</label>:<div className="d-none"></div>}
                <p className="text-secondary mt-4 mediumFont mb-0 font_small">Columns</p>
                {genericArray.length>0?
                 genericArray.map((input)=>{
                  return(
                    <div className="d-flex align-items-baseline">
                      <input type="text" id="columnBoardInput" className="columnInp"  onBlur={(e)=>{
                        const stringPattern=/^[a-zA-Z]+$/
                        const creatorButton=boardCreator.current
                    if(!stringPattern.test(e.target.value)){
               
                     if(creatorButton!=null){
                      creatorButton.disabled=true
                      creatorButton.style.backgroundColor='gray'
                     }
                  
                    }
                    else{
                
                      if(creatorButton!=null){
                        creatorButton.disabled=false
                        creatorButton.style.backgroundColor='#635fc7'
                      }
                  
                    }
                        
                      }}></input>
                      <FontAwesomeIcon icon={faTimes} className="closingTimes" onClick={()=>{
                        var array=[...genericArray]
                        array.pop()
                        incrementArray(array)
                      }}/>
                    </div>)
                }):
                  
                  // 
                <div className="d-none"></div>
                }
                <button className="boardButtons  boldFont font_medium" id="special_treatment" style={buttonTheme} onClick={(e)=>{
                  e.preventDefault()
                  var array=[...genericArray]
                  array.push(null)
                  incrementArray((prevState=>array))
                  console.log(genericArray.length)
                }}>
                <FontAwesomeIcon icon={faPlus} className=" mb-1 plus_dims " />
                Add New Column</button>
                
                  </div>

                  <button className="boardButtons mt-4 boldFont font_medium" ref={boardCreator} onClick={()=>{
              
                   
                    const inputTar=inputRef.current
                    if(inputTar)
                    {
                      console.log(inputTar.value)
                    }
                 
                  }}>
                    Create New Board
                  </button>
               
                 
                </form>
               </div>
            </Modal>
        <div className="d-flex flex-column">
        <div className='d-flex  toggler_container justify-content-center marginal_left' style={secondaryTheme}>
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="gray" className="bi bi-brightness-high mt-1" viewBox="0 0 16 16">
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
            </svg>
      <input type="checkbox" id="checkbox" name="vehicle3"  className="checkbox" onClick={()=>{
        themeSetter(Theme)
      }}/>
        <label htmlFor="checkbox"  className="togglerLabel mx-3">  <div className="ball"></div> </label>
          
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="gray" className="bi bi-moon-fill mt-1" viewBox="0 0 16 16">
        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
        </svg>
      

                        
      </div>
        <div className="d-flex hide_container justify-content-start padding_left align-items-center pt-2 pb-2 " onClick={()=>{
                toggle_self()
            }}>
            <FontAwesomeIcon icon={faEyeSlash} className="furys_eye mx-2" />
            <div className="boldFont font_small text-secondary ">Hide Sidebar</div>
            </div>
          
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