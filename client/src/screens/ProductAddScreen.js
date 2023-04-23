import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import api from "../config/api";
import DefaultLayout from "../layouts/DefaultLayout";
import MySnackbar from "../components/MySnackbar";

import { Button, Card, CardContent, CardActions, CircularProgress } from "@material-ui/core";
import { inject, observer } from "mobx-react";

@inject("productStore")
@observer
class ProductAddScreen extends Component {
  state = {
    name : "",
    description : "",
    price : 0,
    category : "",
    quantity : 0,
    submitLoading: false,
    showSnackbar: false,
    snackbarMessage: null
  };

  onChangeName = e => {
    this.setState({ name: e.target.value });
  };
  onChangeDescription = e => {
    this.setState({ description: e.target.value });
  };
  onChangePrice = e => {
    this.setState({ price: e.target.value });
  };
  onChangeCategory = e => {
    this.setState({ category: e.target.value });
  };
  onChangeQuantity = e => {
    this.setState({ quantity: e.target.value });
  };

  
  onSubmit = async e => {
    e.preventDefault();
    this.setState({ submitLoading: true });
    const { name, description, price, category, quantity } = this.state;
    const payload = {
      name,
      description,
      price,
      category,
      quantity
    };
    // console.log("socket",socket);
    try {
      const token = window.localStorage.getItem("token");
      await api.post("http://localhost:5002/createProduct", payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("payload",payload)
      this.props.productStore.addItem({  ...payload });
      this.props.history.push('/products');
    } catch (error) {
      console.log(error);
      let errMsg;
      if (error.response) {
        errMsg = error.response.data.message;
      } else {
        errMsg = error.message;
      }
      this.setState({
        showSnackbar: true,
        snackbarMessage: errMsg
      });
    } finally {
      this.setState({ submitLoading: false });
    }
  };

  renderButton = () => {
    const { submitLoading } = this.state;
    
    if (submitLoading) {
      return (
        <div style={{ marginLeft: "auto" }}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <div style={{ marginLeft: "auto" }}>
        <Button component={Link} to="/products">
          Cancel
        </Button>
        <Button type="submit" style={{ color: "green" }}>
          Submit
        </Button>
      </div>
    );
  };

  render() {
    const {
      name,
      description,
      price,
      category,
      quantity,
      showSnackbar,
      snackbarMessage,
    } = this.state;
    return (
      <DefaultLayout toolbarTitle="Add Products">
        <Card>
          <ValidatorForm
            ref="productAddForm"
            onSubmit={this.onSubmit}
            onError={errors => console.log(errors)}
          >
            <CardContent>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                label="Product Name*"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={this.onChangeName}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                id="description"
                label="Product description"
                name="description"
                autoComplete="description"
                autoFocus
                value={description}
                onChange={this.onChangeDescription}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                id="price"
                label="Product Price*"
                name="price"
                autoComplete="price"
                autoFocus
                value={price}
                onChange={this.onChangePrice}
                validators={["required", "isNumber"]}
                errorMessages={[
                  "this field is required",
                  "this field have to be numeric"
                ]}
              />
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                id="category"
                label="Product category"
                name="category"
                autoComplete="category"
                autoFocus
                value={category}
                onChange={this.onChangeCategory}
              />
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows="4"
                id="quantity"
                label="Product quantity"
                name="quantity"
                autoComplete="quantity"
                autoFocus
                value={quantity}
                onChange={this.onChangeQuantity}
                validators={["required", "isNumber"]}
              />
            </CardContent>
            <CardActions>{this.renderButton()}</CardActions>
          </ValidatorForm>
        </Card>
        <MySnackbar
          visible={showSnackbar}
          message={snackbarMessage}
          onClose={() => this.setState({ showSnackbar: false })}
        />
      </DefaultLayout>
    );
  }
}

export default withRouter(ProductAddScreen);
