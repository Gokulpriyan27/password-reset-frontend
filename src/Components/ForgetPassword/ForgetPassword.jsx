import { useState } from "react";
import "./ForgetPassword.scss";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { LoginContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function ForgetPassword() {

  const navigate = useNavigate();

  const [useremail,setUserEmail]=useState({email:""})

  const {details,setDetails} = useContext(LoginContext);

    const [isLoading, setisLoading] = useState(false);

    const handlechange =(e)=>{

      setUserEmail({...useremail,[e.target.name]:e.target.value})
    }

    const handlesendotp = async(event)=>{
      event.preventDefault();
      setDetails(useremail);
      try {
        if(useremail.email.length>0){
          setisLoading(true);
          const responseOtp = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/forgetpassword`,useremail,{withCredentials:true});
        if(responseOtp.status===201){
          toast.success(`${responseOtp.data.message}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            setisLoading(false);
            setTimeout(()=>{
              navigate("/change")
            },[3000])
        }
        }else{
          setisLoading(false);
          toast.warn(`Email Id is mandatory!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            
        }
        
      } catch (error) {
        setisLoading(false);
        toast.error(`${error.response.data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
      
      
    }

  return (
   <div className="fpassword-wrapper">
      <Container className="fpassword-container">
        <Form className="fpassword-form">
          <FormGroup floating>
            <Input
              id="fpassemail"
              name="email"
              placeholder="Email"
              type="email"
              autoComplete="off"
              value={useremail.email}
              onChange={handlechange}
            />
            <Label for="fpassemail">Email</Label>
          </FormGroup>{" "}
          {
            isLoading ? 
            (<Button className="fpassword-button spinner" disabled>
           <FontAwesomeIcon icon={faSpinner} spin size="xl" style={{color: "#121212",}} />
          </Button>): 
          (<Button className="fpassword-button normal" onClick={handlesendotp}>
            <span>SEND OTP</span>
          </Button>)
          }   
        </Form>
      </Container>
      <ToastContainer />
   </div>
  )
}


export default ForgetPassword;