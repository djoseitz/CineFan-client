import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./movie-card.scss";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      // <Link to={`/movies/${movie._id}`}>
      //   <Card style={{ width: '20rem' }}>
      //     <Card.Img className="card-img" variant="top" src={movie.ImagePath} />
      //     <Card.Body>
      //       <Card.Title>{movie.Title}</Card.Title>
      //       <Card.Text className='detailInfo'>{movie.Genre.Name}</Card.Text>
      //       <Card.Text className='movieCard-description'>{movie.Tagline}</Card.Text>
      //     </Card.Body>
      //   </Card>
      // </Link>
      <Link to={`/movies/${movie._id}`}>
        <Card style={{ width: '20rem' }}
          class="d-flex align-items-stretch"
        >
          <Card.Img 
            className="card-img"
            variant="top" 
            src={movie.ImagePath} 
            alt={`${movie.Title} Poster`}
          />
          <Card.Body className='movieCard-cardBody'>
            <Card.Title className='movieCard-title'>{movie.Title}</Card.Title>
            <Card.Text className='detailInfo'>{movie.Genre.Name}</Card.Text>
            <Card.Text className='movieCard-description'>{movie.Tagline}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
};