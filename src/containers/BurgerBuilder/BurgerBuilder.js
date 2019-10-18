import React, {Component} from 'react';

import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component
{
    state = {
        ingredients:{
            salad: 1,
            bacon: 0,
            cheese: 0,
            meat: 2
        }
    }
    render()
    {
        return (
            <Auxi>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls />
            </Auxi>
        );
    }
}

export default BurgerBuilder;