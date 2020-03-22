import React, { useState, useEffect } from "react";
import Photo from "./Photo";
import axios from "axios";

import { API_URL } from "../constants";

export default function Home() {
  const [data, setData] = useState({ photos: [] });

  function fetchPhotos() {
    axios.get(API_URL).then(res => setData({ photos: res.data }));
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  function getPhotos() {
    return (
      <div>
        {data.photos.map(photo => {
          return (
            <Photo
              key={photo.photo_id + photo.height + photo.width}
              url={photo.url}
              height={photo.height}
              width={photo.width}
              photoId={photo.photo_id}
            />
          );
        })}
      </div>
    );
  }

  return <div>{getPhotos()}</div>;
}
