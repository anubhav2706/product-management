import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/styles";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button
} from "@material-ui/core";
import { inject, observer } from "mobx-react";

@inject('productStore')
@observer
class CardItem extends Component {

  onDeleteBtnClicked = () => {
    this.props.productStore.setIdWillBeDeleted(this.props.item._id);
  }

  render() {
    const { classes, item } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={item.image}
            name={item.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography variant="subtitle2" component="h2">
              Price: {parseInt(item.price).toLocaleString("id-ID")},00
            </Typography>
            <Typography variant="subtitle1" component="h2">
              Category: {item.category}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.description.length > 100
                ? item.description.substr(0, 100) + "..."
                : item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            component={Link}
            to={`/products/${item._id}/edit`}
          >
            Edit
          </Button>
          <Button size="small" color="primary" onClick={this.onDeleteBtnClicked}>
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default withStyles(styles)(CardItem);
