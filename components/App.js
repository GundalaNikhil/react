import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddStudent from "./AddStudent.js";
import StudentList from "./StudentList.js";
import ReactDom from "react-dom";
import { uuid } from "uuidv4";
import DetailCard from "./StudentDetail";
import EditDetail from "./EditDetail";
import api from "../api/details.js";

function App() {
  const LSK = "details";
  const [details, setDetails] = useState([]);

  const addDetailHandler = async (detail) => {
    console.log(detail);
    const request = {
      id: uuid(),
      ...detail,
    };

    const res = await api.post("/details", request);
    setDetails([...details, res.data]);
  };

  const retreiveDetails = async () => {
    const res = await api.get("/details");
    return res.data;
  };
  const updateDetailHandler = async (detail) => {
    const res = await api.put(`/details/${detail.id}`, detail);
    //console.log(res.data);
    const { id, name, email } = res.data;
    setDetails(
      details.map((detail) => {
        return detail.id === id ? { ...res.data } : detail;
      })
    );
  };

  const removeDetailHandler = async (id) => {
    await api.delete(`/details/${id}`);
    const newDetailList = details.filter((detail) => {
      return detail.id !== id;
    });

    setDetails(newDetailList);
  };

  useEffect(() => {
    // const retreiveDetails = JSON.parse(localStorage.getItem(LSK));
    // if (retreiveDetails) setDetails(retreiveDetails);
    const getAllDetails = async () => {
      const allDetails = await retreiveDetails();
      if (allDetails) setDetails(allDetails);
    };
    getAllDetails();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LSK, JSON.stringify(details));
  }, [details]);

  return (
    <div className="ui container">
      <Router>
        <Header />

        <Switch>
          <Route
            exact
            path="/add"
            render={(props) => (
              <AddStudent {...props} addDetailHandler={addDetailHandler} />
            )}
          ></Route>
          <Route
            exact
            path="/"
            render={(props) => (
              <StudentList
                {...props}
                details={details}
                getDetailId={removeDetailHandler}
              />
            )}
          ></Route>

          <Route exact path="/detail/:id" component={DetailCard} />

          <Route
            exact
            path="/edit"
            render={(props) => (
              <EditDetail
                {...props}
                details={details}
                updateDetailHandler={updateDetailHandler}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
