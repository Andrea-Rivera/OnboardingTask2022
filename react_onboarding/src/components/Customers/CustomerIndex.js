import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import { CustomerCreate } from "./CustomerCreate";
import { CustomerEdit } from "./CustomerEdit";
import { CustomerDelete } from "./CustomerDelete";

export class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      DataisLoaded: false,
    };
  }
  //componentdidmount is used to execute the code
  refreshList() {
    fetch("http://localhost:60246/api/customer/getcustomers")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ customers: data, DataisLoaded: true });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }
  deleteCustomer(Id) {
    if (window.confirm("Are you sure?")) {
      fetch("http://localhost:60246/api/customer/deletecustomers/" + Id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }
  render() {
    let closeModal = () => this.setState({ showModal: false });
    //Set variables DataisLoaded and array that contains customers array created in react after fetching data.
    const { DataisLoaded, customers } = this.state;
    if (!DataisLoaded)
      return (
        <div>
          <h1> Server not loading.... </h1>{" "}
        </div>
      );

    return (
      <div
        style={{
          margin: "20px 20px 20px 20px",
        }}
      >
        <h4> Customer Index </h4>

        <Button.Group>
          <CustomerCreate show={this.state.showModal} onClose={closeModal} />
        </Button.Group>

        <Table celled className="mt-4">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {customers.map((custList) => (
              <Table.Row key={custList.id}>
                <Table.Cell>{custList.id}</Table.Cell>
                <Table.Cell>{custList.name}</Table.Cell>
                <Table.Cell>{custList.address}</Table.Cell>
                <Table.Cell>
                  <CustomerEdit
                    show={this.state.editopen}
                    onClose={this.editclose}
                    Id={custList.id}
                    Name={custList.name}
                    Address={custList.address}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => this.deleteCustomer(custList.id)}
                    negative
                  >
                    Delete
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <CustomerDelete
                    show={this.state.deleteopen}
                    onClose={this.deleteclose}
                    Id={custList.id}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
