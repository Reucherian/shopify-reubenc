import './App.css';
import 'bootstrap/dist//css/bootstrap.min.css'

import { Button,Card , Alert, Container, Navbar, Form, Row, Col} from 'react-bootstrap'
import InventoryService from './services/inventoryService';
import React, { useEffect, useState } from 'react';

function App() {
  const FileDownload = require('js-file-download');
  const [items, setItems] = useState([]);
  // const [loadedItems, setLoadedItems] = useState(false);
  const inventoryService = new InventoryService();
  const insertItems = (data) => {
    setItems((old) => ([...data]));
  }
  const updateItem = (data) => {
    setItems((old) => items.map(obj => {
      if (obj._id === data._id) {
        return {...obj, name: data.name};
      }
      else{
        return {...obj};
      }
    })
      );
  }

  const updateQuantity = (data) => {
    setItems((old) => items.map(obj => {
      if (obj._id === data._id) {
        return {...obj, quantity: data.quantity};
      }
      else{
        return {...obj};
      }
    })
    );
  }

  const insertItem = (data) => {
    if(!data.name){
      throw 'Name is a required field';
    }
    console.log(items+[data])
    setItems((old) => items.concat([data]));
  }
  const removeItems = (data) =>{
    setItems((old) => items.filter(key => key._id !== data._id));
  }

  const loadItems = () => {
  // setLoadedItems(false);
    return inventoryService.getInventoryItems().then(insertItems);
  }

  useEffect(() => {
    loadItems().catch(console.error);
  }, [])

  class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.qty = {qty: ''}
      this.handleChange = this.handleChange.bind(this);
      this.handleQtyChange = this.handleQtyChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
    handleQtyChange(event) {
      this.setState({qty: event.target.value});
    }
    handleSubmit(event) {
      // alert('A name was submitted: ' + this.state.value);
      inventoryService.addInventoryItem({
        name: this.state.value,
        quantity: parseInt(this.state.qty == ''?1:parseInt(this.state.qty))
      }).then(insertItem)
      event.preventDefault();
    }
  
    render() {
      return (
        <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Item Name</Form.Label>
          <Form.Control type="plaintext" value={this.state.value} onChange={this.handleChange}/>
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number" value={this.qty.value} onChange={this.handleQtyChange}/>
      </Form.Group>
    <Button variant="info" type="submit">
                Add
      </Button>
      </Form>
      );
    }
}

class InventoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    inventoryService.changeInventoryName(this.props.id,{name: this.state.value}).then(updateItem)
    event.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col>
          <Form.Group>
        <Form.Control type="plaintext" value={this.state.value} onChange={this.handleChange}/>
    </Form.Group>
          </Col>
        <Col>
  <Button variant="info" type="submit">
              Edit
    </Button>
        </Col>
        </Row>
      
    </Form>
    );
  }
}

return (
    <div className="App">
        {/* Top navigation bar starts here */}
        <Navbar padding="" expand="lg" variant="dark" bg="dark">
          <Container>
            <Row>
              <Col>
              <Navbar.Brand> 🗂 Inventory Management System</Navbar.Brand>
              </Col>
              <Col>
                <Button variant="info" onClick={() => {inventoryService.exportAllCsv().then((response)=>{
                  FileDownload(response.data, 'report.csv');
                })}}>
                  Export
                </Button>
              </Col>
            </Row>
          </Container>
        </Navbar>
        <NameForm></NameForm>
        
        {/* Top navigation bar ends here */}
  {
items.map((singularItem, idx) => (
  <Col>
    <Card>
      {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
      <Card.Body>
        <Row>
          <Col>
          <Card.Title>{ singularItem.name }</Card.Title>
          </Col>
          <Col>
          <InventoryForm id={singularItem._id}></InventoryForm>
          </Col>
        </Row>
        
        <Row>
          <Col>
          <Button variant="secondary" onClick={() => {inventoryService.decreaseInventoryItem(singularItem._id).then(updateQuantity)}}>
          -
        </Button>
          </Col>
          <Col>
          <Card.Text>
          {singularItem.quantity}
        </Card.Text>
          </Col>
          <Col>
          <Button variant="secondary" onClick={() => {inventoryService.increaseInventoryItem(singularItem._id).then(updateQuantity)}}>
          +
        </Button>
          </Col>
        </Row>
        <Card.Text>
          Check In Date - {singularItem.checkInDate.substr(0, 10)}
        </Card.Text>
        <Row>
          <Col>
          <Button variant="secondary" onClick={() => 
            {inventoryService.deleteInventoryItem(singularItem._id).then(removeItems)}}>
            delete
          </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
))
}
    </div>
  );
}



export default App;
