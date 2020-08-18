import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import Contact from "../contact/contact";
import AddContact from "../addContact/addContact";

class App extends Component {
	state = {
		isAddingContact: false,
		isSorted: false,
		searchString: "",
	};

	searchHandler = (event) => {
		this.setState({
			searchString: event.target.value,
		});
	};

	addContactHandler = (flag) => {
		this.setState({
			isAddingContact: flag,
		});
	};
	closeAddModal = () => {
		this.setState({
			isAddingContact: false,
		});
	};

	sortHandler = () => {
		if (this.state.isSorted) return;
		this.setState({ isSorted: true });
	};

	render() {
		//.log("App.js", this.state);
		let renderContacts;
		let keys = Object.keys(this.props.contactList);
		if (this.state.searchString.length) {
			//console.log(keys);
			keys = keys.filter((el) => {
				if (el.match(this.state.searchString)) {
					return el;
				}
			});
			//console.log(keys);
		}
		if (this.state.isSorted) keys.sort();
		renderContacts = keys.map((el, index) => {
			return (
				<div className="contact" key={index}>
					<Contact name={el} contactNumber={this.props.contactList[el]} />
				</div>
			);
		});

		let addContact = null;

		return (
			<div className="App">
				<div className="header">
					<p>Contacts</p>
				</div>
				<div className="input">
					<label>Search</label>
					<br />
					<input
						onChange={this.searchHandler}
						value={this.state.searchString}
					></input>
				</div>

				<div className="contactList">{renderContacts}</div>

				{this.state.isAddingContact ? (
					<AddContact
						closeAddModal={this.closeAddModal}
						openContactModal={this.addContactHandler}
					/>
				) : null}

				<div className="addButton" onClick={() => this.addContactHandler(true)}>
					<i className="fas fa-plus-circle fa-3x"></i>
				</div>
				<div className="sortButton" onClick={this.sortHandler}>
					<i className="fas fa-sort-alpha-up fa-3x"></i>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		contactList: state.contacts,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
