import axios from "axios";
import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";


const Pagination = () => {

    const navigate = useNavigate()
  const [state, setState] = useState([]);
  const [paginated, setPaginated] = useState([]);
  const [currentPage, setCurrentpage] = useState(1);
  const [darkMode, setDarkMode] = useState(false)

  const pageSize = 10;
  const pageCount = state ? Math.ceil(state.length / pageSize) : 0;
  const pages = _.range(1, pageCount + 1);


  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setState(res.data);
      setPaginated(_(res.data).slice(0).take(pageSize).value());
    });
  }, []);
  
  const pagination = (pageNo) => {
    setCurrentpage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const PaginatedPost = _(state).slice(startIndex).take(pageSize).value();
    setPaginated(PaginatedPost);
  };

  const Logout = () => {
    localStorage.removeItem("loginCredentials");
    navigate("/")
  }
 
  const toggleDarkMode = () => {
      if(darkMode === true){
          setDarkMode(false)
      }else{
          setDarkMode(true)
      }
  }


  return (
    <div id='one' className={darkMode === true ? "bg-dark text-white" : ""} >
      <div className="nav_body">
         <div> <h3> User Post's</h3></div>
         <div> <button type="submit" className="btn btn-success" onClick={() => Logout()}> Logout</button></div>
      </div>
      <div className="container">
      <h4 className="my-3"><input type="checkbox" onClick={() => {toggleDarkMode()}}/> Light Mode / Dark Mode</h4>
      {paginated.map((ele, i) => {
        return (
          <div className={darkMode === true ? "col-12 list_body_dark my-2 " : "col-12 list_body my-2"} key={i}>
            <h4>{ele.id}. {ele.title}</h4>
            <p> {ele.body}</p>
          </div>
        );
      })}
      </div>
      <div>
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            {pages.map((page) => {
              return (
                <li
                  className={
                    page === currentPage  ? "page-item active" : "page-item"
                  }
                >
                  <p className="page-link" onClick={() => pagination(page)}>
                    {" "}
                    {page}{" "}
                  </p>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
