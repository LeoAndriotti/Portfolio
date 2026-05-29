import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../../assets/images/projects");

const shots = [
    { file: "dashboard.html", out: "legal-hub-1.png" },
    { file: "chat.html", out: "legal-hub-2.png" },
    { file: "tickets.html", out: "legal-hub-3.png" },
];

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

for (const { file, out } of shots) {
    const url = "file://" + path.join(__dirname, file).replace(/\\/g, "/");
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluateHandle("document.fonts.ready");
    await page.screenshot({
        path: path.join(outDir, out),
        type: "png",
        clip: { x: 0, y: 0, width: 1440, height: 900 },
    });
    console.log("OK", out);
}

await browser.close();
