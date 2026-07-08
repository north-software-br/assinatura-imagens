import { useCallback } from "react";
import html2canvas from "html2canvas";

/** Renderiza o nó da assinatura como PNG e copia pro clipboard (fallback: baixa o arquivo). */
export function useCopySignatureImage() {
  return useCallback(async (node: HTMLElement) => {
    const canvas = await html2canvas(node, {
      backgroundColor: "#ffffff",
      useCORS: true,
      scale: 2,
    });

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png"),
    );
    if (!blob) return;

    if (navigator.clipboard && "ClipboardItem" in window) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        return;
      } catch {
        // Clipboard de imagem bloqueado/indisponível; cai pro download abaixo.
      }
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "assinatura.png";
    link.click();
    URL.revokeObjectURL(url);
  }, []);
}
