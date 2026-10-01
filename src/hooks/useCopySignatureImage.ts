import { useCallback } from "react";
import html2canvas from "html2canvas";

function renderPng(node: HTMLElement): Promise<Blob> {
  return html2canvas(node, {
    backgroundColor: "#ffffff",
    useCORS: true,
    scale: 2,
  }).then(
    (canvas) =>
      new Promise<Blob>((resolve, reject) =>
        canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))), "image/png"),
      ),
  );
}

export function useCopySignatureImage() {
  return useCallback(async (node: HTMLElement) => {
    const blob = await renderPng(node);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "assinatura.png";
    link.click();
    URL.revokeObjectURL(url);
  }, []);
}
