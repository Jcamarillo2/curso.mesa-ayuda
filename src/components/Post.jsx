import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import config from "../../config"

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(5),
  },
  media: {
    height: 250,
    [theme.breakpoints.down("sm")]: {
      height: 150,
    },
  },
}));

const Post = ({ post }) => {
  const classes = useStyles();
  const PF = config.proxyRoute
  //console.log(PF)
  /*console.log (post)*/
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={PF + post.photo} title="My Post" />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {post.asunto}
          </Typography>
          <Typography variant="body2">
            {post.descLargaAsunto}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
