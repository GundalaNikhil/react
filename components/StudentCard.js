import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";
const CardInfo = (props) => {
  const { id, name, email } = props.detail;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user"></img>
      <div className="content">
        <Link
          to={{ pathname: `/detail/${id}`, state: { detail: props.detail } }}
        >
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
        onClick={() => props.clickHandler(id)}
      ></i>

      <Link to={{ pathname: `/edit`, state: { detail: props.detail } }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
};

export default CardInfo;
