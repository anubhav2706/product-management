import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import api from "../config/api";
import io from "socket.io-client";
import CardList from "../components/CardList";
import ConfirmationDialog from "../components/ConfirmationDialog";

import { CircularProgress, Fab } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";

@inject("productStore")
@observer
class ProductScreen extends Component {
  state = {
    fetchLoading: false,
    deleteLoading: false
  };

  componentDidMount() {

    const socket = io('http://localhost:5000')
      console.log("djkbkj", socket)
      // Listen for the 'newRecord' event
      socket.on('updatePage', () => {
        alert("Please refresh the page");
        console.log("socket on")
      });
    this.fetchProducts();

  }

  handleDialogClose = () => {
    this.props.productStore.closeDeleteDialog();
  };

  handleDelete = async () => {
    try {
      this.setState({ deleteLoading: true });
      const token = window.localStorage.getItem("token");
      console.log("delete", this.props.productStore.idWillBeDeleted)
      await api.delete(`http://localhost:5002/deleteProductById/${this.props.productStore.idWillBeDeleted}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.props.productStore.deleteItemsById();
      this.props.productStore.closeDeleteDialog();
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ deleteLoading: false });
    }
  }

  async fetchProducts() {
    try {
      this.setState({ fetchLoading: true });
      const token = window.localStorage.getItem("token");
      const response = await api.get("http://localhost:5002/findProductList", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    
    console.log("response", response)
    this.props.productStore.setItems(response.data, true);
  } catch(error) {
    console.log(error);
  } finally {
    this.setState({ fetchLoading: false });
  }
  }

renderContent() {
  const { classes, productStore } = this.props;
  if (this.fetchLoading) {
    return <CircularProgress />;
  }
  return (
    <div>
      <CardList items={productStore.items} />
      <Fab
        className={classes.fab}
        color="primary"
        component={Link}
        to="/products/add"
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

render() {
  return (
    <DefaultLayout toolbarTitle="Manage Products">
      {this.renderContent()}
      <ConfirmationDialog
        id={this.props.productStore.idWillBeDeleted}
        showDialog={this.props.productStore.showDeleteDialog}
        handleClose={this.handleDialogClose}
        onDelete={this.handleDelete}
        disableClose={this.state.deleteLoading}
      />
    </DefaultLayout>
  );
}
}

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 40
  }
});

export default withStyles(styles)(ProductScreen);
