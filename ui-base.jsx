// Gepárd-FEN B2B webshop — UI alap-komponensek
// Globális stílusok, gombok, kártyák stb. mind itt

const gfStyles = `
  :root {
    --gf-bg: #faf9f6;
    --gf-surface: #ffffff;
    --gf-surface-2: #f4f2ec;
    --gf-ink: #15130e;
    --gf-ink-2: #3a352b;
    --gf-muted: #6f6759;
    --gf-line: #e6e1d6;
    --gf-line-2: #d2ccbc;
    --gf-accent: #f5a524;
    --gf-accent-ink: #15130e;
    --gf-success: #15803d;
    --gf-warn: #b45309;
    --gf-danger: #b91c1c;
    --gf-info: #1e3a8a;

    --gf-mono: "JetBrains Mono", "IBM Plex Mono", ui-monospace, Menlo, monospace;
    --gf-sans: "Inter Tight", "Inter", system-ui, -apple-system, sans-serif;

    --gf-row: 56px;
    --gf-pad: 16px;
    --gf-radius: 6px;
    --gf-radius-lg: 10px;

    --gf-shadow-sm: 0 1px 0 rgba(15, 12, 6, 0.04), 0 1px 2px rgba(15, 12, 6, 0.04);
    --gf-shadow: 0 1px 0 rgba(15, 12, 6, 0.04), 0 6px 20px -10px rgba(15, 12, 6, 0.18);
    --gf-shadow-lg: 0 12px 40px -16px rgba(15, 12, 6, 0.22);
  }

  [data-theme="dark"] {
    --gf-bg: #0f0e0b;
    --gf-surface: #1a1815;
    --gf-surface-2: #24211c;
    --gf-ink: #f4f2ec;
    --gf-ink-2: #d6d1c4;
    --gf-muted: #94897a;
    --gf-line: #2c2924;
    --gf-line-2: #3d3933;
    --gf-accent: #fbbf24;
    --gf-accent-ink: #15130e;
    --gf-success: #4ade80;
    --gf-shadow: 0 1px 0 rgba(0,0,0,0.4), 0 6px 20px -10px rgba(0,0,0,0.6);
    --gf-shadow-lg: 0 12px 40px -16px rgba(0,0,0,0.7);
  }

  [data-density="compact"] {
    --gf-row: 44px;
    --gf-pad: 12px;
  }

  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: var(--gf-sans);
    color: var(--gf-ink);
    background: var(--gf-bg);
    font-feature-settings: "ss01", "cv11";
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  button { font-family: inherit; }
  a { color: inherit; }

  /* Reusable bits */
  .gf-mono { font-family: var(--gf-mono); font-feature-settings: "tnum"; }
  .gf-tnum { font-variant-numeric: tabular-nums; }
  .gf-uppercase { text-transform: uppercase; letter-spacing: 0.06em; font-size: 11px; font-weight: 600; }
  .gf-divider { height: 1px; background: var(--gf-line); }

  .gf-container { max-width: 1440px; margin: 0 auto; padding: 0 24px; }

  .gf-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    height: 40px; padding: 0 16px;
    border: 1px solid var(--gf-line-2);
    background: var(--gf-surface);
    color: var(--gf-ink);
    border-radius: var(--gf-radius);
    font-weight: 500;
    cursor: pointer;
    transition: transform .08s ease, background .15s ease, border-color .15s ease;
    font-size: 14px;
    white-space: nowrap;
  }
  .gf-btn:hover { background: var(--gf-surface-2); }
  .gf-btn:active { transform: translateY(1px); }
  .gf-btn--primary {
    background: var(--gf-accent); color: var(--gf-accent-ink);
    border-color: color-mix(in oklab, var(--gf-accent), black 15%);
    font-weight: 600;
  }
  .gf-btn--primary:hover { background: color-mix(in oklab, var(--gf-accent), black 8%); }
  .gf-btn--ghost { background: transparent; border-color: transparent; }
  .gf-btn--ghost:hover { background: var(--gf-surface-2); }
  .gf-btn--dark {
    background: var(--gf-ink); color: var(--gf-bg);
    border-color: var(--gf-ink);
  }
  .gf-btn--sm { height: 32px; padding: 0 12px; font-size: 13px; }
  .gf-btn--lg { height: 48px; padding: 0 20px; font-size: 15px; }

  .gf-input {
    height: 40px; padding: 0 12px;
    border: 1px solid var(--gf-line-2);
    background: var(--gf-surface);
    color: var(--gf-ink);
    border-radius: var(--gf-radius);
    font-family: inherit;
    font-size: 14px;
    width: 100%;
    transition: border-color .15s, box-shadow .15s;
  }
  .gf-input:focus {
    outline: none;
    border-color: var(--gf-ink);
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--gf-ink), transparent 88%);
  }

  .gf-tag {
    display: inline-flex; align-items: center; gap: 4px;
    height: 22px; padding: 0 8px;
    background: var(--gf-surface-2);
    border-radius: 4px;
    font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.04em;
    color: var(--gf-ink-2);
  }
  .gf-tag--accent { background: var(--gf-accent); color: var(--gf-accent-ink); }
  .gf-tag--success { background: color-mix(in oklab, var(--gf-success), white 80%); color: var(--gf-success); }
  .gf-tag--warn { background: color-mix(in oklab, var(--gf-warn), white 80%); color: var(--gf-warn); }
  .gf-tag--danger { background: color-mix(in oklab, var(--gf-danger), white 85%); color: var(--gf-danger); }
  [data-theme="dark"] .gf-tag--success { background: color-mix(in oklab, var(--gf-success), black 60%); }
  [data-theme="dark"] .gf-tag--warn { background: color-mix(in oklab, var(--gf-warn), black 50%); color: #fbbf24;}
  [data-theme="dark"] .gf-tag--danger { background: color-mix(in oklab, var(--gf-danger), black 60%); color: #fca5a5;}

  .gf-stock-dot {
    display: inline-block; width: 8px; height: 8px; border-radius: 50%;
    background: var(--gf-success);
  }
  .gf-stock-dot--low { background: var(--gf-warn); }
  .gf-stock-dot--out { background: var(--gf-danger); }

  /* Layout: header + sidebar + main */
  .gf-app {
    display: grid;
    grid-template-rows: auto auto 1fr;
    min-height: 100vh;
    background: var(--gf-bg);
  }

  /* Top bar */
  .gf-topbar {
    background: var(--gf-ink);
    color: color-mix(in oklab, var(--gf-bg), transparent 50%);
    height: 32px;
    font-size: 12px;
    display: flex; align-items: center;
  }
  .gf-topbar__inner {
    max-width: 1440px; margin: 0 auto; width: 100%;
    padding: 0 24px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
  }
  .gf-topbar a { display: inline-flex; align-items: center; gap: 6px; text-decoration: none; opacity: 0.85; }
  .gf-topbar a:hover { opacity: 1; color: var(--gf-accent); }

  /* Header */
  .gf-header {
    background: var(--gf-surface);
    border-bottom: 1px solid var(--gf-line);
    position: sticky; top: 0; z-index: 30;
  }
  .gf-header__inner {
    max-width: 1440px; margin: 0 auto;
    padding: 16px 24px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 24px;
  }

  /* Logo */
  .gf-logo { display: flex; align-items: center; gap: 12px; cursor: pointer; }
  .gf-logo__mark {
    width: 40px; height: 40px;
    background: var(--gf-ink);
    color: var(--gf-accent);
    display: grid; place-items: center;
    border-radius: 4px;
    font-weight: 800;
    font-family: var(--gf-mono);
    letter-spacing: -0.04em;
    font-size: 18px;
  }
  .gf-logo__text { line-height: 1; }
  .gf-logo__name { font-weight: 800; font-size: 18px; letter-spacing: -0.02em; }
  .gf-logo__sub { font-size: 11px; color: var(--gf-muted); margin-top: 3px; letter-spacing: 0.04em; }

  /* Search */
  .gf-search {
    position: relative;
    display: flex;
    align-items: center;
    border: 1.5px solid var(--gf-line-2);
    background: var(--gf-surface);
    border-radius: var(--gf-radius);
    height: 48px;
    transition: border-color .15s;
  }
  .gf-search:focus-within { border-color: var(--gf-ink); }
  .gf-search__icon { padding: 0 12px; color: var(--gf-muted); display: flex; }
  .gf-search input {
    flex: 1; border: none; background: transparent; height: 100%;
    font-size: 14px; color: var(--gf-ink); outline: none; font-family: inherit;
    padding-right: 12px;
  }
  .gf-search__cat-select {
    border-left: 1px solid var(--gf-line);
    padding: 0 12px; height: 100%; display: flex; align-items: center;
    gap: 6px; cursor: pointer; font-size: 13px; color: var(--gf-ink-2);
    background: var(--gf-surface-2);
  }
  .gf-search__btn {
    height: 100%; padding: 0 22px; border: none;
    background: var(--gf-accent); color: var(--gf-accent-ink);
    font-weight: 600; cursor: pointer; font-size: 14px;
    border-radius: 0 var(--gf-radius) var(--gf-radius) 0;
    margin-left: -1px;
  }

  /* Header actions */
  .gf-actions { display: flex; align-items: center; gap: 4px; }
  .gf-action {
    display: flex; flex-direction: column; align-items: center; gap: 2px;
    padding: 6px 12px; cursor: pointer; border-radius: var(--gf-radius);
    color: var(--gf-ink-2); text-decoration: none;
    position: relative;
    min-width: 56px;
  }
  .gf-action:hover { background: var(--gf-surface-2); color: var(--gf-ink); }
  .gf-action__label { font-size: 11px; font-weight: 500; }
  .gf-action__badge {
    position: absolute; top: 2px; right: 6px;
    background: var(--gf-accent); color: var(--gf-accent-ink);
    font-size: 10px; font-weight: 700;
    height: 16px; min-width: 16px; padding: 0 4px;
    border-radius: 8px;
    display: grid; place-items: center;
  }

  /* Nav strip */
  .gf-navstrip {
    background: var(--gf-surface);
    border-bottom: 1px solid var(--gf-line);
  }
  .gf-navstrip__inner {
    max-width: 1440px; margin: 0 auto; padding: 0 24px;
    display: flex; align-items: stretch; gap: 0;
    overflow-x: auto;
  }
  .gf-navstrip a {
    padding: 14px 18px;
    font-size: 14px; font-weight: 500;
    color: var(--gf-ink-2); text-decoration: none;
    display: inline-flex; align-items: center; gap: 8px;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
    transition: color .15s, border-color .15s;
    cursor: pointer;
  }
  .gf-navstrip a:hover { color: var(--gf-ink); }
  .gf-navstrip a.active {
    color: var(--gf-ink); border-bottom-color: var(--gf-accent);
  }
  .gf-navstrip__all {
    background: var(--gf-ink); color: var(--gf-bg) !important;
    padding: 14px 18px; font-weight: 600;
    display: inline-flex; align-items: center; gap: 8px;
    border-bottom: 2px solid var(--gf-accent) !important;
  }

  /* Card */
  .gf-card {
    background: var(--gf-surface);
    border: 1px solid var(--gf-line);
    border-radius: var(--gf-radius-lg);
    overflow: hidden;
  }

  /* Product card */
  .gf-pcard {
    background: var(--gf-surface);
    border: 1px solid var(--gf-line);
    display: flex; flex-direction: column;
    position: relative;
    transition: border-color .15s, transform .15s;
    cursor: pointer;
  }
  .gf-pcard:hover { border-color: var(--gf-line-2); }
  .gf-pcard__media { position: relative; }
  .gf-pcard__badges {
    position: absolute; top: 10px; left: 10px; display: flex; gap: 6px; z-index: 2;
  }
  .gf-pcard__fav {
    position: absolute; top: 10px; right: 10px; z-index: 2;
    width: 32px; height: 32px; display: grid; place-items: center;
    background: var(--gf-surface); border: 1px solid var(--gf-line);
    border-radius: 50%; cursor: pointer;
    color: var(--gf-muted); transition: color .15s;
  }
  .gf-pcard__fav:hover { color: var(--gf-danger); }
  .gf-pcard__fav.active { color: var(--gf-danger); background: color-mix(in oklab, var(--gf-danger), white 90%); }

  .gf-pcard__body {
    padding: 14px; display: flex; flex-direction: column; gap: 10px; flex: 1;
  }
  .gf-pcard__brand { font-size: 11px; color: var(--gf-muted); font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
  .gf-pcard__name { font-size: 14px; font-weight: 600; line-height: 1.35; color: var(--gf-ink); }
  .gf-pcard__sku { font-family: var(--gf-mono); font-size: 11px; color: var(--gf-muted); }
  .gf-pcard__stock { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--gf-ink-2); }
  .gf-pcard__price-row {
    display: flex; align-items: baseline; gap: 8px;
    padding-top: 10px; border-top: 1px dashed var(--gf-line);
  }
  .gf-pcard__price-list {
    font-size: 12px; color: var(--gf-muted); text-decoration: line-through;
  }
  .gf-pcard__price-net {
    font-size: 18px; font-weight: 700; font-family: var(--gf-mono);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
  }
  .gf-pcard__price-unit { font-size: 11px; color: var(--gf-muted); }
  .gf-pcard__actions {
    display: grid; grid-template-columns: 1fr auto; gap: 6px; padding: 10px 14px 14px;
  }

  /* Hide scrollbar but keep scrollable */
  .gf-no-scrollbar::-webkit-scrollbar { display: none; }
  .gf-no-scrollbar { scrollbar-width: none; }

  /* Animations */
  @keyframes gfSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
  .gf-anim-in { animation: gfSlideIn .35s ease both; }

  @keyframes gfPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
  .gf-pulse { animation: gfPulse 2s ease infinite; }

  /* Toast */
  .gf-toast {
    position: fixed; bottom: 24px; right: 24px;
    background: var(--gf-ink); color: var(--gf-bg);
    padding: 14px 18px; border-radius: var(--gf-radius);
    box-shadow: var(--gf-shadow-lg);
    display: flex; align-items: center; gap: 10px;
    z-index: 1000;
    animation: gfSlideIn .25s ease;
    max-width: 360px;
  }
`;

// Format helper-ek
const fmtHUF = (n) => new Intl.NumberFormat("hu-HU").format(Math.round(n)) + " Ft";
const fmtNum = (n) => new Intl.NumberFormat("hu-HU").format(n);

const calcPrice = (product, tier, qty = 1) => {
  const tierObj = (window.GF_TIERS || {})[tier] || { discount: 0 };
  let unitDisc = tierObj.discount;
  if (product.discount) unitDisc = Math.max(unitDisc, product.discount / 100);
  // mennyiségi kedvezmény
  const qtyTiers = window.GF_QTY_TIERS || [];
  const qtyExtra = [...qtyTiers].reverse().find(t => qty >= t.from)?.extra || 0;
  const totalDisc = unitDisc + qtyExtra;
  const unit = product.listPrice * (1 - totalDisc);
  return { unit, total: unit * qty, totalDisc, unitDisc, qtyExtra, list: product.listPrice };
};

const StockBadge = ({ stock, eta }) => {
  if (stock === 0) return (
    <span className="gf-pcard__stock"><span className="gf-stock-dot gf-stock-dot--out"/>{eta}</span>
  );
  if (stock < 10) return (
    <span className="gf-pcard__stock"><span className="gf-stock-dot gf-stock-dot--low"/>{stock} {(stock===1)?"db":"db"} készleten</span>
  );
  return (
    <span className="gf-pcard__stock"><span className="gf-stock-dot"/>Készleten — {fmtNum(stock)} db</span>
  );
};

Object.assign(window, { gfStyles, fmtHUF, fmtNum, calcPrice, StockBadge });
