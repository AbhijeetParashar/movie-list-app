import React, { Component } from "react";
import TabBar from "../core/TabBar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dispatchDataMovieSearch } from "../redux/action/MovieSearchAction";
import { dispatchMovieDetailSearch } from "../redux/action/MovieDetailAction";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import "./HomePage.css";
import axios from "axios";
import { apiKey } from "../constant/constant";
import MovieDetailCard from "../components/MovieDetailCard";
import { Pagination } from "@material-ui/lab";
import InfoPopUp from "../components/InfoPopUp";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.activeTabIndex = 0;
    this.state = {
      movieData: {},
      isModalActive: false,
      pageCount: 0,
    };
  }
  setAciveTabIndex(index) {
    this.setState({ pageCount: 0 });
    if (index === 1) {
      this.props.dispatchDataMovieSearch();
    } else {
      this.props.dispatchMovieDetailSearch();
    }
    this.activeTabIndex = index;
  }
  getMovieList() {
    let movieList = [];
    let { pageCount } = this.state;
    if (this.activeTabIndex === 0) {
      let searchResult =
        this.props.movieList && this.props.movieList.length > 0
          ? this.props.movieList
          : null;
      searchResult &&
        searchResult[pageCount].forEach((element) => {
          movieList.push(
            <div key={element.imdbID} className="movie-container">
              <div className="movie-details">
                <div className="movie-title">{element.Title}</div>
                <div className="movie-extra-details">
                  {element.Type ? (
                    <div className="movie-type">
                      <strong>Type :</strong>{" "}
                      <strong style={{ color: "#00A447" }}>
                        {element.Type}
                      </strong>
                    </div>
                  ) : null}
                  {element.Year ? (
                    <div className="movie-year">
                      {" "}
                      <strong>Year :</strong>{" "}
                      <strong style={{ color: "#00A447" }}>
                        {element.Year}
                      </strong>
                    </div>
                  ) : null}
                </div>
              </div>
              <div
                className="info-button"
                onClick={() => {
                  axios
                    .get(
                      `http://www.omdbapi.com/?i=${element.imdbID}&plot=full&apikey=${apiKey}`
                    )
                    .then((res) => {
                      if (res.data.Response == "True") {
                        this.setState({
                          movieData: res.data,
                          isModalActive: true,
                        });
                      } else {
                      }
                    });
                }}
              >
                <InfoOutlinedIcon className="info-icon"></InfoOutlinedIcon>
              </div>
            </div>
          );
        });
    } else {
      let searchResult =
        this.props.movieDetailedList && this.props.movieDetailedList.length > 0
          ? this.props.movieDetailedList
          : null;
      let movieItems = [];
      searchResult &&
        searchResult[pageCount].forEach((element) => {
          movieItems.push(
            <MovieDetailCard movieDetail={element}></MovieDetailCard>
          );
        });
      movieList.push(<div className="detail-container">{movieItems}</div>);
    }
    return movieList;
  }
  handleClose = () => {
    this.setState({ movieData: {}, isModalActive: false });
  };
  render() {
    let { movieData } = this.state;
    return (
      <React.Fragment>
        <TabBar onTabChange={(index) => this.setAciveTabIndex(index)} />
        {this.getMovieList()}
        <InfoPopUp
          open={this.state.isModalActive}
          onClose={this.handleClose}
          movieData={movieData}
        ></InfoPopUp>
        {this.props.movieList ? (
          <Pagination
            className="pagination-container"
            count={this.props.movieList.length}
            color="primary"
            onChange={(e, value) => {
              this.setState({ pageCount: value - 1 });
            }}
          />
        ) : null}
        {this.props.movieDetailedList ? (
          <Pagination
            className="pagination-container"
            count={this.props.movieDetailedList.length}
            color="primary"
            onChange={(e, value) => {
              this.setState({ pageCount: value - 1 });
            }}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
function mapStateToProps(reduxStore) {
  return {
    movieList: reduxStore.movieList ? reduxStore.movieList.data : null,
    movieDetailedList: reduxStore.movieDetailedList
      ? reduxStore.movieDetailedList.data
      : null,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dispatchDataMovieSearch: dispatchDataMovieSearch,
      dispatchMovieDetailSearch: dispatchMovieDetailSearch,
    },
    dispatch
  );
}
export default connect(mapStateToProps, matchDispatchToProps)(HomePage);
