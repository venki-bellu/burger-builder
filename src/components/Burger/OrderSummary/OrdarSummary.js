import React from 'react';

import Auxi from '../../../hoc/Auxi'
const orderSummary = props =>{
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
        return (<li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}> {igKey} </span> : {props.ingredients[igKey]}
                </li>)
    });
    return(
        <Auxi>
            <h3>Your order!</h3>
            <p>A delcious burger with the following ingredients</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to checkout</p>
        </Auxi>
    )
};

export default orderSummary;