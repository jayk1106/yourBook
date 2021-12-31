import React,{useContext} from "react";
import alertContext from "../context/alerts/alertContext";

export default function Alert() {

  const {alertContent} = useContext(alertContext);
  return (
    <div className="container my-3" style={{height:'50px'}}>
      {alertContent.display && <div className={`alert alert-${alertContent.type}`} role="alert" style={{marginLeft:'0'}}>
        {alertContent.msg}
      </div>}
    </div>
  );
}
