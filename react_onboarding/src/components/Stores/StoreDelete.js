import React, { Component } from "react";
import { Form, Button, Modal, Icon } from "semantic-ui-react";

export class StoreDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      deleteopen: false,
    };
    this.deleteclose = this.deleteclose.bind(this);
  }
  deleteclose = () => this.setState({ deleteopen: false });

  deleteStores(Id) {
    console.log(typeof Id); // number

    fetch("http://localhost:60246/api/store/deletestores/" + Id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  render() {
    const { deleteopen, Id } = this.state;
    return (
      <div>
        <Modal
          Id={Id}
          open={deleteopen}
          onClose={this.deleteclose}
          trigger={
            <Button
              onClick={() => this.setState({ deleteopen: true })}
              color="red"
            >
              <Icon name="trash" />
              Delete
            </Button>
          }
        >
          <Modal.Header>Delete Store</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.deleteStores}>
              <Form.Field>
                <h3>Are you sure ?</h3>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={() => this.deleteStores(this.props.Id)}
              color="red"
            >
              Delete
            </Button>

            <Button onClick={this.deleteclose} color="black">
              {" "}
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
