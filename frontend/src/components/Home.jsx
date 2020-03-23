import React, { useState, useEffect } from "react";
import Photo from "./Photo";

import axios from "axios";
import Switch from "react-switch";

import { API_URL } from "../constants";

export default function Home() {
  const [data, setData] = useState({ photos: [] });
  const [color, setColor] = useState(true);

  function fetchPhotos() {
    axios.get(API_URL).then(res => setData({ photos: res.data }));
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  function toggleColor() {
    setColor(!color);
  }

  function getPhotos() {
    const grayscaleURL = color ? "" : "?grayscale";
    return (
      <div>
        {data.photos.map(photo => {
          return (
            <Photo
              key={photo.photo_id + photo.height + photo.width}
              url={photo.url + grayscaleURL}
              height={photo.height}
              width={photo.width}
              photoId={photo.photo_id}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <div>
        <Switch onChange={toggleColor} checked={color} />
      </div>
      {getPhotos()}
    </div>
  );
}
