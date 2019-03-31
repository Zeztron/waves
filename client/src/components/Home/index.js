import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductsBySell, getProductsByArrival } from '../../redux/actions/product_actions';
import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';
import CardBlock from '../utils/CardBlock';


class Home extends Component {

    componentDidMount() {
        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());
    }


    render() {
        return (
            <div>
                <HomeSlider/>
                <CardBlock
                    list={this.props.products.bySell}
                    title='Best Selling Guitars'
                />
                <HomePromotion/>
                <CardBlock
                    list={this.props.products.byArrival}
                    title='New Arrivals'
                />
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
