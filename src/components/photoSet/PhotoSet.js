import React from "react";
import AllPhotos from "../allPhotos/AllPhotos";
import Form from "../form/Form";
import Photo from "../photo/Photo";

class PhotoSet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: process.env.REACT_APP_API_KEY,
      coords: {
        longitude: props.longitude || null,
        latitude: props.latitude || null,
      },
      photos: [],
      index: 0,
      text: "",
    };
  }

  componentDidMount = () => {
    this.timer = setInterval(() => this.nextPhoto(), 10000);
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  updateCoords = () => {
    navigator.geolocation.getCurrentPosition((location) => {
      this.setState({
        coords: {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        },
      });
    });
  };

  getPhotos = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let photos = data.photos.photo;
        return this.setState({ photos });
      });
  };

  nextPhoto = (event) => {
    this.setState((currentState) => ({
      index: (currentState.index + 1) % currentState.photos.length,
    }));
  };

  changeCoords = (event) => {
    const coords = { ...this.state.coords };
    coords[event.target.name] = event.target.value;
    this.setState({ coords });
  };

  changeTopic = (event) => {
    this.setState({ text: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let url = `https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=${this.state.key}&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}`;

    if (this.state.text) {
      url = url + "&text=" + this.state.text;
    }
    this.getPhotos(url);
  };

  handleSelectPhoto = (event) => {
    this.setState({
      index: Number(event.currentTarget.id),
    });
  };

  render() {
    if (!this.state.coords.longitude) {
      this.updateCoords();
      return <div>Getting location...</div>;
    }

    let url = `https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=${this.state.key}&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}`;

    if (this.state.text) {
      url = url + "&text=" + this.state.text;
    }

    if (this.state.photos.length === 0) {
      this.getPhotos(url);
      return <div>Getting photos...</div>;
    }

    return (
      <div className="App">
        <Form
          changeCoords={this.changeCoords}
          changeTopic={this.changeTopic}
          submit={this.handleSubmit}
          latitude={this.state.coords.latitude}
          longitude={this.state.coords.longitude}
          text={this.state.text}
        />
        <AllPhotos
          photos={this.state.photos}
          selectPhoto={this.handleSelectPhoto}
        />
        {/* <button onClick={this.nextPhoto}>Next</button> */}
        <Photo obj={this.state.photos[this.state.index]} />
      </div>
    );
  }
}

export default PhotoSet;
