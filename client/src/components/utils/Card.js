import React, { Component } from 'react';
import { privateEncrypt } from 'crypto';

export default class Card extends Component {

    renderCardImage(images) {
        if(images.length > 0) {
            return images[0].url
        } else {
            return '../../../public/images/image_not_availble.png';
        }
    }

    render() {
        const props = this.props;

        return (
            <div className={`card_item_wrapper ${props.grid}`}>
                <div 
                    className="image"
                    style={{
                        background: `url(${this.renderCardImage(props.images)})no-repeat`
                    }}
                />
                <div className="action_container">
                    <div className="tags">
                        <div className="brand">
                            {props.brand.name}
                        </div>
                        <div className="name">
                            {props.name}
                        </div>
                        <div className="price">
                            ${props.price}
                        </div>
                    </div>
                </div>
                {
                    props.grid ?
                        <div className="description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quaerat doloremque quasi ducimus reprehenderit laboriosam. Hic neque temporibus exercitationem pariatur ad possimus, numquam accusamus necessitatibus vitae amet est. Minima, accusamus.
                        </div>
                    : null
                }
                
            </div>
        )
  }
}
