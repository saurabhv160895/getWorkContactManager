import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { connect } from "react-redux";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

class addContact extends React.Component {
	state = {
		name: "",
		phone: "",
		modalOpen: true,
	};

	nameChangeHandler = (event) => {
		this.setState({
			name: event.target.value,
		});
	};

	numberChangeHandler = (event) => {
		this.setState({
			phone: event.target.value,
		});
	};

	onClickHandler = () => {
		if (!this.state.name || !this.state.phone) return;
		this.props.addContactDetails(this.state.name, this.state.phone);
		this.props.openContactModal(false);
	};
	// closeModalHandler = () => {
	// 	this.setState({
	// 		modalOpen: false,
	// 	});
	// };

	render() {
		//console.log("state", this.state);

		return (
			<div>
				<Modal isOpen={this.state.modalOpen} style={customStyles}>
					<h2>Add Contact</h2>
					<label>Name</label>
					<br />
					<br />
					<input onChange={this.nameChangeHandler} />
					<br />
					<br />
					<label>Contact</label>
					<br />
					<br />
					<input onChange={this.numberChangeHandler} />
					<br />
					<br />
					<button className="btn" onClick={this.onClickHandler}>
						Add
					</button>
					<button className="btn" onClick={this.props.closeAddModal}>
						Close
					</button>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		...props,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addContactDetails: (name, contactNumber) =>
			dispatch({
				type: "ADD_DETAILS",
				name: name,
				contactNumber: contactNumber,
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(addContact);
