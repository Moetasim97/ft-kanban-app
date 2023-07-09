import react from "react"
import { retrieveAllBoards } from "../TrelloApis"
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { createBoard,retrieveBoardLists,moveList } from "../TrelloApis"
import { Dispatch } from "react"
import { useDispatch } from "react-redux"
import { create } from "domain"







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

const toggleTaskModal=(value:boolean)=>{

    return {type:"Toggle Tasks", payload:value}
}


const errorLoadingTask=(status:string)=>{


    return {type:"error in task loading",payload:status}
}








export {calculate_boardsNo,retrieve_current_board,retrieve_initial_boards,retrieve_boardNames,BoardDel,afterDeletion,getBoardColumns,retrieve_labels,toggleTaskModal,errorLoadingTask}

