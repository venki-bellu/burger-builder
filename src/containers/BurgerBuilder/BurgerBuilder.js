import React, {Component} from 'react';

import Auxi from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrdarSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
    salad: 15,
    cheese: 10,
    meat: 25,
    bacon: 30
}; 

class BurgerBuilder extends Component
{
    state = {
        ingredients:{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 40,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState (ingredients) 
    {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) =>{
            return sum = sum + el;
        },0)
        this.setState({purchasable: sum>0})
    }

    addIngredientHandler = (type) =>
    {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]  = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) =>
    {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0)
        {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]  = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = () =>
    {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () =>
    {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () =>
    {
       // alert('You Continue');
       this.setState ({loading : true})
       const order ={
           ingredients: this.state.ingredients,
           price: this.state.totalPrice,
           customer: {
               name: 'Venkatesh Belavadi',
               address: {
                   street: '6th Main road',
                   zipCode: '560050',
                   country: 'India'
               },
               email: 'venkateshrbelavadi@gmail.com'
           },
           deliveryMethod: 'fastest'
       }
        axios.post('/orders.json',order)
             .then(respose => {
                 this.setState({loading : false, purchasing: false})
             })
             .catch(error => {this.setState({loading : false, purchasing: false})});
    }

    render()
    {
        const disabledInfo ={...this.state.ingredients};
        for (let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary 
                                ingredients = {this.state.ingredients}
                                purchaseCancelled = {this.purchaseCancelHandler}
                                purchaseContinued = {this.purchaseContinueHandler}
                                price ={this.state.totalPrice}
                            />
        if(this.state.loading)
        {
            orderSummary = <Spinner />
        }

        return (
            <Auxi>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded ={this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purchasable}
                    price = {this.state.totalPrice}
                    ordered = {this.purchaseHandler}/>
            </Auxi>
        );
    }
}

export default BurgerBuilder;