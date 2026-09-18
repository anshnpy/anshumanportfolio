export const dynamic = "force-static";

import { NextResponse } from "next/server";



type NvdCve = {
  cve: {
    id: string;
    published?: string;
    lastModified?: string;
    descriptions?: Array<{ lang: string; value: string }>;
  };
};

export async function GET() {
  const now = new Date();
  const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const nvdUrl =
    "https://services.nvd.nist.gov/rest/json/cves/2.0/?" +
    new URLSearchParams({
      pubStartDate: start.toISOString(),
      pubEndDate: now.toISOString(),
      resultsPerPage: "12",
      startIndex: "0",
    }).toString();

  const cisaUrl =
    "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json";

  const [nvdResult, cisaResult] = await Promise.allSettled([
    fetch(nvdUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Anshuman-Portfolio-Cyber-Feed/1.0",
      },
      cache: "force-cache",
    }),
    fetch(cisaUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 Anshuman-Portfolio-Cyber-Feed/1.0",
      },
      cache: "force-cache",
    }),
  ]);

  const vulnerabilities: Array<{
    id: string;
    description: string;
    url: string;
    published?: string | null;
    lastModified?: string | null;
    vendor?: string;
    product?: string;
    vulnerabilityName?: string;
  }> = [];

  const exploited: Array<{
    id: string;
    description: string;
    url: string;
    vendor?: string;
    product?: string;
    vulnerabilityName?: string;
    dateAdded?: string;
    requiredAction?: string;
    dueDate?: string;
  }> = [];

  if (
    nvdResult.status === "fulfilled" &&
    nvdResult.value.ok
  ) {
    try {
      const data = await nvdResult.value.json();
      const items: NvdCve[] = Array.isArray(data?.vulnerabilities)
        ? data.vulnerabilities
        : [];

      for (const item of items) {
        const cve = item?.cve;
        if (!cve?.id) continue;

        const description =
          cve.descriptions?.find((d) => d.lang === "en")?.value ||
          cve.descriptions?.[0]?.value ||
          "No description available.";

        vulnerabilities.push({
          id: cve.id,
          description,
          url: `https://nvd.nist.gov/vuln/detail/${cve.id}`,
          published: cve.published ?? null,
          lastModified: cve.lastModified ?? null,
          vendor: "NVD",
          product: "Vulnerability Database",
        });
      }
    } catch {}
  }

  if (
    cisaResult.status === "fulfilled" &&
    cisaResult.value.ok
  ) {
    try {
      const data = await cisaResult.value.json();
      const items = Array.isArray(data?.vulnerabilities)
        ? data.vulnerabilities
        : [];

      for (const item of items.slice(-12).reverse()) {
        if (!item?.cveID) continue;

        exploited.push({
          id: item.cveID,
          description:
            item.shortDescription ||
            item.vulnerabilityName ||
            "Known exploited vulnerability.",
          url: `https://nvd.nist.gov/vuln/detail/${item.cveID}`,
          vendor: item.vendorProject || "Unknown vendor",
          product: item.product || "Unknown product",
          vulnerabilityName:
            item.vulnerabilityName || item.shortDescription,
          dateAdded: item.dateAdded || "",
          requiredAction: item.requiredAction || "",
          dueDate: item.dueDate || "",
        });
      }
    } catch {}
  }

  if (
    vulnerabilities.length === 0 &&
    exploited.length === 0
  ) {
    return NextResponse.json(
      {
        error: "Cyber intelligence sources unavailable.",
        updated: now.toISOString(),
        sources: {
          nvd: nvdUrl,
          cisaKev: cisaUrl,
        },
        vulnerabilities: [],
        exploited: [],
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    updated: now.toISOString(),
    sources: {
      nvd: nvdUrl,
      cisaKev: cisaUrl,
    },
    vulnerabilities: vulnerabilities.slice(0, 6),
    exploited: exploited.slice(0, 6),
  });
}