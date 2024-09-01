import React, { useContext, useState } from "react";
import styled from "styled-components";
import CloseButtonIcon from "./CloseButton";
import axios from "axios";
import DataContext from "./dataProvider";

const OuterBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  height: 100%;
  justify-content: center;
  margin: 0 auto;

  width: 100%;
  background-color: transparent;
  flex-direction: column;
  align-items: center;
`;
const PopupBox = styled.div`
  box-shadow: 0 0 15px black;
  position: relative;
  padding: 5rem;
  background-color: #ececec;
  width: 100%;
  max-width: 320px;
  justify-content: center;
  border-radius: 15px;
  border: solid $b rgba(#000, 0.2);
  form {
    display: flex;
    flex-direction: column;

    /* gap: 1rem; */
  }
`;
const Field = styled.div`
  display: flex;
  gap: 1rem;
  h4 {
    font-weight: normal;
  }
  input {
    border: none;
    background-color: transparent;
    border-bottom: 2px solid;
    outline: none;
  }
`;
const CloseButton = styled.div`
  cursor: pointer;
`;
const AlertTitle = styled.h1`
  position: absolute;
  top: 16px;
  margin: 0;
  padding: 0;
`;
const CheckBox = styled.input`
  transform: scale(2);
`;
const SaveButtonBox = styled.div`
  display: flex;
  justify-content: right;

  button {
    margin-top: 10px;
    height: 2.5rem;
    width: 100%;
    background-color: #607274;
    color: white;
    border-radius: 10px;
  }
`;

const AlertPopUp = ({ setTrigger, product }) => {
  const { user } = useContext(DataContext);
  const CustomAmount = product.price
    ? Number(product.price.replace(/,/g, ""))
    : 0;
  const [customAlert, setCustomAlert] = useState(false);
  const [amount, setAmount] = useState(CustomAmount);
  async function handleSubmit(ev, setTrigger) {
    ev.preventDefault();
    setTrigger(false);
    const data = { user, amount, id: product._id };
    const response = await axios.post("http://localhost:9000/emailalert", data);
    console.log(response.data);
    alert("Email Alert Enabled");
  }
  return (
    <OuterBox>
      <PopupBox>
        <CloseButton
          onClick={(ev) => {
            ev.preventDefault();
            setTrigger(false);
          }}
        >
          <CloseButtonIcon />
        </CloseButton>
        <AlertTitle>Email Alert when </AlertTitle>
        <form>
          <Field>
            <CheckBox
              type="checkbox"
              checked={!customAlert}
              onClick={() => setCustomAlert(false)}
            />
            <label>
              <h4>price is less than Rs {product.price}</h4>
            </label>
          </Field>

          <Field>
            <CheckBox
              type="checkbox"
              onClick={() => setCustomAlert(true)}
              checked={customAlert}
            />
            <label>
              <h4>the price drops below set amount </h4>
            </label>
          </Field>
          {customAlert && (
            <Field>
              <label>Custom Amount Rs </label>
              <input
                type="number"
                required
                value={amount}
                onChange={(ev) => setAmount(ev.target.value)}
              />
            </Field>
          )}

          <SaveButtonBox>
            <button onClick={(ev) => handleSubmit(ev, setTrigger)}>Save</button>
          </SaveButtonBox>
        </form>
      </PopupBox>
    </OuterBox>
  );
};

export default AlertPopUp;
