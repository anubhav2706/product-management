import React from "react";

import CardItem from "./CardItem";
import { Grid } from "@material-ui/core";

const CardList = ({ items }) => {
  console.log("items",items)
  return (
    <Grid container spacing={3}>
      {items.map(item => {
        return (
          <Grid item xs={4} key={item.id}>
            <CardItem item={item} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CardList;
