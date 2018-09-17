import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/spinner/spinner';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    orderHandler = ( event ) => {
        // prevent the page from reload as we are inside  the form tag, clicking on the button reloads the page
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
          deliverMethod: 'fastes',
          customer: {
            name: 'Jonathan Murmu',
            address: {
              street: 'Delhi',
              country: 'India',
              zipCode: '12345'
            },
            email: 'jonathantes@test.com'
          }
        }

        axios.post('/orders.json', order)
          .then(response => {
              console.log(this.props)
            this.setState({ loading: false });
            this.props.history.push('/');
          })
          .catch(error => {
            this.setState({ loading: false })
          }
        );

    }
    render () {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="text" name="email" placeholder="Your Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code" />
                <Button btnType='Success' clicked={this.orderHandler}>ORDERS</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return  (
            <div className={classes.ContactData}>
                <h4>Enter you contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;