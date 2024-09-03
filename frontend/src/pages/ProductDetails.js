/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import Chart from "../components/Charts";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import moment from "moment";
import DataContext, { DataProvider } from "../components/dataProvider";
import AlertPopUp from "../components/AlertPopUp";

const OuterLayer = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  background-color: #1e201e;
`;
const Title = styled.h1`
  font-size: medium;
  color: wheat;
  font-size: large;
`;
const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem;
  height: 15rem;
`;
const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;
const ButtonBox = styled.div`
  display: flex;
  gap: 5rem;
`;
const Button = styled.button`
  height: 3rem;
  color: white;
  width: 12rem;
  background-color: ${(props) => (props.primary ? "gray" : "gray")};
  border: 0;
  border-radius: 10px;
  &:hover {
    background-color: ${(props) => (props.primary ? "#ff8225" : "#7A1CAC")};
  }
`;
export default function ProductDetail() {
  const { user } = useContext(DataContext);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [setAlertPopup, isSetAlertPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/server/api/id/?id=" + id);
      const fetchedProduct = response.data;
      setProduct(fetchedProduct);

      if (fetchedProduct.priceHistory) {
        const newGraphData = fetchedProduct.priceHistory.map((ph) => ({
          date: moment(ph.date).format("DD-MM-YY"),
          price: ph.price,
        }));
        newGraphData.push({
          date: moment(fetchedProduct.currentDate).format("DD-MM-YY"),
          price: fetchedProduct.price,
        });
        setGraphData(newGraphData);
      }
    };
    fetchData();
  }, []);

  function goToAmazon(link) {
    console.log(link);
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      link = "https://" + link;
    }
    window.open(link);
  }

  function handlePriceAlert() {
    if (!user) {
      alert("Please Log in first");
    } else {
      isSetAlertPopup(true);
    }
  }
  const Fullpage = styled.div`
    opacity: ${(props) => (props.trigger ? "85%" : "100%")};
  `;
  return (
    <Fullpage trigger={setAlertPopup}>
      <Nav />
      <OuterLayer>
        <ImageBox>
          <img src={product.image} />
        </ImageBox>
        <DetailBox>
          <Title>{product.title} </Title>
          <Title>
            current Price : <b>Rs {product.price}</b>
          </Title>
          <ButtonBox>
            <Button onClick={() => goToAmazon(product.productLink)} primary>
              <b>Visit this on Amazon</b>{" "}
            </Button>
            <Button
              onClick={() => {
                handlePriceAlert();
              }}
            >
              <b>Set Price Alert</b>
            </Button>
          </ButtonBox>
        </DetailBox>
      </OuterLayer>
      <Chart graphData={graphData} />
      {setAlertPopup && (
        <AlertPopUp
          trigger={setAlertPopup}
          setTrigger={isSetAlertPopup}
          product={product}
        />
      )}
    </Fullpage>
  );
}
