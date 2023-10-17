import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ongoingwork.css";

import Trash from "../images/delete.png";

import decode from "jwt-decode";

function Ongoingwork() {
  const [novels, setNovels] = useState([]);
  const token = localStorage.getItem("jwt");
  const currentUserEmail = decode(token).email;

  useEffect(() => {
    let isMounted = true;

    // Fetch novels based on the current user's email
    fetch(`/api/novels?email=${currentUserEmail}`)
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setNovels(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching novels: ", error);
      });

    return () => {
      isMounted = false;
    };
  }, [currentUserEmail]);

  async function handleDeleteNovel(event) {
    const novelId = event.target.parentNode.parentNode.getAttribute("data-id");

    try {
      const response = await fetch(`/api/novels/${novelId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setNovels(novels.filter((novel) => novel._id !== novelId));
      }
    } catch (error) {
      console.log(`Error deleting novel with id: ${novelId}. Error: ${error}`);
    }
  }

  return (
    <div>
      <div className="work-header">
        <h1 className="ongoingwork">ongoing Work</h1>
      </div>
      <div className="book-covers">
        {novels.map((novel) => (
          <div className="book-cover" key={novel._id} data-id={novel._id}>
            <Link
              to={`/writing/${novel._id}?title=${novel.title}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h2>{novel.title}</h2>
            </Link>
            <div onClick={handleDeleteNovel}>
              <img src={Trash} className="trash" alt="Delete" />
            </div>
          </div>
        ))};
      </div>
    </div>
  );
}

export default Ongoingwork;
