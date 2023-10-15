import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ongoingwork.css';

import Trash from '../images/delete.png';

function Ongoingwork() {
  const [novels, setNovels] = useState([]);
  const currentUserEmail = 'test@email.com';

  useEffect(() => {
    fetch(`http://localhost:3000/api/novels?email=${currentUserEmail}`)
      .then((response) => response.json())
      .then((data) => {
        setNovels(data);
      })
      .catch((error) => {
        console.error('Error fetching novels: ', error);
      });
  }, [currentUserEmail]);

  async function handleDeleteNovel(event) {
    // get novel id of clicked delete icon
    const novelId = event.target.parentNode.parentNode.getAttribute('data-id');

    try {
      // delete novel from db
      const response = await fetch(`/api/novels/${novelId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // remove novel from page
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
        <h1 className="ongoingwork">Ongoing Work</h1>
      </div>
      <div className="book-covers">
        {novels.map((novel) => (
          <div className="book-cover" key={novel._id} data-id={novel._id}>
            <Link
              to={`/writing/${novel._id}?title=${novel.title}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h2>{novel.title}</h2>
            </Link>
            <div onClick={handleDeleteNovel}>
              <img src={Trash} className="trash" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ongoingwork;
