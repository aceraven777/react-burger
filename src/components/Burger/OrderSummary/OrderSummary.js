import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

// This could be converted to functional component
class OrderSummary extends Component {
	componentWillUpdate() {
		console.log('componentWillUpdate');	
	}

	render () {
		const ingredientSummary = [];

		for (let key in this.props.ingredients) {
			ingredientSummary.push(<li key={key}>
				<span style={{textTransform: 'capitalize'}}>{key}</span>:
				{this.props.ingredients[key]}
			</li>);
		}

		return (
			<Auxiliary>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>
					{ingredientSummary}
				</ul>
				<p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
				<p>Continue to Checkout?</p>
				<Button btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
				<Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
			</Auxiliary>
		);
	}
}

export default OrderSummary;