import { isPositionInBorder } from "./generation.js";

/**
 * @typedef Position
 * @type {object}
 * @property {number} row
 * @property {number} column
 */

function calculatePositionOffets(){
	const offsets = [];
	for (let row = -1; row <= 1; row++) {
		for (let column = -1; column <= 1; column++) {
			if (row === 0 && column === 0) continue; // ignore the position offset of (0,0)
			offsets.push({row, column});
		}
	}

	return offsets;
}

/**
 * @param {boolean[][]} generation 
 * @param {Position} position 
 */
function countNeighborsToroid(generation, position){
	const row = position.row;
	const column = position.column;
	const maxRowIndex = generation.length - 1;
	const maxColumnIndex = generation[0].length - 1;
	let neighborCount = 0;

	const top = (row !== 0) ? row - 1 : maxRowIndex;
	const bottom = (row !== maxRowIndex) ? row + 1 : 0;
	const left = (column !== 0) ? column - 1 : maxColumnIndex;
	const right = (column !== maxColumnIndex) ? column + 1 : 0;

	if (generation[top][left]) neighborCount++;
	if (generation[top][column]) neighborCount++;
	if (generation[top][right]) neighborCount++;
	if (generation[row][left]) neighborCount++;
	if (generation[row][right]) neighborCount++;
	if (generation[bottom][left]) neighborCount++;
	if (generation[bottom][column]) neighborCount++;
	if (generation[bottom][right]) neighborCount++;

	return neighborCount;
}

/**
 * @param {boolean[][]} generation 
 * @param {Position} position 
 */
function countNeighborsWithBorder(generation, position){
	const row = position.row;
	const column = position.column;
	let neighborCount = 0;

	if (generation[row-1][column-1]) neighborCount++;
	if (generation[row-1][column]) neighborCount++;
	if (generation[row-1][column+1]) neighborCount++;
	if (generation[row][column-1]) neighborCount++;
	if (generation[row][column+1]) neighborCount++;
	if (generation[row+1][column-1]) neighborCount++;
	if (generation[row+1][column]) neighborCount++;
	if (generation[row+1][column+1]) neighborCount++;

	return neighborCount;
}

/**
 * @param {boolean[][]} generation 
 * @param {Position} position 
 */
function calculateNextCellState(generation, position, style){
	if (style === 'border') {
		if (isPositionInBorder(generation, position)) return false;
	}

	const cellState = generation[position.row][position.column];
	let neighborCount;

	if (style === 'border') {
		neighborCount = countNeighborsWithBorder(generation, position);
	} else if (style === 'toroid') {
		neighborCount = countNeighborsToroid(generation, position);
	} else {
		throw new Error(`Style ${style} is not supported`);
	}

	if (cellState === true){
		if (neighborCount < 2) return false; // Underpopulation
		if (neighborCount === 2 || neighborCount === 3) return true;
		if (neighborCount > 3) return false; // Overpopulation
	} else {
		if (neighborCount === 3) return true; // Reproduction
		else return false;
	}

	// Should never arrive here
	throw new Error('There must be a bug in the rules');
}

export {calculateNextCellState};