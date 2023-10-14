import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/ongoingwork.css';

function Ongoingwork() {
  const [novels, setNovels] = useState([]);
  const currentUserEmail = 'seg@seg.com'; 

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

  return (
    <div>
      <div className="work-header">
        <h1 className="ongoingwork">Ongoing Work</h1>
      </div>
      <div className="book-covers">
        {novels.map((novel) => (
          <div className="book-cover" key={novel._id}>
         
            <Link
              to={`/writing/${novel._id}?title=${novel.title}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h2>{novel.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ongoingwork;