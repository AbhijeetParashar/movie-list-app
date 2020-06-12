import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onMovieSearch } from "../redux/action/MovieSearchAction";
import { onMovieDetailedSearch } from "../redux/action/MovieDetailAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieName: "",
      releaseYear: "",
    };
  }
  onMovieSearch() {
    let movieName = this.state.movieName.trim();
    let releaseYear = this.state.releaseYear.trim();
    if (movieName == "" || releaseYear == "") {
      this.errorhandler();
    } else {
      if (this.props.tabIndex == 0) {
        this.props.onMovieSearch(movieName, releaseYear, this.errorhandler);
      } else {
        this.props.onMovieDetailedSearch(
          movieName,
          releaseYear,
          this.errorhandler
        );
      }
    }
  }

  errorhandler = (message) => {
    toast.error(message ? message : "Please enter name and year");
  };

  render() {
    return (
      <div className="search-panel">
        <TextField
          className="search-tabs"
          id="outlined-search"
          label="Movie Title"
          type="search"
          variant="outlined"
          onChange={(e) => {
            this.setState({ movieName: e.target.value });
          }}
        />
        <TextField
          className="search-tabs"
          id="outlined-number"
          label="Movie Year"
          type="number"
          variant="outlined"
          onChange={(e) => {
            this.setState({ releaseYear: e.target.value });
          }}
        />
        <Button
          className="search-tabs search-btn"
          variant="contained"
          color="primary"
          onClick={() => {
            this.onMovieSearch();
          }}
        >
          Search
        </Button>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}
function mapStateToProps(reduxStore) {
  return {
    movieList: reduxStore.movieList ? reduxStore.movieList.data : null,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      onMovieSearch: onMovieSearch,
      onMovieDetailedSearch: onMovieDetailedSearch,
    },
    dispatch
  );
}
export default connect(mapStateToProps, matchDispatchToProps)(SearchBar);
