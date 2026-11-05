import express from "express";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));

app.listen(port, () => {
  const url = `http://localhost:${port}`;
  console.log(`Server läuft. Öffne Fenster: ${url}`);

  const startCmd =
    process.platform === "win32"
      ? "start"
      : process.platform === "darwin"
        ? "open"
        : "xdg-open";
  exec(`${startCmd} ${url}`);
});
