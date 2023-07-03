import React from 'react';
import logo from "./Assets/Group 15.png"
import './App.css';
import Sidebar from './Side';

function App() {



  return (
    <div className="App">
      
      
      <header className="App-header w-100 bg-white">
        <div className='d-flex main-div '>
          <div className='d-flex logo_div  p-4'>
            <img  src={logo} alt='Page logo' className='mx-2'/>
            <div className='extraBoldFont'>
              Kanban
            </div>
          </div>
          <div className='d-flex p-2 justify-content-between  board_bar border border-success'>
            
          </div>
        </div>
      </header>
      <div className='content_container   d-flex w-100'>
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
