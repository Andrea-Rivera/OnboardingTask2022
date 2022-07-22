import React, { Component } from "react";
import { Modal, Button, Form, Icon } from "semantic-ui-react";

export class SalesEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sales: [],
      products: [],
      customers: [],
      stores: [],
      editopen: false,
    };
    this.editclose = this.editclose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this._selectproduct = this._selectproduct.bind(this);
    this._selectcustomer = this._selectcustomer.bind(this);
    this._selectstore = this._selectstore.bind(this);
  }

  editclose = () => this.setState({ editopen: false });

  componentDidMount() {
    fetch("http://localhost:60246/api/customer/getcustomers")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ customers: data });
      });

    fetch("http://localhost:60246/api/product/getproducts")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ products: data });
      });

    fetch("http://localhost:60246/api/store/getstores")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ stores: data });
      });
  }

  _selectproduct = (event, val) => {
    event.preventDefault();
    this.setState({ salesproductid: val.value }, () => {
      console.log("updated ", this.state);
    });
  };
  _selectcustomer = (event, val) => {
    event.preventDefault();
    this.setState({ salescustomerid: val.value }, () => {
      console.log("updated ", this.state);
    });
  };

  _selectstore = (event, val) => {
    event.preventDefault();
    this.setState({ salesstoreid: val.value }, () => {
      console.log("updated ", this.state);
    });
  };

  handleEdit = (event) => {
    event.preventDefault();
    console.log("Id:", event.target.Id.value);
    console.log("customerid:", this.state.salescustomerid);
    console.log("productid:", this.state.salesproductid);
    console.log("store id:", this.state.salesstoreid);
    console.log("sales", event.target.salesdatesold.value);

    fetch("http://localhost:60246/api/sales/updatesales", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: event.target.Id.value,
        CustomerId: this.state.salescustomerid,
        ProductId: this.state.salesproductid,
        StoreId: this.state.salesstoreid,
        DateSold: event.target.salesdatesold.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert("Successful");
        },
        (error) => {
          alert("Failed");
        }
      );
  };

  render() {
    const {
      editopen,
      Id,
      salescustomername,
      salesproductname,
      salesstorename,
      salesproductid,
      salescustomerid,
      salesstoreid,
      salesdatesold,
    } = this.state;

    return (
      <div>
        <Modal
          Id={Id}
          salescustomerid={salescustomerid}
          salescustomername={salescustomername}
          salesproductid={salesproductid}
          salesproductname={salesproductname}
          salesstoreid={salesstoreid}
          salesstorename={salesstorename}
          salesdatesold={salesdatesold}
          open={editopen}
          onClose={this.editclose}
          trigger={
            <Button
              onClick={() => this.setState({ editopen: true })}
              color="olive"
            >
              <Icon name="edit" />
              Edit
            </Button>
          }
          style={{
            height: "26rem",
            position: "relative",
          }}
        >
          <Modal.Header>Update Sale</Modal.Header>
          <Modal.Content>
            <div className="container">
              <Form onSubmit={this.handleEdit}>
                <Form.Field>
                  <label>Id</label>
                  <input
                    name="Id"
                    defaultValue={this.props.Id}
                    required
                    disabled
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Select
                    fluid
                    label="Customer"
                    name="salescustomerid"
                    options={this.state.customers.map((customerList) => ({
                      name: customerList.Id,
                      key: customerList.Id,
                      value: customerList.Id,
                      text: customerList.Name,
                    }))}
                    defaultValue={this.props.salescustomerid}
                    onChange={this._selectcustomer}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Select
                    fluid
                    label="Product"
                    name="salesproductid"
                    options={this.state.products.map((productList) => ({
                      key: productList.Id,
                      value: productList.Id,
                      text: productList.Name,
                    }))}
                    defaultValue={this.props.salesproductid}
                    onChange={this._selectproduct}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Select
                    fluid
                    label="Store"
                    name="salesstoreid"
                    options={this.state.stores.map((storeList) => ({
                      name: storeList.Id,
                      key: storeList.Id,
                      value: storeList.Id,
                      text: storeList.Name,
                    }))}
                    onChange={this._selectstore}
                    defaultValue={this.props.salesstoreid}
                  />
                </Form.Field>

                <Form.Field id="Date Sold">
                  <label>Date Sold</label>
                  <input
                    name="salesdatesold"
                    //type="date"
                    defaultValue={this.props.salesdatesold}
                    required
                  />
                </Form.Field>

                <Modal.Actions>
                  <Button
                    content="Update"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => this.handleEdit}
                    positive
                  />

                  <Button
                    onClick={() => this.setState({ editopen: false })}
                    color="black"
                  >
                    Close
                  </Button>
                </Modal.Actions>
              </Form>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
