import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import noImage from "../no_poster.jpeg";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import IconButton from "@material-ui/core/IconButton";
import "./MovieDetailCard.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginLeft: 15,
    marginRight: 15,
  },
});

export default function MovieDetailCard(props) {
  let { movieDetail } = props;
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Poster"
          height="140"
          image={movieDetail.Poster !== "N/A" ? movieDetail.Poster : noImage}
          title="Contemplative Reptile"
          className="movie-poster"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {movieDetail.Title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography variant="body2" color="textSecondary" component="p">
          <IconButton color="primary">
            <CalendarTodayIcon />
          </IconButton>
          <strong>{movieDetail.Year}</strong>
          <br />
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <IconButton color="primary">
            <CardMembershipIcon />
          </IconButton>
          <strong style={{ textTransform: "capitalize" }}>
            {movieDetail.Type}
          </strong>
        </Typography>
      </CardActions>
    </Card>
  );
}
