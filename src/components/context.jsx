import { createContext } from "react";
const ModalContext = createContext();
import { useState } from "react";


const ModalProvider = ({children})=>{
    const [isOpened,setIsOpened] =useState(false);
        const handleModal = (e)=>{
            setIsOpened(e);
        }
    const data = {isOpened,handleModal};//aqui van los estados globales

    return <ModalContext.Provider value={data}>{children}</ModalContext.Provider>
}

export {ModalProvider};
export default  ModalContext ;