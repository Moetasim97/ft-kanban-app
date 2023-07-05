import React, { LegacyRef } from 'react';
import {useContext} from "react"
 import logo from "./Assets/Group 15.png"
import './App.css';
import Sidebar from './Side';
import {ThemeContext} from "./ThemeContext"
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import {calculate_boardsNo,retrieve_current_board,retrieve_initial_boards} from "./store/actionCreator"
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react';
import { retrieveAllBoards } from './TrelloApis';
import { useRef } from 'react';
import Modal from './Modal';



const App:React.FC =()=>{

  const dispatch=useDispatch()
  const boards=useSelector((store:any)=>store.kanBanReducer.all_boards)
  const board_no=useSelector((store:any)=>store.kanBanReducer.board_no)
  const retrieved_board=useSelector((store:any)=>store.kanBanReducer.current_board_data)
  const [firstmodalState,setModal]=React.useState<boolean>(false)
  const [secondModalState,setSecondModal]=React.useState<boolean>(false)
  


  const toggleFirstModal=()=>{

    setModal((prevModal)=>prevModal=!prevModal)
  }
  const toggleSecondModal=()=>{

    setSecondModal((prevModal)=>prevModal=!prevModal)
  }


  const taskBtnRef=useRef<HTMLButtonElement>(null)

  var btn_elem=taskBtnRef.current

  if(btn_elem!=null && Object.keys(retrieved_board).length==0){
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
              </div>
              <div>
                  <button className='logo_button_style boldFont font_small text-white' ref={taskBtnRef} onClick={(e)=>{
                    toggleFirstModal()
                  }}>
                  <FontAwesomeIcon icon={faPlus} className="text-white small_plus" />
                  Add New Task
                  </button>
              </div>
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
        <button onClick={toggleSecondModal}>another modal Opener</button>
        <Modal isOpen={secondModalState} onClose={toggleSecondModal}>
          <div>say hello to my little friend</div>
        </Modal>
      </div>

      </div>
     
      
    </div>
  );
}

export default App;
