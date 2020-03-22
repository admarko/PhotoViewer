import React, { useEffect, useState } from "react";

import Photo from "./Photo.tsx";

export default function App() {
  const [data, setData] = useState({ data: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchPhotos = () => {
    setLoading(true);
    setError(false);
    try {
      fetch("api/photos")
        .then(response => {
          if (response.status > 400) {
            setError(true);
          }
          return response.json();
        })
        .then(data => {
          setData(data);
        });
    } catch (e) {
      console.log(`There was an error: ${e.message}`); // eslint-disable-line no-console
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  function getPosts() {
    return (
      <div>
        <ul>
          {Array.isArray(data) &&
            data.map(photo => {
              return (
                <Photo
                  url={photo.url}
                  height={photo.height}
                  width={photo.width}
                  photo_id={photo.photo_id}
                />
              );
            })}
        </ul>
      </div>
    );
  }

  function getContent() {
    if (loading) return <p>Fetching posts...</p>;
    if (error) return <p>{error}</p>;
    if (!data) return null;
    return getPosts();
  }

  return <div>{getContent()}</div>;
}
