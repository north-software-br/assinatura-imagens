import { useCallback } from "react";
import type { CompanyConfig } from "@/data/companies";
import { generateSignature } from "@/lib/signatureTemplate";
import type { SignatureData } from "@/types";

/** Versão em texto puro da assinatura, usada como fallback do clipboard. */
function buildPlainText(data: SignatureData, company: CompanyConfig): string {
  return [
    data.nome || "Nome do Colaborador",
    data.cargo || "Cargo",
    data.setor || "Setor",
    company.legalName,
    `${data.emailUser || "email"}${company.emailDomain}`,
    company.phone.label,
    company.address,
    company.website.label,
  ].join("\n");
}

/** Copia a assinatura para o clipboard como rich text (HTML) com fallback. */
async function copyToClipboard(html: string, plainText: string): Promise<void> {
  if (navigator.clipboard && "ClipboardItem" in window) {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([plainText], { type: "text/plain" }),
        }),
      ]);
      return;
    } catch {
      // Alguns navegadores bloqueiam rich clipboard; abaixo fica o fallback.
    }
  }

  const copyNode = document.createElement("div");
  copyNode.innerHTML = html;
  copyNode.style.position = "fixed";
  copyNode.style.left = "-9999px";
  copyNode.style.top = "0";
  document.body.appendChild(copyNode);

  const range = document.createRange();
  range.selectNodeContents(copyNode);

  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
  document.execCommand("copy");
  selection?.removeAllRanges();
  copyNode.remove();
}

/**
 * Hook que expõe uma função para copiar a assinatura formatada da empresa
 * informada. Encapsula a geração do HTML e a interação com o clipboard.
 */
export function useCopySignature() {
  return useCallback(async (data: SignatureData, company: CompanyConfig) => {
    const html = generateSignature(data, company);
    const plainText = buildPlainText(data, company);
    await copyToClipboard(html, plainText);
  }, []);
}
