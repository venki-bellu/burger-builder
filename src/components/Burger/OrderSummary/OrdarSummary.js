import React,{Component} from 'react';

import Auxi from '../../../hoc/Auxi/Auxi';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    
    render()
    {
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
        return (<li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}> {igKey} </span> : {this.props.ingredients[igKey]}
                </li>)
        });
        return(
            <Auxi>
                <h3>Your order!</h3>
                <p>A delcious burger with the following ingredients</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: &#8377;{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Auxi>
        )
    }
    
};

export default OrderSummary;