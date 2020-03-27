import "./__styles__/Home.scss";

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";
import Gallery from "react-photo-gallery";

import { API_URL } from "../constants";
import Footer from "./Footer";
import Header from "./Header";

type photoFormat = {
  src: string;
  width: number;
  height: number;
  photo_id: number;
  srcSet: string[];
  source: string;
};

export default function Home() {
  const [data, setData] = useState({
    photos: [],
    count: 0,
  });
  const [color, setColor] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(20);
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
        <Gallery photos={galleryPhotos} onClick={openLightbox} />
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

  return (
    <div className="app-container">
      <Header
        color={color}
        toggleColor={toggleColor}
        handleDimensionChange={handleDimensionChange}
        allDimensions={allDimensions}
        handlePageSizeChange={handlePageSizeChange}
        pageSizeOptions={pageSizeOptions}
        pageSize={pageSize}
      />

      <div className="photo-container">{getPhotos()}</div>

      <Footer
        pageLinks={pageLinks}
        pageNum={pageNum}
        handlePageChange={handlePageChange}
        numPages={numPages}
      />
    </div>
  );
}
