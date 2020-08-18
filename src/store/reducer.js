//import * as actionTypes from "./actions";

const initialState = {
	contacts: {
		john: "12345678",
		smith: "987456123",
		andy: "698745236",
	},
};

function clone(item) {
	if (!item) {
		return item;
	}
	var types = [Number, String, Boolean],
		result;

	types.forEach(function (type) {
		if (item instanceof type) {
			result = type(item);
		}
	});

	if (typeof result == "undefined") {
		if (Object.prototype.toString.call(item) === "[object Array]") {
			result = [];
			item.forEach(function (child, index, array) {
				result[index] = clone(child);
			});
		} else if (typeof item == "object") {
			if (item.nodeType && typeof item.cloneNode == "function") {
				result = item.cloneNode(true);
			} else if (!item.prototype) {
				if (item instanceof Date) {
					result = new Date(item);
				} else {
					result = {};
					for (var i in item) {
						result[i] = clone(item[i]);
					}
				}
			} else {
				if (false && item.constructor) {
					result = new item.constructor();
				} else {
					result = item;
				}
			}
		} else {
			result = item;
		}
	}

	return result;
}

const reducer = (state = initialState, action) => {
	//console.log("state", state);

	let newState = clone(state);
	if (action.type === "ADD") {
		//console.log("added");

		return {
			...newState,
			addContact: true,
		};
	}
	if (action.type === "ADD_DETAILS") {
		newState.contacts[action.name] = action.contactNumber;
		return newState;
	}

	if (action.type === "EDIT_DETAILS") {
		if (action.prevName !== action.name) {
			delete newState.contacts[action.prevName];
		}
		newState.contacts[action.name] = action.contactNumber;
		return newState;
	}
	if (action.type === "DELETE_CONTACT") {
		delete newState.contacts[action.name];
		return newState;
	}

	return state;
};

export default reducer;
