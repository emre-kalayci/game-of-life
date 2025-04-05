/**
 * @param {boolean[][]} generation 
 */
function printGeneration(generation){
	const rowCount = generation.length;
	const columnCount = generation[0].length;

	for (let row = 0; row < rowCount; row++) {
		let line = '';

		for (let column = 0; column < columnCount; column++) {
			const cellState = generation[row][column];
			line = line.concat((cellState) ? "\u2588" : " ");
			// line = line.concat((cellState) ? "#" : " ");
		}

		console.log(line);
		
	}
}

function clearConsole(){
	console.clear();
}

export {printGeneration ,clearConsole};