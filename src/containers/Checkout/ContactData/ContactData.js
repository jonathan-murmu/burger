import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/spinner/spinner';
import Input from '../../../components/UI/Input/Input'; 


class ContactData extends Component {
    state = {
        formIsValid: false,
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'You Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'You Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',  
                    placeholder: 'You Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'You Zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'You Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliverMethod:  {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid: true,
                validation: {}
            },
        },
        loading: false
    }
    checkValidity ( value, rules ) {
        let isValid = true;
        
        if ( !rules ) {
            return true;
        }
        if ( rules.requred ) {
            isValid = value.trim() !== '' && isValid
        }
        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }
        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }
    orderHandler = ( event ) => {
        // prevent the page from reload as we are inside  the form tag, clicking on the button reloads the page
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for ( let formElementIdentifier in this.state.orderForm ) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
          orderData: formData,
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
    inputChangedHandler = ( event, inputIdentifier ) => {
        console.log(event.target.value);
        // deep copying
        const updatedOrderform = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderform[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderform[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for ( let inputIdentifier in updatedOrderform ) {
            formIsValid = updatedOrderform[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderform, formIsValid: formIsValid});
    }
    render () {
        const formElementsArray = [];
        for ( let key in this.state.orderForm ) {
            formElementsArray.push({
                id:key, 
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={( event ) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDERS</Button>
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