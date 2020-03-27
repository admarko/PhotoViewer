import "./__styles__/Footer.scss";

import classnames from "classnames";
import React from "react";
import { Icon } from "ts-react-feather-icons";

type Props = {
  pageLinks: number[];
  pageNum: number;
  handlePageChange: (pageLink: number) => void;
  numPages: number;
};

export default function Footer(props: Props) {
  const { pageLinks, pageNum, handlePageChange, numPages } = props;

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
        Prev Page
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
  );
}
