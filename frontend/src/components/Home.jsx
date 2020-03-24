import React, { useState, useEffect } from "react";

import axios from "axios";
import Switch from "react-switch";

import Photo from "./Photo";

import { API_URL } from "../constants";

export default function Home() {
  const [data, setData] = useState({ photos: [], count: 0 });
  const [color, setColor] = useState(true);
  const [pageNum, setPageNum] = useState(1);

  function fetchPhotos() {
    const pageURL = "?page=" + pageNum;
    axios
      .get(API_URL + pageURL)
      .then(res =>
        setData({ photos: res.data.results, count: res.data.count })
      );
  }

  useEffect(() => {
    fetchPhotos();
  }, [pageNum]);

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

  const picsPerPage = 10;
  const numPages = data.count / picsPerPage;
  let pageLinks = [];
  for (let i = 1; i < numPages + 1; i++) {
    pageLinks.push(i);
  }

  function PageScroll(pageNum) {
    const currentPageNum = pageNum.pageNum;
    if (currentPageNum === 1) {
      return (
        <span onClick={() => setPageNum(currentPageNum + 1)}>Next Page</span>
      );
    } else if (currentPageNum === numPages) {
      return (
        <span onClick={() => setPageNum(currentPageNum - 1)}>Prev Page</span>
      );
    } else {
      return (
        <div>
          <span onClick={() => setPageNum(currentPageNum - 1)}>Prev Page</span>{" "}
          <span onClick={() => setPageNum(currentPageNum + 1)}>Next Page</span>
        </div>
      );
    }
  }

  return (
    <div>
      <div>
        <Switch onChange={toggleColor} checked={color} />
      </div>
      <div>
        Page{" "}
        {pageLinks.map(pageLink => {
          return (
            <span onClick={() => setPageNum(pageLink)} key={pageLink}>
              {pageLink + " "}
            </span>
          );
        })}
      </div>
      {getPhotos()}
      <div>
        <PageScroll pageNum={pageNum} />
        DELETE THIS
      </div>
    </div>
  );
}
