/**
 * Helps you make the different kind of Refiners.
 */
import {Refiner} from "./refiner.js";
import {Modifier} from "./modifier.js";

const RefinerFactory = {
	createExcluder(exclusionRulesAsText) {
		return new Refiner(
			exclusionRulesAsText,
			entry => entry.delete === false,
			entry => {
				entry.delete = true;
			});
	},

	createIncluder(inclusionRulesAsText) {
		return new Refiner(
			inclusionRulesAsText,
			entry => entry.delete === true,
			entry => {
				entry.delete = false;
			});
	},

	createModifer(modificationRulesAsText) {
		return new Modifier(modificationRulesAsText);
	},
};

export {RefinerFactory};
