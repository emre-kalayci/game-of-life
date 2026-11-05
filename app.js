import {
  createRandomizedGeneration,
  calculateNextGeneration,
} from "./scripts/core/generation.js";

const canvas = document.getElementById("gameGrid");
const ctx = canvas.getContext("2d");

const rowCount = 40;
const columnCount = 40;
const cellSize = canvas.width / columnCount;

// Hier nutzt du direkt deine eigene Logik für den Start!
let generation = createRandomizedGeneration(rowCount, columnCount);

function drawGrid() {
  // Altes Bild löschen, bevor neu gezeichnet wird
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
      if (generation[row][column]) {
        ctx.fillStyle = "#4ade80"; // Neongrün für lebende Zellen
        // Zeichnet das Quadrat (mit -1 für einen kleinen Gitterabstand)
        ctx.fillRect(
          column * cellSize,
          row * cellSize,
          cellSize - 1,
          cellSize - 1,
        );
      }
    }
  }
}

function gameLoop() {
  drawGrid();

  // Nächste Generation über deine Core-Logik berechnen
  generation = calculateNextGeneration(generation, "toroid");

  // Schleife mit einer Verzögerung von 100ms (ca. 10 Bilder pro Sekunde)
  setTimeout(() => {
    requestAnimationFrame(gameLoop);
  }, 100);
}

// Spiel starten
gameLoop();
