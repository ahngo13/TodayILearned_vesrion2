import React, { useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { loadReCaptcha, ReCaptcha } from "react-recaptcha-v3";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

function LoginForm(){

  const joinEmail = useRef();
  const joinName = useRef();
  const joinPw = useRef();
  const loginEmail = useRef();
  const loginPw = useRef();

  useEffect(()=>{
    loadReCaptcha("6LfGieAUAAAAAJSOoqXS5VQdT_e5AH8u0n2e1PDb");
  },[]);

  const verifyCallback = recaptchaToken => {
    // Here you will get the final recaptchaToken!!!
    console.log(recaptchaToken, "<= your recaptcha token");
  };

  const join = () => {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const regExp2 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (joinEmail.current.value === "" || joinEmail.current.value === undefined) {
      alert("이메일 주소를 입력해주세요.");
      joinEmail.current.focus();
      return;
    } else if (
      joinEmail.current.value.match(regExp) === null ||
      joinEmail.current.value.match(regExp) === undefined
    ) {
      alert("이메일 형식에 맞게 입력해주세요.");
      joinEmail.current.value = "";
      joinEmail.current.focus();
      return;
    } else if (joinName.current.value === "" || joinName.current.value === undefined) {
      alert("이름을 입력해주세요.");
      joinName.current.focus();
      return;
    } else if (joinPw.current.value === "" || joinPw.current.value === undefined) {
      alert("비밀번호를 입력해주세요.");
      joinPw.current.focus();
      return;
    } else if (
      joinPw.current.value.match(regExp2) === null ||
      joinPw.current.value.match(regExp2) === undefined
    ) {
      alert("비밀번호를 숫자와 문자, 특수문자 포함 8~16자리로 입력해주세요.");
      joinPw.current.value = "";
      joinPw.current.focus();
      return;
    }

    const send_param = {
      headers,
      email: joinEmail.current.value,
      name: joinName.current.value,
      password: joinPw.current.value
    };
    axios
      .post("http://localhost:8080/member/join", send_param)
      //정상 수행
      .then(returnData => {
        if (returnData.data.message) {
          alert(returnData.data.message);
          //이메일 중복 체크
          if (returnData.data.dupYn === "1") {
            joinEmail.current.value = "";
            joinEmail.current.focus();
          } else {
            joinEmail.current.value = "";
            joinName.current.value = "";
            joinPw.current.value = "";
          }
        } else {
          alert("회원가입 실패");
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };
  const login = () => {

    if (loginEmail.current.value === "" || loginEmail.current.value === undefined) {
      alert("이메일 주소를 입력해주세요.");
      loginEmail.current.focus();
      return;
    } else if (loginPw.current.value === "" || loginPw.current.value === undefined) {
      alert("비밀번호를 입력해주세요.");
      loginPw.current.focus();
      return;
    }

    const send_param = {
      headers,
      email: loginEmail.current.value,
      password: loginPw.current.value
    };
    axios
      .post("http://localhost:8080/member/login", send_param)
      //정상 수행
      .then(returnData => {
        if (returnData.data.message) {
          // console.log("login_id:" + returnData.data._id);
          $.cookie("login_id", returnData.data._id, { expires: 1 });
          $.cookie("login_email", returnData.data.email, { expires: 1 });
          alert(returnData.data.message);
          window.location.reload();
        } else {
          alert(returnData.data.message);
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };
  const formStyle = {
    margin: 50
  };
  const buttonStyle = {
    marginTop: 10
  };

  return (
    <Form style={formStyle}>
      <Form.Group controlId="joinForm">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          maxLength="100"
          ref={joinEmail}
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        <Form.Label>name</Form.Label>
        <Form.Control
          type="text"
          maxLength="20"
          ref={joinName}
          placeholder="name"
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          maxLength="64"
          ref={joinPw}
          placeholder="Password"
        />
        <Button
          style={buttonStyle}
          onClick={join}
          variant="primary"
          type="button"
          block
        >
          회원가입
        </Button>
      </Form.Group>

      <Form.Group controlId="loginForm">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          maxLength="100"
          ref={loginEmail}
          placeholder="Enter email"
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          maxLength="20"
          ref={loginPw}
          placeholder="Password"
        />
        <ReCaptcha
          sitekey="6LfGieAUAAAAAJSOoqXS5VQdT_e5AH8u0n2e1PDb"
          action="login"
          verifyCallback={verifyCallback}
        />
        <Button
          style={buttonStyle}
          onClick={login}
          variant="primary"
          type="button"
          block
        >
          로그인
        </Button>
      </Form.Group>
    </Form>
  );
}

export default LoginForm;
