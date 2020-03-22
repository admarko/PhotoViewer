import React from "react";

type Props = {
  url: string;
  height: number;
  width: number;
  photo_id: number;
};

export default function Photo(props: Props) {
  const { url, height, width, photo_id } = props;

  return (
    <div>
      <img src={url} alt={""}></img>
    </div>
  );
}
