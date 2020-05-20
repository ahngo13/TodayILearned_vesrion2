import React, { useState, useEffect } from "react";
import { Navbar, Button, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

function Header(){

  const [buttonDisplay, setButtonDisplay] = useState("none");
  
  useEffect(() => {
    getButtonStyle();
  }, []);

  function getButtonStyle(){
    if ($.cookie("login_id")) {
      setButtonDisplay("block");
    } else {
      setButtonDisplay("none");
    }
  }
  

  function logout(){
    axios
      .get("http://localhost:8080/member/logout", {
        headers
      })
      .then(returnData => {
        if (returnData.data.message) {
          $.removeCookie("login_id");
          alert("로그아웃 되었습니다!");
          window.location.href = "/";
        }
      });
  };

  const buttonStyle = {
    margin: "0px 5px 0px 10px",
    display: buttonDisplay
  };

  return (
    <div>
      <Navbar>
        <Navbar.Brand href="/">Today I Learned</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* <NavLink to="/mypage">
            <Button style={buttonStyle} variant="primary">
              회원정보 수정
            </Button>
          </NavLink> */}
          <NavLink to="/">
            <Button style={buttonStyle} variant="primary">
              글목록
            </Button>
          </NavLink>
          <NavLink to="/boardWrite">
            <Button style={buttonStyle} variant="primary">
              글쓰기
            </Button>
          </NavLink>
          <Button style={buttonStyle} onClick={logout} variant="primary">
            로그아웃
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Image src="./img/main.png" fluid />
    </div>
  );
  
}

export default Header;
