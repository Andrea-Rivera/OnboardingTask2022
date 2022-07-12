import React, { Component } from "react";
import { Modal, Button, Form, Icon } from "semantic-ui-react";

export class CustomerEdit extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleEdit.bind(this);
  }

  handleEdit(event) {
    event.preventDefault();
    alert(
      event.target.Id.value +
        event.target.Name.value +
        event.target.Address.value
    );
    fetch("http://localhost:60246/api/customer/updatecustomers", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: event.target.Id.value,
        name: event.target.Name.value,
        address: event.target.Address.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert("Customer UPDATED successfully!");
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  state = { showModal: false };

  render() {
    const { showModal } = this.state;

    return (
      <div>
        <Modal
          open={showModal}
          onClose={this.closeModal}
          trigger={
            <Button
              onClick={() => this.setState({ showModal: true })}
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
          <Modal.Header>Update Customer</Modal.Header>
          <Modal.Content>
            <div className="container">
              <Form onSubmit={this.handleEdit}>
                <Form.Field>
                  <label>Id</label>
                  <input name="Id" defaultValue={this.props.Id} disabled />
                </Form.Field>
                <Form.Field>
                  <label>Name</label>
                  <input name="Name" defaultValue={this.props.Name} />
                </Form.Field>
                <Form.Field>
                  <label>Address</label>
                  <input name="Address" defaultValue={this.props.Address} />
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
                    onClick={() => this.setState({ showModal: false })}
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
