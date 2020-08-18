import React from "react";

function Form(props) {
  return (
    <div>
      <form onSubmit={props.submit}>
        <label>
          Latitude:{" "}
          <input
            type="number"
            onChange={props.changeCoords}
            value={props.latitude}
            name="latitude"
            max={90}
            min={-90}
          />
        </label>
        <label>
          Longitude:{" "}
          <input
            type="number"
            onChange={props.changeCoords}
            value={props.longitude}
            name="longitude"
            max={180}
            min={-180}
          />
        </label>
        <label>
          Topic:{" "}
          <input
            type="text"
            onChange={props.changeTopic}
            value={props.text}
            name="text"
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Form;
