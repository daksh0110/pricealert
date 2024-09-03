import axios from "axios";
import { useState, useContext } from "react";
import styled from "styled-components";
import DataContext from "./dataProvider";
const OuterBox = styled.div`
  background-color: #1e201e;
  border-radius: 15px;
  margin: 5rem;
  height: 20rem;
  justify-content: center;
  align-items: center;
`;
const SearchContainer = styled.div`
  color: wheat;
  width: 81%;
  height: 100%;
  margin: 0 auto;

  h1 {
    padding-top: 2rem;
  }
  input {
    height: 2rem;
    width: 99%;
    color: wheat;
    background-color: transparent;
    border-top: transparent;
    border-left: transparent;
    border-right: transparent;
    outline: none;
    caret-color: white;

    &::-webkit-input-placeholder {
      color: white;
    }
    &:focus::-webkit-input-placeholder {
      color: transparent;
    }
  }
`;
const CheckBox = styled.div`
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rem;
  input {
    width: min-content;

    height: min-content;
    transform: scale(2);
  }
`;
const SearchBox = styled.div`
  display: flex;
  gap: 5px;
  button {
    color: white;
    font-weight: bold;
    width: 10%;
    background-color: #1a56db;
    border: transparent;
    border-radius: 10px;
  }
`;
const CheckBoxItem = styled.div`
  margin-top: 1rem;
  label {
    margin-right: 1rem;
  }
`;
export default function Search() {
  const [checkboxLink, setCheckBoxLink] = useState(false);
  const [checkboxItem, setCheckBoxItem] = useState(true);
  const [searchText, SetSearchText] = useState("");
  const { setData, setLoading } = useContext(DataContext);
  function handleChange(ev) {
    const value = ev.target.value;

    if (value === "Item") {
      setCheckBoxItem(true);
      setCheckBoxLink(false);
    } else {
      setCheckBoxItem(false);
      setCheckBoxLink(true);
    }
  }
  async function handleSearch() {
    setData([]);
    if (checkboxItem) {
      setLoading(true);
      await axios
        .get("/server/api/Search/?searchquery=" + searchText)
        .then((res) => {
          setTimeout(() => {
            setData(res.data);
            setLoading(false);
          }, 2000);
        });
    } else if (checkboxLink) {
      setLoading(true);
      await axios
        .get("/server/api/Search/?searchquery=" + searchText)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          setLoading(false);
        });
      console.log("Link");
    }
  }
  return (
    <OuterBox>
      <SearchContainer>
        <h1>Search Any Product</h1>
        <SearchBox>
          <input
            placeholder="Enter product Link or name"
            value={searchText}
            onChange={(ev) => SetSearchText(ev.target.value)}
          />
          <button type="button" onClick={() => handleSearch()}>
            Search
          </button>
        </SearchBox>

        <CheckBox>
          <div>
            <CheckBoxItem>
              <label>Product Link</label>
              <input
                type="checkbox"
                value={"Link"}
                checked={checkboxLink}
                onChange={(ev) => handleChange(ev)}
              />
            </CheckBoxItem>
          </div>
          <div>
            <CheckBoxItem>
              <label>Item Name</label>
              <input
                type="checkbox"
                value={"Item"}
                checked={checkboxItem}
                onChange={(ev) => handleChange(ev)}
              />
            </CheckBoxItem>
          </div>
        </CheckBox>
      </SearchContainer>
    </OuterBox>
  );
}
