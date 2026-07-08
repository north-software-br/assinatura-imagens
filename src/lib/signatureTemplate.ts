import type { CompanyConfig } from "@/data/companies";
import type { SignatureData } from "@/types";

/**
 * Caixa padronizada do logo. Todas as logos são renderizadas dentro de um
 * espaço fixo (`width` x `height`), centralizadas. Cada empresa define apenas
 * `logo.width`/`logo.height` proporcionais para caber aqui dentro — o espaço
 * reservado é sempre o mesmo, independente da empresa selecionada.
 */
const LOGO_BOX = { width: 120, height: 88 };

/**
 * Caixa padronizada da faixa de certificações/selos, alinhada sob o logo.
 * Mesma lógica do `LOGO_BOX`: espaço fixo e conteúdo centralizado.
 */
const CERT_BOX = { width: 120, height: 24 };

/** Converte "#rrggbb" em "r,g,b" para uso em rgb(...) inline (clientes de e-mail). */
function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

/**
 * Ícones embutidos como SVG inline (sem `<img src>` externo). O export vira PNG
 * via html2canvas, que não consegue ler pixels de imagens cross-origin sem
 * CORS — inline SVG evita esse problema por completo.
 */
const ICON_PATHS: Record<string, string> = {
  email:
    '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>',
  phone:
    '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>',
  map: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  website:
    '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
};

function strokeIcon(name: string, size: number, hex: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${hex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">${ICON_PATHS[name]}</svg>`;
}

const SOCIAL_ICON_PATHS: Record<string, string> = {
  instagram:
    "M12 0C8.74 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.986 8.74 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.058-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.014 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zM12 5.838c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};

function fillIcon(name: string, size: number, hex: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${hex}" style="display: block;"><path d="${SOCIAL_ICON_PATHS[name]}"/></svg>`;
}

export function generateSignature(
  { nome, cargo, setor, emailUser }: SignatureData,
  company: CompanyConfig,
): string {
  const {
    legalName,
    emailDomain,
    phone,
    address,
    website,
    logo,
    certifications,
    social,
    colors,
  } = company;

  const emailFull = (emailUser || "email") + emailDomain;

  const brand = hexToRgb(colors.brand);
  const accent = hexToRgb(colors.accent);
  const muted = hexToRgb(colors.muted);
  const iconHex = colors.icon ?? colors.accent;
  const socialHex = colors.social ?? colors.accent;

  const contactRow = (iconName: string, content: string) => `
                    <tr>
                      <td valign="middle" style="padding: 3px 8px 3px 0px; vertical-align: middle;">
                        <p style="margin: 1px;">
                          ${strokeIcon(iconName, 18, iconHex)}
                        </p>
                      </td>
                      <td style="font-family: Arial, sans-serif; font-size: 10pt; line-height: 19px; white-space: nowrap; color: rgb(${muted}) !important; padding: 3px 0px; vertical-align: middle;">
                        <p style="margin: 1px;">${content}</p>
                      </td>
                    </tr>`;

  const emailCell = `<a href="mailto:${emailFull}" target="_blank" style="font-family: Arial, sans-serif; font-size: 10pt; line-height: 17px; white-space: nowrap; color: rgb(${muted}); text-decoration: none !important;"><span style="font-family: Arial, sans-serif; font-size: 10pt; line-height: 17px; white-space: nowrap; color: rgb(${muted}); text-decoration: none !important;">${emailFull}</span></a>`;

  const phoneCell = `<a href="tel:${phone.tel}" target="_blank" style="font-family: Arial, sans-serif; font-size: 10pt; line-height: 17px; white-space: nowrap; color: rgb(${muted}); text-decoration: none !important;"><span style="font-family: Arial, sans-serif; font-size: 10pt; line-height: 17px; white-space: nowrap; color: rgb(${muted}); text-decoration: none !important;">${phone.label}</span></a>`;

  const addressCell = `<span style="font-family: Arial, sans-serif; font-size: 10pt; line-height: 17px; white-space: nowrap; color: rgb(${muted}); text-decoration: none !important;">${address}</span>`;

  const websiteCell = `<a href="${website.url}" target="_blank" style="font-family: Arial, sans-serif; font-size: 10pt; line-height: 17px; white-space: nowrap; color: rgb(${accent}); font-weight: 700; text-decoration: none !important;"><span style="font-family: Arial, sans-serif; font-size: 10pt; line-height: 17px; white-space: nowrap; color: rgb(${accent}); font-weight: 700; text-decoration: none !important;">${website.label}</span></a>`;

  const certificationsBlock = certifications
    ? `<a href="${website.url}" target="_blank">
                      <img src="${certifications.src}" alt="" title="Logo" width="${certifications.width}" height="${certifications.height}" style="display: inline-block; border: 0px; max-width: ${CERT_BOX.width}px; max-height: ${CERT_BOX.height}px;">
                    </a>`
    : "";

  const socialIcon = (url: string | undefined, iconName: string) =>
    url
      ? `
                <td width="22" style="font-size: 0px; line-height: 0px; padding: 0px 1px 0px 0px;">
                  <p style="margin: 1px;">
                    <a href="${url}" target="_blank">
                      ${fillIcon(iconName, 18, socialHex)}
                    </a>
                  </p>
                </td>
                <td width="3" style="padding: 0px 0px 1px;"></td>`
      : "";

  return `<table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
  <tr>
    <td style="padding: 25px 25px;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin: 0px;">
        <tr>

          <td align="center" valign="middle" width="${LOGO_BOX.width}" height="${LOGO_BOX.height}" style="width: ${LOGO_BOX.width}px; height: ${LOGO_BOX.height}px; padding: 0px 32px 0px 0px; text-align: center; vertical-align: middle;">
            <img src="${logo.src}" alt="" title="Profile Picture" width="${logo.width}" height="${logo.height}" style="display: inline-block; border: 0px; max-width: ${LOGO_BOX.width}px; max-height: ${LOGO_BOX.height}px;">
          </td>
          <td valign="top" style="padding: 0px 38px 0px 1px; vertical-align: top;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
              <tr>
                <td style="padding: 0px 1px 0px 0px; font-family: Arial, sans-serif; font-size: 10pt; line-height: 17px; white-space: nowrap;">
                  <p style="font-family: Arial, sans-serif; font-size: 10pt; line-height: 19px; font-weight: 700; color: rgb(${brand}); margin: 1px; white-space: nowrap;">${nome || "Nome do Colaborador"}</p>
                  <p style="font-family: Arial, sans-serif; font-size: 10pt; line-height: 20px; white-space: nowrap; color: rgb(${muted}); margin: 1px;">${cargo || "Cargo"}</p>
                  <p style="font-family: Arial, sans-serif; font-size: 10pt; line-height: 20px; white-space: nowrap; color: rgb(${muted}); margin: 1px;">${setor || "Setor"}</p>
                  <p style="font-family: Arial, sans-serif; font-size: 10pt; line-height: 20px; white-space: nowrap; color: rgb(${muted}); margin: 1px;">${legalName}</p>
                </td>
              </tr>
            </table>
          </td>
          <td style="padding: 1px 0px 0px; border-right: 2px solid rgb(${brand});"></td>
          <td valign="top" style="padding: 0px 1px 0px 38px; vertical-align: top;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
              <tr>
                <td style="padding: 0px 1px 0px 0px;">
                  <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">${contactRow("email", emailCell)}${contactRow("phone", phoneCell)}${contactRow("map", addressCell)}${contactRow("website", websiteCell)}
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding: 32px 1px 0px 0px;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
              <tr>
                <td align="center" valign="middle" width="${CERT_BOX.width}" height="${CERT_BOX.height}" style="width: ${CERT_BOX.width}px; height: ${CERT_BOX.height}px; padding: 0px 1px 0px 0px; text-align: center; vertical-align: middle;">
                  ${certificationsBlock}
                </td>
              </tr>
            </table>
          </td>
          <td valign="middle" colspan="2" style="padding: 32px 1px 0px 32px; vertical-align: middle;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
              <tr>${socialIcon(social.instagram, "instagram")}${socialIcon(social.linkedin, "linkedin")}
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}
