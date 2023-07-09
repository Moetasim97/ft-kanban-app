
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import { useRef } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {ThemeContext} from "./ThemeContext"
import {useContext} from "react"
import { useEffect } from 'react';
import { createBoard,moveList,deleteBoard,createList, retrieveAllBoards,retrieveBoardLists } from "./TrelloApis";



const BoardEditing:React.FC=()=>{
    const Theme:boolean=useContext(ThemeContext)
  const buttonTheme={
    backgroundColor: Theme? '#d8d7f1':'white'
   }

   const editBoardRef=useRef<HTMLInputElement>(null)
    const refsArray=useRef<Array<React.RefObject<HTMLInputElement>>>([])
    const genericLabels=useSelector((store:any)=>store.kanBanReducer.genericLabels)
    const boards=useSelector((store:any)=>store.kanBanReducer.all_boards)
    const board_no=useSelector((store:any)=>store.kanBanReducer.board_no)
    const retrieved_board=useSelector((store:any)=>store.kanBanReducer.current_board_data)
    const retrievedBoardCols=useSelector((store:any)=>store.kanBanReducer.currentBoardColumns)
    const [togglingState,toggleState]=React.useState<boolean>(false)
    const [deletedCols,setDeletedCols]=React.useState<string[]>([])

    const originalColumnRefs=useRef<Array<React.RefObject<HTMLInputElement>>>([])
    


    const addRef=()=>{

        refsArray.current.push(React.createRef<HTMLInputElement>())
      }


      useEffect((
        ()=>{
        if(retrievedBoardCols.length>0){
            originalColumnRefs.current=[]
            
            
            for(var k=0;k<retrievedBoardCols.length;k++)
            {
                originalColumnRefs.current.push(React.createRef<HTMLInputElement>())
            }
            toggleState(!togglingState)
        }
        }
      ),[retrievedBoardCols])
      
     

     
    return (
    <>
    <div className='d-flex flex-column p-3 align-items-start'>
              <div className='boldFont medium_font mb-3'>Edit Board</div>
              <label htmlFor='editBoardInput' className='text-secondary mx-1 mb-1 font_small boldFont' >Board Name</label>
              <input type='text' id='editBoardInput' className='boardEdit mb-3 custom_input' placeholder={retrieved_board.name} ref={editBoardRef}></input>
              <label htmlFor='anotherColInput' className='text-secondary  mx-1 font_small boldFont'>Board Columns</label>
              {retrievedBoardCols?retrievedBoardCols.map((singleColumn:any,index:number)=>{
                return(<>
                <div className='d-flex align-items-center'>
                <input className='columnInp my-1' placeholder={singleColumn.name} ref={originalColumnRefs.current[index]} onClick={()=>{
                   
                }} ></input>
                <FontAwesomeIcon icon={faTimes} className='closingTimes' onClick={
                    ()=>{
                        let deleteContainer=[...deletedCols]
                        
                        deleteContainer.push(singleColumn.id)
                        setDeletedCols(deleteContainer)
                        retrievedBoardCols.pop()
                        toggleState(!togglingState)
                    }
                }/>
                </div>
                </>)
              }):
              <div className=''>no</div>}
              {refsArray.current.length>0?refsArray.current.map((refer,index:number)=>{
                return(<>
                <div className='d-flex align-items-center' key={index}>
                <input ref={refer} className='columnInp'></input>
                <FontAwesomeIcon icon={faTimes} className='closingTimes ' onClick={()=>{
                    refsArray.current.pop()
                    toggleState(!togglingState)
                }}/>
                </div>
                </>)
              })
            :
            <div className='d-none'>
              </div>}

              <button className="boardButtons boldFont mb-4" id="special_treatment" style={buttonTheme} onClick={()=>{
                addRef()
                toggleState(!togglingState)
              }}>
              <FontAwesomeIcon icon={faPlus} className="  small_plus "/>
              Add New Column
              </button>
              <button className="boardButtons mediumFont" id="" onClick={(e)=>{
                var newColumns:any[]=[]
                var oldColumns=[]
                for(var i=0;i<refsArray.current.length;i++){
                    console.log(refsArray.current[i])
                    if(refsArray.current[i].current?.value){
                        newColumns.push(refsArray.current[i].current?.value)
                    }
                    
                }


                for(var j=0;j<originalColumnRefs.current.length;j++){
                    
                    if(originalColumnRefs.current.length>0){
                        if(originalColumnRefs.current[j].current?.placeholder!=originalColumnRefs.current[j].current?.value){
                            console.log(originalColumnRefs.current[j].current?.value,originalColumnRefs.current[j].current?.placeholder)
                            oldColumns.push(originalColumnRefs.current[j].current?.value)
                            
                        }
                    }

                    if(oldColumns.length==0 && retrievedBoardCols.length<originalColumnRefs.current.length){
                        
                    }
                    if(deletedCols.length>0){
                        debugger;
                    deletedCols.map(async (colId:string,key:number)=>{
                      
                            const backUpBoard=await createBoard("backup")
                            const mvList =await moveList(colId,backUpBoard.id)
                            const deleteBackup=await deleteBoard(backUpBoard.id)
                          })
                          toggleState(!togglingState)
                    }
              
                   console.log(newColumns,oldColumns)
                   toggleState(!togglingState)
                }

                if(newColumns.length>0){
                    newColumns.map(async (value:string)=>{
                      
                      const newList=await createList(retrieved_board.id,value)
                      const retrieveLists=await retrieveBoardLists(retrieved_board.id)
                      })
                      toggleState(!togglingState)
                }

                }
                }>
                
                    Save Changes
              </button>
            </div>
    </>
    )
}

export default BoardEditing




































{/* <div className='d-flex flex-column p-3 align-items-start'>
              <div className='boldFont medium_font mb-3'>Edit Board</div>
              <label htmlFor='editBoardInput' className='text-secondary mx-1 mb-1 font_small boldFont' >Board Name</label>
              <input type='text' id='editBoardInput' className='boardEdit mb-3 custom_input' placeholder={retrieved_board.name} ref={editBoardRef}></input>
              <label htmlFor='anotherColInput' className='text-secondary  mx-1 font_small boldFont'>Board Columns</label>
              {retrievedBoardCols?retrievedBoardCols.map((singleColumn:any,index:number)=>{
                return(<>
                <div className='d-flex align-items-center'>
                <input className='columnInp my-1' placeholder={singleColumn.name}></input>
                <FontAwesomeIcon icon={faTimes} className='closingTimes' />
                </div>
                </>)
              }):
              <div className=''>no</div>}
              {refsArray.current.length>0?refsArray.current.map((refer,index:number)=>{
                return(<>
                <div className='d-flex align-items-center' key={index}>
                <input ref={refer} className='columnInp'></input>
                <FontAwesomeIcon icon={faTimes} className='closingTimes '/>
                </div>
                </>)
              })
            :
            <div className='d-none'>
              </div>}

              <button className="boardButtons boldFont mb-4" id="special_treatment" style={buttonTheme} onClick={()=>{
                addRef()
              }}>
              <FontAwesomeIcon icon={faPlus} className="  small_plus "/>
              Add New Column
              </button>
              <button className="boardButtons mediumFont" id="" onClick={(e)=>{
                
                }}>
                    Save Changes
              </button>
            </div> */}