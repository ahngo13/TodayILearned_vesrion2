import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

function BoardRow(props){
    return (
      <tr>
        <td>
          <NavLink
            to={{ pathname: "/board/detail", query: { _id: props._id } }}
          >
            {props.createdAt.substring(0, 10)}
          </NavLink>
        </td>
        <td>
          <NavLink
            to={{ pathname: "/board/detail", query: { _id: props._id } }}
          >
            {props.title}
          </NavLink>
        </td>
      </tr>
    );
}

function BoardForm(props){

  const [boardList, setBoardList] = useState();

  useEffect(()=>{
    getBoardList();
  },[]);

  const getBoardList = () => {
    const send_param = {
      headers,
      _id: $.cookie("login_id")
    };
    axios
      .post("http://localhost:8080/board/getBoardList", send_param)
      .then(returnData => {
        if (returnData.data.list.length > 0) {
          // console.log(returnData.data.list.length);
          const boards = returnData.data.list;
          const boardContents = boards.map(item => (
            <BoardRow
              key={Date.now() + Math.random() * 500}
              _id={item._id}
              createdAt={item.createdAt}
              title={item.title}
            ></BoardRow>
          ));
          // console.log(boardList);
          setBoardList(boardContents);
        } else {
          const boardList = (
            <tr>
              <td colSpan="2">작성한 게시글이 존재하지 않습니다.</td>
            </tr>
          );
          setBoardList(boardList);
          // window.location.reload();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

    const divStyle = {
      margin: 50
    };

  return (
    <div>
      <div style={divStyle}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>날짜</th>
              <th>글 제목</th>
            </tr>
          </thead>
          <tbody>{boardList}</tbody>
        </Table>
      </div>
    </div>
  );
}

export default BoardForm;
