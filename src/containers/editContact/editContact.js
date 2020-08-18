import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { connect } from "react-redux";
import "./editContact.css";
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

Modal.setAppElement("#root");

class editContact extends React.Component {
	state = {
		name: "",
		phone: "",
		prevName: "",
	};

	componentDidMount() {
		this.setState({
			prevName: this.props.prevName,
		});
	}

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
		this.props.addContactDetails(
			this.state.name,
			this.state.phone,
			this.state.prevName
		);
		this.props.openEditModal(false);
	};

	render() {
		//console.log("state", this.state);

		return (
			<div>
				<Modal isOpen={true} style={customStyles}>
					<h2>Edit Contact</h2>
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
						Edit
					</button>
					<button className="btn" onClick={this.props.closeEditModal}>
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
		addContactDetails: (name, contactNumber, prevName) =>
			dispatch({
				type: "EDIT_DETAILS",
				name: name,
				contactNumber: contactNumber,
				prevName: prevName,
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(editContact);
