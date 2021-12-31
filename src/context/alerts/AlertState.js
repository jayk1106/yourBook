import Context from "./alertContext";
import { useState } from "react";

const AlertState = (props) => {

    const [alertContent , setAlertContent] = useState({msg :'' , type:'' , display : false})

    const showAlert = (msg , type )=>{
        setAlertContent({msg:msg , type:type , display : true});
        
        setTimeout(() => {
            setAlertContent({msg:'' , type:'' , display : false});
        }, 1500);
    }
    return(
        <Context.Provider value={{alertContent , showAlert}}>
            {props.children}
        </Context.Provider>
    );
}

export default AlertState;