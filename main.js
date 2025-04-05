import {
  calculateNextGeneration,
  createRandomizedGeneration,
} from "./scripts/core/generation.js";
import { sleep } from "./scripts/helpers/time.js";
import { printGeneration, clearConsole } from "./scripts/cli/print.js";

const config = {
  dimensions: {
    rows: 50,
    columns: 50,
  },
  borderBehavior: "toroid",
  maxGenerationCount: -1,
  fps: 60,
};

async function main() {
  let generation = createRandomizedGeneration(
    config.dimensions.rows,
    config.dimensions.columns
  );
  let generationsLeft = config.maxGenerationCount;

  clearConsole();
  printGeneration(generation);

  while (generationsLeft !== 0) {
    clearConsole();
    generation = calculateNextGeneration(generation, config.borderBehavior);
    printGeneration(generation);
    generationsLeft--;
    await sleep(1000 / config.fps);
  }
}

main();
