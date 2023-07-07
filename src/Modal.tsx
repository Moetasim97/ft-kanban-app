import React from "react"
import { useEffect,useRef } from "react";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children:React.ReactNode
    
  }

const  Modal:React.FC<ModalProps>=({isOpen,onClose,children})=>{

    const Theme:boolean=useContext(ThemeContext)
    const MainTheme:{backgroundColor:string,color:string}={
      backgroundColor: Theme? 'white':'#20212c',
      color: Theme? 'black':'white'
    }
    const modalRef = useRef<HTMLDivElement>(null);

    

  
    if(!isOpen){
        return null
    }
   
   
    return (<>
    <div className="modal_overlay" ref={modalRef} onClick={onClose} >
        <div className="modal_content " style={MainTheme} onClick={(e)=>{
            e.stopPropagation()
        }}>
            <div className="content_wrapper">
            {children}
            </div>
        </div>
    
    </div>
    </>)
}


export default Modal