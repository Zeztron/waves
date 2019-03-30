import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductsBySell, getProductsByArrival } from '../../redux/actions/product_actions';
import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';


class Home extends Component {

    componentDidMount() {
        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());
    }


    render() {
        return (
            <div>
                <HomeSlider/>
                <HomePromotion/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Home);
