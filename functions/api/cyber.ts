interface Env {}

type NvdItem = {
  cve: {
    id: string;
    published?: string;
    lastModified?: string;
    descriptions?: {
      lang: string;
      value: string;
    }[];
  };
};

type KevItem = {
  cveID: string;
  vendorProject: string;
  product: string;
  vulnerabilityName: string;
  dateAdded: string;
  shortDescription: string;
  requiredAction: string;
  dueDate: string;
};

export const onRequestGet: PagesFunction<Env> = async () => {
  try {
    const nvdUrl =
      "https://services.nvd.nist.gov/rest/json/cves/2.0?pubStartDate=2026-07-17T00%3A00%3A00.000Z&pubEndDate=2026-08-16T23%3A59%3A59.999Z&resultsPerPage=10";

    const cisaUrl =
      "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json";

    const [nvdResponse, cisaResponse] = await Promise.all([
      fetch(nvdUrl, {
        headers: {
          Accept: "application/json",
          "User-Agent": "AnshumanPortfolio/1.0",
        },
      }),

      fetch(cisaUrl, {
        headers: {
          Accept: "application/json",
          "User-Agent": "AnshumanPortfolio/1.0",
        },
      }),
    ]);

    if (!nvdResponse.ok || !cisaResponse.ok) {
      return new Response(
        JSON.stringify({
          error: "Cybersecurity source request failed",
          nvd: {
            ok: nvdResponse.ok,
            status: nvdResponse.status,
          },
          cisa: {
            ok: cisaResponse.ok,
            status: cisaResponse.status,
          },
        }),
        {
          status: 502,
          headers: {
            "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const nvdData = (await nvdResponse.json()) as {
      vulnerabilities?: NvdItem[];
    };

    const cisaData = (await cisaResponse.json()) as {
      vulnerabilities?: KevItem[];
    };

    const vulnerabilities = [...(nvdData.vulnerabilities ?? [])].reverse().map((item) => {
      const cve = item.cve;

      return {
        id: cve.id,
        published: cve.published ?? null,
        lastModified: cve.lastModified ?? null,
        description:
          cve.descriptions?.find(
            (description) => description.lang === "en"
          )?.value ?? "No description available.",
        url: `https://nvd.nist.gov/vuln/detail/${cve.id}`,
      };
    });

    const exploited = (cisaData.vulnerabilities ?? [])
      .sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
      .slice(0, 10)
      .map((item) => ({
        id: item.cveID,
        vendor: item.vendorProject,
        product: item.product,
        vulnerabilityName: item.vulnerabilityName,
        dateAdded: item.dateAdded,
        description: item.shortDescription,
        requiredAction: item.requiredAction,
        dueDate: item.dueDate,
        url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
      }));

    return new Response(
      JSON.stringify({
        updated: new Date().toISOString(),

        sources: {
          nvd: "NVD",
          cisaKev: "CISA KEV",
        },

        vulnerabilities,
        exploited,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=900",
        },
      }
    );
  } catch (error) {
    console.error("Cyber intelligence error:", error);

    return new Response(
      JSON.stringify({
        error: "Unable to fetch cybersecurity intelligence",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};
