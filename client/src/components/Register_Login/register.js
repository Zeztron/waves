import React, { Component } from 'react';
import { connect } from "react-redux";
import FormField from "../utils/Form/FormField";
import { update, generateData, isFormValid } from "../utils/Form/formActions";
import { loginUser } from "../../redux/actions/user_actions";


class Register extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formData: {
            firstName: {
                element: 'input',
                value: '',
                config: {
                    name: 'firstname_input',
                    type: 'text',
                    placeholder: 'Enter your First Name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            lastName: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter your Last Name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your Email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your Password'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Confirm Password'
                },
                validation: {
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    updateForm = (element) => {
        const newFormData = update(element, this.state.formData, 'register');
        this.setState({
            formError: false,
            formData: newFormData
        })
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'register');
        let formIsValid = isFormValid(this.state.formData, 'register');

        if (formIsValid) {
            console.log(dataToSubmit);
            
        } else {
            this.setState({
                formError: true
            });
        }
    }

    

    render() {
        return (
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left">
                            <form onSubmit={(event) => this.submitForm(event)}>
                                <h2>Personal Information</h2>
                                    <div className="form_block_two">
                                        <div className="block">
                                            <FormField
                                                id={'firstName'}
                                                formData={this.state.formData.firstName}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                        <div className="block">
                                            <FormField
                                                id={'lastName'}
                                                formData={this.state.formData.lastName}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <FormField
                                            id={'email'}
                                            formData={this.state.formData.email}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <h2>Verify Password</h2>
                                    <div className="form_block_two">
                                        <div className="block">
                                            <FormField
                                                id={'password'}
                                                formData={this.state.formData.password}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                        <div className="block">
                                            <FormField
                                                id={'confirm_password'}
                                                formData={this.state.formData.confirmPassword}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={(event) => this.submitForm(event)}>
                                            Create An Account
                                        </button>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(Register);