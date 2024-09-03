import React from "react";
import styled from "styled-components";
import CloseButtonIcon from "./CloseButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OuterBox = styled.div`
  position: relative;
  display: flex;
  gap: 2rem;
  background-color: #f3f4f6;
  height: 8rem;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
`;
const Title = styled.h2`
  margin-top: 2rem;
  color: black;
`;
const Imagebox = styled.div`
  position: relative;
  border-right: 1px solid;
  padding-right: 2rem;
  width: 100px;
  border-color: black;
`;
const Image = styled.img`
  height: 8rem;
  width: 7rem;
`;
// const CloseButton = styled.div`
//   position: absolute;
//   top: 16px;
//   right: 1px;
// `;
const ProductBoxHorizontal = ({ product }) => {
  const navigate = useNavigate();
  function handleClick(d) {
    navigate(`/product/${d._id}`);
  }
  async function handleDelete(id) {
    alert(id);
    await axios.delete("");
  }
  return (
    <OuterBox onClick={() => handleClick(product)}>
      <div onClick={() => handleDelete(product._id)}>
        <CloseButtonIcon primary={true}></CloseButtonIcon>
      </div>

      <Imagebox>
        <Image src={product.image} />
      </Imagebox>
      <Title> {product.title}</Title>
    </OuterBox>
  );
};

export default ProductBoxHorizontal;
