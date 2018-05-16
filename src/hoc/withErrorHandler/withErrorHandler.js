import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		constructor(props) {
			super(props);

			this.state = {
				error: null,
			};
		}

		componentWillMount() {
			console.log('yellow');
			axios.interceptors.response.use((request) => {
				this.setState({
					error: null,
				});

				return request;
			});
			axios.interceptors.response.use(request => request, (error) => {
				this.setState({
					error: error,
				});
			});
		}

		errorConfirmedHandler = () => {
			this.setState({
				error: null,
			});
		}

		render() {
			return (
				<Auxiliary>
					<Modal
						show={this.state.error}
						modalClosed={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Auxiliary>
			);
		}
	};
};

export default withErrorHandler;