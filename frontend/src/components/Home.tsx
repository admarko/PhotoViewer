import React, { useState, useEffect, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

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
  srcSet: string[];
  source: string;
};

type dimensionFormat = {
  height: number;
  width: number;
};

export default function Home() {
  const [data, setData] = useState({
    photos: [],
    count: 0,
  });
  const [color, setColor] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [allDimensions, setAllDimensions] = useState([]);
  const [selectedDimension, setSelectedDimension] = useState("");

  const pageSizeOptions = [10, 20, 30, 40, 50];
  const numPages = Math.ceil(data.count / pageSize);
  const pageLinks = [];
  for (let i = 1; i < numPages + 1; i += 1) {
    pageLinks.push(i);
  }

  function fetchDimensions() {
    axios.get(`${API_URL}/dimensions`).then(res => setAllDimensions(res.data));
  }

  useEffect(() => {
    fetchDimensions();
  }, []);

  function fetchPhotos() {
    let dimensionURL = "";
    if (selectedDimension !== "") {
      const dims = selectedDimension.split(" x ");
      dimensionURL = `&width=${dims[0]}&height=${dims[1]}`;
    }
    const pageURL = `?page=${pageNum}&pageSize=${pageSize}${dimensionURL}`;
    axios.get(API_URL + pageURL).then(res => setData({
      photos: res.data.results,
      count: res.data.count,
    }));
  }

  useEffect(() => {
    fetchPhotos();
  }, [pageSize, pageNum, selectedDimension]); // eslint-disable-line

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

  function handleDimensionChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedDimension(e.target.value);
  }

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  function getPhotos() {
    const grayscaleURL = color ? "" : "?grayscale";
    const galleryPhotos: photoFormat[] = [];
    data.photos.map((photo: photoFormat) => galleryPhotos.push({
      ...photo,
      src: photo.src + grayscaleURL,
    }));
    return (
      <div>
        <Gallery photos={galleryPhotos} onClick={openLightbox} />;
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel currentIndex={currentImage} views={galleryPhotos} />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
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
      <div>
        <span>Specific Dimensions: </span>
        <select id="dimensions" onChange={handleDimensionChange}>
          <option value="" label="N/A" />
          {allDimensions.map((dimension: dimensionFormat) => {
            const combinedDimension = `${dimension.width} x ${dimension.height}`;
            return (
              <option value={combinedDimension} key={combinedDimension}>
                {combinedDimension}
              </option>
            );
          })}
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
