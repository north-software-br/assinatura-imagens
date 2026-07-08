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

/** Renderiza o nó da assinatura como PNG e copia pro clipboard (fallback: baixa o arquivo). */
export function useCopySignatureImage() {
  return useCallback(async (node: HTMLElement) => {
    if (navigator.clipboard && "ClipboardItem" in window) {
      try {
        // A promise (não o blob já resolvido) precisa ir direto pro ClipboardItem: o
        // write() tem que ser chamado ainda dentro da ativação do clique do usuário.
        // Safari/Windows revogam essa permissão assim que um `await` (aqui, o
        // html2canvas) devolve o controle ao event loop antes do write().
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": renderPng(node) }),
        ]);
        return;
      } catch {
        // Clipboard de imagem bloqueado/indisponível; cai pro download abaixo.
      }
    }

    const blob = await renderPng(node);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "assinatura.png";
    link.click();
    URL.revokeObjectURL(url);
  }, []);
}
