import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import "./director-view.scss";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, director } = this.props;

    if (!director) return null;

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
          {/* <Col className="director-view container-fluid align-items-center col-6">
            <img
              className="director-poster"
              src={director.Director.Headshot}
            />
          </Col> */}
          <Col className="director-view container-fluid align-items-center col-6">
            <div className="director-info">
              <img
                className="director-headshot"
                src={director.Director.Headshot}
              />
              <div className="director-title">
                <span className="label">Name: </span>
                <span className="value">{director.Director.Name}</span>
              </div>
              <div className="director-bio">
                <span className="label">Bio: </span>
                <span className="value">{director.Director.Bio}</span>
              </div>
              <div className="director-birth">
                <span className="label">Born: </span>
                <span className="value">{director.Director.Birth}</span>
              </div>
              <div className="director-death">
                <span className="label">Died: </span>
                <span className="value">{director.Director.Death}</span>
              </div>
            </div>
          </Col>
        </Row>
        <Container>
          <h4 className="mt-4">Some {director.Director.Name} movies</h4>
          <div className="d-flex row mt-3 ml-1">
            {movies.map((movie) => {
              if (movie.Director.Name === director.Director.Name) {
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

DirectorView.propTypes = {
  Movie: PropTypes.shape({
    Director: {
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    },
  }),
};
