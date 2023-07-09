import { isDoStatement } from "typescript"

type actionParams={
    type:string,
    payload:any
}

const initialState:{boards_names:string[],current_board:object,board_no:number,current_board_data:any
,all_boards:any[],currentBoardColumns:any[],boardStatus:string,genericLabels:any[],addingTasks:boolean,taskStatus:string}={

    boardStatus:"",
    boards_names:[],
    all_boards:[],
    current_board:{},
    currentBoardColumns:[],
    current_board_data:{},
    board_no:0,
    genericLabels:[],
    addingTasks:false,
    taskStatus:'',
}


  const kanBanReducer=(state=initialState,action:actionParams)=>{

    switch(action.type){

      case "Retrieve All Boards":

      return {...state,all_boards:action.payload}

      case "Get Board Names":

      return {...state,boards_names:action.payload}

    case "Calculate boards number":

    return {...state,board_no:action.payload}

    case "Retrieve current board data":
      
    return {...state,current_board_data:action.payload}

    case "Add Board":
    return {...state,all_boards:action.payload}

    case "Board Created Successfully":

    return {...state,current_board:action.payload}

    case "Will retrieve lists":
      return {...state}

    case "Default list deleted":

    return {...state}

    case "No default lists found":

    return {...state,currentBoardColumns:[]}

    case "Lists after reseting":

    return {...state,currentBoardColumns:action.payload}

    case "Board Deleted":
      
    return {...state,all_boards:action.payload}

    case "Retrieve Board upon deletion":

    return {...state,current_board_data:action.payload}

    case "Retrieve columns of the current Board":

    return {...state,currentBoardColumns:action.payload}

    case "Get generic board labels":

    return {...state,genericLabels:action.payload}

    case "Toggle Tasks":


    return {...state,addingTasks:action.payload}

    case "error in task loading":

    return {...state,taskStatus:action.payload}


    default :
    return state
    


}
}

export default kanBanReducer