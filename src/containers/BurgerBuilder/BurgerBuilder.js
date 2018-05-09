import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3,
};

class BurgerBuilder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ingredients: {
				salad: 0,
				bacon: 0,
				cheese: 0,
				meat: 0,
			},
			totalPrice: 4.00,
			purchaseable: false,
			purchasing: false,
		};
	}

	updatePurchaseState(ingredients) {
		var purchaseable = false;

		for (let key in ingredients) {
			if (ingredients[key] > 0) {
				purchaseable = true;
				break;
			}
		}

		this.setState({
			purchaseable: purchaseable,
		});
	}

	addIngredientHandler = (type) => {
		const ingredients = {...this.state.ingredients};
		
		ingredients[type]++;
		
		this.setState({
			ingredients: ingredients,
			totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type],
		});

		this.updatePurchaseState(ingredients);
	}

	removeIngredientHandler = (type) => {
		const ingredients = {...this.state.ingredients};
		
		if (ingredients[type] <= 0) {
			return;
		}

		ingredients[type]--;
		
		this.setState({
			ingredients: ingredients,
			totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type],
		});

		this.updatePurchaseState(ingredients);
	}

	purchaseHandler = () => {
		this.setState({
			purchasing: true,
		});
	}

	purchaseContinueHandler = () => {
		alert('You continue!');
	}

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false,
		});
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = (disabledInfo[key] <= 0);
		}

		return (
			<Auxiliary>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					<OrderSummary
						ingredients={this.state.ingredients}
						price={this.state.totalPrice}
						purchaseContinued={this.purchaseContinueHandler}
						purchaseCanceled={this.purchaseCancelHandler} />
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchaseable={this.state.purchaseable}
					ordered={this.purchaseHandler} />
			</Auxiliary>
		);
	}
}

export default BurgerBuilder;