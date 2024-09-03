import { useContext } from "react";
import DataContext from "./dataProvider";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Box = styled.div`
  background-color: #f3f4f6;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 22rem;
  border-radius: 5px;
  border: 3px solid gray;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
`;
const Price = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  color: blue;
  bottom: 0;
  left: 0;
  right: 0;
`;
const ImageArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 195px;
    width: 50%;
  }
  svg {
    height: 1.5rem;
    left: 0;
  }
`;
const Title = styled.h1`
  font-size: medium;
`;
export default function ProductBox({ product }) {
  const navigate = useNavigate();
  function truncateString(str) {
    if (str.length > 100) {
      return str.slice(0, 75 - 3) + "...";
    }
    return str;
  }

  function handleClick(d) {
    navigate(`/product/${d._id}`);
  }
  return (
    <>
      <Box onClick={() => handleClick(product)}>
        <ImageArea>
          <img src={product.image} />
        </ImageArea>
        <Title>{truncateString(product.title)}</Title>

        <Price>
          {" "}
          <h3>current price</h3>
          <h3>Rs {product.price}</h3>
        </Price>
      </Box>
    </>
  );
}
