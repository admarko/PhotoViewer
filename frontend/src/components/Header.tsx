import "./__styles__/Header.scss";

import React from "react";
import Switch from "react-switch";

type Props = {
  color: boolean;
  toggleColor: () => void;
  handleDimensionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  allDimensions: dimensionFormat[];
  handlePageSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  pageSizeOptions: number[];
  pageSize: number;
};

type dimensionFormat = {
  height: number;
  width: number;
};

export default function Header(props: Props) {
  const {
    color,
    toggleColor,
    handleDimensionChange,
    allDimensions,
    handlePageSizeChange,
    pageSizeOptions,
    pageSize,
  } = props;

  return (
    <div className="header">
      <div className="title">Photo Viewer App</div>
      <div className="filters">
        <div className="filter greyscale">
          <span className="greyscale-text">Toggle Greyscale:</span>
          <Switch
            onChange={toggleColor}
            checked={color}
            height={20}
            width={40}
          />
        </div>
        <div className="filter">
          <span>| Sort by Size: </span>
          <select id="dimensions" onChange={handleDimensionChange}>
            <option value="" label="All" />
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
        <div className="filter">
          <span>| Pics per page: </span>
          <select id="picsPerPage" onChange={handlePageSizeChange}>
            {pageSizeOptions.map(picsPerPage => (
              <option
                value={picsPerPage}
                key={picsPerPage}
                selected={picsPerPage === pageSize}
              >
                {picsPerPage}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
