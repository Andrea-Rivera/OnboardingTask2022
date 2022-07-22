import React, { Component } from "react";
import { Modal, Button, Form } from "semantic-ui-react";

export class StoreCreate extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // alert(event.target.name.value + event.target.address.value )
    fetch("http://localhost:60246/api/store/createstores", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: event.target.Name.value,
        Address: event.target.Address.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(
        (result) => {
          alert("Successful");
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
            <Button onClick={() => this.setState({ showModal: true })} primary>
              New Store
            </Button>
          }
          style={{
            height: "26rem",
            position: "relative",
          }}
        >
          <Modal.Header>Create Store</Modal.Header>
          <Modal.Content>
            <div className="container">
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <label>Name</label>
                  <input placeholder="Store Name" name="Name" required />
                </Form.Field>

                <Form.Field>
                  <label>Store Address</label>
                  <input placeholder="Store Address" name="Address" required />
                </Form.Field>

                <Modal.Actions>
                  <Button
                    content="Create"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => this.handleSubmit}
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
