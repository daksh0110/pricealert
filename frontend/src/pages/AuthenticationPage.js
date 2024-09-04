import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Nav from "../components/Nav";
import axios from "axios";
import DataContext from "../components/dataProvider";
import ProductBox from "../components/ProductBox";
import ProductBoxHorizontal from "../components/ProductBoxHorizontal";
const Background = styled.div`
  background-color: #272829;
  min-height: 100vh;
`;
const OuterBox = styled.div`
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  color: #ffffff;
`;
const AccountBox = styled.div`
  font-weight: bolder;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-right: 18px;
  align-items: center;
  height: 430px;

  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.199);

  label {
    padding-bottom: 0.5rem;
    justify-content: left;
  }
  input {
    margin-bottom: 10px;
    width: 60%;
    height: 1.8rem;
    border: none;
    background: transparent;
    outline: none;
    border-bottom: solid rgb(143, 143, 143) 1px;
    color: white;
    font-weight: bold;
    letter-spacing: 1px;
  }
`;
// const Productbox = styled.div`
//   margin: 1rem;
// `;
const Box = styled.div`
  margin: 1rem;

  border-radius: 5px;
`;
const CenterBox = styled.div`
  background-color: red;
  height: auto;
`;

const AuthenticationForm = styled.form`
  display: grid;
  gap: 20px;
  padding: 4rem;
`;
const ButtonBox = styled.div`
  padding: 2rem;
  display: flex;
  gap: 7rem;
`;
const Button = styled.button`
  margin-top: 1rem;
  color: white;
  width: 60%;
  height: 2.5rem;
  background-color: #1a56db;
  border-radius: 5px;
  border: none;
  font-weight: bolder;
  font-size: large;
  letter-spacing: 4px;
  cursor: pointer;
`;
const RegisterButton = styled.div`
  margin-top: 1rem;
  background: none;
  border: none;
  button {
    border: none;
    background: transparent;
    color: white;
    font-size: medium;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
`;
const Title = styled.h1`
  text-align: center;
`;
const ProductRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default function Authentication() {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertList, setAlerList] = useState([]);
  const { user } = useContext(DataContext);

  async function handdleRegistration(ev) {
    ev.preventDefault();
    const data = { name, email, password };
    const response = await axios.post(
      process.env.BASE_URL + "/api/Signup",
      data
    );
    alert(response.data);
  }

  async function handleLogin(ev) {
    const data = { email, password };
    const response = await axios.post(
      process.env.BASE_URL + "/api/login",
      data
    );
    localStorage.setItem("token", response.data);
    window.location.reload();
  }
  useEffect(() => {
    async function fetchAlertList() {
      if (user && user.email) {
        try {
          const response = await axios.get(`/api/alertlist/?id=${user.email}`);
          setAlerList(response.data);
        } catch (error) {
          console.error("Error fetching alert list:", error);
          alert("Failed to fetch alerts");
        }
      }
    }

    fetchAlertList();
  }, [user]);

  return (
    <>
      <Nav />
      <Background>
        {!user && (
          <OuterBox>
            <Box></Box>
            {!login && (
              <Box>
                <AccountBox>
                  <Title>Sign Up</Title>
                  <label>Name</label>
                  <input
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                  />
                  <label>Email</label>
                  <input
                    placeholder="Enter your email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                  <label>password</label>
                  <input
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                  />{" "}
                  <Button onClick={(ev) => handdleRegistration(ev)}>
                    Sign Up
                  </Button>
                  <RegisterButton onClick={() => setLogin(true)}>
                    <button>Already Registered?</button>
                  </RegisterButton>
                </AccountBox>
              </Box>
            )}

            {login && (
              <Box>
                <AccountBox>
                  <Title>Log In</Title>

                  {/* <label>Name</label>
              <input placeholder="Enter your Name" /> */}
                  <label>Email</label>
                  <input
                    placeholder="Enter your email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                  <label>password</label>
                  <input
                    placeholder="Enter your password"
                    type="password"
                    onChange={(ev) => setPassword(ev.target.value)}
                    value={password}
                  />

                  <Button onClick={(ev) => handleLogin(ev)}>Sign In</Button>
                  <RegisterButton onClick={() => setLogin(false)}>
                    <button> New to site ?</button>
                  </RegisterButton>
                </AccountBox>
              </Box>
            )}
          </OuterBox>
        )}
        {user && (
          <OuterBox>
            <Box>
              <h1>Alert List</h1>
              <ProductRow>
                {alertList.length > 0 ? (
                  alertList.map((l, index) => (
                    <ProductBoxHorizontal key={index} product={l} />
                  ))
                ) : (
                  <p>No Item found</p>
                )}
              </ProductRow>
            </Box>
            <Box>
              {" "}
              Logged in as <b>{user.name}</b>
              <ButtonBox>
                <button
                  onClick={() => {
                    window.localStorage.removeItem("token");
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              </ButtonBox>
            </Box>
          </OuterBox>
        )}
      </Background>
    </>
  );
}
