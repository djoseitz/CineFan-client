import React from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import "./genre-view.scss";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, genre } = this.props;

    if (!genre) return null;

    return (
      <Container className="wrapper container-fluid">
        <span className="nav-Btn">
          <Button
            onClick={() => window.history.back()}
            variant="dark"
            className="backBtn"
          >
            <i className="fas fa-arrow-left"></i> Back
          </Button>
        </span>
        <Row>
          <Col className="col-3" />
          <Col className="genre-view container-fluid align-items-center col-6">
            <div className="genre-title">
              <span className="value">{genre.Genre.Name}</span>
            </div>
            <div className="genre-description ">
              <span className="value">{genre.Genre.Description}</span>
            </div>
          </Col>
          <Col className="col-3" />
        </Row>
        <Container>
          <h4 className="mt-4">Some {genre.Genre.Name} movies</h4>
          <div className="d-flex row mt-3 ml-2">
            {movies.map((movie) => {
              if (movie.Genre.Name === genre.Genre.Name) {
                return (
                  <div key={movie._id}>
                    <Card
                      className="mb-3 mr-2 h-100"
                      style={{ width: "16rem" }}
                    >
                      <Link to={`/movies/${movie._id}`}>
                        <Card.Img
                          className="card-img"
                          variant="top"
                          src={movie.ImagePath}
                          alt={`${movie.Title} Poster`}
                        />
                        <Card.Body className="movieCard-cardBody">
                          <Card.Title className="movieCard-title">
                            {movie.Title}
                          </Card.Title>
                          <Card.Text className="detailInfo">
                            {movie.Genre.Name}
                          </Card.Text>
                          <Card.Text className="movieCard-description">
                            {movie.Tagline}
                          </Card.Text>
                        </Card.Body>
                      </Link>
                    </Card>
                  </div>
                );
              }
            })}
          </div>
        </Container>
      </Container>
    );
  }
}

GenreView.propTypes = {
  Movie: PropTypes.shape({
    Genre: {
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      // ImagePath: PropTypes.string.isRequired,
    },
  }),
};
