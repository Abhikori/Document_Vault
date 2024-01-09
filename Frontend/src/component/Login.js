import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import ProjectContext from '../context/Contexts';
import { Link,Outlet } from 'react-router-dom';
import Style from './Styles1.css'
import { FaceRecognition } from '../Facerecognition/FaceRecognition';
export default function Login() {
  const context= useContext(ProjectContext);  
  const { showAlert,username,setusername}=context;
  const [user,setUser]=useState(null)
  const Onchange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
   console.log(user)
   
  }
  const navigate = useNavigate();
  const onclickhandle2= async (e)=>{
  
      navigate('/Verifyotpforforgotpassword',{replace:true});

  }   
  const onclickhandle1= async (e)=>{
    console.log("reaching it ....");
    const Url_to_Signup = 'http://localhost:5000/api/auth/signup'
    const response = await fetch(Url_to_Signup, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify( {name:user.name,email:user.email,password:user.password} ),
    })
    console.log(user);
    const token = await response.json();
    
    if(token.success===true) 
    {
      
      navigate('/Verifyotp',{replace:true});
       showAlert("Check your mail ","success")
    }else{
        showAlert(token.message,"danger") 
      }
  }
  const onclickhandle= async (e)=>{
    console.log("password",user.password);

     console.log(user.password);
         if(user.password==undefined || user.email ==undefined){
          showAlert("danger ","danger");
         }
    const Url_to_login = 'http://localhost:5000/api/auth/login'
    const response = await fetch(Url_to_login, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify( {email:user.email,password:user.password} ),
    })
    const token = await response.json(); 
    // console.log(ret_data); 


    

  console.log(token) 
    if(token.success===true)
    {
      if(user.email=="admin@gmail.com")
        navigate('../Admindashboard',{replace:true}); 
      else
        navigate('/',{replace:true}); 
      
      localStorage.setItem('token',token.authtoken);
      localStorage.setItem('username', user.email);
      setusername(user.email) 
      showAlert("Login SuccessFully","success");
    }else{
        showAlert(token.message,"danger")
      }
  }

  const handleOpenCamera = () => {
    navigate("../facecam")
    // setShowCamera(true);
  };

  return (
     <div className='bodyc'>
    <div className="main" style={Style}>  
		
		<input className='inputc' type="checkbox" id="chk" aria-hidden="true"/>
              
		
			<div className="login" style={Style}>
				{/* <form action="#" method="post"> */}
					<label for="chk" aria-hidden="true" className='labelc' style={Style}>Login</label>

					<input className='inputc' type="email" name="email" placeholder="Email" onChange={Onchange} id="email" required="" style={Style}/>
					<input className='inputc' type="password" onChange={Onchange} id="password" name='password' placeholder="Password" required="" style={Style}/>
					<button className='buttonc' onClick={onclickhandle} style={Style}>Login</button>
					<button className='buttonc' onClick={onclickhandle2} style={Style}>Forgot password</button>
					<button className='buttonc' onClick={handleOpenCamera} style={Style}>Login by Camera</button>
				{/* </form> */}
				
				
			</div>
			<div className="signup" style={Style}>
				{/* <form action="/signup" method="post"> */}
					<label for="chk" aria-hidden="true" className='labelc' style={Style}>Sign up
					</label>
					<input className='inputc' type="text" name="name" placeholder="User name" onChange={Onchange} id="uname" required="" style={Style}/>
					<input className='inputc'  type="email" name="email" onChange={Onchange} id="email" placeholder="Email" required="" style={Style}/>
					<input className='inputc' type="password"onChange={Onchange} id="password" name='password' placeholder="Password" required="" style={Style}/>
					<button type="submit" className='buttonc' onClick={onclickhandle1} style={Style}>Sign up</button>
					<button className='buttonc' type="submit"  style={Style}>
						<Link  to="/verifyOtp">Verify Otp</Link>
					 </button>
				{/* </form> */}
			</div>
      </div>

      {/* <button id="camerabutton" onClick={handleOpenCamera}>Open Camera</button> */}

      </div> 

  )
}
