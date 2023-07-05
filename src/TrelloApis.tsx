import React from "react"
import axios from "axios"

import { useDispatch } from 'react-redux';


const BASE_URL = 'https://api.trello.com/1/';
axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: '3cfcfbcae873c2aa4c005fb47449c0fc',
  token: 'ATTA7fbe378581b3e3637ee5a033ca163478b5b1a81a54d37e55dc01ad74cdf6284f21132A26',
};


 const retrieveAllBoards = async() => {


    try {
      const response = await axios.get(`members/me/boards`);
      return response.data;
    } catch (error) {
      throw error
    }
  };

  const createBoard=async(string:string)=>{
    try{
      const response=await axios.post(`/boards/?name=${string}`)
      console.log(response.data)
      return response.data
      
    }
    catch(error)
    {
      throw error
    }
  }

  export {retrieveAllBoards,createBoard}