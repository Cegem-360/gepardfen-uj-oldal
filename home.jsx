// Gepárd-FEN B2B webshop — Hero + Featured sections (homepage)

const Hero = ({ tweaks, partner, onCategorySelect, onQuickOrder }) => {
  const isLoggedIn = partner.tier !== "guest";
  const variant = tweaks.heroVariant || "split";

  if (variant === "split") {
    return (
      <section className="gf-anim-in" style={{
        background: "var(--gf-surface)",
        borderBottom: "1px solid var(--gf-line)",
      }}>
        <div className="gf-container" style={{
          display: "grid", gridTemplateColumns: "1.2fr 1fr",
          minHeight: 460, gap: 0,
        }}>
          {/* Bal: szöveg */}
          <div style={{padding: "56px 48px 56px 0", display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 12px",
              background: "var(--gf-surface-2)",
              borderRadius: 100,
              alignSelf: "flex-start",
              fontSize: 12, fontWeight: 600,
              marginBottom: 24,
              color: "var(--gf-ink-2)",
            }}>
              <span style={{width:6, height:6, borderRadius:"50%", background:"var(--gf-success)"}} className="gf-pulse"/>
              30+ éve vezető a haszongépjármű-alkatrész piacon
            </div>
            <h1 style={{
              fontSize: "clamp(40px, 5vw, 60px)",
              fontWeight: 800, letterSpacing: "-0.025em",
              lineHeight: 1.02, margin: 0,
              textWrap: "balance",
            }}>
              {isLoggedIn ? "Üdv újra," : "Alkatrészek"}<br/>
              <span style={{color: "var(--gf-accent)"}}>
                {isLoggedIn ? partner.company.split(" ")[0] + "!" : "haszon­gépjárműhöz."}
              </span>
            </h1>
            <p style={{
              fontSize: 17, lineHeight: 1.55, color: "var(--gf-ink-2)",
              maxWidth: 520, marginTop: 20, textWrap: "pretty",
            }}>
              WESEM hivatalos magyarországi képviselete, plusz 40+ európai gyártó alkatrészei egy rendszerben — élő készlet, partneráraink, és gyorsrendelés cikkszám alapján.
            </p>
            <div style={{display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap"}}>
              <button className="gf-btn gf-btn--primary gf-btn--lg" onClick={() => onCategorySelect("fenyszorok")}>
                Termékek böngészése <GFIcon name="chev-r" size={16}/>
              </button>
              <button className="gf-btn gf-btn--lg" onClick={onQuickOrder}>
                <GFIcon name="bolt" size={16}/> Gyorsrendelés cikkszámmal
              </button>
            </div>
            {/* trust strip */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24, marginTop: 48, paddingTop: 24,
              borderTop: "1px solid var(--gf-line)",
            }}>
              <div>
                <div className="gf-mono" style={{fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em"}}>40<span style={{color: "var(--gf-accent)"}}>+</span></div>
                <div style={{fontSize: 12, color: "var(--gf-muted)", marginTop: 4}}>képviselt gyártó</div>
              </div>
              <div>
                <div className="gf-mono" style={{fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em"}}>1416<span style={{color: "var(--gf-accent)"}}>·</span></div>
                <div style={{fontSize: 12, color: "var(--gf-muted)", marginTop: 4}}>aktív cikkszám raktáron</div>
              </div>
              <div>
                <div className="gf-mono" style={{fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em"}}>24<span style={{color: "var(--gf-accent)"}}>h</span></div>
                <div style={{fontSize: 12, color: "var(--gf-muted)", marginTop: 4}}>kiszállítás országosan</div>
              </div>
            </div>
          </div>

          {/* Jobb: vizuális blokk */}
          <div style={{
            background: "var(--gf-ink)",
            position: "relative",
            color: "var(--gf-bg)",
            display: "flex", alignItems: "stretch", justifyContent: "stretch",
            overflow: "hidden",
          }}>
            {/* Grid háttér */}
            <svg viewBox="0 0 400 460" preserveAspectRatio="xMidYMid slice" style={{
              position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4,
            }}>
              <defs>
                <pattern id="hgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M20 0H0V20" stroke="rgba(245,165,36,0.08)" strokeWidth="0.5" fill="none"/>
                </pattern>
              </defs>
              <rect width="400" height="460" fill="url(#hgrid)"/>
            </svg>
            {/* Nagy kategória ikon */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              color: "var(--gf-accent)",
            }}>
              <svg width="320" height="220" viewBox="0 0 320 220" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="120" cy="110" rx="90" ry="84" strokeOpacity="0.9"/>
                <circle cx="120" cy="110" r="32" strokeOpacity="0.95"/>
                <circle cx="120" cy="110" r="12" fill="currentColor"/>
                <path d="M210 110h60M210 80l55-22M210 140l55 22" strokeOpacity="0.7"/>
                <path d="M120 26v-12M120 206v-12M30 110H18M222 110h-12" strokeOpacity="0.5"/>
              </svg>
            </div>
            {/* Fent: cikkszám-szerű címkék */}
            <div style={{
              position: "absolute", top: 24, left: 24,
              fontFamily: "var(--gf-mono)", fontSize: 11,
              opacity: 0.5, lineHeight: 1.6,
            }}>
              <div>WESEM RE.22500 / 12V LED</div>
              <div>WESEM HM3.07000 / 24V H4</div>
              <div>POLMO VF-D50 / 40t</div>
              <div>RYWAL LB-180 / 16200lm</div>
            </div>
            {/* Lent: címke */}
            <div style={{
              position: "absolute", bottom: 24, left: 24, right: 24,
              display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            }}>
              <div>
                <div style={{fontFamily: "var(--gf-mono)", fontSize: 10, opacity: 0.5, letterSpacing: "0.1em"}}>SPOTLIGHT · ÚJDONSÁG</div>
                <div style={{fontSize: 22, fontWeight: 700, marginTop: 6}}>WESEM RE.22500 sorozat</div>
                <div style={{fontSize: 13, opacity: 0.7, marginTop: 2}}>Robusztus LED munkalámpa család · IP67 · 12/24V</div>
              </div>
              <button className="gf-btn gf-btn--primary gf-btn--sm">Megnézem</button>
            </div>
            {/* Sárga sarok-akcent */}
            <div style={{position: "absolute", top: 0, right: 0, width: 60, height: 60, background: "var(--gf-accent)"}}/>
          </div>
        </div>
      </section>
    );
  }

  // Egyszerűbb variáns
  return (
    <section style={{background: "var(--gf-ink)", color: "var(--gf-bg)", padding: "72px 0"}}>
      <div className="gf-container">
        <h1 style={{fontSize: 56, fontWeight: 800, margin: 0}}>Gepárd-FEN B2B</h1>
      </div>
    </section>
  );
};

const CategoryGrid = ({ onSelect }) => (
  <section style={{padding: "48px 0", background: "var(--gf-bg)"}}>
    <div className="gf-container">
      <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24}}>
        <div>
          <div className="gf-uppercase" style={{color: "var(--gf-muted)", marginBottom: 6}}>Termékkategóriák</div>
          <h2 style={{fontSize: 32, fontWeight: 700, margin: 0, letterSpacing: "-0.02em"}}>Böngéssz típus szerint</h2>
        </div>
        <a className="gf-btn gf-btn--ghost" style={{color: "var(--gf-muted)"}}>
          Összes kategória <GFIcon name="chev-r" size={14}/>
        </a>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 12,
      }}>
        {window.GF_CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            style={{
              border: "1px solid var(--gf-line)",
              background: "var(--gf-surface)",
              padding: "20px 18px",
              borderRadius: "var(--gf-radius-lg)",
              textAlign: "left",
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: 14,
              fontFamily: "inherit", color: "var(--gf-ink)",
              transition: "border-color .15s, transform .15s, background .15s",
              position: "relative",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gf-ink)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--gf-line)"; }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 8,
              background: c.legacy ? "var(--gf-surface-2)" : "var(--gf-ink)",
              color: c.legacy ? "var(--gf-ink)" : "var(--gf-accent)",
              display: "grid", placeItems: "center", flexShrink: 0,
            }}>
              <GFIcon name={c.icon} size={22}/>
            </div>
            <div style={{flex: 1, minWidth: 0}}>
              <div style={{fontWeight: 600, fontSize: 14, marginBottom: 2}}>{c.name}</div>
              <div style={{fontSize: 12, color: "var(--gf-muted)"}}>{c.count} termék</div>
            </div>
            <GFIcon name="chev-r" size={16} style={{color: "var(--gf-muted)"}}/>
            {c.legacy && (
              <div style={{
                position: "absolute", top: 8, right: 8,
                fontSize: 9, fontWeight: 600,
                background: "var(--gf-surface-2)",
                padding: "2px 6px", borderRadius: 4,
                color: "var(--gf-muted)", letterSpacing: "0.06em",
              }}>VINTAGE</div>
            )}
          </button>
        ))}
      </div>
    </div>
  </section>
);

const FeaturedRow = ({ products, partner, onAdd, onView, title, subtitle }) => (
  <section style={{padding: "32px 0", background: "var(--gf-bg)"}}>
    <div className="gf-container">
      <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20}}>
        <div>
          <div className="gf-uppercase" style={{color: "var(--gf-accent)", marginBottom: 6}}>{subtitle}</div>
          <h2 style={{fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: "-0.02em"}}>{title}</h2>
        </div>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
      }}>
        {products.slice(0, 4).map(p => (
          <ProductCard key={p.sku} product={p} partner={partner} onAdd={onAdd} onView={onView}/>
        ))}
      </div>
    </div>
  </section>
);

const ProductCard = ({ product: p, partner, onAdd, onView, fav, onFav }) => {
  const price = calcPrice(p, partner.tier, 1);
  const hasDisc = price.unitDisc > 0;
  return (
    <article className="gf-pcard" onClick={() => onView(p)}>
      <div className="gf-pcard__media">
        <div className="gf-pcard__badges">
          {p.badge && <span className={`gf-tag ${p.badge === "Akció" ? "gf-tag--accent" : ""}`}>{p.badge}</span>}
          {p.stock === 0 && <span className="gf-tag gf-tag--danger">Előrendelhető</span>}
        </div>
        <div
          className={`gf-pcard__fav ${fav ? "active" : ""}`}
          onClick={(e) => { e.stopPropagation(); onFav?.(p); }}
        >
          <GFIcon name="heart" size={16}/>
        </div>
        <GFProductGlyph cat={p.cat} sku={p.sku}/>
      </div>
      <div className="gf-pcard__body">
        <div className="gf-pcard__brand">{p.brand} · {p.sub}</div>
        <div className="gf-pcard__name">{p.name}</div>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <span className="gf-pcard__sku">{p.sku}</span>
          <StockBadge stock={p.stock} eta={p.eta}/>
        </div>
        <div className="gf-pcard__price-row">
          <div style={{flex: 1}}>
            {hasDisc && <div className="gf-pcard__price-list">{fmtHUF(p.listPrice)}</div>}
            <div className="gf-pcard__price-net">{fmtHUF(price.unit)}</div>
            <div className="gf-pcard__price-unit">/ {p.unit} · ÁFA nélkül</div>
          </div>
          {hasDisc && (
            <span className="gf-tag gf-tag--success">−{Math.round(price.unitDisc * 100)}%</span>
          )}
        </div>
      </div>
      <div className="gf-pcard__actions">
        <button
          className="gf-btn gf-btn--primary gf-btn--sm"
          disabled={p.stock === 0}
          onClick={(e) => { e.stopPropagation(); onAdd(p, p.moq); }}
        >
          <GFIcon name="cart" size={14}/> Kosárba ({p.moq})
        </button>
        <button
          className="gf-btn gf-btn--sm"
          onClick={(e) => { e.stopPropagation(); onView(p); }}
          title="Részletek"
        >
          <GFIcon name="chev-r" size={14}/>
        </button>
      </div>
    </article>
  );
};

const BrandsStrip = () => (
  <section style={{padding: "32px 0", background: "var(--gf-surface)", borderTop: "1px solid var(--gf-line)", borderBottom: "1px solid var(--gf-line)"}}>
    <div className="gf-container">
      <div style={{display: "flex", alignItems: "center", gap: 32, justifyContent: "space-between"}}>
        <div style={{flexShrink: 0}}>
          <div className="gf-uppercase" style={{color: "var(--gf-muted)", marginBottom: 4}}>Hivatalosan képviselt gyártók</div>
          <div style={{fontSize: 16, fontWeight: 600, color: "var(--gf-ink)"}}>40+ partner a piacvezető márkák közül</div>
        </div>
        <div style={{
          display: "flex", gap: 4, flexWrap: "wrap", flex: 1, justifyContent: "flex-end",
        }}>
          {window.GF_BRANDS.slice(0, 9).map((b) => (
            <div key={b.name} style={{
              border: "1px solid var(--gf-line)",
              padding: "10px 16px", borderRadius: 4,
              fontWeight: 700, letterSpacing: "0.02em",
              fontSize: 14, color: "var(--gf-ink-2)",
              display: "flex", alignItems: "center", gap: 8,
              background: "var(--gf-bg)",
            }}>
              {b.name}
              <span style={{
                fontSize: 9, opacity: 0.6, fontFamily: "var(--gf-mono)",
                padding: "2px 4px", border: "1px solid currentColor",
                borderRadius: 2,
              }}>{b.country}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ValueProps = () => (
  <section style={{padding: "48px 0", background: "var(--gf-surface-2)"}}>
    <div className="gf-container">
      <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24}}>
        {[
          { icon: "warehouse", t: "Hazai raktárkészlet", d: "Nagytarcsai központi raktár — élő készletadat minden cikkszámra" },
          { icon: "truck-fast", t: "Másnap kiszállítás", d: "13 óráig leadott rendelés esetén országosan, GLS / DPD / saját flotta" },
          { icon: "shield", t: "Eredeti gyártói garancia", d: "Minden termékre 12–24 hó garancia, hivatalos gyártói képviseletként" },
          { icon: "doc", t: "Hivatalos B2B számla", d: "Nettó 30 nap fizetési határidő partnereinknek, hitelkerettel" },
        ].map((v, i) => (
          <div key={i} style={{display: "flex", gap: 14}}>
            <div style={{
              width: 44, height: 44, flexShrink: 0,
              background: "var(--gf-ink)", color: "var(--gf-accent)",
              display: "grid", placeItems: "center",
              borderRadius: 8,
            }}>
              <GFIcon name={v.icon} size={22}/>
            </div>
            <div>
              <div style={{fontWeight: 700, fontSize: 15, marginBottom: 4, letterSpacing: "-0.01em"}}>{v.t}</div>
              <div style={{fontSize: 13, color: "var(--gf-muted)", lineHeight: 1.5}}>{v.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

Object.assign(window, { Hero, CategoryGrid, FeaturedRow, ProductCard, BrandsStrip, ValueProps });
