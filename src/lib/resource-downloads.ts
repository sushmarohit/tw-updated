/**
 * Business Case Kit (and future resource gates): template metadata and download URL resolution.
 * URLs: set RESOURCE_DOWNLOAD_* (server) or NEXT_PUBLIC_RESOURCE_DOWNLOAD_* (works on server too).
 */

export type ResourceTemplateCode = 'FULL_KIT' | 'ROI_FRAMEWORK' | 'IMPACT_MEASUREMENT' | 'CBA_PACK';

type TemplateDefinition = {
  displayName: string;
  /** Short name for email subjects */
  emailSubjectName: string;
  /** Env keys checked in order (first non-empty http URL wins) */
  envKeys: readonly string[];
  attachmentFileBase: string;
};

const DEFINITIONS: Record<ResourceTemplateCode, TemplateDefinition> = {
  FULL_KIT: {
    displayName: 'Business Case Kit (full)',
    emailSubjectName: 'Business Case Kit',
    envKeys: ['RESOURCE_DOWNLOAD_FULL_KIT_URL', 'NEXT_PUBLIC_RESOURCE_DOWNLOAD_FULL_KIT_URL'],
    attachmentFileBase: 'twelfthkey-business-case-kit',
  },
  ROI_FRAMEWORK: {
    displayName: 'ROI Calculation Framework template',
    emailSubjectName: 'ROI Framework template',
    envKeys: ['RESOURCE_DOWNLOAD_ROI_FRAMEWORK_URL', 'NEXT_PUBLIC_RESOURCE_DOWNLOAD_ROI_FRAMEWORK_URL'],
    attachmentFileBase: 'twelfthkey-roi-framework',
  },
  IMPACT_MEASUREMENT: {
    displayName: 'Operational impact measurement template',
    emailSubjectName: 'Impact measurement template',
    envKeys: ['RESOURCE_DOWNLOAD_IMPACT_MEASUREMENT_URL', 'NEXT_PUBLIC_RESOURCE_DOWNLOAD_IMPACT_MEASUREMENT_URL'],
    attachmentFileBase: 'twelfthkey-impact-measurement',
  },
  CBA_PACK: {
    displayName: 'Cost–benefit analysis template pack',
    emailSubjectName: 'CBA template pack',
    envKeys: ['RESOURCE_DOWNLOAD_CBA_PACK_URL', 'NEXT_PUBLIC_RESOURCE_DOWNLOAD_CBA_PACK_URL'],
    attachmentFileBase: 'twelfthkey-cba-pack',
  },
};

function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value.trim());
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

export function resolveResourceDownloadUrl(templateCode: string): string | undefined {
  const def = DEFINITIONS[templateCode as ResourceTemplateCode];
  if (!def) {
    const direct = process.env[`RESOURCE_DOWNLOAD_${templateCode}`];
    const pub = process.env[`NEXT_PUBLIC_RESOURCE_DOWNLOAD_${templateCode}`];
    for (const v of [direct, pub]) {
      if (v && isHttpUrl(v)) return v.trim();
    }
    return undefined;
  }
  for (const key of def.envKeys) {
    const v = process.env[key];
    if (v && isHttpUrl(v)) return v.trim();
  }
  return undefined;
}

export function getResourceTemplateMeta(templateCode: string): {
  displayName: string;
  emailSubjectName: string;
  attachmentFileBase: string;
} {
  const def = DEFINITIONS[templateCode as ResourceTemplateCode];
  if (def) {
    return {
      displayName: def.displayName,
      emailSubjectName: def.emailSubjectName,
      attachmentFileBase: def.attachmentFileBase,
    };
  }
  const fallback = templateCode.replace(/_/g, ' ');
  return {
    displayName: fallback,
    emailSubjectName: fallback,
    attachmentFileBase: 'twelfthkey-resource',
  };
}

const SPREADSHEET_ID_RE = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;

export function extractGoogleSpreadsheetId(url: string): string | null {
  const match = url.trim().match(SPREADSHEET_ID_RE);
  return match?.[1] ?? null;
}

export function googleSheetXlsxExportUrl(spreadsheetId: string): string {
  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=xlsx`;
}

/**
 * Try to download a public (or link-shared) Google Sheet as .xlsx for email attachment.
 * Returns null if the URL is not a Sheets link, fetch fails, or the response is not an xlsx.
 */
export async function tryFetchGoogleSheetXlsx(
  sourceUrl: string,
  attachmentBaseName: string
): Promise<{ buffer: Buffer; filename: string } | null> {
  const id = extractGoogleSpreadsheetId(sourceUrl);
  if (!id) return null;

  const exportUrl = googleSheetXlsxExportUrl(id);
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(exportUrl, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'TwelfthKey-ResourceGate/1.0',
      },
    });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 64) return null;
    // XLSX is a ZIP archive; Google error pages are HTML
    if (buf[0] !== 0x50 || buf[1] !== 0x4b) return null;

    const safeBase = attachmentBaseName.replace(/[^a-zA-Z0-9-_]+/g, '-').replace(/^-|-$/g, '') || 'template';
    const date = new Date().toISOString().split('T')[0];
    return { buffer: buf, filename: `${safeBase}-${date}.xlsx` };
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}
