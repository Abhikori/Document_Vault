
import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import SabjiContext from '../context/Contexts';
// import { Link,Outlet } from 'react-router-dom';
import Style from './Styles1.css'

export default function ResetPassword(){
    const context= useContext(SabjiContext);  
    const { showAlert,username,setusername}=context;
    const [user,setUser]=useState(null)
    const Onchange=(e)=>{
      setUser({...user,[e.target.name]:e.target.value})
     console.log(user)
     
    }
    const navigate = useNavigate()

    const onclickhandle1= async (e)=>{
      const Url_to_Signup = 'http://localhost:5000/api/auth/resetpassword'
      const response = await fetch(Url_to_Signup, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify( {email:user.email,newpass:user.newpass} ),
      })
      console.log(user);
      const token = await response.json();
      // console.log(ret_data);
    // console.log(token.errors[0].msg)
      if(token.success===true)
      {
        // localStorage.setItem('token',token.authtoken);
        // console.log(token.authtoken)
        navigate('/',{replace:true});
         showAlert("Password Reset Successfully Please Login Once ","success")
      }else{
          showAlert(token.message,"danger")  
        }
    }
    return ( <div className="main1" style={Style}>  	
		<input type="checkbox" id="chk" aria-hidden="true"/>

			<div className="login" style={Style}>
				{/* <form action="/verifyOtp" method="post"> */}
					<label for="chk" aria-hidden="true" style={Style}>Verify Your Account</label>
					<input type="email" name="email" onChange={Onchange} id="email"  placeholder="Email" required=""/>
					<input type="text" name="newpass" onChange={Onchange} placeholder="New Password" required=""/>

					<button type="submit" onClick={onclickhandle1}>Reset</button>
					
				{/* </form> */}
				{/* <button type="submit" onClick={onclickhandle} > Resend Otp </button> */}
			
			</div>
			

		
	</div>
          
    
      )

}