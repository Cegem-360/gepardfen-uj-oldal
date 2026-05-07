// Gepárd-FEN B2B webshop — Product detail page

const ProductPage = ({ product: p, partner, onAdd, onLogoClick, onCategorySelect, onBack, allProducts, onView }) => {
  const [qty, setQty] = React.useState(p.moq);
  const [tab, setTab] = React.useState("specs");
  const [imgIdx, setImgIdx] = React.useState(0);

  const price = calcPrice(p, partner.tier, qty);
  const cat = window.GF_CATEGORIES.find(c => c.id === p.cat);

  const related = allProducts.filter(x => x.cat === p.cat && x.sku !== p.sku).slice(0, 4);
  if (related.length < 4) {
    const more = allProducts.filter(x => x.brand === p.brand && x.sku !== p.sku).slice(0, 4 - related.length);
    related.push(...more);
  }

  return (
    <main className="gf-anim-in" style={{paddingBottom: 64}}>
      <div className="gf-container">
        <Breadcrumb
          items={[
            {label: "Főoldal", onClick: onLogoClick},
            {label: cat?.name || "Termékek", onClick: () => onCategorySelect(p.cat)},
            {label: p.sub},
            {label: p.name},
          ]}
          onNav={(it) => it.onClick && it.onClick()}
        />

        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 320px", gap: 32, marginTop: 24}}>
          {/* GALLERY */}
          <div>
            <div style={{
              border: "1px solid var(--gf-line)",
              borderRadius: "var(--gf-radius-lg)",
              overflow: "hidden",
              position: "relative",
              background: "var(--gf-surface)",
            }}>
              <GFProductGlyph cat={p.cat} sku={p.sku}/>
              {/* badges */}
              <div style={{position: "absolute", top: 16, left: 16, display: "flex", gap: 6}}>
                {p.badge && <span className={`gf-tag ${p.badge === "Akció" ? "gf-tag--accent" : ""}`}>{p.badge}</span>}
                <span className="gf-tag gf-tag--success">Eredeti</span>
              </div>
              {/* zoom indicator */}
              <button style={{
                position: "absolute", bottom: 16, right: 16,
                background: "var(--gf-surface)", border: "1px solid var(--gf-line)",
                width: 36, height: 36, borderRadius: 18,
                display: "grid", placeItems: "center", cursor: "pointer",
              }}>
                <GFIcon name="search" size={16}/>
              </button>
            </div>
            {/* Thumbs */}
            <div style={{display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginTop: 12}}>
              {[0, 1, 2, 3, 4].map(i => (
                <button key={i} onClick={() => setImgIdx(i)} style={{
                  border: imgIdx === i ? "2px solid var(--gf-ink)" : "1px solid var(--gf-line)",
                  borderRadius: "var(--gf-radius)", padding: 0,
                  cursor: "pointer", overflow: "hidden", background: "transparent",
                  aspectRatio: "1/1",
                }}>
                  <GFProductGlyph cat={p.cat} sku={p.sku + "-" + i}/>
                </button>
              ))}
            </div>
          </div>

          {/* TITLE + DESC */}
          <div>
            <div className="gf-uppercase" style={{color: "var(--gf-muted)", marginBottom: 8}}>
              {p.brand} · {p.sub}
            </div>
            <h1 style={{fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: "-0.015em", lineHeight: 1.2}}>
              {p.name}
            </h1>
            <div style={{display: "flex", alignItems: "center", gap: 16, marginTop: 12, fontSize: 13, color: "var(--gf-muted)"}}>
              <span className="gf-mono">Cikkszám: <span style={{color: "var(--gf-ink)"}}>{p.sku}</span></span>
              <span>·</span>
              <span style={{display: "flex", gap: 4, alignItems: "center"}}>
                {[1,2,3,4,5].map(s => <GFIcon key={s} name="star" size={12} style={{color: s <= 4 ? "var(--gf-accent)" : "var(--gf-line-2)", fill: s <= 4 ? "var(--gf-accent)" : "none"}}/>)}
                <span style={{marginLeft: 4}}>4.7 · 23 értékelés</span>
              </span>
            </div>

            {/* short bullet description */}
            <ul style={{
              listStyle: "none", padding: 0, marginTop: 24,
              display: "flex", flexDirection: "column", gap: 10,
              fontSize: 14, color: "var(--gf-ink-2)",
            }}>
              {[
                "Eredeti " + p.brand + " termék, hivatalos forgalmazói garanciával",
                "Magyar nyelvű műszaki támogatás és pótalkatrész elérhetőség",
                "E-jeles homologizáció · közúti használatra engedélyezett",
                "13:00 előtti rendelés esetén másnapi kiszállítás",
              ].map((t, i) => (
                <li key={i} style={{display: "flex", gap: 10, alignItems: "flex-start"}}>
                  <span style={{flexShrink: 0, color: "var(--gf-success)", marginTop: 2}}><GFIcon name="check" size={16}/></span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            {/* TABS */}
            <div style={{borderTop: "1px solid var(--gf-line)", marginTop: 32}}>
              <div style={{display: "flex", gap: 4, borderBottom: "1px solid var(--gf-line)"}}>
                {[
                  ["specs", "Műszaki adatok"],
                  ["compat", "Kompatibilitás"],
                  ["docs", "Dokumentumok"],
                  ["delivery", "Szállítás"],
                ].map(([id, label]) => (
                  <button key={id} onClick={() => setTab(id)} style={{
                    all: "unset", padding: "12px 16px", cursor: "pointer",
                    fontSize: 13, fontWeight: 600,
                    color: tab === id ? "var(--gf-ink)" : "var(--gf-muted)",
                    borderBottom: tab === id ? "2px solid var(--gf-accent)" : "2px solid transparent",
                    marginBottom: -1,
                  }}>{label}</button>
                ))}
              </div>
              <div style={{padding: "20px 0"}}>
                {tab === "specs" && (
                  <table style={{width: "100%", borderCollapse: "collapse", fontSize: 14}}>
                    <tbody>
                      {Object.entries(p.specs || {}).map(([k, v], i) => (
                        <tr key={k} style={{borderBottom: i === Object.keys(p.specs).length - 1 ? "none" : "1px solid var(--gf-line)"}}>
                          <td style={{padding: "10px 0", color: "var(--gf-muted)", width: "40%"}}>{k}</td>
                          <td style={{padding: "10px 0", fontWeight: 500}}>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {tab === "compat" && (
                  <div style={{fontSize: 14, color: "var(--gf-ink-2)", lineHeight: 1.6}}>
                    <p style={{margin: "0 0 12px"}}>Kompatibilis járműtípusok és helyettesítő cikkszámok:</p>
                    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8}}>
                      {["MAN TGA", "MAN TGS", "Mercedes Actros", "Volvo FH", "DAF XF", "Iveco Stralis"].map(m => (
                        <div key={m} style={{padding: "8px 12px", background: "var(--gf-surface-2)", borderRadius: 4, fontSize: 13}}>{m}</div>
                      ))}
                    </div>
                    <div style={{marginTop: 16, padding: 12, background: "var(--gf-surface-2)", borderRadius: 6, fontSize: 13}}>
                      <strong>OEM helyettesítő cikkszámok:</strong>
                      <span className="gf-mono" style={{marginLeft: 8, color: "var(--gf-muted)"}}>
                        81.25101.6491 · 81.25101.6493 · A 002 540 27 30
                      </span>
                    </div>
                  </div>
                )}
                {tab === "docs" && (
                  <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                    {["Műszaki adatlap (PDF, 1.2 MB)", "Felszerelési útmutató (PDF, 800 KB)", "EU megfelelőségi nyilatkozat (PDF, 200 KB)"].map(d => (
                      <a key={d} className="gf-btn" style={{justifyContent: "space-between"}}>
                        <span style={{display: "flex", gap: 8, alignItems: "center"}}><GFIcon name="doc" size={16}/> {d}</span>
                        <GFIcon name="download" size={16}/>
                      </a>
                    ))}
                  </div>
                )}
                {tab === "delivery" && (
                  <div style={{fontSize: 14, lineHeight: 1.6, color: "var(--gf-ink-2)"}}>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16}}>
                      <div style={{padding: 16, background: "var(--gf-surface-2)", borderRadius: 6}}>
                        <div style={{fontWeight: 600, color: "var(--gf-ink)"}}>GLS futárszolgálat</div>
                        <div style={{fontSize: 13, marginTop: 4}}>1–2 munkanap · 1.490 Ft (50 000 Ft felett ingyenes)</div>
                      </div>
                      <div style={{padding: 16, background: "var(--gf-surface-2)", borderRadius: 6}}>
                        <div style={{fontWeight: 600, color: "var(--gf-ink)"}}>Saját flotta</div>
                        <div style={{fontSize: 13, marginTop: 4}}>Budapest + agglomeráció · másnap reggel</div>
                      </div>
                      <div style={{padding: 16, background: "var(--gf-surface-2)", borderRadius: 6}}>
                        <div style={{fontWeight: 600, color: "var(--gf-ink)"}}>Személyes átvétel</div>
                        <div style={{fontSize: 13, marginTop: 4}}>2142 Nagytarcsa, Déri Miksa u. 4. · H–P: 7–16</div>
                      </div>
                      <div style={{padding: 16, background: "var(--gf-surface-2)", borderRadius: 6}}>
                        <div style={{fontWeight: 600, color: "var(--gf-ink)"}}>Raklapos szállítás</div>
                        <div style={{fontSize: 13, marginTop: 4}}>Egyedi árajánlat alapján · EU-n belül is</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* BUY BOX */}
          <BuyBox product={p} partner={partner} qty={qty} setQty={setQty} price={price} onAdd={onAdd}/>
        </div>

        {/* RELATED */}
        <section style={{marginTop: 64}}>
          <div className="gf-uppercase" style={{color: "var(--gf-muted)", marginBottom: 8}}>Kapcsolódó termékek</div>
          <h2 style={{fontSize: 24, fontWeight: 700, margin: "0 0 20px", letterSpacing: "-0.015em"}}>
            Más vásárlók ezeket is rendelték
          </h2>
          <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16}}>
            {related.map(r => (
              <ProductCard key={r.sku} product={r} partner={partner} onAdd={onAdd} onView={onView}/>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

const BuyBox = ({ product: p, partner, qty, setQty, price, onAdd }) => {
  const isLoggedIn = partner.tier !== "guest";
  const tier = window.GF_TIERS[partner.tier];

  return (
    <aside style={{
      background: "var(--gf-surface)",
      border: "1px solid var(--gf-line)",
      borderRadius: "var(--gf-radius-lg)",
      padding: 20,
      position: "sticky", top: 200,
      alignSelf: "flex-start",
      display: "flex", flexDirection: "column", gap: 16,
    }}>
      {/* Stock */}
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <StockBadge stock={p.stock} eta={p.eta}/>
        <span className="gf-mono" style={{fontSize: 11, color: "var(--gf-muted)"}}>MOQ: {p.moq} {p.unit}</span>
      </div>

      {/* Price block */}
      <div>
        {price.unitDisc > 0 && (
          <div style={{fontSize: 13, color: "var(--gf-muted)", textDecoration: "line-through"}}>
            Listaár: {fmtHUF(p.listPrice)}
          </div>
        )}
        <div style={{display: "flex", alignItems: "baseline", gap: 8}}>
          <div className="gf-mono" style={{
            fontSize: 32, fontWeight: 800, letterSpacing: "-0.025em",
            fontVariantNumeric: "tabular-nums",
          }}>{fmtHUF(price.unit)}</div>
          <div style={{fontSize: 13, color: "var(--gf-muted)"}}>/ {p.unit}</div>
        </div>
        <div style={{fontSize: 11, color: "var(--gf-muted)", marginTop: 2}}>
          ÁFA nélkül · bruttó {fmtHUF(price.unit * 1.27)}
        </div>
        {isLoggedIn && price.unitDisc > 0 && (
          <div style={{
            marginTop: 12, padding: "8px 12px",
            background: "color-mix(in oklab, var(--gf-success), white 88%)",
            color: "var(--gf-success)", borderRadius: 4,
            fontSize: 12, fontWeight: 600,
            display: "flex", justifyContent: "space-between",
          }}>
            <span>{tier.label} kedvezmény: −{Math.round(tier.discount * 100)}%</span>
            <span>−{fmtHUF(p.listPrice * tier.discount)}</span>
          </div>
        )}
      </div>

      {/* Volume tiers */}
      <div>
        <div className="gf-uppercase" style={{color: "var(--gf-muted)", marginBottom: 8, fontSize: 10}}>Mennyiségi kedvezmény</div>
        <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, fontSize: 11, fontFamily: "var(--gf-mono)"}}>
          {window.GF_QTY_TIERS.map((t, i) => {
            const active = qty >= t.from && (i === window.GF_QTY_TIERS.length - 1 || qty < window.GF_QTY_TIERS[i+1].from);
            const next = window.GF_QTY_TIERS[i + 1];
            const range = next ? `${t.from}-${next.from - 1}` : `${t.from}+`;
            return (
              <div key={i} style={{
                padding: "6px 4px", textAlign: "center",
                background: active ? "var(--gf-ink)" : "var(--gf-surface-2)",
                color: active ? "var(--gf-bg)" : "var(--gf-ink-2)",
                borderRadius: 4,
                border: active ? "1px solid var(--gf-ink)" : "1px solid transparent",
              }}>
                <div style={{fontWeight: 700}}>{range}</div>
                <div style={{fontSize: 10, opacity: active ? 1 : 0.7}}>
                  {t.extra > 0 ? `−${Math.round(t.extra * 100)}%` : "alap"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="gf-divider"/>

      {/* Qty + add to cart */}
      <div>
        <div style={{display: "flex", alignItems: "center", gap: 8, marginBottom: 12}}>
          <div style={{display: "flex", border: "1px solid var(--gf-line-2)", borderRadius: "var(--gf-radius)"}}>
            <button onClick={() => setQty(Math.max(p.moq, qty - 1))} style={{
              all: "unset", width: 36, height: 40, display: "grid", placeItems: "center", cursor: "pointer", color: "var(--gf-ink-2)",
            }}><GFIcon name="minus" size={16}/></button>
            <input
              type="number" value={qty} min={p.moq}
              onChange={(e) => setQty(Math.max(p.moq, +e.target.value || p.moq))}
              style={{
                width: 60, border: "none", textAlign: "center",
                background: "transparent", color: "var(--gf-ink)",
                fontFamily: "var(--gf-mono)", fontWeight: 700, fontSize: 16,
                outline: "none",
              }}
            />
            <button onClick={() => setQty(qty + 1)} style={{
              all: "unset", width: 36, height: 40, display: "grid", placeItems: "center", cursor: "pointer", color: "var(--gf-ink-2)",
            }}><GFIcon name="plus" size={16}/></button>
          </div>
          <span style={{fontSize: 12, color: "var(--gf-muted)"}}>{p.unit}</span>
        </div>
        <button
          className="gf-btn gf-btn--primary gf-btn--lg"
          style={{width: "100%"}}
          onClick={() => onAdd(p, qty)}
          disabled={p.stock === 0 && !p.eta}
        >
          <GFIcon name="cart" size={16}/>
          {p.stock === 0 ? "Előrendelés" : "Kosárba"} · {fmtHUF(price.total)}
        </button>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 6}}>
          <button className="gf-btn gf-btn--sm">
            <GFIcon name="heart" size={14}/> Mentés
          </button>
          <button className="gf-btn gf-btn--sm">
            <GFIcon name="compare" size={14}/> Összehasonlít
          </button>
        </div>
      </div>

      {/* Trust strip */}
      <div style={{
        background: "var(--gf-surface-2)", padding: 12, borderRadius: 6,
        display: "flex", flexDirection: "column", gap: 8,
        fontSize: 12, color: "var(--gf-ink-2)",
      }}>
        <div style={{display: "flex", gap: 8, alignItems: "center"}}>
          <GFIcon name="truck-fast" size={14} style={{color: "var(--gf-success)"}}/>
          <span>Másnap kiszállítás · 13:00-ig leadva</span>
        </div>
        <div style={{display: "flex", gap: 8, alignItems: "center"}}>
          <GFIcon name="shield" size={14} style={{color: "var(--gf-success)"}}/>
          <span>24 hónap gyártói garancia</span>
        </div>
        <div style={{display: "flex", gap: 8, alignItems: "center"}}>
          <GFIcon name="package" size={14} style={{color: "var(--gf-success)"}}/>
          <span>Eredeti, sérülésmentes csomagolás</span>
        </div>
      </div>
    </aside>
  );
};

Object.assign(window, { ProductPage, BuyBox });
