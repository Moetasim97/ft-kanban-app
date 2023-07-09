import React from "react"

import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector"
import { useEffect } from "react"
import { getListTasks } from "./TrelloApis"
import { useDispatch } from "react-redux"
import { errorLoadingTask } from "./store/actionCreator"
import Modal from "./Modal"
import Task from "./Task"



type props={
    integer:number,
    column:any
}


const Column:React.FC<props>=({integer,column})=>{

    const dispatch=useDispatch()
    const taskLoadingStatus=useSelector((store:any)=>store.kanBanReducer.taskStatus)
    const [taskArray,setArray]=React.useState<[]>([])
    const [singleModal,setModal]=React.useState<boolean>(false)
    const labels=useSelector((store:any)=>store.kanBanReducer.genericLabels)
    const refreshBoolean=useSelector((store:any)=>store.kanBanReducer.addingTasks)
    const currentBoard=useSelector((store:any)=>store.kanBanReducer.current_board_data)
    

    useEffect(()=>{
        
      
       try{
        const getTasks=async()=>{
            
            const response=await getListTasks(column.id)
        
         
            if (response!=undefined){
                
                setArray((prevState)=>prevState=response)
            }
        }
        if(column.id){
            getTasks()
        }
       }
       catch(error:any){
        dispatch(errorLoadingTask(error.message))
       
       }
        
    
  


    },[taskArray])

  
    
    const  toggleModal=()=>{
        setModal(!singleModal)
    }


    return(<>
    <>
            <div className="d-flex flex-column mt-3 columnContainer   align-items-start" key={integer}>
                <div className="d-flex align-items-center mb-4">
                    <div className="coloredLabel" style={{backgroundColor:labels[integer].color}}>
                    </div>
                <div className="columnTitle  mediumFont ">
                    {column.name}
                </div>
                <div className="text-secondary mx-1 font_medium">
              ({taskArray!=undefined?taskArray.length:0})
              </div>
                </div>
                {taskArray?taskArray.map((singleTask:any,index)=>{
                    return(<>
                  <Task state={singleTask} taskNo={index}/>
                    </>)
                }):
                <div className="">
                    {taskLoadingStatus}</div>}

            
            </div>
            </></>)
}


export default Column




{/* <div className="taskContainer border d-flex flex-column p-2 bg-white align-items-start p-3 pb-4" onClick={toggleModal}>
<div className="text-dark boldFont font_medium">
    {singleTask.name}
</div>
</div> */}