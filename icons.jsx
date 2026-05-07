// SVG ikonok a Gepárd-FEN B2B webshophoz
// Mind 24×24, stroke-alapú, hogy currentColor-ral színezhető legyen

const GFIcon = ({ name, size = 24, ...rest }) => {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...rest,
  };
  switch (name) {
    case "headlight":
      return (
        <svg {...props}><ellipse cx="9" cy="12" rx="6.5" ry="6"/><path d="M15.5 12h5M15.5 9l4-1.5M15.5 15l4 1.5"/><circle cx="9" cy="12" r="2.2"/></svg>
      );
    case "lightbar":
      return (
        <svg {...props}><rect x="2" y="9" width="20" height="6" rx="1.2"/><path d="M5 9V7M9 9V7M13 9V7M17 9V7M5 17v-2M9 17v-2M13 17v-2M17 17v-2"/></svg>
      );
    case "hitch":
      return (
        <svg {...props}><path d="M3 12h7"/><circle cx="13.5" cy="12" r="3.2"/><path d="M16.5 12h4M18.5 9.5v5"/></svg>
      );
    case "cylinder":
      return (
        <svg {...props}><rect x="3" y="9" width="14" height="6" rx="1"/><rect x="17" y="10.5" width="4" height="3"/><path d="M3 12h14"/></svg>
      );
    case "hybrid":
      return (
        <svg {...props}><path d="M4 17V7l8 4 8-4v10"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
      );
    case "strap":
      return (
        <svg {...props}><rect x="3" y="6" width="6" height="12" rx="1"/><path d="M9 9h12M9 15h12M21 9v6"/></svg>
      );
    case "prism":
      return (
        <svg {...props}><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3"/></svg>
      );
    case "hinge":
      return (
        <svg {...props}><rect x="3" y="4" width="6" height="16" rx="1"/><rect x="15" y="4" width="6" height="16" rx="1"/><circle cx="12" cy="8" r="1.5"/><circle cx="12" cy="16" r="1.5"/><path d="M9 8h1.5M13.5 8H15M9 16h1.5M13.5 16H15"/></svg>
      );
    case "trabant":
      return (
        <svg {...props}><path d="M3 16h18M5 16v-3l2-4h10l2 4v3"/><circle cx="8" cy="17.5" r="1.5"/><circle cx="16" cy="17.5" r="1.5"/></svg>
      );
    case "truck":
      return (
        <svg {...props}><path d="M3 16V6h11v10M14 10h5l2 3v3M3 16h18"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="17" cy="17" r="1.5"/></svg>
      );
    case "more":
      return (
        <svg {...props}><circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/></svg>
      );
    case "search":
      return (
        <svg {...props}><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.5-4.5"/></svg>
      );
    case "user":
      return (
        <svg {...props}><circle cx="12" cy="8" r="3.5"/><path d="M5 19c1.5-3.5 4-5 7-5s5.5 1.5 7 5"/></svg>
      );
    case "cart":
      return (
        <svg {...props}><path d="M3 4h2.4l2.4 11h11l1.6-7H6.5"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/></svg>
      );
    case "heart":
      return (
        <svg {...props}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>
      );
    case "phone":
      return (
        <svg {...props}><path d="M5 4h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>
      );
    case "mail":
      return (
        <svg {...props}><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3 7 9 6 9-6"/></svg>
      );
    case "globe":
      return (
        <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>
      );
    case "menu":
      return (
        <svg {...props}><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      );
    case "x":
      return (
        <svg {...props}><path d="m6 6 12 12M18 6 6 18"/></svg>
      );
    case "chev-r":
      return (
        <svg {...props}><path d="m9 6 6 6-6 6"/></svg>
      );
    case "chev-d":
      return (
        <svg {...props}><path d="m6 9 6 6 6-6"/></svg>
      );
    case "chev-l":
      return (
        <svg {...props}><path d="m15 6-6 6 6 6"/></svg>
      );
    case "plus":
      return (
        <svg {...props}><path d="M12 5v14M5 12h14"/></svg>
      );
    case "minus":
      return (
        <svg {...props}><path d="M5 12h14"/></svg>
      );
    case "check":
      return (
        <svg {...props}><path d="m5 12 5 5L20 7"/></svg>
      );
    case "truck-fast":
      return (
        <svg {...props}><path d="M3 16V8h10v8M13 11h4l3 3v2h-7M2 9h4M2 12h3"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/></svg>
      );
    case "package":
      return (
        <svg {...props}><path d="M3 8 12 4l9 4v8l-9 4-9-4V8z"/><path d="M3 8l9 4 9-4M12 12v9M7.5 6 16.5 10"/></svg>
      );
    case "shield":
      return (
        <svg {...props}><path d="M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6l-8-3z"/><path d="m9 12 2 2 4-4"/></svg>
      );
    case "doc":
      return (
        <svg {...props}><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/></svg>
      );
    case "download":
      return (
        <svg {...props}><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>
      );
    case "filter":
      return (
        <svg {...props}><path d="M3 5h18l-7 9v5l-4-2v-3L3 5z"/></svg>
      );
    case "grid":
      return (
        <svg {...props}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
      );
    case "list":
      return (
        <svg {...props}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
      );
    case "compare":
      return (
        <svg {...props}><path d="M12 3v18M6 6h12M6 18h12M3 12h18"/></svg>
      );
    case "bolt":
      return (
        <svg {...props}><path d="m13 3-8 11h6l-1 7 8-11h-6l1-7z"/></svg>
      );
    case "upload":
      return (
        <svg {...props}><path d="M12 16V5M7 9l5-5 5 5M5 20h14"/></svg>
      );
    case "info":
      return (
        <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/></svg>
      );
    case "star":
      return (
        <svg {...props}><path d="m12 3 2.7 5.6 6 .9-4.4 4.3 1 6.1L12 17l-5.3 2.9 1-6.1L3.3 9.5l6-.9L12 3z"/></svg>
      );
    case "warehouse":
      return (
        <svg {...props}><path d="M3 11 12 5l9 6v9H3z"/><path d="M7 20v-6h10v6M7 14h10"/></svg>
      );
    case "history":
      return (
        <svg {...props}><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"/><path d="M12 8v4l3 2"/></svg>
      );
    case "chat":
      return (
        <svg {...props}><path d="M4 5h16v11H8l-4 4z"/><path d="M8 10h8M8 13h5"/></svg>
      );
    default:
      return <svg {...props}><rect x="4" y="4" width="16" height="16" rx="2"/></svg>;
  }
};

// Stilizált termékfotó-placeholder, kategória + cikkszám alapján
const GFProductGlyph = ({ cat, sku, size = 200, dark = false }) => {
  // determinisztikus szín a sku-ból
  const hash = [...sku].reduce((a, c) => a + c.charCodeAt(0), 0);
  const hue = (hash * 37) % 360;
  const bg = dark ? `hsl(${hue}, 14%, 14%)` : `hsl(${hue}, 18%, 96%)`;
  const tint = dark ? `hsl(${hue}, 24%, 22%)` : `hsl(${hue}, 22%, 88%)`;

  return (
    <div style={{
      width: "100%", aspectRatio: "1 / 1", background: bg,
      position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {/* technikai grid háttér */}
      <svg viewBox="0 0 100 100" style={{position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7}}>
        <defs>
          <pattern id={`g-${sku}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10 0H0V10" stroke={tint} strokeWidth="0.3" fill="none"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#g-${sku})`}/>
      </svg>
      {/* nagy ikon a kategória alapján */}
      <div style={{
        color: dark ? "#fbbf24" : "#1c1917",
        opacity: 0.9, transform: "scale(2.6)",
        filter: dark ? "drop-shadow(0 0 4px rgba(251,191,36,.3))" : "none",
      }}>
        <GFIcon name={catIconFor(cat)} size={32}/>
      </div>
      {/* sku felirat */}
      <div style={{
        position: "absolute", left: 10, bottom: 8,
        fontFamily: "var(--gf-mono)", fontSize: 9,
        color: dark ? "#a8a29e" : "#78716c",
        letterSpacing: "0.06em",
      }}>
        {sku}
      </div>
      {/* sarok jelzés */}
      <div style={{
        position: "absolute", right: 8, top: 8, width: 18, height: 18,
        border: `1px solid ${dark ? "#44403c" : "#d6d3d1"}`,
        borderRight: "none", borderBottom: "none",
      }}/>
      <div style={{
        position: "absolute", left: 8, bottom: 8, width: 18, height: 18,
        border: `1px solid ${dark ? "#44403c" : "#d6d3d1"}`,
        borderLeft: "none", borderTop: "none",
      }}/>
    </div>
  );
};

function catIconFor(cat) {
  const c = (window.GF_CATEGORIES || []).find(x => x.id === cat);
  return c?.icon || "package";
}

Object.assign(window, { GFIcon, GFProductGlyph, catIconFor });
