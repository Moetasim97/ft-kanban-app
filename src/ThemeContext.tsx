import { create } from 'domain';
import React, { createContext, useState,Dispatch,SetStateAction } from 'react';


// Define the theme interface

interface ThemeProviderProps {
    children: React.ReactNode;
  }

  interface ThemeContextProps{
    defaultTheme:boolean,
    setTheme:Dispatch<SetStateAction<boolean>>
  }



const ThemeContext=createContext<ThemeContextProps["defaultTheme"]>(true);
const AnotherContext=createContext<ThemeContextProps["setTheme"]>((value)=>value=!value)




const ThemeProvider:React.FC<ThemeProviderProps>=({children})=>{
    const [theme,setTheme]=React.useState<ThemeContextProps["defaultTheme"]>(true)

    const toggler=()=>{
        setTheme(prevState=>!prevState)
    }
  

    return (
        <AnotherContext.Provider value={toggler}>
        <ThemeContext.Provider value={theme}>
          {children}
        </ThemeContext.Provider>
        </AnotherContext.Provider>
     
    )
}

export  {ThemeContext,ThemeProvider,AnotherContext}