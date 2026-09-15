#!/usr/bin/env node
// Imports the next-saas template docs into content/docs/next-saas and public/img/next-saas
// Usage: node scripts/import-next-saas.mjs [path/to/next-saas/docs]
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const srcDir = path.resolve(process.argv[2] ?? path.join(root, '../../NetCoreTemplates/next-saas/docs'));
const destDir = path.join(root, 'content/docs/next-saas');
const imgDir = path.join(root, 'public/img/next-saas');
const baseUrl = '/docs/next-saas';
const imgUrl = '/img/next-saas';

if (!fs.existsSync(srcDir)) {
  console.error(`next-saas docs not found at: ${srcDir}`);
  process.exit(1);
}

// Sidebar order and titles for each section
const sections = {
  'getting-started': {
    title: 'Getting Started',
    pages: ['overview', 'local-setup', 'project-tour', 'customize-the-product', 'add-a-metered-feature', 'connect-stripe-sandbox', 'verify-and-ship'],
  },
  concepts: {
    title: 'Concepts',
    pages: ['architecture', 'organizations-and-tenancy', 'plans-and-entitlements', 'usage-and-quotas', 'background-processing'],
  },
  features: {
    title: 'Features',
    pages: ['billing-and-subscriptions', 'plans-pricing-trials', 'coupons', 'organizations-and-members', 'api-keys', 'file-storage', 'usage-analytics', 'notifications', 'audit-logs', 'data-lifecycle', 'support-operations'],
  },
  development: {
    title: 'Development',
    pages: ['index', 'add-a-servicestack-api', 'add-a-feature-gate', 'add-a-meter-and-quota', 'add-a-background-job', 'database-migrations', 'add-a-frontend-page', 'generate-typed-dtos', 'testing', 'ai-assisted-development'],
  },
  operations: {
    title: 'Operations',
    pages: ['index', 'configuration', 'secrets', 'deployment', 'database-and-storage', 'observability-and-health', 'background-jobs-and-recovery', 'external-services', 'retention-and-lifecycle', 'backup-and-restore', 'troubleshooting'],
  },
  security: {
    title: 'Security',
    pages: ['index', 'authentication-and-accounts', 'authorization-and-roles', 'tenant-isolation', 'api-credentials-and-abuse-controls', 'stripe-webhook-security', 'support-access', 'data-protection-and-privacy', 'web-and-input-security', 'production-security-review'],
  },
};

const sectionIcons = {
  'getting-started': 'Rocket',
  concepts: 'Lightbulb',
  features: 'Boxes',
  development: 'Code',
  operations: 'Server',
  security: 'Shield',
};

// docs/foo/01-bar.md -> foo/bar, docs/foo/README.md -> foo/index
function slugOf(relPath) {
  const dir = path.posix.dirname(relPath);
  let name = path.posix.basename(relPath, '.md');
  name = name === 'README' ? 'index' : name.replace(/^\d+-/, '');
  return dir === '.' ? name : `${dir}/${name}`;
}

function urlOf(slug) {
  const s = slug.replace(/(^|\/)index$/, '');
  return s ? `${baseUrl}/${s}` : baseUrl;
}

function listMarkdown(dir, rel = '') {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) return e.name === 'assets' ? [] : listMarkdown(path.join(dir, e.name), r);
    return e.name.endsWith('.md') ? [r] : [];
  });
}

const stripInline = (s) => s
  .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/[*_`]/g, '')
  .trim();

const yamlStr = (s) => JSON.stringify(s);

function convert(relPath) {
  const src = fs.readFileSync(path.join(srcDir, relPath), 'utf8');
  const lines = src.replace(/\r\n/g, '\n').split('\n');
  const fromDir = path.posix.dirname(relPath);

  // Title from first H1 (drop "1. " numbering, sidebar order already conveys it)
  const h1 = lines.findIndex((l) => /^# /.test(l));
  let title = h1 >= 0 ? lines[h1].slice(2).replace(/^\d+\.\s+/, '').trim() : slugOf(relPath);
  if (relPath === 'README.md') title = 'Next SaaS Template';
  if (h1 >= 0) lines.splice(h1, 1);

  // Description from the intro paragraph, which is removed from the body as DocsDescription renders it
  let description = '';
  const intro = lines.findIndex((l) => l.trim());
  if (intro >= 0 && !/^(#|!\[|\[|```|\||-|\*|\d+\.|>)/.test(lines[intro].trim())) {
    let end = intro;
    while (end < lines.length && lines[end].trim()) end++;
    const para = lines.slice(intro, end).join(' ');
    description = stripInline(para);
    // keep paragraphs containing links so they stay navigable
    if (!/\]\(/.test(para)) lines.splice(intro, end - intro);
  }

  const out = [];
  let inCode = false;
  for (let line of lines) {
    if (/^\s*```/.test(line)) inCode = !inCode;
    if (inCode || /^\s*```/.test(line)) { out.push(line); continue; }

    // Header nav lines: drop Previous/Next/Documentation home (fumadocs provides these), keep related links
    if (/^\[[^\]]+\]\([^)]+\)( · \[[^\]]+\]\([^)]+\))*\s*$/.test(line.trim())) {
      const kept = line.trim().split(' · ').filter((l) => !/^\[(Previous|Next|Documentation home)\b/.test(l));
      if (!kept.length) continue;
      line = kept.join(' · ');
    }

    // Images: ../assets/x.png -> /img/next-saas/x.png
    line = line.replace(/(!\[[^\]]*\]\()([^)\s]+)(\))/g, (m, a, href, b) => {
      if (/^https?:/.test(href)) return m;
      return a + `${imgUrl}/${path.posix.basename(href)}` + b;
    });

    // Links: relative .md -> absolute docs url
    line = line.replace(/(\]\()([^)\s]+\.md)(#[^)\s]*)?(\))/g, (m, a, href, hash, b) => {
      if (/^https?:/.test(href)) return m;
      const target = path.posix.normalize(path.posix.join(fromDir, href));
      return a + urlOf(slugOf(target)) + (hash ?? '') + b;
    });

    out.push(line);
  }

  const body = out.join('\n').replace(/^\n+/, '').replace(/\n{3,}/g, '\n\n');
  return `---\ntitle: ${yamlStr(title)}\ndescription: ${yamlStr(description)}\n---\n\n${body.trimEnd()}\n`;
}

// Reset destination
fs.rmSync(destDir, { recursive: true, force: true });
fs.rmSync(imgDir, { recursive: true, force: true });
fs.mkdirSync(destDir, { recursive: true });
fs.mkdirSync(imgDir, { recursive: true });

const files = listMarkdown(srcDir);
for (const rel of files) {
  const dest = path.join(destDir, slugOf(rel) + '.mdx');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, convert(rel));
}

// Section meta.json files
for (const [dir, { title, pages }] of Object.entries(sections)) {
  const actual = fs.readdirSync(path.join(destDir, dir)).map((f) => f.replace(/\.mdx$/, ''));
  const missing = actual.filter((p) => !pages.includes(p));
  const unknown = pages.filter((p) => !actual.includes(p));
  if (missing.length) console.warn(`${dir}: pages not in sidebar order (appended): ${missing.join(', ')}`);
  if (unknown.length) console.warn(`${dir}: sidebar pages no longer exist (removed): ${unknown.join(', ')}`);
  const meta = {
    title,
    icon: sectionIcons[dir],
    pages: [...pages.filter((p) => actual.includes(p)), ...missing],
    ...(['getting-started', 'concepts', 'features'].includes(dir) ? { defaultOpen: true } : {}),
  };
  fs.writeFileSync(path.join(destDir, dir, 'meta.json'), JSON.stringify(meta, null, 4) + '\n');
}

fs.writeFileSync(path.join(destDir, 'meta.json'), JSON.stringify({
  title: 'Next SaaS',
  description: 'Multi-tenant B2B SaaS Template',
  root: true,
  icon: 'Building2',
  pages: ['index', '---Start Here---', 'getting-started', '---Reference---', ...Object.keys(sections).filter((s) => s !== 'getting-started')],
}, null, 4) + '\n');

// Images
let images = 0;
for (const f of fs.readdirSync(path.join(srcDir, 'assets'))) {
  fs.copyFileSync(path.join(srcDir, 'assets', f), path.join(imgDir, f));
  images++;
}

console.log(`Imported ${files.length} docs into ${path.relative(root, destDir)} and ${images} images into ${path.relative(root, imgDir)}`);
