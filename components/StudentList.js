import React from "react";
import { Link } from "react-router-dom";
import CardInfo from "./StudentCard";

const StudentList = (props) => {
  const deleteDetailsHandler = (id) => {
    props.getDetailId(id);
  };
  const renderStudentList = props.details.map((detail) => {
    return (
      <CardInfo detail={detail} clickHandler={deleteDetailsHandler}></CardInfo>
    );
  });
  return (
    <div class="main">
      <h2>Student list</h2>
      <Link to="/add">
        <button className="ui button blue right">Add Student</button>
      </Link>
      <div className="ui celled list">{renderStudentList}</div>
    </div>
  );
};

export default StudentList;
