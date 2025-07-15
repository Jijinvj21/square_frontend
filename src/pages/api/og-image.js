// pages/api/og-image.js
import * as playwright from "playwright-aws-lambda";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import OgImage from "../../components/OgImage";

export default async (req, res) => {
  try {
    // Extract query parameters
    const { title = "Default Title", id = "0" } = req.query;

    // Create React element
    const element = React.createElement(OgImage, {
      title: decodeURIComponent(title),
      id,
    });

    // Render to HTML
    const markup = renderToStaticMarkup(element);
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Poppins', sans-serif; }
          </style>
        </head>
        <body>
          ${markup}
        </body>
      </html>
    `;

    // Launch browser
    const browser = await playwright.launchChromium();
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
    });

    // Set content and wait for fonts
    await page.setContent(html);
    await page.evaluateHandle("document.fonts.ready");

    // Generate screenshot
    const image = await page.screenshot({ type: "jpeg", quality: 90 });
    await browser.close();

    // Set caching headers (1 day)
    res.setHeader("Cache-Control", "public, max-age=86400, immutable");
    res.setHeader("Content-Type", "image/jpeg");
    res.end(image);
  } catch (error) {
    console.error("OG generation failed:", error);
    res.status(500).send("Internal Server Error");
  }
};
