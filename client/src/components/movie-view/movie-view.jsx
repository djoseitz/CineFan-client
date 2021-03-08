import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./movie-view.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  addFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://cinefandb.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/Movies/" +
      movie._id;

    console.log(token);

    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        // window.open("/", "_self");
        window.open("/users/" + localStorage.getItem("user"), "_self");
        alert("Added to favorites!");
      });
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <div className='backDropWrap'>
          <img src={movie.BackdropPath} className='backDrop' />
        </div>
        <div className="nav-buttons">
          <Link to={`/`}>
            <Button variant="outline-dark" 
                            type="link"
                            size="md" 
                            className="backBtn"
                            >Back</Button>
          </Link>
          <span className="addToFavorites">
            <Button variant="outline-dark" 
                            type="link"
                            size="md" 
              onClick={() => this.addFavorite(movie)}
            >
              Add to Favorites
            </Button>
          </span>
        </div>
        <div className="movieView-posterWrap col-auto">
          <img className="movie-poster" src={movie.ImagePath} />
        </div>
        <div className="movieView-title">
          <span className="value">{movie.Title}</span>
        </div>
        <Row>
            <Col>
              <div className='movieView-description'>
                <span className='value'>{movie.Description}</span>
              </div>
            </Col>
        </Row>



        <div className="movieView-links">
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="outline-dark" 
                    type="link"
                    size="md" >Director: {movie.Director.Name}</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="outline-dark" 
                            type="link"
                            size="md">Genre: {movie.Genre.Name}</Button>
          </Link>
          </div>
      </div>
    );
  }
}
