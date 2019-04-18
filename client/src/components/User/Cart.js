import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';
import { getCartItems } from '../../redux/actions/user_actions';
import UserLayout from '../../hoc/user';


class UserCart extends Component {

    state = {
        loading: true,
        total: 0,
        showTotal: false,
        showSuccess: false
    }

    componentDidMount(){
        let cartItems = [];
        let user = this.props.user;
        
        if(user.userData.cart){
            if(user.userData.cart.length > 0){
                user.userData.cart.forEach(item=>{
                    cartItems.push(item.id)
                    
                });

                this.props.dispatch(getCartItems(cartItems, user.userData.cart)).then(()=>{
                    
                })
            }
        }
    }

    render() {
        return (
            <UserLayout>
                <div>
                    cart
                </div>
            </UserLayout>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserCart);
