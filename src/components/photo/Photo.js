import React from "react";
import "./Photo.css";

function Photo(props) {
  let src = `https://farm${props.obj.farm}.staticflickr.com/${props.obj.server}/${props.obj.id}_${props.obj.secret}.jpg}`;

  return (
    <div className="Photo" onClick={props.select} id={props.index}>
      <img src={src} alt={props.obj.title} />
      <div>{props.obj.title}</div>
    </div>
  );
}

export default Photo;
