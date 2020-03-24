import React, { useState, useEffect } from "react";

import axios from "axios";
import Switch from "react-switch";

import Photo from "./Photo";

import { API_URL } from "../constants";

export default function Home() {
  const [data, setData] = useState({ photos: [], count: 0 });
  const [color, setColor] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const pageSizeOptions = [10, 20, 30, 40, 50];
  const numPages = Math.ceil(data.count / pageSize);
  const pageLinks = [];
  for (let i = 1; i < numPages + 1; i += 1) {
    pageLinks.push(i);
  }

  function fetchPhotos() {
    const pageURL = `?page=${pageNum}&pageSize=${pageSize}`;
    axios
      .get(API_URL + pageURL)
      .then(res =>
        setData({ photos: res.data.results, count: res.data.count })
      );
  }

  useEffect(() => {
    fetchPhotos();
  }, [pageSize, pageNum]);

  function toggleColor() {
    setColor(!color);
  }

  function handlePageChange(selectedPageNum) {
    setPageNum(selectedPageNum);
  }

  function handlePageSizeChange(e) {
    setPageNum(1);
    setPageSize(e.target.value);
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

  function PageScroll(currPage) {
    const currentPageNum = currPage.pageNum;
    if (currentPageNum === 1) {
      return (
        <span onClick={() => handlePageChange(currentPageNum + 1)}>
          Next Page
        </span>
      );
    } else if (currentPageNum === numPages) {
      return (
        <span onClick={() => handlePageChange(currentPageNum - 1)}>
          Prev Page
        </span>
      );
    }
    return (
      <div>
        <span onClick={() => handlePageChange(currentPageNum - 1)}>
          Prev Page
        </span>{" "}
        <span onClick={() => handlePageChange(currentPageNum + 1)}>
          Next Page
        </span>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Switch onChange={toggleColor} checked={color} />
      </div>
      <div>
        <label htmlFor="picsPerPage">Pics per page:</label>
        <select id="picsPerPage" onChange={handlePageSizeChange}>
          {pageSizeOptions.map(pageSize => {
            return (
              <option value={pageSize} key={pageSize}>
                {pageSize}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        Page:{" "}
        {pageLinks.map(pageLink => {
          return (
            <span onClick={() => handlePageChange(pageLink)} key={pageLink}>
              {`${pageLink} `}
            </span>
          );
        })}
      </div>
      {getPhotos()}
      {numPages !== 1 && (
        <div>
          <PageScroll pageNum={pageNum} />
        </div>
      )}
    </div>
  );
}
