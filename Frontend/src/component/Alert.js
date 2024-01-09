import React,{useContext} from 'react'

import ProjectContext from '../context/Contexts';

export default function Alert() {
  const context= useContext(ProjectContext);
  
  const { alert}=context;
  return (<>
  { alert &&  <div className="container d-flex justify-content-center  mt-2 " style={{height :'70px',zIndex:3,position:'absolute',top:'20px',left:"180px"}}>
       <div className={`alert alert-${alert.type} alert-dismissible fade text-center show`}  style={{width:'800px'}} role="alert">
  <strong>{alert.message}</strong>
</div>
</div>}</>
  )
//   return (<>
//   {  alert &&  <div className="container d-flex justify-content-center position-fixed mt-2 min-vw-100" style={{height :'70px',zIndex:3}}>
//        <div className={`alert alert-${alert.type} alert-dismissible fade text-center show`}  style={{width:'800px'}} role="alert">
//   <strong>{alert.message}</strong>
// </div>
// </div>}</>
//   )
}