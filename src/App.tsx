import React, { LegacyRef } from 'react';
import {useContext} from "react"
 import logo from "./Assets/Group 15.png"
import './App.css';
import Sidebar from './Side';
import {ThemeContext} from "./ThemeContext"
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import {calculate_boardsNo,retrieve_current_board,retrieve_initial_boards,BoardDel,afterDeletion} from "./store/actionCreator"
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react';
import { retrieveAllBoards,deleteBoard } from './TrelloApis';
import { useRef } from 'react';
import Modal from './Modal';
import { FontawesomeObject } from '@fortawesome/fontawesome-svg-core';



const App:React.FC =()=>{

  const dispatch=useDispatch()
  const boards=useSelector((store:any)=>store.kanBanReducer.all_boards)
  const board_no=useSelector((store:any)=>store.kanBanReducer.board_no)
  const retrieved_board=useSelector((store:any)=>store.kanBanReducer.current_board_data)
  const [firstmodalState,setModal]=React.useState<boolean>(false)
  const [secondModalState,setSecondModal]=React.useState<boolean>(false)
  const [thirdModalState,setThirdModal]=React.useState<boolean>(false)
  const [fourthModalState,setFourthModal]=React.useState<boolean>(false)
  const [randomState,randomToggler]=React.useState<boolean>(false)
  


  const toggleFirstModal=()=>{

    setModal((prevModal)=>prevModal=!prevModal)
  }
  const toggleSecondModal=()=>{

    setSecondModal((prevModal)=>prevModal=!prevModal)
  }
  const toggleThirdModal=()=>{

    setThirdModal((prevModal)=>prevModal=!prevModal)
  }
  
  const toggleFourthModal=()=>{
    setFourthModal((prevModal)=>prevModal=!prevModal)
  }
  const doSomething=()=>{
    randomToggler((prevState)=>prevState=!prevState)
  }


  const taskBtnRef=useRef<HTMLButtonElement>(null)



  var btn_elem=taskBtnRef.current

  if(btn_elem!=null && Object.keys(retrieved_board).length<3){
    btn_elem.disabled=true
    btn_elem.style.backgroundColor="#d8d7f1"
  }
  else if(btn_elem!=null && Object.keys(retrieved_board).length>0){
    btn_elem.disabled=false
    btn_elem.style.backgroundColor="#635fc7"
  }


  const Theme:boolean=useContext(ThemeContext)
  const MainTheme:{backgroundColor:string,color:string}={
    backgroundColor: Theme? '#f4f7fd':'#20212c',
    color: Theme? 'black':'white'
  }
  const secondaryTheme={
    backgroundColor:Theme? 'white':'#2b2c37'
  }

  useEffect(()=>{
    const GetAllBoards= async ()=>{
      try {
          const newBoards = await retrieveAllBoards();
          
          dispatch(retrieve_initial_boards(newBoards))
        
          
        } catch (error:any) {
          console.log( error.message);
        }
  }
  GetAllBoards()
  },[])

  useEffect(()=>{
    dispatch(calculate_boardsNo(boards))
  },[boards])


  
    

// the getallboards here was part of the body of the function, therefore the getallboards was not defined
// insidee the body of the useeffect, it was only declared, THis entails that one needs to call any function
// inside the useeffect hook in order to execute it. the getallboards async function body was declared and defined
// when it was outside the useeffect hook because async functions need to be executed in order to resolve their
// promises
  
 




  console.log(board_no)
  




 



  return (
    <div className="App" style={MainTheme}>
      
      
      <header className="App-header w-100 bg-white">
        <div className='d-flex main-div '>
          <div className='d-flex logo_div  p-4' style={secondaryTheme}>
            <img  src={logo} alt='Page logo' className='mx-2'/>
            <div className='extraBoldFont '>
              Kanban
            </div>
            {/* The sidebar is not fully responsive down to the size of a mobile screen because I need to 
            fill up the empty space left at the end of any element that lives inside the sidebar in order
            to align with the logo div on screen resize */}
          </div>
          <div className='d-flex p-2 justify-content-between board_bar align-items-center px-3' style={secondaryTheme}>
        
              <div className='boldFont large_font'>
              {retrieved_board.name?retrieved_board.name:""}
              {console.log(retrieved_board)}
              </div>
              <div>
                  <button className='logo_button_style boldFont font_small text-white' ref={taskBtnRef} onClick={(e)=>{
                    toggleFirstModal()
                  }}>
                  <FontAwesomeIcon icon={faPlus} className="text-white small_plus" />
                  Add New Task
                  </button>
                  <FontAwesomeIcon icon={faEllipsisVertical}  className='text-secondary elipsis  mx-2 px-2' onClick={(e)=>{
                   debugger;
                    if(Object.keys(retrieved_board).length<3){
                      return null
                    }
                    else{
                      toggleThirdModal()
                    }
                  }}/>
              </div>
                  {thirdModalState? 
                  <div className='boardSettings d-flex flex-column align-items-start'>
                    <div className='settingsElement'>Edit Board</div>
                    <div className='text-danger settingsElement' onClick={toggleFourthModal}>Delete Board</div>
                    
                  </div>:
                  <div className='d-none'></div>}

                      {fourthModalState?
                      <div className='modal_overlay' >
                      <div className='d-flex flex-column deleteModal align-items-start  '>
                      <div className='text-danger boldFont font_medium mb-2'>
                        Delete this board?
                      </div>
                      <p className='text-secondary font_small small_paragraph pb-2 pt-2' >Are you sure you want to delete the '{retrieved_board.name}' board? This
                      action will remove all columnns and tasks and cannot be reversed.</p>
                      <div className='d-flex mb-1'>
                        <button className='deleteBtn mediumFont font_small' onClick={()=>{
                          toggleFourthModal()
                          const DeleteThisBoard=async ()=>{
                            try{
                              debugger;
                              const deletion=await deleteBoard(retrieved_board.id)
                              const newerBoards=await retrieveAllBoards()
                              dispatch(retrieve_initial_boards(newerBoards))
                              dispatch(afterDeletion(newerBoards))
                              doSomething()
                              console.log("boardsgettingdeleted")
                            }
                            catch(error)
                            {
                              throw error
                            }
                    
                          }
                          DeleteThisBoard()
                        }}>
                        Delete
                        </button>
                        <button className='cancelButton mediumFont font_small' onClick={toggleFourthModal}>
                        Cancel
                        </button>
                      </div>
                      </div>
                    </div>:
                    <div className='d-none'></div>
                    }
                    
            
           <Modal isOpen={firstmodalState} onClose={toggleFirstModal}>
            <h2>Hi this is the first iteration</h2>
           </Modal>
          </div>
        </div>
      </header>
      <div className='content_container d-flex w-100'>
      <Sidebar/>
      <div className='d-flex content flex-column'>
        <div>I can just continue on with my life</div>
        <div>this is too easy</div>
  
      </div>

      </div>
     
      
    </div>
  );
}

export default App;


{/* I'll need this modal later*/}
{/* <Modal isOpen={secondModalState} onClose={toggleSecondModal}>
<div>say hello to my little friend</div>
</Modal> */}