import react from "react"
import { retrieveAllBoards } from "../TrelloApis"
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { createBoard,retrieveBoardLists,moveList } from "../TrelloApis"
import { Dispatch } from "react"
import { useDispatch } from "react-redux"
import { create } from "domain"




const BOARD_CREATE_SUCCESS="BOARD CREATE SUCCESS"
const BOARD_RETRIEVE_LISTS="BOARD RETRIEVE LISTS"
const DEFAULT_LIST_DELETED="DEFAULT LIST DELETED"
const LISTS_AFTER_RESETING="LISTS AFTER RESETING"
const BOARD_CREATE_FAILRE="BOARD FAILED TO GET CREATED"

interface boardCreateSuccess
{
type:string,
payload:object
}
interface boardRetrieveLists
{
    type:string

}
interface defaultListDeleted
{
    type:string,
    payload:any[]
}
interface listsAfterReseting
{
    type:string,
    payload:any[]
}

type actionTypes=
    | boardCreateSuccess
    | boardRetrieveLists
    | defaultListDeleted
    | listsAfterReseting;





const retrieve_initial_boards=(array:any[])=>{

if (!array){
    array=[]
}
   
    return {type :"Retrieve All Boards",payload:array}
}

const retrieve_labels=(labels:any[])=>{


    return {type:"Get generic board labels",payload:labels}
}

const retrieve_boardNames=(array:any[])=>{
    var names=[]
    if(array.length>0){
        for(var i=0;i<array.length;i++){
            if(array[i]?.name){
                names.push(array[i].name)
            }
        }
    }
    
    
     
   return {type:"Get Board Names",payload:names}
}

const afterDeletion=(array:any[])=>{
    var emptyObj={
        name:"",
        id:""
    }
    
    var firstBoard;
    if(array.length<1){
    firstBoard=emptyObj
    }
    else{
      firstBoard=array[0]
    }
    return {type:"Retrieve Board upon deletion",payload:firstBoard}
}


const calculate_boardsNo=(array:any[])=>{
   var len=0;

   for(var i=0;i<array.length;i++){
    if(array[i]){
        len++
    }
   }
    return {type:"Calculate boards number",payload:len}
}

const retrieve_current_board=(name:string | null,array:any[])=>{

    var single_board={}
 
    for (var i=0;i<array.length++;i++){
        
            if(array[i].name==name)
        {
            single_board={...array[i]}
            break
        }
        
    }

  

    return {type:"Retrieve current board data",payload:single_board}

}




const BoardDel=(array:any[],string:string)=>{

    for(var i=0;i<array.length;i++){
        if(string==array[i].name){
            array.splice(i,1)
            console.log(array)
            break;
      

        }
    }

    return {type:"Board Deleted",payload:array}

}

const getBoardColumns=(array:any[])=>{


return {type:"Retrieve columns of the current Board",payload:array}

}


// export const initialAction = (array:any[]) => {
//     return (dispatch:any) => {
//       // Dispatch the initial action
//       dispatch(retrieve_initial_boards(array));
  
//       // Perform any asynchronous operations if needed
//       // ...
  
//       // Dispatch the follow-up action
//       dispatch();
//     };
//   };




export {calculate_boardsNo,retrieve_current_board,retrieve_initial_boards,retrieve_boardNames,BoardDel,afterDeletion,getBoardColumns,retrieve_labels}


// const createABoard=(stri):ThunkAction<Promise<void>,RootState:object, stri:,actionTypes: any>=>{


//     return async(dispatch:any)=>{

//     try{

//         const theBoard=await createBoard(string)

//         dispatch({type:"Board Created Successfully",payload:theBoard})
        
//         const theLists= await retrieveBoardLists(theBoard.id)

//         dispatch({type:"Will retrieve lists"})

//         theLists.length>0? theLists.map(async (list:any,key:any)=>{
//         const listWillDelete=await deleteList(list)
//         dispatch({type:"Default list deleted"})
//         }) : console.log("nothing")


//         const afterDelete=await retrieveBoardLists(theBoard.id)
//         console.log(afterDelete)
//         dispatch({type:"Lists after reseting",payload:afterDelete})
    

    
//     }

//     catch(error:any){
        
//         return {type:"Error creating Board",payload:error.message}
//     }
// }
// }