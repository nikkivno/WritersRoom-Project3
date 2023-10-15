import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ongoingwork.css";

import Trash from "../images/delete.png";

function Ongoingwork() {
  const [novels, setNovels] = useState([]);
  const currentUserEmail = "seg@seg.com";

  useEffect(() => {
    fetch(`http://localhost:3000/api/novels?email=${currentUserEmail}`)
      .then((response) => response.json())
      .then((data) => {
        setNovels(data);
      })
      .catch((error) => {
        console.error("Error fetching novels: ", error);
      });
  }, [currentUserEmail]);

  const handleDeleteNovel = (novelId) => {
    fetch(`http://localhost:3000/api/novels/${novelId}`, {
      method: "DELETE",
    })
      .then(() => {
        fetch(`http://localhost:3000/api/novels?email=${currentUserEmail}`)
          .then((response) => response.json())
          .then((data) => {
            setNovels(data);
          })
          .catch((error) => {
            console.error("Error fetching novels: ", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting novel: ", error);
      });
  };

  return (
    <div>
      <div className="work-header">
        <h1 className="ongoingwork">ongoing Work</h1>
      </div>
      <div className="book-covers">
        {novels
          .filter((novel) => novel.title) // Filter out novels without a title
          .map((novel) => (
            <div key={novel._id} className="book-cover">
              <Link
                to={`/writing/${novel._id}?title=${novel.title}`}
                style={{ textDecoration: "none", color: "inherit" }}
                key={novel._id}
              >
                <div className="book-cover">
                  <h2>{novel.title}</h2>
                </div>
              </Link>
                <img
                  src={Trash}
                  className="trash"
                  onClick={() => handleDeleteNovel(novel._id)}
                />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Ongoingwork;
