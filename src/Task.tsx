import Modal from "./Modal";
import React from "react"
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { toggleTaskModal,retrieve_current_board } from "./store/actionCreator";
import {moveTask,deleteTask} from "./TrelloApis"
type props={
    state:any
    taskNo:number
}

const Task:React.FC<props>=({state,taskNo})=>{

    const dispatch=useDispatch()
    const boards=useSelector((store:any)=>store.kanBanReducer.all_boards)
    const currentB=useSelector((store:any)=>store.kanBanReducer.current_board_data)
    const refreshBoolean=useSelector((store:any)=>store.kanBanReducer.addingTasks)
    const {register,handleSubmit,formState:{errors}}=useForm()
    const boardCols=useSelector((store:any)=>store.kanBanReducer.currentBoardColumns)

const [modalState,setModalState]=React.useState<boolean>(false)
const [miniModal,setMiniModal]=React.useState<boolean>(false)

const toggleModal=()=>{

    setModalState(!modalState)
}

const toggleMini=()=>{

    setMiniModal(!miniModal)
}



    return(
        <>
      <div className="taskContainer border d-flex flex-column p-2 bg-white align-items-start p-3 pb-4" onClick={toggleModal}>
                    <div className="text-dark boldFont font_medium">
                        {state.name}
                    </div>
                    
                    </div>

                    <Modal isOpen={modalState} onClose={()=>{
                        toggleModal()
                        setMiniModal(false)
                    }}>
                        <div className="d-flex flex-column p-3 align-items-start">
                            <div className="d-flex justify-content-between align-items-center w-100 mb-2">
                            <div className="text-dark boldFont font_medium">
                                {state.name}
                            </div>
                            <FontAwesomeIcon icon={faEllipsisVertical} className=" text-secondary p-2 elip" onClick={toggleMini}/>
                            </div>
                            <div className="text-secondary taskPara mb-2" >
                                {state.desc}
                            </div>
                            <label htmlFor="columnStatus " className="text-secondary boldFont font_small mb-2">
                                Current Status
                            </label>
                            <select className="columnSelector" {...register("taskCol")}>
                                {boardCols?boardCols.map((column:any,index:number)=>{
                                    return(<option>
                                        {column.name}
                                    </option>)
                                }):
                                <div className="d-none"></div>}

                            </select>
                        </div>
                    </Modal>
            {miniModal?
             <div className="taskSettings d-flex flex-column bg-white align-items-start">
                <button type='submit' className="taskSettingsElement bg-white text-secondary" onClick={
                    handleSubmit(
                        (formvals)=>{
                            debugger;
                            const columnName=formvals.taskCol
                            var columnId:string="empty";
                            for(var i=0;i<boardCols.length;i++){
                                if(columnName==boardCols[i].name){
                                    columnId=boardCols[i].id
                             
                                }
                            }

                            const newListLocation=async()=>{
                                try{
                                    const moveToNew=await moveTask(state.id,columnId)
                                    dispatch(toggleTaskModal(!refreshBoolean))
                                }
                                catch(error){
                                    console.log(error)
                                }
                                

                            }
                            newListLocation()
                           toggleModal()
                           
                            setMiniModal(false)
                        }
                        )
                }>Edit Task</button>
                <button type="submit" className="taskSettingsElement bg-white text-danger" onClick={
                    handleSubmit(
                        (formvals)=>{
                            const columnName=formvals.taskCol
                            var columnId:string;
                            for(var i=0;i<boardCols.length;i++){
                                if(columnName==boardCols[i].name){
                                    columnId=boardCols[i].id
                                }
                            }

                            const taskDelete=async()=>{
                                try{
                                    const taskDeletion=await deleteTask(state.id)
                                    dispatch(toggleTaskModal(!refreshBoolean))
                                   
                                    
                                }
                                catch(error){
                                    console.log(error)
                                }
                                

                            }
                            taskDelete()
                           
                            toggleModal()
                            setMiniModal(false)
                           
                        }
                    )
                }>Delete Task</button>
             </div>
             :
             <div className="d-none"></div>}
        </>
    )
}

export default Task