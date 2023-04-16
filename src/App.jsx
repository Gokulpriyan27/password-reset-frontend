import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import "./App.css";
import Login from "./Components/LoginPage/Login";
import Register from "./Components/Register/Register";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import Footer from "./Components/Footer/Footer";

export const LoginContext = createContext();

function App() {

const [details,setDetails] = useState(null);
  return (
    <LoginContext.Provider value={{details,setDetails}}>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/fpassword" element={<ForgetPassword />} />
          <Route path="/change" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </LoginContext.Provider>
  );
}

export default App;
