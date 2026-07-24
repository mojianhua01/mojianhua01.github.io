import fs from "node:fs";

const source = fs.readFileSync("_data/publications.yml", "utf8");
const blocks = source.split(/\r?\n(?=- title: )/);

function scalar(block, key) {
  const lines = block.split(/\r?\n/);
  const prefix = key === "title" ? "- title: " : `  ${key}: `;
  const index = lines.findIndex((line) => line.startsWith(prefix));
  if (index < 0) return "";
  const parts = [lines[index].slice(prefix.length).trim()];
  for (let i = index + 1; i < lines.length && /^ {4}\S/.test(lines[i]); i++) {
    parts.push(lines[i].trim());
  }
  return parts.join(" ").replace(/^(['"])(.*)\1$/, "$2");
}

function normalize(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function similarity(a, b) {
  const left = new Set(normalize(a).split(" "));
  const right = new Set(normalize(b).split(" "));
  const intersection = [...left].filter((word) => right.has(word)).length;
  return (2 * intersection) / (left.size + right.size);
}

function existingLinks(block) {
  const links = [];
  const lines = block.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const label = lines[i].match(/^  - label: (.+)$/);
    const url = lines[i + 1]?.match(/^    url: (.+)$/);
    if (label && url) links.push({ label: label[1], url: url[1] });
  }
  return links;
}

async function crossref(title) {
  const endpoint =
    "https://api.crossref.org/works?rows=5&select=DOI,title&query.title=" +
    encodeURIComponent(title);
  const response = await fetch(endpoint, {
    headers: {
      "User-Agent": "academic-publication-link-audit/1.0 (mailto:mjh@sjtu.edu.cn)",
    },
  });
  if (!response.ok) throw new Error(`Crossref ${response.status}`);
  const items = (await response.json()).message.items;
  const ranked = items
    .map((item) => ({
      doi: item.DOI,
      title: item.title?.[0] ?? "",
      score: similarity(title, item.title?.[0] ?? ""),
    }))
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.score >= 0.92 ? ranked[0] : null;
}

async function ieeeUrl(doi) {
  if (!doi?.toLowerCase().startsWith("10.1109/")) return null;
  const response = await fetch(`https://doi.org/${doi}`, {
    redirect: "follow",
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const match = response.url.match(/ieeexplore\.ieee\.org\/(?:document|abstract\/document)\/(\d+)/);
  return match ? `https://ieeexplore.ieee.org/document/${match[1]}` : null;
}

async function arxiv(title) {
  const endpoint =
    "https://export.arxiv.org/api/query?start=0&max_results=5&search_query=" +
    encodeURIComponent(`ti:"${title.replaceAll('"', "")}"`);
  const response = await fetch(endpoint, {
    headers: { "User-Agent": "academic-publication-link-audit/1.0" },
  });
  if (!response.ok) throw new Error(`arXiv ${response.status}`);
  const xml = await response.text();
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((match) => {
    const entry = match[1];
    const foundTitle = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1].replace(/\s+/g, " ").trim() ?? "";
    const id = entry.match(/<id>(.*?)<\/id>/)?.[1] ?? "";
    return { title: foundTitle, url: id.replace("http://", "https://"), score: similarity(title, foundTitle) };
  });
  entries.sort((a, b) => b.score - a.score);
  return entries[0]?.score >= 0.92 ? entries[0] : null;
}

const records = blocks.map((block) => ({
  title: scalar(block, "title"),
  year: Number(scalar(block, "year")),
  existing: existingLinks(block),
}));

for (const record of records) {
  const result = { ...record, ieee: null, arxiv: null, errors: [] };
  const knownIEEE = record.existing.find((link) => link.label === "IEEE Xplore");
  const knownArxiv = record.existing.find((link) => link.label === "arXiv");
  result.ieee = knownIEEE?.url ?? null;
  result.arxiv = knownArxiv?.url ?? null;

  try {
    const match = await crossref(record.title);
    result.crossref = match;
    if (!result.ieee && match) result.ieee = await ieeeUrl(match.doi);
  } catch (error) {
    result.errors.push(String(error));
  }

  if (!result.arxiv) {
    try {
      const match = await arxiv(record.title);
      if (match) result.arxiv = match.url;
    } catch (error) {
      result.errors.push(String(error));
    }
  }
  console.log(JSON.stringify(result));
}
