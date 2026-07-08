import { forwardRef } from "react";
import type { CompanyConfig } from "@/data/companies";
import { generateSignature } from "@/lib/signatureTemplate";
import type { SignatureData } from "@/types";

interface SignaturePreviewProps {
  data: SignatureData;
  company: CompanyConfig;
}

export const SignaturePreview = forwardRef<HTMLDivElement, SignaturePreviewProps>(
  function SignaturePreview({ data, company }, ref) {
    return (
      <section className="preview">
        <div className="panel">
          <div className="preview__head">
            <h2 className="panel__title">Preview</h2>
          </div>
          <div className="preview__content">
            <div className="preview__frame">
              <div
                ref={ref}
                style={{ display: "inline-block" }}
                dangerouslySetInnerHTML={{ __html: generateSignature(data, company) }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  },
);
