/* eslint-disable jsx-a11y/alt-text */
import styled from "styled-components";

import axios from "axios";

import { useState } from "react";
export const Center = styled.div`
  padding: 0 50px;
  margin: 0 auto;
  max-width: 0 auto;
`;
const LoginForm = styled.form`
  padding: 20 20;
  background-color: aqua;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const LoginGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  gap: 40px;
`;
const InputBox = styled.input`
  gap: 5px;
  padding: 10px;
  border-radius: 10px;
  border: 0;
  border-color: darkblue;
  width: 50%;
`;
const LoginLabel = styled.label`
  padding: 5px;
`;
const ButtonRow = styled.div``;
const Button = styled.button`
  background-color: white;
  margin-left: 24px;
  margin-right: 24px;
`;
function Login() {
  const [isloading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(ev) {
    ev.preventDefault();
    const data = { name, email, password };

    try {
      await axios.post("http://localhost:9000/login", data).then((res) => {
        alert(res.data);
      });
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Center>
      <LoginGrid>
        <LoginForm>
          <img src="https://i.pinimg.com/564x/e8/03/16/e80316d006e91ff02f3b49e61a0051c0.jpg" />
        </LoginForm>
        <LoginForm>
          <LoginLabel>Name</LoginLabel>
          <InputBox
            placeholder="Enter Your Name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <LoginLabel>Email </LoginLabel>
          <InputBox
            placeholder="Enter Your Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <LoginLabel>Password </LoginLabel>
          <InputBox
            placeholder="Enter Your Password"
            type="password"
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <ButtonRow>
            <Button onClick={handleSubmit}>Sign Up </Button>
            <Button onClick={handleSubmit}>Already Registered </Button>
          </ButtonRow>
        </LoginForm>
      </LoginGrid>
    </Center>
  );
}
export default Login;
