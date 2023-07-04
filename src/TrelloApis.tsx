import React from "react"
import axios from "axios"
import { retrieve_default_board } from './store/actionCreator';
import { useDispatch } from 'react-redux';


const BASE_URL = 'https://api.trello.com/1/';
axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: '3cfcfbcae873c2aa4c005fb47449c0fc',
  token: 'ATTA7fbe378581b3e3637ee5a033ca163478b5b1a81a54d37e55dc01ad74cdf6284f21132A26',
};


 const retrieveBoardDef = async(string:string) => {


    try {
      const response = await axios.get(`/boards/${string}`);
      return response.data;
    } catch (error) {
      throw error
    }
  };

  export {retrieveBoardDef}