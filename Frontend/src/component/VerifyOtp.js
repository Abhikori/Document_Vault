import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProjectContext from '../context/Contexts';
// import { Link,Outlet } from 'react-router-dom';
import Style from './Styles1.css'

export default function VerifyOtp() {
  const context = useContext(ProjectContext);
  const { showAlert, username, setusername } = context;
  const [user, setUser] = useState(null)
  const Onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(user)

  }
  const navigate = useNavigate()
  const onclickhandle = async (e) => {
    const Url_to_Signup = 'http://localhost:5000/api/auth/resendOtpVerificationcode'
    const response = await fetch(Url_to_Signup, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ email: user.email }),
    })
    console.log(user);
    const token = await response.json();
    // console.log(ret_data);
    // console.log(token.errors[0].msg)
    if (token.success === true) {
      // localStorage.setItem('token',token.authtoken);
      // console.log(token.authtoken)
      // navigate('/',{replace:true});
      showAlert("Please check your Mail", "success")
    } else {
      showAlert(token.message, "danger")
    }
  }
  const onclickhandle1 = async (e) => {
    const Url_to_Signup = 'http://localhost:5000/api/auth/verifyOtp'
    const response = await fetch(Url_to_Signup, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ email: user.email, otp: user.otp }),
    })
    console.log(user);
    const token = await response.json();
    // console.log(ret_data);
    // console.log(token.errors[0].msg)
    if (token.success === true) {
      // localStorage.setItem('token',token.authtoken);
      // console.log(token.authtoken)
      navigate('/upload_photo', { replace: true });
      showAlert("Account created Successfully Please Login Once ", "success")
    } else {
      showAlert(token.message, "danger")
    }
  }
  return (
    <div className='bodyc' style={Style}>
      <div className="main" style={Style}>
        <input style={Style} className='inputc' type="checkbox" id="chk" aria-hidden="true" />

        <div className="login" style={Style}>
          {/* <form action="/verifyOtp" method="post"> */}
          <label className='labelc' for="chk" aria-hidden="true" style={Style}>Verify Your Account</label>
          <input style={Style} className='inputc' type="email" name="email" onChange={Onchange} id="email" placeholder="Email" required="" />
          <input className='inputc' type="text" name="otp" onChange={Onchange} placeholder="Otp" required="" />

          <button style={Style} className='buttonc' type="submit" onClick={onclickhandle1}>Verify</button>

          {/* </form> */}
          <button style={Style} className='buttonc' type="submit" onClick={onclickhandle} > Resend Otp </button>

        </div>



      </div>
    </div>

  )

}