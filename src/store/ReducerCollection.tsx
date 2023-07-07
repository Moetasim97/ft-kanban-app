

type actionParams={
    type:string,
    payload:any
}

const initialState:{boards_names:string[],current_board:object,board_no:number,current_board_data:any
,all_boards:any[]}={

    boards_names:[],
    all_boards:[],
    current_board:{},
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

    case "Board Deleted":
      
    return {...state,all_boards:action.payload}

    case "Retrieve Board upon deletion":

    return {...state,current_board_data:action.payload}



    default :
    return state
    


}
}

export default kanBanReducer