import styled from "styled-components";
import { Link } from "react-router-dom";
import DataContext from "./dataProvider";
import { useContext } from "react";

const Navbar = styled.nav`
  position: relative;
  background-color: #1a56db;
  justify-content: space-between;
  align-items: center;
  display: flex;
  height: 2.7rem;
  border: solid $b rgba(#000, 0.2);
`;
const Logo = styled.div`
  color: wheat;
  text-align: left;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
`;
const TitleBars = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const LinkItem = styled.h3`
  color: wheat;
  margin: 0 1rem;
  white-space: nowrap;
  a {
    color: white;
    text-decoration: none;
  }
`;
export default function Nav() {
  const { user } = useContext(DataContext);
  return (
    <Navbar>
      <TitleBars>
        <Logo>
          <LinkItem>
            <Link to="/">Price History</Link>
          </LinkItem>
        </Logo>
        <Links>
          <LinkItem>
            <Link to="/alls">alls</Link>
          </LinkItem>
          <LinkItem>
            <Link to="/all">All</Link>
          </LinkItem>
          <LinkItem>
            {user && (
              <Link to="/login">
                {user.name.substring(0, user.name.indexOf(" "))}{" "}
              </Link>
            )}
            {!user && <Link to="/login">Login </Link>}
          </LinkItem>
        </Links>
      </TitleBars>
    </Navbar>
  );
}
