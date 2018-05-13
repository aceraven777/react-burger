import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

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
			loading: false,
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
		this.setState({
			loading: true,
		});

		axios.post('/orders.json', {
				ingredients: this.state.ingredients,
				price: this.state.totalPrice,
				customer: {
					name: 'Aris Lacdao',
					email: 'test@gmail.com',
					address: {
						street: 'Makati',
						zipCode: '1234',
						country: 'Philippines',
					},
				},
				deliveryMethod: 'fastest',
			})
			.then((response) => {
				this.setState({
					loading: false,
					purchasing: false,
				});
				console.log(response);
			})
			.catch((error) => {
				this.setState({
					loading: false,
					purchasing: false,
				});
				console.log(error);
			});
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

		let orderSummary = (
			<OrderSummary
				ingredients={this.state.ingredients}
				price={this.state.totalPrice}
				purchaseContinued={this.purchaseContinueHandler}
				purchaseCanceled={this.purchaseCancelHandler} />
		);
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<Auxiliary>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
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

export default withErrorHandler(BurgerBuilder, axios);