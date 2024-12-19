import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useNavigate ,useLocation, useParams } from 'react-router-dom';
import { Service_url } from '../../config/app.config';
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/auth';

const ForgotPassword2 = () => {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    
    const navigate = useNavigate();
    const location = useLocation();
    const [auth ,setAuth] = useAuth();
    const { id, token } = useParams();
    const userValid = async () => {
        const res = await fetch(`http://localhost:8080/forgotpassword/${id}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(res)
        const data = await res.json()

        if (data.status == 201) {
            console.log("user valid")
        } else {
            history("*")
        }
    }
    useEffect(() => {
        userValid()
        alert("")
    }, [])
    const handleSubmit = async(e) => {
      e.preventDefault();
      console.log(email,newpassword)
      // console.log(process.env.API)
      // toast("Wow so easy!");
      try {
        const res = await axios.post(`http://localhost:8080/${id}/${token}`,{password:newpassword});
        if (res && res.data.success) {
          toast.success(res.data && res.data.message)
          navigate( "/login")
        }else{
          toast.error(res.data.message)
        }
        console.log(res)
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
      }
    }
  
    return (
        <Layout>
            <div className="register ">
                <form onSubmit={handleSubmit}>
                    <h4 className='mt-2 mb-5'>RESET PASSWORD</h4>
                    {/* <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div> */}
                    {/* <div className="mb-3">
                        <label htmlFor="exampleInputAnswer1" className="form-label">Enter your answer</label>
                        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputAnswer1" aria-describedby="answerHelp" />
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="exampleInputnewPassword1" className="form-label">New Password</label>
                        <input type="password" value={newpassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" id="exampleInputnewPassword1" />
                    </div>
                    <button type="submit" className="btn btn-dark w-full" style={{ width: "100%" }}>Send</button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword2