import React from "react";
import Photo from "../photo/Photo";
import "./AllPhotos.css";

function AllPhotos(props) {
  return (
    <div className="AllPhotos">
      {props.photos.map((obj, i) => (
        <Photo key={i} obj={obj} select={props.selectPhoto} index={i} />
      ))}
    </div>
  );
}
export default AllPhotos;
