// Original SVG composition. Visual reference: 21st.dev's Modern Minimal remix.
// https://21st.dev/community/themes/modern-minimal-remix-1782799115038
// Layout guidance: ui-ux-pro-max, minimalism, readable type, restrained motion.
// No network calls or dependencies. Run: node scripts/generate-editorial-profile.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const assets = new URL('../assets/', import.meta.url);
const themes = {
  dark: { bg: '#0D1117', fg: '#E5E5E5', muted: '#A3A3A3', line: '#30363D', accent: '#88B8FF', button: '#161B22' },
  light: { bg: '#FFFFFF', fg: '#333333', muted: '#59636E', line: '#D1D9E0', accent: '#2563EB', button: '#F6F8FA' },
};
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const txt = (x, y, str, size, fill, attr = '') => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${attr}>${escape(str)}</text>`;
const multiline = (x, y, rows, size, fill, gap, attr = '') => rows.map((row, i) => txt(x, y + gap * i, row, size, fill, attr)).join('\n');
const line = (x, y, width, color) => `<path d="M${x} ${y}h${width}" stroke="${color}"/>`;
const wrap = (w, h, title, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" role="img" aria-labelledby="title"><title id="title">${escape(title)}</title><style>text{font-family:'Segoe UI',Arial,sans-serif}.label{font-family:Consolas,'Courier New',monospace;letter-spacing:2px}</style>\n${body}\n</svg>\n`;
const write = (name, source) => { writeFileSync(new URL(name, assets), source); console.log(name); };

function editorial(theme, mobile) {
  const t = themes[theme], w = mobile ? 520 : 1000, h = mobile ? 1064 : 594;
  const left = mobile ? 20 : 32, right = w - left;
  let s = `<rect width="${w}" height="${h}" fill="${t.bg}"/>`;
  s += txt(left, mobile ? 34 : 32, 'MY FOCUS', mobile ? 20 : 16, t.accent, 'class="label"');
  s += multiline(left, mobile ? 87 : 80, ['Simple products.', 'Real user needs.'], mobile ? 43 : 40, t.fg, mobile ? 50 : 47, 'font-weight="600" letter-spacing="-.8"');
  s += txt(left, mobile ? 179 : 165, 'Management Information Systems', mobile ? 26 : 20, t.muted);
  s += multiline(mobile ? left : 460, mobile ? 239 : 64, mobile
    ? ['I am developing my skills in', 'Product Ownership, Scrum', 'and Project Management.']
    : ['I am developing my skills in Product', 'Ownership, Scrum and Project Management.'], mobile ? 29 : 24, t.fg, mobile ? 42 : 35);
  s += multiline(mobile ? left : 460, mobile ? 399 : 145, mobile
    ? ['My goal is to make products', 'easier to use.']
    : ['My goal is to make products easier to use.'], mobile ? 29 : 24, t.muted, 42);
  s += line(left, mobile ? 480 : 206, right - left, t.line);
  s += txt(left, mobile ? 529 : 255, 'Agile Manifesto', mobile ? 31 : 28, t.fg, 'font-weight="600"');
  s += txt(right, mobile ? 528 : 254, '2001', mobile ? 21 : 17, t.muted, 'class="label" text-anchor="end"');
  const values = [
    ['Individuals and interactions', 'processes and tools'],
    ['Working software', 'comprehensive documentation'],
    ['Customer collaboration', 'contract negotiation'],
    ['Responding to change', 'following a plan'],
  ];
  values.forEach(([value, supporting], i) => {
    const y = (mobile ? 583 : 309) + i * (mobile ? 105 : 57);
    s += txt(left, y, value, mobile ? 29 : 26, t.fg, 'font-weight="500"');
    if (mobile) {
      s += txt(left, y + 38, `over ${supporting}`, 28, t.muted);
    } else {
      s += txt(484, y, 'over', 21, t.muted, 'font-style="italic"');
      s += txt(552, y, supporting, 24, t.muted);
    }
    if (i < 3) s += line(left, y + (mobile ? 63 : 23), right - left, t.line);
  });
  s += multiline(left, mobile ? 991 : 547, mobile
    ? ['Both sides have value; the items', 'on the left receive greater emphasis.']
    : ['Both sides have value; the items on the left receive greater emphasis.'], mobile ? 28 : 22, t.muted, 38);
  return wrap(w, h, 'Product focus and the four Agile Manifesto values', s);
}

function social(theme, network) {
  const t = themes[theme];
  let s = `<rect x=".5" y=".5" width="147" height="47" rx="8" fill="${t.button}" stroke="${t.line}"/>`;
  s += network === 'LinkedIn'
    ? `<g transform="translate(15 15)" fill="${t.fg}"><circle cx="2" cy="2" r="1.7"/><path d="M.5 6h3v12h-3zM7 6h3v1.8C11 5 18 4.8 18 11v7h-3v-7c0-3-5-3-5 0v7H7z"/></g>`
    : `<g transform="translate(15 15)" fill="none" stroke="${t.fg}" stroke-width="1.6"><rect width="18" height="18" rx="5"/><circle cx="9" cy="9" r="4"/><circle cx="14" cy="4" r=".6" fill="${t.fg}"/></g>`;
  s += txt(43, 30, network, 15, t.fg, 'font-weight="500"');
  s += `<path d="M126 18h6v6m-7 1 7-7" fill="none" stroke="${t.muted}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>`;
  return wrap(148, 48, network, s);
}

function heroMobile() {
  const desktop = readFileSync(new URL('product-command-center.svg', assets), 'utf8');
  const defs = desktop.match(/<defs>[\s\S]*?<\/defs>/)[0];
  const style = desktop.match(/<style>[\s\S]*?<\/style>/)[0];
  let s = `${defs}${style}<rect x="1" y="1" width="518" height="378" rx="22" fill="url(#background)" stroke="#2D4868"/><rect x="12" y="12" width="496" height="354" rx="12" fill="url(#grid)"/>`;
  s += txt(28, 37, 'PRODUCT / PEOPLE / DELIVERY', 11, '#AFC1D8', 'class="utility" letter-spacing="1"');
  s += txt(492, 37, 'BANDIRMA / TR', 11, '#AFC1D8', 'class="utility" text-anchor="end" letter-spacing="1"');
  s += txt(28, 103, 'İbrahim Ethem Kurt', 40, '#F2F7FF', 'font-weight="700" letter-spacing="-1"');
  s += multiline(28, 151, ['Simple products, shaped', 'by real user needs.'], 29, '#AFC1D8', 37);
  const pills = [[28,174,'PRODUCT OWNERSHIP','#8DB9FF'],[212,83,'SCRUM','#86E7FF'],[305,187,'PROJECT MANAGEMENT','#F1CD73']];
  for (const [x,w,label,color] of pills) {
    s += `<rect x="${x}" y="219" width="${w}" height="37" rx="18" fill="${color}" fill-opacity=".07" stroke="${color}" stroke-opacity=".35"/>`;
    s += txt(x+w/2,242,label,12,color,'class="utility" text-anchor="middle"');
  }
  s += '<path class="flow-line" d="M44 305H476" stroke="url(#signal)" stroke-width="2" stroke-dasharray="10 14"/>';
  ['DISCOVER','PRIORITIZE','ALIGN','DELIVER','LEARN'].forEach((label,i)=>{
    const x=44+i*108,color=['#3985FF','#3CA9FF','#42D3FF','#7FD1C7','#E5B84B'][i];
    s += `<g class="node-${i+1}"><circle cx="${x}" cy="305" r="9" fill="#0B1830" stroke="${color}"/><circle cx="${x}" cy="305" r="3" fill="${color}"/></g>`;
    s += txt(x,342,label,12,'#AFC1D8','class="utility" text-anchor="middle"');
  });
  return wrap(520,380,'İbrahim Ethem Kurt — Bandırma, TR. Simple products, shaped by real user needs.',s);
}

for (const theme of Object.keys(themes)) {
  for (const mobile of [false,true]) write(`profile-editorial-${theme}${mobile?'-mobile':''}.svg`,editorial(theme,mobile));
  for (const network of ['LinkedIn','Instagram']) write(`${network.toLowerCase()}-${theme}.svg`,social(theme,network));
}
write('profile-hero-mobile.svg',heroMobile());
