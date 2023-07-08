import { isDoStatement } from "typescript"

type actionParams={
    type:string,
    payload:any
}

const initialState:{boards_names:string[],current_board:object,board_no:number,current_board_data:any
,all_boards:any[],currentBoardColumns:any[],boardStatus:string}={

    boardStatus:"",
    boards_names:[],
    all_boards:[],
    current_board:{},
    currentBoardColumns:[],
    current_board_data:{},
    board_no:0
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

    case "Error creating Board":

    return {...state,boardStatus:action.payload}


    default :
    return state
    


}
}

export default kanBanReducer