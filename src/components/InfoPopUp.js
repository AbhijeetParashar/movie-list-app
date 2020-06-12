import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import noImage from "../no_poster.jpeg";
import "./InfoPopUp.css";

class InfoPopUp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { movieData, onClose, open } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          keepMounted
          onClose={() => onClose()}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {movieData.Title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div className="movie-modal-container">
                <div className="movie-poster">
                  {movieData.Poster !== "N/A" ? (
                    <img className="poster" src={movieData.Poster}></img>
                  ) : (
                    <img className="poster" src={noImage}></img>
                  )}
                </div>
                <div className="movie-modal-detail">
                  <div className="movie-data">
                    <strong style={{ color: "#9492ea" }}>Plot : </strong>
                    {movieData.Plot}
                  </div>
                  <div className="movie-data">
                    <strong style={{ color: "#9492ea" }}>Cast : </strong>
                    {movieData.Actors}
                  </div>
                  <div className="movie-data">
                    <strong style={{ color: "#9492ea" }}>Director : </strong>
                    {movieData.Director}
                  </div>
                  <div className="movie-data">
                    <strong style={{ color: "#9492ea" }}>Writer : </strong>
                    {movieData.Writer}
                  </div>
                  <div className="movie-data">
                    <strong style={{ color: "#9492ea" }}>Genre : </strong>
                    {movieData.Genre}
                  </div>
                  <div className="movie-data">
                    <strong style={{ color: "#655602" }}>Boxoffice : </strong>
                    {movieData.imdbRating !== "N/A" &&
                    Number(movieData.imdbRating) >= 7 ? (
                      <strong style={{ color: "#00A447" }}>Hit</strong>
                    ) : (
                      <strong style={{ color: "#ff6c5f" }}>Flop</strong>
                    )}
                  </div>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        ;
      </div>
    );
  }
}

export default InfoPopUp;
