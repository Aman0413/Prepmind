// utils/pdfJs.js
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/web/pdf_viewer.css";

// Setting the workerSrc to load the worker script from the CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function extractTextFromPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    let textContent = "";

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContentArray = await page.getTextContent();
      textContent += textContentArray.items.map((item) => item.str).join(" ");
    }

    return textContent;
  } catch (error) {
    console.error("Error in extractTextFromPDF:", error);
    throw error;
  }
}
