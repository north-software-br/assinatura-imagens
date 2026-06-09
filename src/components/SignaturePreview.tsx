import type { CompanyConfig } from "@/data/companies";
import { generateSignature } from "@/lib/signatureTemplate";
import type { SignatureData } from "@/types";

interface SignaturePreviewProps {
  data: SignatureData;
  company: CompanyConfig;
}

export function SignaturePreview({ data, company }: SignaturePreviewProps) {
  return (
    <section className="preview">
      <div className="panel">
        <div className="preview__head">
          <h2 className="panel__title">Preview</h2>
        </div>
        <div className="preview__content">
          <div
            className="preview__frame"
            dangerouslySetInnerHTML={{ __html: generateSignature(data, company) }}
          />
        </div>
      </div>
    </section>
  );
}
