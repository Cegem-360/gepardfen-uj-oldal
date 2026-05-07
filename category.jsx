// Gepárd-FEN B2B webshop — Category / browse page

const FilterGroup = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={{borderBottom: "1px solid var(--gf-line)", padding: "16px 0"}}>
      <button onClick={() => setOpen(!open)} style={{
        all: "unset", cursor: "pointer", width: "100%",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontWeight: 600, fontSize: 14, color: "var(--gf-ink)",
      }}>
        {title}
        <GFIcon name={open ? "chev-d" : "chev-r"} size={16}/>
      </button>
      {open && <div style={{marginTop: 14, display: "flex", flexDirection: "column", gap: 8}}>{children}</div>}
    </div>
  );
};

const FilterCheck = ({ label, count, checked, onChange }) => (
  <label style={{
    display: "flex", alignItems: "center", gap: 10,
    fontSize: 13, color: "var(--gf-ink-2)", cursor: "pointer",
    padding: "2px 0",
  }}>
    <input
      type="checkbox" checked={checked} onChange={onChange}
      style={{accentColor: "var(--gf-ink)", width: 14, height: 14, cursor: "pointer"}}
    />
    <span style={{flex: 1}}>{label}</span>
    {count != null && <span style={{color: "var(--gf-muted)", fontSize: 11}}>{count}</span>}
  </label>
);

const Breadcrumb = ({ items, onNav }) => (
  <nav style={{padding: "16px 0", fontSize: 13, color: "var(--gf-muted)", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap"}}>
    {items.map((it, i) => (
      <React.Fragment key={i}>
        {i > 0 && <GFIcon name="chev-r" size={12}/>}
        <a
          onClick={() => onNav?.(it)}
          style={{
            cursor: it.onClick !== false ? "pointer" : "default",
            color: i === items.length - 1 ? "var(--gf-ink)" : "var(--gf-muted)",
            fontWeight: i === items.length - 1 ? 600 : 400,
          }}
        >{it.label}</a>
      </React.Fragment>
    ))}
  </nav>
);

const CategoryPage = ({ catId, partner, products, onAdd, onView, onCategorySelect, onLogoClick, favs, onFav }) => {
  const cat = window.GF_CATEGORIES.find(c => c.id === catId);
  if (!cat) return null;

  const [filters, setFilters] = React.useState({ subs: [], brands: [], inStock: false, onSale: false });
  const [sort, setSort] = React.useState("relevance");
  const [view, setView] = React.useState("grid");
  const [compare, setCompare] = React.useState([]);

  const toggle = (key, val) => {
    setFilters(f => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val],
    }));
  };

  let filtered = products.filter(p => p.cat === catId);
  if (filtered.length < 8) {
    // pad with cross-cat products so the grid feels alive
    const extras = window.GF_PRODUCTS.filter(p => p.cat !== catId).slice(0, 8 - filtered.length);
    filtered = [...filtered, ...extras];
  }
  if (filters.subs.length) filtered = filtered.filter(p => filters.subs.includes(p.sub));
  if (filters.brands.length) filtered = filtered.filter(p => filters.brands.includes(p.brand));
  if (filters.inStock) filtered = filtered.filter(p => p.stock > 0);
  if (filters.onSale) filtered = filtered.filter(p => p.discount || p.badge === "Akció");

  if (sort === "price-asc") filtered.sort((a,b) => a.listPrice - b.listPrice);
  if (sort === "price-desc") filtered.sort((a,b) => b.listPrice - a.listPrice);
  if (sort === "stock") filtered.sort((a,b) => b.stock - a.stock);

  const allSubs = [...new Set(window.GF_PRODUCTS.filter(p => p.cat === catId).map(p => p.sub))];
  const allBrands = [...new Set(window.GF_PRODUCTS.filter(p => p.cat === catId).map(p => p.brand))];
  const subList = (allSubs.length ? allSubs : cat.sub.slice(0, 4));
  const brandList = (allBrands.length ? allBrands : window.GF_BRANDS.slice(0, 5).map(b => b.name));

  return (
    <main className="gf-anim-in">
      <div className="gf-container">
        <Breadcrumb
          items={[{label: "Főoldal", onClick: onLogoClick}, {label: "Termékek"}, {label: cat.name}]}
          onNav={(it) => it.onClick && it.onClick()}
        />

        {/* Category header */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr auto", gap: 24,
          padding: "16px 0 24px", alignItems: "flex-end",
        }}>
          <div>
            <div style={{display: "flex", alignItems: "center", gap: 12, marginBottom: 8}}>
              <div style={{
                width: 48, height: 48, background: "var(--gf-ink)",
                color: "var(--gf-accent)", borderRadius: 8,
                display: "grid", placeItems: "center",
              }}>
                <GFIcon name={cat.icon} size={26}/>
              </div>
              <div>
                <h1 style={{fontSize: 36, fontWeight: 700, margin: 0, letterSpacing: "-0.02em"}}>{cat.name}</h1>
                <div style={{fontSize: 13, color: "var(--gf-muted)", marginTop: 4}}>
                  {filtered.length} termék · {brandList.length} gyártó · élő készlet
                </div>
              </div>
            </div>
          </div>
          <div style={{display: "flex", gap: 6}}>
            <button className="gf-btn gf-btn--sm">
              <GFIcon name="download" size={14}/> Katalógus PDF
            </button>
            <button className="gf-btn gf-btn--sm">
              <GFIcon name="upload" size={14}/> CSV/XLSX feltöltés
            </button>
          </div>
        </div>

        {/* Sub-categories chips */}
        <div style={{
          display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24,
          paddingBottom: 24, borderBottom: "1px solid var(--gf-line)",
        }}>
          {cat.sub.map(s => (
            <button key={s}
              onClick={() => toggle("subs", s)}
              className="gf-btn gf-btn--sm"
              style={{
                background: filters.subs.includes(s) ? "var(--gf-ink)" : "var(--gf-surface)",
                color: filters.subs.includes(s) ? "var(--gf-bg)" : "var(--gf-ink)",
                borderColor: filters.subs.includes(s) ? "var(--gf-ink)" : "var(--gf-line-2)",
              }}
            >{s}</button>
          ))}
        </div>

        <div style={{display: "grid", gridTemplateColumns: "260px 1fr", gap: 32, paddingBottom: 64}}>
          {/* Sidebar filters */}
          <aside>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 8,
            }}>
              <div className="gf-uppercase">Szűrők</div>
              <button
                className="gf-btn gf-btn--ghost gf-btn--sm"
                onClick={() => setFilters({subs: [], brands: [], inStock: false, onSale: false})}
                style={{color: "var(--gf-muted)", padding: "0 6px"}}
              >Töröl</button>
            </div>

            <FilterGroup title="Készlet">
              <FilterCheck label="Csak raktáron lévő" checked={filters.inStock} onChange={() => setFilters(f => ({...f, inStock: !f.inStock}))}/>
              <FilterCheck label="Akciós termékek" checked={filters.onSale} onChange={() => setFilters(f => ({...f, onSale: !f.onSale}))}/>
            </FilterGroup>

            <FilterGroup title="Alkategória">
              {subList.map(s => (
                <FilterCheck key={s} label={s} checked={filters.subs.includes(s)} onChange={() => toggle("subs", s)}/>
              ))}
            </FilterGroup>

            <FilterGroup title="Gyártó">
              {brandList.map(b => (
                <FilterCheck key={b} label={b} checked={filters.brands.includes(b)} onChange={() => toggle("brands", b)}/>
              ))}
            </FilterGroup>

            <FilterGroup title="Feszültség">
              <FilterCheck label="12V"/>
              <FilterCheck label="24V"/>
              <FilterCheck label="12/24V univerzális"/>
            </FilterGroup>

            <FilterGroup title="Ár (nettó)" defaultOpen={false}>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8}}>
                <input className="gf-input" placeholder="min" style={{height: 36}}/>
                <input className="gf-input" placeholder="max" style={{height: 36}}/>
              </div>
            </FilterGroup>

            <FilterGroup title="Tanúsítványok" defaultOpen={false}>
              <FilterCheck label="E-jeles homologizáció"/>
              <FilterCheck label="ECE R65"/>
              <FilterCheck label="IP67/IP69K"/>
            </FilterGroup>

            {/* B2B partner box in sidebar */}
            <div style={{
              marginTop: 24, padding: 16,
              background: "var(--gf-ink)", color: "var(--gf-bg)",
              borderRadius: "var(--gf-radius-lg)",
            }}>
              <div style={{display: "flex", alignItems: "center", gap: 8, marginBottom: 8}}>
                <GFIcon name="chat" size={18} style={{color: "var(--gf-accent)"}}/>
                <div style={{fontWeight: 700, fontSize: 14}}>Nem találja?</div>
              </div>
              <div style={{fontSize: 13, opacity: 0.75, marginBottom: 12, lineHeight: 1.5}}>
                Munkatársaink 40+ gyártó katalógusát ismerik. Küldje el a cikkszámot, mi megkeressük.
              </div>
              <button className="gf-btn gf-btn--primary gf-btn--sm" style={{width: "100%"}}>Ajánlatkérés</button>
            </div>
          </aside>

          {/* Results */}
          <section>
            {/* Toolbar */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 16,
              padding: "12px 16px", background: "var(--gf-surface)",
              border: "1px solid var(--gf-line)", borderRadius: "var(--gf-radius)",
            }}>
              <div style={{fontSize: 13, color: "var(--gf-muted)"}}>
                <span style={{color: "var(--gf-ink)", fontWeight: 600}}>{filtered.length}</span> termék
                {(filters.subs.length + filters.brands.length) > 0 && (
                  <span> · {filters.subs.length + filters.brands.length} aktív szűrő</span>
                )}
              </div>
              <div style={{display: "flex", gap: 8, alignItems: "center"}}>
                <select
                  value={sort} onChange={(e) => setSort(e.target.value)}
                  className="gf-input" style={{width: "auto", height: 36, padding: "0 12px"}}
                >
                  <option value="relevance">Relevancia szerint</option>
                  <option value="price-asc">Ár növekvő</option>
                  <option value="price-desc">Ár csökkenő</option>
                  <option value="stock">Készlet szerint</option>
                </select>
                <div style={{display: "flex", border: "1px solid var(--gf-line-2)", borderRadius: "var(--gf-radius)"}}>
                  <button onClick={() => setView("grid")} style={{
                    all: "unset", padding: "6px 10px", cursor: "pointer",
                    background: view === "grid" ? "var(--gf-ink)" : "transparent",
                    color: view === "grid" ? "var(--gf-bg)" : "var(--gf-ink-2)",
                    display: "grid", placeItems: "center",
                  }}><GFIcon name="grid" size={16}/></button>
                  <button onClick={() => setView("list")} style={{
                    all: "unset", padding: "6px 10px", cursor: "pointer",
                    background: view === "list" ? "var(--gf-ink)" : "transparent",
                    color: view === "list" ? "var(--gf-bg)" : "var(--gf-ink-2)",
                    display: "grid", placeItems: "center",
                  }}><GFIcon name="list" size={16}/></button>
                </div>
              </div>
            </div>

            {view === "grid" ? (
              <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16}}>
                {filtered.map(p => (
                  <ProductCard
                    key={p.sku} product={p} partner={partner}
                    onAdd={onAdd} onView={onView}
                    fav={favs.includes(p.sku)} onFav={onFav}
                  />
                ))}
              </div>
            ) : (
              <ProductTable products={filtered} partner={partner} onAdd={onAdd} onView={onView}/>
            )}

            {/* Compare bar */}
            {compare.length > 0 && (
              <div style={{
                position: "fixed", bottom: 24, left: 24, right: 24, zIndex: 50,
                background: "var(--gf-ink)", color: "var(--gf-bg)",
                padding: 14, borderRadius: "var(--gf-radius-lg)",
                display: "flex", alignItems: "center", gap: 16,
                boxShadow: "var(--gf-shadow-lg)",
              }}>
                <span>{compare.length} termék kijelölve</span>
                <button className="gf-btn gf-btn--primary gf-btn--sm">Összehasonlítás</button>
              </div>
            )}

            {/* Pagination placeholder */}
            <div style={{display: "flex", justifyContent: "center", marginTop: 32, gap: 4}}>
              {[1, 2, 3, "…", 8].map((p, i) => (
                <button key={i} className="gf-btn gf-btn--sm" style={{
                  background: p === 1 ? "var(--gf-ink)" : "var(--gf-surface)",
                  color: p === 1 ? "var(--gf-bg)" : "var(--gf-ink)",
                  borderColor: p === 1 ? "var(--gf-ink)" : "var(--gf-line-2)",
                  minWidth: 40,
                }}>{p}</button>
              ))}
              <button className="gf-btn gf-btn--sm">Következő <GFIcon name="chev-r" size={14}/></button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

const ProductTable = ({ products, partner, onAdd, onView }) => (
  <div className="gf-card" style={{padding: 0, overflow: "hidden"}}>
    <table style={{width: "100%", borderCollapse: "collapse", fontSize: 14}}>
      <thead>
        <tr style={{background: "var(--gf-surface-2)", borderBottom: "1px solid var(--gf-line)"}}>
          <th style={{textAlign: "left", padding: "10px 12px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--gf-muted)", fontWeight: 600}}>Cikkszám</th>
          <th style={{textAlign: "left", padding: "10px 12px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--gf-muted)", fontWeight: 600}}>Termék</th>
          <th style={{textAlign: "left", padding: "10px 12px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--gf-muted)", fontWeight: 600}}>Gyártó</th>
          <th style={{textAlign: "left", padding: "10px 12px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--gf-muted)", fontWeight: 600}}>Készlet</th>
          <th style={{textAlign: "right", padding: "10px 12px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--gf-muted)", fontWeight: 600}}>Nettó ár</th>
          <th style={{textAlign: "right", padding: "10px 12px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--gf-muted)", fontWeight: 600}}>Mennyiség</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((p, i) => {
          const price = calcPrice(p, partner.tier, p.moq);
          return (
            <tr key={p.sku} style={{borderBottom: i === products.length - 1 ? "none" : "1px solid var(--gf-line)", cursor: "pointer"}}
              onClick={() => onView(p)}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--gf-surface-2)"}
              onMouseLeave={(e) => e.currentTarget.style.background = ""}
            >
              <td style={{padding: "12px", fontFamily: "var(--gf-mono)", fontSize: 12, color: "var(--gf-ink-2)"}}>{p.sku}</td>
              <td style={{padding: "12px"}}>
                <div style={{fontWeight: 600}}>{p.name}</div>
                <div style={{fontSize: 12, color: "var(--gf-muted)", marginTop: 2}}>{p.sub}</div>
              </td>
              <td style={{padding: "12px", fontSize: 13}}>{p.brand}</td>
              <td style={{padding: "12px"}}>
                <StockBadge stock={p.stock} eta={p.eta}/>
              </td>
              <td style={{padding: "12px", textAlign: "right", fontFamily: "var(--gf-mono)", fontVariantNumeric: "tabular-nums"}}>
                <div style={{fontWeight: 700}}>{fmtHUF(price.unit)}</div>
                {price.unitDisc > 0 && <div style={{fontSize: 11, color: "var(--gf-muted)", textDecoration: "line-through"}}>{fmtHUF(p.listPrice)}</div>}
              </td>
              <td style={{padding: "12px", textAlign: "right"}} onClick={(e) => e.stopPropagation()}>
                <input type="number" defaultValue={p.moq} min={p.moq} className="gf-input" style={{width: 70, height: 32, textAlign: "center"}}/>
              </td>
              <td style={{padding: "12px", textAlign: "right"}} onClick={(e) => e.stopPropagation()}>
                <button className="gf-btn gf-btn--primary gf-btn--sm" disabled={p.stock === 0} onClick={() => onAdd(p, p.moq)}>
                  <GFIcon name="cart" size={14}/>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

Object.assign(window, { CategoryPage, FilterGroup, FilterCheck, Breadcrumb, ProductTable });
