import React from "react";

type Props = {
  url: string;
  height: number;
  width: number;
  photoId: Number;
};

export default function Photo(props: Props) {
  const { url, height, width, photoId } = props;
  return (
    <div>
      <img src={url} alt="" />
      <p>
        {height}, {width}, {photoId}{" "}
      </p>
    </div>
  );
}
