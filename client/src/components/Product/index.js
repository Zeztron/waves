import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductDetail, clearProductDetail } from '../../redux/actions/product_actions';
import ProductInfo from './ProductInfo';
import PageTop from '../utils/PageTop';

class ProductPage extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        // console.log(id);
        this.props.dispatch(getProductDetail(id));
    }

    componentWillUnmount() {
        this.props.dispatch(clearProductDetail());
    }

    addToCartHandler = () => {
        
    }

    render() {
        return (
            <div>
                <PageTop
                    title="Product Detail"
                />
                <div className="container">
                    {
                        this.props.products.prodDetail ?
                            <div className="product_detail_wrapper">
                                <div className="left">
                                    images
                                </div>
                                <div className="right">
                                    <ProductInfo
                                        addToCart={(id) => this.addToCartHandler(id)}
                                        detail={this.props.products.prodDetail}
                                    />
                                </div>
                            </div>
                        : 'Loading'
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ProductPage);