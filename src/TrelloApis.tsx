import axios, { AxiosHeaders, AxiosRequestConfig } from "axios"
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getBoardColumns } from "./store/actionCreator";


const BASE_URL = 'https://api.trello.com/1/';
axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: '3cfcfbcae873c2aa4c005fb47449c0fc',
  token: 'ATTA7fbe378581b3e3637ee5a033ca163478b5b1a81a54d37e55dc01ad74cdf6284f21132A26',
};

const headers:AxiosRequestConfig={
  headers:{
    "Accept":'application/json'
  }
}

const otherHeaders:AxiosRequestConfig={
  headers:{
    "Accept":'application/json',
    "Authorization":`Bearer ${axios.defaults.params.token}`
  }
}


 const retrieveAllBoards = async() => {
   

    try {
      const response = await axios.get(`members/me/boards`);
      
      return response.data;
    } catch (error) {
    console.log("The error is in the retrieveallboards",error)
    }
  };



  const createBoard=async(string:string)=>{
  
    try{
      const response=await axios.post(`/boards/?name=${string}`)
      
      return response.data
      
    }
    catch(error)
    {
      throw error
    }
  }


  const deleteBoard=async(string:string)=>{

    
    try{
      const response=await axios.delete(`/boards/${string}`,otherHeaders)
      
      return response.data
      
    }
    catch(error)
    {
      throw error
    }
  }




  const createList= async(boardId:string,listName:string)=>{
   
    try{
     
      const response= await axios.post(`/boards/${boardId}/lists?name=${listName}`,headers)

     
      return response.data
    }
    catch(error){
      throw error
    }
  }

  const addTask= async(taskName:string,description:string,listId:string)=>{

    try{
      const response=await axios.post(`/cards?idList=${listId}&name=${taskName}&desc=${description}`)

      console.log(response)
      return response.data
    }

  
    catch(error){
      console.log(error)
      throw error
    }

    
  }

  const getListTasks=async(listId:string)=>{
    try{
    const taskList=await axios.get(`/lists/${listId}/cards?`)
    console.log(taskList.data)
    return taskList.data
    }
    catch(error)
    {
    throw error
    }
  }


   
  const retrieveBoardLists= async (boardId:string)=>{
    
    try{
      const response= await axios.get(`/boards/${boardId}/lists?`,headers)
    
      if(response.data.length<1){
        response.data=[]
      }
 
return response.data
    }
    catch(error){
      console.log(error)
      throw error
    
      
    }
  }

  const retrieveAllLabels=async(boardId:string)=>{
    try{

      const labels=await axios.get(`/boards/${boardId}/labels`)

      

      return labels.data
    }

    catch(error){
      throw error
    }
  }

  


  
  const moveList=async(listId:string,boardId:string)=>{
    try{
      const response= await axios.put(`lists/${listId}/idBoard?value=${boardId}`)

    


    return response.data


    }

    catch(error:any){
      console.log(error.message)
      throw error
    }
    

  }
  




  export {retrieveAllBoards,createBoard,deleteBoard,createList,retrieveBoardLists,moveList,retrieveAllLabels,addTask,getListTasks}