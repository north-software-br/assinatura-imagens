import { forwardRef } from "react";
import type { SignatureData } from "../types";
import { generateSignature } from "../utils/templates/signatureTemplate";

interface SignaturePreviewProps {
  data: SignatureData;
}

export const SignaturePreview = forwardRef<
  HTMLDivElement,
  SignaturePreviewProps
>(function SignaturePreview({ data }, ref) {
  const isComplete = Boolean(data.nome && data.cargo && data.setor && data.emailUser);

  return (
    <section className="preview">
      <div className="panel">
        <div className="preview__head">
          <h2 className="panel__title">Preview</h2>
          <span className={`preview__hint${isComplete ? " preview__hint--ready" : ""}`}>
            {isComplete ? "Pronta para copiar" : "Preencha os dados para ver o resultado final"}
          </span>
        </div>
        <div className="preview__content">
          <div
            className="preview__frame"
            ref={ref}
            dangerouslySetInnerHTML={{ __html: generateSignature(data) }}
          />
        </div>
      </div>
    </section>
  );
});
