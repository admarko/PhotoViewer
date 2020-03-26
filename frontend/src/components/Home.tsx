import React, { useState, useEffect } from "react";
import Gallery from "react-photo-gallery";

import axios from "axios";
import Switch from "react-switch";
import { Icon } from "ts-react-feather-icons";
import classnames from "classnames";

import { API_URL } from "../constants";

import "./__styles__/Home.scss";

type photoFormat = {
  src: string;
  width: number;
  height: number;
  photo_id: number;
};

export default function Home() {
  const [data, setData] = useState({
    photos: [],
    count: 0,
  });
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
    axios.get(API_URL + pageURL).then(res => setData({
      photos: res.data.results,
      count: res.data.count,
    }));
  }

  useEffect(() => {
    fetchPhotos();
  }, [pageSize, pageNum]); // eslint-disable-line

  function toggleColor() {
    setColor(!color);
  }

  function handlePageChange(selectedPageNum: number) {
    setPageNum(selectedPageNum);
  }

  function handlePageSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPageNum(1);
    setPageSize(+e.target.value);
  }

  function getPhotos() {
    const grayscaleURL = color ? "" : "?grayscale";
    const galleryPhotos: photoFormat[] = [];
    data.photos.map((photo: photoFormat) => galleryPhotos.push({
      ...photo,
      src: photo.src + grayscaleURL,
    }));
    return <Gallery photos={galleryPhotos} />;
  }

  function PageScroll(currPage: { pageNum: number }) {
    const currentPageNum = currPage.pageNum;
    const nextPage = (
      <span
        onClick={() => handlePageChange(currentPageNum + 1)}
        className="scroll-button"
      >
        Next Page <Icon name="chevrons-right" color="black" size={20} />
      </span>
    );
    const prevPage = (
      <span
        onClick={() => handlePageChange(currentPageNum - 1)}
        className="scroll-button"
      >
        <Icon name="chevrons-left" color="black" size={20} />
        Prev Page{" "}
      </span>
    );

    if (currentPageNum === 1) {
      return nextPage;
    }
    if (currentPageNum === numPages) {
      return prevPage;
    }
    return (
      <div>
        {prevPage} {nextPage}
      </div>
    );
  }

  return (
    <div className="app-container">
      <div>
        <Switch onChange={toggleColor} checked={color} />
      </div>
      <div>
        <span>Pics per page: </span>
        <select id="picsPerPage" onChange={handlePageSizeChange}>
          {pageSizeOptions.map(picsPerPage => (
            <option value={picsPerPage} key={picsPerPage}>
              {picsPerPage}
            </option>
          ))}
        </select>
      </div>
      <div className="photo-container">{getPhotos()}</div>
      <div className="footer">
        <div className="page-links">
          Page:{" "}
          {pageLinks.map(pageLink => {
            const pageLinkStyle = classnames("page-link", {
              selected: pageLink === pageNum,
            });
            return (
              <span
                onClick={() => handlePageChange(pageLink)}
                key={pageLink}
                className={pageLinkStyle}
              >
                {pageLink}
              </span>
            );
          })}
        </div>
        {numPages !== 1 && (
          <div className="page-scroll">
            <PageScroll pageNum={pageNum} />
          </div>
        )}
      </div>
    </div>
  );
}
