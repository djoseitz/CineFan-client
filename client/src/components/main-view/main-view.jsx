import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "./main-view.scss";
import { Form, FormControl } from "react-bootstrap";

import { connect } from "react-redux";

import { setMovies } from "../../actions/actions";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileUpdate } from "../profile-update/profile-update";
import MoviesList from "../movies-list/movies-list";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: "",
      user: "",
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  /**
   * This method uses received access token to receive movies and user data.
   * (<code>GET</code> requests)
   * If returning users' access token saved in their local storage are valid,
   * <code>getInfo</code> will use saved token. <br/>
   * If the token in local storage is expired, it will remove token from the storage
   * and get new token from the server.
   * @param {String} token Access Token
   * @method
   * @name getMovies
   * @async
   */

  getMovies(token) {
    axios
      .get("https://cinefandb.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    console.log("logout successful");
    alert("You have been successfully logged out");
    window.open("/", "_self");
  }

  render() {
    let { movies, visibilityFilter } = this.props;
    let { user } = this.state;

    // if (!user)
    //   return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // // Before the movies have been loaded
    // if (!movies) return <div className="main-view" />;

    return (
      <Router basename="/">
        <div className="main-view">
          <Navbar
            expand="lg"
            sticky="top"
            variant="dark"
            expand="lg"
            className="navbar shadow-sm mb-5"
          >
            <Navbar.Brand href={`/`} className="navbar-brand">
              CineFan
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="justify-content-end"
              id="basic-navbar-nav"
            >
              {/* <Form inline>
                <VisibilityFilterInput
                  className="mr-sm-2"
                  visibilityFilter={visibilityFilter}
                />
              </Form> */}
              {!user ? (
                <ul>
                  <Link to={`/`}>
                    <Button variant="link" className="navbar-link">
                      Sign In
                    </Button>
                  </Link>
                  <Link to={`/register`}>
                    <Button variant="link" className="navbar-link">
                      Register
                    </Button>
                  </Link>
                </ul>
              ) : (
                <ul>
                  <Link to={`/`}>
                    <Button variant="link" className="navbar-link">
                      Movies
                    </Button>
                  </Link>
                  <Link to={`/users/${user}`}>
                    <Button variant="link" className="navbar-link">
                      My Account
                    </Button>
                  </Link>
                  <Link to={`/`}>
                    <Button
                      variant="link"
                      className="navbar-link"
                      onClick={() => this.logOut()} href='/'
                    >
                      Sign Out
                    </Button>
                  </Link>
                </ul>
              )}
            </Navbar.Collapse>
          </Navbar>

          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
              return <MoviesList movies={movies} />;
            }}
          />
          <Route
            path="/register"
            render={() => (
              <RegistrationView onLoggedIn={(user) => this.onLoggedIn(user)} />
            )}
          />

          <Route
            path="/users/"
            render={() => (
              <ProfileView movies={movies} logOutFunc={() => this.logOut()} />
            )}
          />
          <Route
            path="/movies/:movieId"
            render={({ match }) => (
              <MovieView
                movie={movies.find((m) => m._id === match.params.movieId)}
              />
            )}
          />
          <Route
            path="/directors/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <DirectorView
                  director={movies.find(
                    (m) => m.Director.Name === match.params.name
                  )}
                  movies={movies}
                />
              );
            }}
          />
          <Route
            path="/genres/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <GenreView
                  genre={movies.find((m) => m.Genre.Name === match.params.name)}
                  movies={movies}
                />
              );
            }}
          />
          <Route
            path="/update/:userId"
            render={() => {
              return <ProfileUpdate />;
            }}
          />
        </div>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
