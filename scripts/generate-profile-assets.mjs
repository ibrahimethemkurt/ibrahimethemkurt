// Dependency-free SVG source for the README's desktop and mobile panels.
// Run: node scripts/generate-profile-assets.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const assets = new URL('../assets/', import.meta.url);
mkdirSync(assets, { recursive: true });
const c = { bg: '#0B1422', card: '#101F31', line: '#293E55', text: '#EFF5FF', muted: '#ADBED3', blue: '#88B8FF', cyan: '#77E0EC', gold: '#F0CC7C' };
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = (x, y, s, size = 22, fill = c.text, extra = '') => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${extra}>${esc(s)}</text>`;
const label = (x, y, s, fill = c.muted) => text(x, y, s, 14, fill, 'class="mono" letter-spacing="2"');
const rect = (x, y, w, h, fill = c.card, stroke = c.line, rx = 18) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}"/>`;
const lines = (x, y, ss, size = 21, color = c.muted, gap = 31) => ss.map((s, i) => text(x, y + i * gap, s, size, color)).join('');

function frame(w, h, title, description, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">
<title id="title">${esc(title)}</title><desc id="desc">${esc(description)}</desc>
<defs><linearGradient id="accent"><stop stop-color="${c.blue}"/><stop offset=".5" stop-color="${c.cyan}"/><stop offset="1" stop-color="${c.gold}"/></linearGradient></defs>
<style>
text { font-family: 'Segoe UI', Arial, sans-serif; }
.mono { font-family: Consolas, 'Courier New', monospace; }
.traveller { animation: travel 8s linear infinite; }
.spark { animation: breathe 4s ease-in-out infinite; }
@keyframes travel { to { stroke-dashoffset: -160; } }
@keyframes breathe { 0%,100% { opacity:.45; } 50% { opacity:1; } }
@media (prefers-reduced-motion: reduce) { .traveller,.spark { animation:none; } }
</style>
${rect(1, 1, w - 2, h - 2, c.bg, c.line, 24)}
${content}
</svg>\n`;
}

function desk(mobile) {
  const w = mobile ? 560 : 1040, h = mobile ? 1000 : 526;
  let s = label(34, 43, 'THE PRODUCT DESK', c.cyan);
  s += text(34, 94, 'Good work starts', mobile ? 35 : 38, c.text, 'font-weight="650"');
  s += text(mobile ? 34 : 350, mobile ? 138 : 94, 'with better questions.', mobile ? 35 : 38, c.text, 'font-weight="650"');
  const cards = [
    { tag: 'UNDERSTAND', title: ['Which problem', 'matters?'], body: ['Listen to users.', 'Surface assumptions.', 'Frame the need.'], artifact: 'PROBLEM BRIEF', color: c.blue, icon: '<circle cx="17" cy="17" r="10"/><path d="M24 24l11 11M13 17h8M17 13v8"/>' },
    { tag: 'DECIDE', title: ['What comes', 'first?'], body: ['Weigh impact.', 'Make trade-offs.', 'Align on a shared goal.'], artifact: 'ORDERED BACKLOG', color: c.cyan, icon: '<path d="M6 10h8M6 21h8M6 32h8M21 10h15M21 21h11M21 32h7"/>' },
    { tag: 'LEARN', title: ['Did it create', 'value?'], body: ['Deliver in small steps.', 'Seek feedback.', 'Revisit the plan.'], artifact: 'FEEDBACK LOOP', color: c.gold, icon: '<path d="M33 15A14 14 0 1 0 33 29M33 5v10H23M9 22l8 6 10-13"/>' },
  ];
  cards.forEach((card, i) => {
    const x = mobile ? 28 : 28 + i * 332, y = mobile ? 170 + i * 246 : 126;
    const cw = mobile ? 504 : 320, ch = mobile ? 230 : 302;
    s += rect(x, y, cw, ch);
    s += `<path d="M${x + 22} ${y + 1}h${cw - 44}" stroke="${card.color}" stroke-opacity=".75" stroke-width="2"/>`;
    s += label(x + 22, y + 33, card.tag, card.color);
    s += `<g transform="translate(${x + cw - 61} ${y + 16})" fill="none" stroke="${card.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${card.icon}</g>`;
    s += lines(x + 22, y + 83, card.title, mobile ? 31 : 29, c.text, 34);
    s += lines(mobile ? x + 256 : x + 22, mobile ? y + 83 : y + 162, card.body, mobile ? 19 : 21, c.muted, 29);
    s += `<path d="M${x + 22} ${y + ch - 54}h${cw - 44}" stroke="${c.line}"/>`;
    s += `<circle class="spark" cx="${x + 26}" cy="${y + ch - 26}" r="3" fill="${card.color}"/>`;
    s += text(x + 39, y + ch - 21, card.artifact, 13, card.color, 'class="mono" letter-spacing="1.2"');
  });
  const fy = mobile ? 934 : 467;
  s += label(34, fy, 'ON MY RADAR', c.gold);
  s += text(mobile ? 34 : 212, mobile ? fy + 31 : fy + 1, 'Product discovery / Scrum / Project planning', mobile ? 20 : 21, c.muted);
  s += `<path class="traveller" d="M34 ${h - 20}H${w - 34}" stroke="url(#accent)" stroke-opacity=".5" stroke-dasharray="28 52"/>`;
  return frame(w, h, 'The Product Desk', 'Three questions guide my product learning: Which problem matters? What comes first? Did it create value?', s);
}

function manifesto(mobile) {
  const w = mobile ? 560 : 1040, h = mobile ? 844 : 692;
  let s = label(34, 43, 'VALUES THAT GUIDE THE WORK', c.gold);
  s += text(34, 99, 'Agile Manifesto', mobile ? 40 : 46, c.text, 'font-weight="650" letter-spacing="-1"');
  s += text(34, 135, 'Four values. A shared direction.', mobile ? 23 : 25, c.muted);
  const values = [
    ['Individuals and interactions', 'processes and tools', 'PEOPLE', c.blue],
    ['Working software', 'comprehensive documentation', 'VALUE', c.cyan],
    ['Customer collaboration', 'contract negotiation', 'PARTNERSHIP', c.blue],
    ['Responding to change', 'following a plan', 'ADAPTABILITY', c.gold],
  ];
  values.forEach(([left, right, tag, color], i) => {
    const y = (mobile ? 164 : 170) + i * (mobile ? 140 : 104);
    s += rect(28, y, w - 56, mobile ? 126 : 92, i % 2 ? '#101D2D' : '#111F30', '#24364A', 14);
    s += `<path d="M29 ${y + 18}v${mobile ? 90 : 56}" stroke="${color}" stroke-width="3"/>`;
    s += label(48, y + 27, tag, color);
    s += text(48, y + (mobile ? 66 : 59), left, mobile ? 28 : 29, c.text, 'font-weight="600"');
    if (mobile) {
      s += text(48, y + 99, `over ${right}`, 22, c.muted);
    } else {
      s += text(548, y + 59, 'over', 20, c.muted, 'font-style="italic"');
      s += text(606, y + 59, right, 22, c.muted);
    }
  });
  const fy = mobile ? 752 : 610;
  s += lines(34, fy, mobile
    ? ['Both sides have value.', 'The left-hand items receive greater emphasis.']
    : ['Both sides have value; the left-hand items receive greater emphasis.'], mobile ? 21 : 23, c.muted, 30);
  s += label(34, h - 26, 'AGILEMANIFESTO.ORG  /  2001', c.gold);
  s += `<path d="M${w - 59} ${h - 33}h18v18m-18 0 18-18" stroke="${c.gold}" stroke-width="2" fill="none"/>`;
  return frame(w, h, 'Agile Manifesto — the four values', 'Four values from the Manifesto for Agile Software Development. Both sides have value; the left-hand items receive greater emphasis. Source: agilemanifesto.org.', s);
}

for (const mobile of [false, true]) {
  for (const [name, make] of [['product-desk', desk], ['agile-values', manifesto]]) {
    const path = new URL(`${name}${mobile ? '-mobile' : ''}.svg`, assets);
    writeFileSync(path, make(mobile));
    console.log(fileURLToPath(path));
  }
}
