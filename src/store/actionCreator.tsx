import react from "react"
import { retrieveAllBoards } from "../TrelloApis"





const retrieve_initial_boards=(array:any[])=>{



    return {type :"Retrieve All Boards",payload:array}
}

const retrieve_boardNames=(array:any[])=>{
    var names=[]
    for(var i=0;i<array.length;i++){
        if(array[i]?.name){
            names.push(array[i].name)
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
    var len;
    array? len=array.length : len=0 
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

const addBoard=(array:any[],obj:object)=>{

    array.push(obj)
    return { type:"Add Board",payload:array}
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




export {calculate_boardsNo,retrieve_current_board,retrieve_initial_boards,retrieve_boardNames,addBoard,BoardDel,afterDeletion,getBoardColumns}