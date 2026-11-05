import { calculateNextCellState } from "./cell.js";


/**
 * @typedef Position
 * @type {object}
 * @property {number} row
 * @property {number} column
 */

/**
 * @callback cellCallback
 * @param {number} row
 * @param {number} column
 * @param {boolean} cellState
 */

/**
 * @param {boolean[][]} generation
 * @param {cellCallback} cellCallback 
 */
function iterateGeneration(generation, cellCallback){
	const rowCount = generation.length;
	const columnCount = generation[0].length;

	for (let row = 0; row < rowCount; row++) {
		for (let column = 0; column < columnCount; column++) {
			cellCallback(row, column, generation[row][column]);
		}
	}
}

/**
 * @param {number} rowCount 
 * @param {number} columnCount
 * @param {any} cellStateCallback
 */
function createGeneration(rowCount, columnCount, cellStateCallback) {
	const generation = [];

	for (let row = 0; row < rowCount; row++) {
		generation.push([]);

		for (let column = 0; column < columnCount; column++) {
			generation[row].push(cellStateCallback());
		}
	}

	return generation;
}

// TODO docs
function createEmptyGeneration(rowCount, columnCount) {
	return createGeneration(rowCount, columnCount, () => false);
}

// TODO docs
function createFilledGeneration(rowCount, columnCount) {
	return createGeneration(rowCount, columnCount, () => true);
}

// TODO docs
function createRandomizedGeneration(rowCount, columnCount) {
	return createGeneration(rowCount, columnCount, () => Math.random() > 0.65);
}

/**
 * @param {boolean[][]} generation 
 * @returns {boolean[][]}
 */
function calculateNextGeneration(generation, borderBehavior) {
	const nextGeneration = [];
	const rowCount = generation.length;
	const columnCount = generation[0].length;

	for (let row = 0; row < rowCount; row++) {
		nextGeneration.push([]);

		for (let column = 0; column < columnCount; column++) {
			const nextCellState = calculateNextCellState(generation, {row, column}, borderBehavior);
			nextGeneration[row].push(nextCellState);
		}
	}

	return nextGeneration;
}

/**
 * @param {Position} position
 */
function isPositionInBorder(generation, position){
	const rowCount = generation.length;
	const columnCount = generation[0].length;

	if (position.row === 0) return true;
	if (position.row === rowCount - 1) return true;
	if (position.column === 0) return true;
	if (position.column === columnCount - 1) return true;

	return false;
}

export { createEmptyGeneration, createFilledGeneration, createRandomizedGeneration, calculateNextGeneration, isPositionInBorder };