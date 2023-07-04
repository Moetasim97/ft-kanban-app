import React from 'react';
import {useContext} from "react"
 import logo from "./Assets/Group 15.png"
import './App.css';
import Sidebar from './Side';
import {ThemeContext} from "./ThemeContext"



const App:React.FC =()=>{
  const Theme:boolean=useContext(ThemeContext)

  const MainTheme:{backgroundColor:string,color:string}={
    backgroundColor: Theme? '#f4f7fd':'#28242c',
    color: Theme? 'black':'white'

  }
  




 



  return (
    <div className="App" style={MainTheme}>
      
      
      <header className="App-header w-100 bg-white">
        <div className='d-flex main-div '>
          <div className='d-flex logo_div  p-4'>
            <img  src={logo} alt='Page logo' className='mx-2'/>
            <div className='extraBoldFont '>
              Kanban
            </div>
            {/* The sidebar is not fully responsive down to the size of a mobile screen because I need to 
            fill up the empty space left at the end of any element that lives inside the sidebar in order
            to align with the logo div on screen resize */}
          </div>
          <div className='d-flex p-2 justify-content-between  board_bar'>
            
          </div>
        </div>
      </header>
      <div className='content_container d-flex w-100'>
      <Sidebar/>
      <div className='d-flex content flex-column'>
        <div>I can just continue on with my life</div>
        <div>this is too easy</div>
      </div>

      </div>
     
      
    </div>
  );
}

export default App;
