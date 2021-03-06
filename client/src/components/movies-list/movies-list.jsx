import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import "./movies-list.scss";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

import { MovieCard } from "../movie-card/movie-card";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) =>
      m.Title.toLocaleLowerCase().includes(visibilityFilter.toLocaleLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <div className="movies-list">
      {/* Search bar */}
      <div className="search-bar">
        <VisibilityFilterInput
          visibilityFilter={visibilityFilter}
        />
      </div>
      <Row className="justify-content-center">
        {filteredMovies.map((m, index) => (
          <Col key={index} className="main-card" lg="3" md="4" sm="6" xs="10">
            <MovieCard key={m._id} movie={m} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default connect(mapStateToProps)(MoviesList);
