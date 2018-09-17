import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/spinner/spinner';
import Input from '../../../components/UI/Input/Input'; 


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'You Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'You Street'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',  
                    placeholder: 'You Country'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'You Zipcode'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'You Email'
                },
                value: ''
            },
            deliverMethod:  {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            },
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
        const formElementsArray = [];
        for ( let key in this.state.orderForm ) {
            console.log(key);
            formElementsArray.push({
                id:key, 
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} />
                ))}
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