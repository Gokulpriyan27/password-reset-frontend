import { useState } from "react";
import "./ChangePassword.scss";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { LoginContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function ChangePassword() {

  const navigate = useNavigate();

    const {details}=useContext(LoginContext);

    const [passdetails,setPassDetails ] = useState({
      email:details.email,
      code:"",
      newpassword:""
    });

    const [isLoading, setisLoading] = useState(false);

    const passHandleChange = (e)=>{
      setPassDetails({...passdetails,[e.target.name]:e.target.value})
    }

    const handleSubmit = async()=>{
      try {
        if((passdetails.email.length===0)||(passdetails.code.length===0)||(passdetails.newpassword.length===0)){
          toast.warn(`Secret Code, New Password is mandatory`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }else{
          setisLoading(true);
          const passwordChange = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/changepassword`,passdetails,{withCredentials:true});

          if(passwordChange.status===201){
            setisLoading(false);
            toast.success(`${passwordChange.data.message}`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
              setTimeout(()=>{
                navigate("/")
              },3000)
          }
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
    <div className="changepassword-wrapper">
    <Container className="changepassword-container">
      <Form className="changepassword-form">
      <FormGroup floating>
          <Input
            id="useremail"
            name="email"
            placeholder="Email"
            type="email"
            autoComplete="off"
            value={details.email}
            readOnly
        
          />
          <Label for="useremail">Email</Label>
        </FormGroup>{" "}

        <FormGroup floating>
          <Input
            id="otp"
            name="code"
            placeholder="Secret Code"
            type="password"
            autoComplete="off"
            value={passdetails.code}
            onChange={passHandleChange}
        
          />
          <Label for="code">Secret Code</Label>
        </FormGroup>{" "}

        <FormGroup floating>
          <Input
            id="changepassword"
            name="newpassword"
            placeholder="New Password"
            type="password"
            autoComplete="off"
            value={passdetails.newpassword}
            onChange={passHandleChange}
        
          />
          <Label for="newpassword">New Password</Label>
        </FormGroup>{" "}
        {
          isLoading ? 
          (<Button className="changepassword-button spinner" disabled>
         <FontAwesomeIcon icon={faSpinner} spin size="xl" style={{color: "#121212",}} />
        </Button>): 
        (<Button className="changepassword-button normal" onClick={handleSubmit}>
          <span>CHANGE</span>
        </Button>)
        }   
      </Form>
    </Container>
    <ToastContainer />
 </div>
  )
}

export default ChangePassword