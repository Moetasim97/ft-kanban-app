import React, { LegacyRef } from 'react';
import {useContext} from "react"
 import logo from "./Assets/Group 15.png"
import './App.css';
import Sidebar from './Side';
import {ThemeContext} from "./ThemeContext"
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import {calculate_boardsNo,retrieve_current_board,retrieve_initial_boards,BoardDel,afterDeletion,getBoardColumns, retrieve_labels} from "./store/actionCreator"
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react';
import { retrieveAllBoards,deleteBoard,retrieveBoardLists,moveList,retrieveAllLabels } from './TrelloApis';
import { useRef } from 'react';
import Modal from './Modal';
import BoardData from './boardData';






const App:React.FC =()=>{

  const dispatch=useDispatch()
  // here I'm defining the selectors that will retrieve the data from my redux store
  const genericLabels=((store:any)=>store.kanBanReducer.genericLabels)
  const boards=useSelector((store:any)=>store.kanBanReducer.all_boards)
  const board_no=useSelector((store:any)=>store.kanBanReducer.board_no)
  const retrieved_board=useSelector((store:any)=>store.kanBanReducer.current_board_data)
  const retrievedBoardCols=useSelector((store:any)=>store.kanBanReducer.currentBoardCols)
  const [firstmodalState,setModal]=React.useState<boolean>(false)
  const [secondModalState,setSecondModal]=React.useState<boolean>(false)
  const [thirdModalState,setThirdModal]=React.useState<boolean>(false)
  const [fourthModalState,setFourthModal]=React.useState<boolean>(false)
  const [randomState,randomToggler]=React.useState<boolean>(false)
  const [fifthModalState,setFifthModal]=React.useState<boolean>(false)
  const editBoardRef=useRef<HTMLInputElement>(null)

 


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

  const toggleFifthModal=()=>{
    setFifthModal((prevModal)=>prevModal=!prevModal)
  }

  const doSomething=()=>{
    randomToggler((prevState)=>prevState=!prevState)
  }

// here I'm handling the feature of the disabled add task button on board columns existing or not
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
  const buttonTheme={
    backgroundColor: Theme? '#d8d7f1':'white'
   }
  const MainTheme:{backgroundColor:string,color:string}={
    backgroundColor: Theme? '#f4f7fd':'#20212c',
    color: Theme? 'black':'white'
  }
  const secondaryTheme:{backgroundColor:string}={
    backgroundColor:Theme? 'white':'#2b2c37'
  }


  // I'm retrieving all of the my data in this useeffect hook, this should work only on the first render.
  useEffect(()=>{
    const GetAllBoards= async ()=>{
      try {
          const newBoards = await retrieveAllBoards();
          if(newBoards.length>1){
           const getLabels= await retrieveAllLabels(newBoards[0].id)
          dispatch(retrieve_labels(getLabels))
          }
           
          dispatch(retrieve_initial_boards(newBoards))
        
          
        } catch (error:any) {
          console.log( error.message);
        }
  }
  GetAllBoards()
  },[])
 


// going to retrieve genericlabels
 
  // This hook is going to calculate the number of boards in order to display the board number selector in
  // the sidebar
  useEffect(()=>{
    dispatch(calculate_boardsNo(boards))
  },[boards])



 




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
           
              </div>
              <div>
                {/* This button is responsible for toggling the add new task modal */}
                  <button className='logo_button_style boldFont font_small text-white' ref={taskBtnRef} onClick={(e)=>{
                    toggleFirstModal()
                  }}>
                  <FontAwesomeIcon icon={faPlus} className="text-white small_plus" />
                  Add New Task
                  </button>
                  {/* This icon is responsible for toggling the edit /delete board modal */}
                  <FontAwesomeIcon icon={faEllipsisVertical}  className='text-secondary elipsis  mx-2 px-2' onClick={(e)=>{
                  
                    if(Object.keys(retrieved_board).length<3){
                      return null
                    }
                    else{
                      toggleThirdModal()
                    }
                  }}/>
              </div>
                  {thirdModalState? 
                  <div className='boardSettings d-flex flex-column align-items-start' style={secondaryTheme}>
                    <div className='settingsElement text-secondary' onClick={toggleFifthModal}>Edit Board</div>
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
                              const deletion=await deleteBoard(retrieved_board.id)
                              const newerBoards=await retrieveAllBoards()
                              dispatch(retrieve_initial_boards(newerBoards))
                              dispatch(afterDeletion(newerBoards))
                              doSomething()
                          
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
                    
            {/* this is the add new task modal */}
           <Modal isOpen={firstmodalState} onClose={toggleFirstModal}>
            
          
            <button onClick={()=>{
              retrieveBoardLists(retrieved_board.id)
              console.log(retrieved_board.name)
            }}></button>
           </Modal>

           {/* This is the edit board modal */}
           <Modal isOpen={fifthModalState} onClose={toggleFifthModal}>
            <div className='d-flex flex-column p-3 align-items-start'>
              <div className='boldFont medium_font mb-3'>Edit Board</div>
              <label htmlFor='editBoardInput' className='text-secondary mx-1 mb-1 font_small boldFont' >Board Name</label>
              <input type='text' id='editBoardInput' className='boardEdit mb-3 custom_input' placeholder={retrieved_board.name} ref={editBoardRef}></input>
              <label htmlFor='anotherColInput' className='text-secondary  mx-1 font_small boldFont'>Board Columns</label>
              <button className="boardButtons boldFont mb-4" id="special_treatment" style={buttonTheme}>
              <FontAwesomeIcon icon={faPlus} className="  small_plus "/>
              Add New Column
              </button>
              <button className="boardButtons mediumFont" id="" onClick={()=>{
                retrieveBoardLists(retrieved_board.id)
                }}>
                    Save Changes
              </button>
            </div>
           </Modal>

          </div>
        </div>
      </header>
      <div className='content_container d-flex w-100'>
      <Sidebar/>
      <div className='d-flex content flex-column align-items-start'>
        <BoardData/>
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