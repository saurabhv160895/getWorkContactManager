import React, { Component } from "react";
import { connect } from "react-redux";
import "./contact.css";
import EditContact from "../editContact/editContact";

class contact extends React.Component {
	state = {
		isEditingContact: false,
	};

	editContactHandler = (flag) => {
		this.setState({
			isEditingContact: flag,
		});
	};
	closeEditModal = () => {
		this.setState({
			isEditingContact: false,
		});
	};

	render() {
		//console.log("here", this.props);

		return (
			<div className="contact">
				<div className="contactDetails">
					<p style={{ fontWeight: "bold" }}>{this.props.name}</p>
					<p>{this.props.contactNumber}</p>
				</div>

				<button className="btn" onClick={() => this.editContactHandler(true)}>
					Edit
				</button>
				{this.state.isEditingContact ? (
					<EditContact
						prevName={this.props.name}
						openEditModal={this.editContactHandler}
						closeEditModal={this.closeEditModal}
					/>
				) : null}
				<button
					className="btn"
					onClick={() => {
						this.props.deleteContact(this.props.name);
					}}
				>
					Delete
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	//console.log("props", props);
	return {
		...props,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		deleteContact: (name) => dispatch({ type: "DELETE_CONTACT", name }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(contact);
