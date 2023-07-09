import React from "react"
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"
import { retrieveBoardLists } from "./TrelloApis"
import { getBoardColumns } from "./store/actionCreator"
import { useDispatch } from "react-redux"
import Column from "./SingleCol"
import BoardEditing from "./EditBoard"
import Modal from "./Modal"


const BoardData:React.FC=()=>{

    const dispatch=useDispatch()
    const labels=useSelector((store:any)=>store.kanBanReducer.genericLabels)
    const boardColumns=useSelector((store:any)=>store.kanBanReducer.currentBoardColumns)
    const boardTarget=useSelector((store:any)=>store.kanBanReducer.current_board_data)
    const [editBoardModal,setEditBoardModal]=React.useState<boolean>(false)


console.log(boardColumns)

useEffect(()=>{
    const targetColumns=async()=>{
        try{
        const retrieveColumns=await retrieveBoardLists(boardTarget.id)
        dispatch(getBoardColumns(retrieveColumns))
        
    }
    catch(error){
        console.log(error)
    }
    }
    targetColumns()
    
},[boardTarget,boardColumns])



const toggleEditModal=()=>{
    setEditBoardModal(!editBoardModal)
}
    return (<>

    {boardColumns.length<1?
    <>
    <div className=" special_margins  d-flex flex-column align-items-center">
    <div className="text-secondary boldFont mb-4">This board is empty. Create a new column to get started</div>
    <button className="logo_button_style text-white boldFont font_medium" onClick={()=>{
      toggleEditModal()
    }}>
    <FontAwesomeIcon icon={faPlus} className="text-white small_plus" onClick={()=>{

    }}/>
        Add New Column</button>
   <Modal isOpen={editBoardModal} onClose={toggleEditModal}>
    <BoardEditing/>
   </Modal>
    </div>
    </>
    : <div className="d-flex">
        {boardColumns.length>0?boardColumns.map((column:any,key:number)=>{
            const num=key
          
            return(
            <Column integer={num} column={column}/>
            )
        }):
        <div className="d-none"></div>}

    </div>
    }

        </>)









}





export default BoardData