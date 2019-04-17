import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductDetail, clearProductDetail } from '../../redux/actions/product_actions';
import { addToCart } from '../../redux/actions/user_actions';
import ProductInfo from "./ProductInfo";
import ProductImages from './ProductImages';
import PageTop from '../utils/PageTop';

class ProductPage extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        // console.log(id);
        this.props.dispatch(getProductDetail(id)).then(response => {
            if(!this.props.products.prodDetail) {
                // console.log('No article found');
                this.props.history.push("/");
            }
        });
    }

    componentWillUnmount() {
        this.props.dispatch(clearProductDetail());
    }

    addToCartHandler = (id) => {
        this.props.dispatch(addToCart(id));
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
                                    <div style={{width: '500px'}}>
                                        <ProductImages
                                            detail={this.props.products.prodDetail}
                                        />
                                    </div>
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