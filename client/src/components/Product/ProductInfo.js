import React from 'react';
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTruck from "@fortawesome/fontawesome-free-solid/faTruck";
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import MyButton from '../utils/button';


const ProductInfo = (props) => {
    const detail = props.detail;
    console.log(detail);
    
    return (
        <div>
            <h1>{detail.brand.name} {detail.name}</h1>
        </div>
    );
};

export default ProductInfo;