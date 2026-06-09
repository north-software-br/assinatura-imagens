import type { SignatureData } from "../../types";
import type { CompanyConfig } from "../../data/companies";

/** Converte "#rrggbb" em "r,g,b" para uso em rgb(...) inline (clientes de e-mail). */
function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

/** Monta a URL do ícone colorido (SignatureHound) a partir de um HEX. */
function iconUrl(name: string, hex: string): string {
  return `https://cdn.signaturehound.com/icons/${name}_default_${hex.replace("#", "")}.png`;
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
                      <td valign="middle" style="padding: 1px 5px 1px 0px; vertical-align: middle;">
                        <p style="margin: 1px;">
                          <img src="${iconUrl(iconName, iconHex)}" alt="" width="18" height="18" style="display: block; border: 0px; margin: 0px; width: 18px; height: 18px;">
                        </p>
                      </td>
                      <td style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(${muted}) !important; padding: 1px 0px; vertical-align: middle;">
                        <p style="margin: 1px;">${content}</p>
                      </td>
                    </tr>`;

  const emailCell = `<a href="mailto:${emailFull}" target="_blank" style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(${muted}); text-decoration: none !important;"><span style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(${muted}); text-decoration: none !important;">${emailFull}</span></a>`;

  const phoneCell = `<a href="tel:${phone.tel}" target="_blank" style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(${muted}); text-decoration: none !important;"><span style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(${muted}); text-decoration: none !important;">${phone.label}</span></a>`;

  const addressCell = `<span style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(${muted}); text-decoration: none !important;">${address}</span>`;

  const websiteCell = `<a href="${website.url}" target="_blank" style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(${accent}); font-weight: 700; text-decoration: none !important;"><span style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap; color: rgb(${accent}); font-weight: 700; text-decoration: none !important;">${website.label}</span></a>`;

  const certificationsBlock = certifications
    ? `<a href="${website.url}" target="_blank">
                      <img src="${certifications.src}" alt="" title="Logo" width="${certifications.width}" height="${certifications.height}" style="display: block; border: 0px; max-width: ${certifications.width}px;">
                    </a>`
    : "";

  const socialIcon = (url: string | undefined, iconName: string) =>
    url
      ? `
                <td width="30" style="font-size: 0px; line-height: 0px; padding: 0px 1px 0px 0px;">
                  <p style="margin: 1px;">
                    <a href="${url}" target="_blank">
                      <img src="${iconUrl(iconName, socialHex)}" alt="" width="30" height="30" style="display: block; border: 0px; margin: 0px; width: 30px; height: 30px;">
                    </a>
                  </p>
                </td>
                <td width="3" style="padding: 0px 0px 1px;"></td>`
      : "";

  return `<table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
  <tr>
    <td style="padding: 0px 1px 0px 0px;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin: 0px;">
        <tr>

          <td align="center" valign="top" style="padding: 0px 25px 0px 0px; vertical-align: top;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
              <tr>
                <td style="padding: 0px 1px 0px 0px;">
                  <p style="margin: 1px;">
                    <img src="${logo.src}" alt="" title="Profile Picture" width="${logo.width}" height="${logo.height}" style="display: block; border: 0px; max-width: ${logo.width}px;">
                  </p>
                </td>
              </tr>
            </table>
          </td>
          <td valign="top" style="padding: 0px 30px 0px 1px; vertical-align: top;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
              <tr>
                <td style="padding: 0px 1px 0px 0px; font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; white-space: nowrap;">
                  <p style="font-family: Arial, sans-serif; font-size: 13px; line-height: 17px; font-weight: 700; color: rgb(${brand}); margin: 1px; white-space: nowrap;">${nome || "Nome do Colaborador"}</p>
                  <p style="font-family: Arial, sans-serif; font-size: 13px; line-height: 18px; white-space: nowrap; color: rgb(${muted}); margin: 1px;">${cargo || "Cargo"}</p>
                  <p style="font-family: Arial, sans-serif; font-size: 13px; line-height: 18px; white-space: nowrap; color: rgb(${muted}); margin: 1px;">${setor || "Setor"}</p>
                  <p style="font-family: Arial, sans-serif; font-size: 13px; line-height: 18px; white-space: nowrap; color: rgb(${muted}); margin: 1px;">${legalName}</p>
                </td>
              </tr>
            </table>
          </td>
          <td style="padding: 1px 0px 0px; border-right: 2px solid rgb(${brand});"></td>
          <td valign="top" style="padding: 0px 1px 0px 30px; vertical-align: top;">
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
          <td colspan="2" style="padding: 25px 1px 0px 0px;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
              <tr>
                <td style="padding: 0px 1px 0px 0px;">
                  <p style="margin: 1px;">
                    ${certificationsBlock}
                  </p>
                </td>
              </tr>
            </table>
          </td>
          <td valign="middle" colspan="2" style="padding: 25px 1px 0px 25px; vertical-align: middle;">
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
