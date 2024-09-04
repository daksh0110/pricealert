import styled from "styled-components";
import DataContext from "./dataProvider";
import { useContext, useEffect, useState } from "react";
import ProductBox from "./ProductBox";
import Spinnner from "./Spinner";
import axios from "axios";

const OuterArea = styled.div`
  background-color: #272829;
  margin: 0 5rem;
  display: grid;
  grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;
  gap: 2rem;
  @media screen and (max-width: 1400px) {
    grid-template-columns: 0.3fr 0.3fr 0.3fr;
  }
  @media screen and (max-width: 1000px) {
    grid-template-columns: 0.5fr 0.5fr;
  }
`;
const LoadingAnimation = styled.div`
  display: flex;
  justify-content: center;
`;
const NoProductTitle = styled.div`
  display: flex;
  justify-content: center;
`;
export default function ProductLayout() {
  const { data, isLoading, setData } = useContext(DataContext);

  console.log(data);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    await axios.get(process.env.BASE_URL + "/server/api/").then((res) => {
      setData(res.data[0]);
      console.log(res.data);
    });
  }
  return (
    <>
      {data.length === 0 && <NoProductTitle>No product found</NoProductTitle>}
      {data.length > 0 && (
        <OuterArea>
          {data.map((d, index) => (
            <ProductBox key={index} product={d} />
          ))}
        </OuterArea>
      )}

      {isLoading && (
        <LoadingAnimation>
          <Spinnner />
        </LoadingAnimation>
      )}
    </>
  );
}
