// Gepárd-FEN B2B webshop — Cart, Quick order, Login modals + Footer

const Modal = ({ open, onClose, children, width = 720, title }) => {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(15, 12, 6, 0.55)", backdropFilter: "blur(2px)",
        zIndex: 100, display: "grid", placeItems: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="gf-anim-in"
        style={{
          background: "var(--gf-surface)",
          width: "100%", maxWidth: width,
          borderRadius: "var(--gf-radius-lg)",
          maxHeight: "90vh", display: "flex", flexDirection: "column",
          boxShadow: "var(--gf-shadow-lg)",
          overflow: "hidden",
        }}
      >
        {title && (
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "18px 24px", borderBottom: "1px solid var(--gf-line)",
          }}>
            <div style={{fontSize: 18, fontWeight: 700}}>{title}</div>
            <button className="gf-btn gf-btn--ghost gf-btn--sm" onClick={onClose}>
              <GFIcon name="x" size={18}/>
            </button>
          </div>
        )}
        <div style={{flex: 1, overflow: "auto"}}>
          {children}
        </div>
      </div>
    </div>
  );
};

const CartDrawer = ({ open, cart, partner, onClose, onUpdateQty, onRemove, onCheckout }) => {
  if (!open) return null;
  const items = cart.map(line => {
    const product = window.GF_PRODUCTS.find(p => p.sku === line.sku);
    if (!product) return null;
    return { ...line, product, price: calcPrice(product, partner.tier, line.qty) };
  }).filter(Boolean);

  const subtotal = items.reduce((s, i) => s + i.price.total, 0);
  const shipping = subtotal > 50000 ? 0 : 1490;
  const vat = (subtotal + shipping) * 0.27;
  const total = subtotal + shipping + vat;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(15, 12, 6, 0.55)", backdropFilter: "blur(2px)",
        zIndex: 100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="gf-anim-in"
        style={{
          position: "absolute", top: 0, right: 0, bottom: 0,
          width: "min(560px, 100%)",
          background: "var(--gf-surface)",
          display: "flex", flexDirection: "column",
          boxShadow: "var(--gf-shadow-lg)",
        }}
      >
        <div style={{
          padding: "18px 24px", borderBottom: "1px solid var(--gf-line)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{fontSize: 18, fontWeight: 700}}>Kosár</div>
            <div style={{fontSize: 12, color: "var(--gf-muted)", marginTop: 2}}>
              {items.length} különböző tétel · {items.reduce((s,i) => s + i.qty, 0)} db
            </div>
          </div>
          <button className="gf-btn gf-btn--ghost gf-btn--sm" onClick={onClose}>
            <GFIcon name="x" size={18}/>
          </button>
        </div>

        <div style={{flex: 1, overflow: "auto", padding: 16}}>
          {items.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "60px 20px",
              color: "var(--gf-muted)",
            }}>
              <div style={{
                width: 56, height: 56,
                background: "var(--gf-surface-2)", borderRadius: 28,
                display: "grid", placeItems: "center",
                margin: "0 auto 16px",
              }}>
                <GFIcon name="cart" size={26}/>
              </div>
              <div style={{fontSize: 16, fontWeight: 600, color: "var(--gf-ink)", marginBottom: 4}}>A kosár üres</div>
              <div style={{fontSize: 13}}>Adjon hozzá termékeket a böngészőből vagy gyorsrendeléssel.</div>
            </div>
          ) : (
            <div style={{display: "flex", flexDirection: "column", gap: 12}}>
              {items.map(item => (
                <div key={item.sku} style={{
                  display: "grid", gridTemplateColumns: "64px 1fr auto",
                  gap: 12, padding: 12,
                  border: "1px solid var(--gf-line)", borderRadius: "var(--gf-radius)",
                  background: "var(--gf-bg)",
                }}>
                  <div style={{borderRadius: 4, overflow: "hidden"}}>
                    <GFProductGlyph cat={item.product.cat} sku={item.product.sku}/>
                  </div>
                  <div style={{minWidth: 0}}>
                    <div style={{fontSize: 13, fontWeight: 600, lineHeight: 1.3}}>{item.product.name}</div>
                    <div style={{fontSize: 11, color: "var(--gf-muted)", fontFamily: "var(--gf-mono)", marginTop: 2}}>{item.product.sku}</div>
                    <div style={{display: "flex", alignItems: "center", gap: 8, marginTop: 8}}>
                      <div style={{display: "flex", border: "1px solid var(--gf-line-2)", borderRadius: 4}}>
                        <button onClick={() => onUpdateQty(item.sku, Math.max(item.product.moq, item.qty - 1))} style={{
                          all: "unset", width: 24, height: 24, display: "grid", placeItems: "center", cursor: "pointer",
                        }}><GFIcon name="minus" size={12}/></button>
                        <span style={{
                          width: 32, textAlign: "center",
                          fontFamily: "var(--gf-mono)", fontSize: 13, fontWeight: 600,
                          display: "grid", placeItems: "center",
                        }}>{item.qty}</span>
                        <button onClick={() => onUpdateQty(item.sku, item.qty + 1)} style={{
                          all: "unset", width: 24, height: 24, display: "grid", placeItems: "center", cursor: "pointer",
                        }}><GFIcon name="plus" size={12}/></button>
                      </div>
                      <button onClick={() => onRemove(item.sku)} style={{
                        all: "unset", fontSize: 11, color: "var(--gf-muted)", cursor: "pointer",
                      }}>Törlés</button>
                    </div>
                  </div>
                  <div style={{textAlign: "right"}}>
                    <div className="gf-mono" style={{fontWeight: 700, fontSize: 14, fontVariantNumeric: "tabular-nums"}}>
                      {fmtHUF(item.price.total)}
                    </div>
                    <div style={{fontSize: 11, color: "var(--gf-muted)", marginTop: 2}}>
                      {fmtHUF(item.price.unit)} / db
                    </div>
                    {item.price.qtyExtra > 0 && (
                      <div style={{fontSize: 10, color: "var(--gf-success)", marginTop: 4}}>
                        −{Math.round(item.price.qtyExtra * 100)}% mennyiségi
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div style={{
            borderTop: "1px solid var(--gf-line)", padding: 20,
            background: "var(--gf-surface-2)",
          }}>
            {/* Free shipping nudge */}
            {shipping > 0 && (
              <div style={{
                fontSize: 12, color: "var(--gf-ink-2)",
                marginBottom: 12, padding: 10,
                background: "var(--gf-surface)", borderRadius: 4,
              }}>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: 6}}>
                  <span>Még <strong>{fmtHUF(50000 - subtotal)}</strong> az ingyenes szállításig</span>
                </div>
                <div style={{height: 4, background: "var(--gf-line)", borderRadius: 2, overflow: "hidden"}}>
                  <div style={{
                    height: "100%", background: "var(--gf-accent)",
                    width: `${Math.min(100, (subtotal / 50000) * 100)}%`,
                    transition: "width .3s",
                  }}/>
                </div>
              </div>
            )}

            <div style={{display: "flex", flexDirection: "column", gap: 6, marginBottom: 12, fontSize: 13}}>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{color: "var(--gf-muted)"}}>Részösszeg (nettó)</span>
                <span className="gf-mono">{fmtHUF(subtotal)}</span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{color: "var(--gf-muted)"}}>Szállítás</span>
                <span className="gf-mono">{shipping === 0 ? "Ingyenes" : fmtHUF(shipping)}</span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{color: "var(--gf-muted)"}}>ÁFA (27%)</span>
                <span className="gf-mono">{fmtHUF(vat)}</span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid var(--gf-line)", marginTop: 4}}>
                <span style={{fontWeight: 700, fontSize: 16}}>Bruttó összesen</span>
                <span className="gf-mono" style={{fontWeight: 800, fontSize: 18}}>{fmtHUF(total)}</span>
              </div>
            </div>

            <button className="gf-btn gf-btn--primary gf-btn--lg" style={{width: "100%"}} onClick={onCheckout}>
              Megrendelés véglegesítése <GFIcon name="chev-r" size={16}/>
            </button>
            <button className="gf-btn gf-btn--ghost gf-btn--sm" style={{width: "100%", marginTop: 6}} onClick={onClose}>
              Tovább vásárolok
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const QuickOrderModal = ({ open, onClose, partner, onAddBatch }) => {
  const [rows, setRows] = React.useState([
    { sku: "", qty: 1 },
    { sku: "", qty: 1 },
    { sku: "", qty: 1 },
    { sku: "", qty: 1 },
  ]);
  const [pasteMode, setPasteMode] = React.useState(false);
  const [pasteText, setPasteText] = React.useState("");

  const update = (i, key, val) => {
    setRows(r => r.map((row, idx) => idx === i ? {...row, [key]: val} : row));
  };

  const findProduct = (sku) => window.GF_PRODUCTS.find(p =>
    p.sku.toLowerCase() === (sku || "").toLowerCase()
  );

  const valid = rows.filter(r => findProduct(r.sku) && r.qty > 0);

  const handleAdd = () => {
    valid.forEach(r => {
      const product = findProduct(r.sku);
      if (product) onAddBatch(product, +r.qty);
    });
    onClose();
  };

  const handlePasteApply = () => {
    const lines = pasteText.split(/\n/).map(l => l.trim()).filter(Boolean);
    const newRows = lines.map(line => {
      const parts = line.split(/[\s,;\t]+/);
      return { sku: parts[0] || "", qty: +(parts[1] || 1) };
    });
    setRows([...newRows, ...Array.from({length: Math.max(0, 4 - newRows.length)}).map(() => ({sku: "", qty: 1}))]);
    setPasteMode(false);
  };

  return (
    <Modal open={open} onClose={onClose} title="Gyorsrendelés" width={760}>
      <div style={{padding: 24}}>
        <p style={{margin: 0, fontSize: 14, color: "var(--gf-muted)", marginBottom: 16, textWrap: "pretty"}}>
          Ha pontosan tudja a cikkszámokat, írja be őket — a rendszer azonnal felismeri és kosárba helyezi a tételeket. Egyszerre több tételt is felvehet.
        </p>

        <div style={{
          display: "flex", gap: 8, marginBottom: 16,
          padding: 4, background: "var(--gf-surface-2)", borderRadius: "var(--gf-radius)",
        }}>
          <button onClick={() => setPasteMode(false)} className="gf-btn gf-btn--sm" style={{
            flex: 1,
            background: !pasteMode ? "var(--gf-surface)" : "transparent",
            borderColor: "transparent",
            boxShadow: !pasteMode ? "var(--gf-shadow-sm)" : "none",
          }}>
            Kézi felvétel
          </button>
          <button onClick={() => setPasteMode(true)} className="gf-btn gf-btn--sm" style={{
            flex: 1,
            background: pasteMode ? "var(--gf-surface)" : "transparent",
            borderColor: "transparent",
            boxShadow: pasteMode ? "var(--gf-shadow-sm)" : "none",
          }}>
            Excel beillesztés / CSV
          </button>
        </div>

        {pasteMode ? (
          <div>
            <div style={{fontSize: 13, color: "var(--gf-muted)", marginBottom: 8}}>
              Másolja be az adatokat (formátum: <code className="gf-mono">cikkszám,mennyiség</code> vagy tab-elválasztott — pl. Excelből):
            </div>
            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder={"WSM-RE2-12V, 5\nFRS-272-LED, 24\nPOL-VF-D50, 2"}
              style={{
                width: "100%", minHeight: 160,
                padding: 12,
                border: "1px solid var(--gf-line-2)",
                background: "var(--gf-bg)",
                borderRadius: "var(--gf-radius)",
                fontFamily: "var(--gf-mono)", fontSize: 13,
                resize: "vertical",
                color: "var(--gf-ink)",
              }}
            />
            <div style={{display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8}}>
              <button className="gf-btn" onClick={() => setPasteMode(false)}>Mégse</button>
              <button className="gf-btn gf-btn--primary" onClick={handlePasteApply}>
                Beolvasás <GFIcon name="chev-r" size={14}/>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 100px 1fr 110px 32px",
              gap: 8,
              padding: "0 4px 4px",
              fontSize: 11, fontWeight: 600,
              textTransform: "uppercase", letterSpacing: "0.06em",
              color: "var(--gf-muted)",
            }}>
              <div>Cikkszám</div>
              <div>Mennyiség</div>
              <div>Termék</div>
              <div style={{textAlign: "right"}}>Nettó</div>
              <div></div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: 6}}>
              {rows.map((row, i) => {
                const product = findProduct(row.sku);
                const price = product ? calcPrice(product, partner.tier, row.qty) : null;
                return (
                  <div key={i} style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 100px 1fr 110px 32px",
                    gap: 8, alignItems: "center",
                  }}>
                    <input
                      className="gf-input"
                      value={row.sku}
                      onChange={(e) => update(i, "sku", e.target.value.toUpperCase())}
                      placeholder="pl. WSM-RE2-12V"
                      style={{fontFamily: "var(--gf-mono)", fontSize: 13}}
                    />
                    <input
                      className="gf-input"
                      type="number" min="1"
                      value={row.qty}
                      onChange={(e) => update(i, "qty", +e.target.value || 1)}
                      style={{textAlign: "center"}}
                    />
                    <div style={{
                      fontSize: 13,
                      color: product ? "var(--gf-ink)" : "var(--gf-muted)",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {product ? product.name : (row.sku ? "Nem találom — ellenőrizze a cikkszámot" : "—")}
                    </div>
                    <div style={{textAlign: "right", fontFamily: "var(--gf-mono)", fontWeight: 700, fontSize: 13, color: product ? "var(--gf-ink)" : "var(--gf-muted)"}}>
                      {price ? fmtHUF(price.total) : "—"}
                    </div>
                    <button
                      onClick={() => setRows(r => r.filter((_, idx) => idx !== i))}
                      className="gf-btn gf-btn--ghost gf-btn--sm"
                      style={{padding: 0, width: 32, height: 32, color: "var(--gf-muted)"}}
                    >
                      <GFIcon name="x" size={14}/>
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setRows(r => [...r, {sku: "", qty: 1}])}
              className="gf-btn gf-btn--sm"
              style={{marginTop: 12}}
            >
              <GFIcon name="plus" size={14}/> További sor
            </button>

            <div style={{
              marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--gf-line)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{fontSize: 13, color: "var(--gf-muted)"}}>
                <strong style={{color: "var(--gf-ink)"}}>{valid.length}</strong> érvényes tétel ·
                {" "}<strong style={{color: "var(--gf-ink)"}}>{fmtHUF(valid.reduce((s, r) => s + (calcPrice(findProduct(r.sku), partner.tier, +r.qty)?.total || 0), 0))}</strong> nettó
              </div>
              <div style={{display: "flex", gap: 8}}>
                <button className="gf-btn" onClick={onClose}>Mégse</button>
                <button className="gf-btn gf-btn--primary" onClick={handleAdd} disabled={valid.length === 0}>
                  <GFIcon name="cart" size={14}/> Kosárba ({valid.length} tétel)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

const LoginModal = ({ open, onClose, partner, onSelectTier, onLogout }) => {
  const isLoggedIn = partner.tier !== "guest";
  return (
    <Modal open={open} onClose={onClose} title={isLoggedIn ? "Partner fiók" : "Bejelentkezés"} width={460}>
      <div style={{padding: 24}}>
        {isLoggedIn ? (
          <div>
            <div style={{
              padding: 16, background: "var(--gf-surface-2)",
              borderRadius: "var(--gf-radius)", marginBottom: 20,
            }}>
              <div style={{fontSize: 12, color: "var(--gf-muted)", marginBottom: 4}}>Bejelentkezve mint</div>
              <div style={{fontWeight: 700, fontSize: 16}}>{partner.contact}</div>
              <div style={{fontSize: 13, color: "var(--gf-muted)"}}>{partner.email}</div>
              <div style={{
                marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--gf-line)",
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12,
              }}>
                <div>
                  <div style={{color: "var(--gf-muted)"}}>Cég</div>
                  <div style={{fontWeight: 600}}>{partner.company}</div>
                </div>
                <div>
                  <div style={{color: "var(--gf-muted)"}}>Partner ID</div>
                  <div style={{fontWeight: 600, fontFamily: "var(--gf-mono)"}}>{partner.partnerId}</div>
                </div>
              </div>
            </div>

            <div style={{display: "flex", flexDirection: "column", gap: 4, marginBottom: 16}}>
              {[
                ["history", "Rendelési előzmények", `${partner.recentOrders} korábbi rendelés`],
                ["package", "Aktív szállítások", "2 csomag úton"],
                ["doc", "Számlák és bizonylatok", null],
                ["heart", "Mentett listák", null],
                ["user", "Felhasználók kezelése", "B2B csapat — 3 fő"],
              ].map(([icon, label, sub]) => (
                <a key={label} className="gf-btn" style={{justifyContent: "flex-start", height: 48}}>
                  <GFIcon name={icon} size={16}/>
                  <span style={{flex: 1, textAlign: "left"}}>
                    <div>{label}</div>
                    {sub && <div style={{fontSize: 11, color: "var(--gf-muted)", marginTop: 2, fontWeight: 400}}>{sub}</div>}
                  </span>
                  <GFIcon name="chev-r" size={14}/>
                </a>
              ))}
            </div>

            <button className="gf-btn" style={{width: "100%"}} onClick={onLogout}>
              Kijelentkezés
            </button>

            <div style={{
              marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--gf-line)",
              fontSize: 11, color: "var(--gf-muted)",
            }}>
              <div style={{marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em"}}>Demo: partner-szint váltás</div>
              <div style={{display: "flex", gap: 4, flexWrap: "wrap"}}>
                {Object.entries(window.GF_TIERS).filter(([k]) => k !== "guest").map(([k, t]) => (
                  <button key={k} className="gf-btn gf-btn--sm" onClick={() => onSelectTier(k)} style={{
                    background: partner.tier === k ? "var(--gf-ink)" : "var(--gf-surface)",
                    color: partner.tier === k ? "var(--gf-bg)" : "var(--gf-ink)",
                    borderColor: partner.tier === k ? "var(--gf-ink)" : "var(--gf-line-2)",
                  }}>{t.label} ({Math.round(t.discount * 100)}%)</button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{display: "flex", flexDirection: "column", gap: 12}}>
            <div>
              <label style={{fontSize: 12, fontWeight: 600, marginBottom: 6, display: "block"}}>Email cím</label>
              <input className="gf-input" placeholder="partner@cege.hu"/>
            </div>
            <div>
              <label style={{fontSize: 12, fontWeight: 600, marginBottom: 6, display: "block"}}>Jelszó</label>
              <input className="gf-input" type="password" placeholder="••••••••"/>
            </div>
            <button className="gf-btn gf-btn--primary gf-btn--lg" onClick={() => onSelectTier("gold")}>
              Bejelentkezés
            </button>
            <a style={{textAlign: "center", fontSize: 13, color: "var(--gf-muted)", textDecoration: "none"}}>Elfelejtett jelszó</a>
            <div style={{
              padding: 16, background: "var(--gf-surface-2)", borderRadius: 6,
              fontSize: 13, color: "var(--gf-ink-2)", marginTop: 8,
            }}>
              <strong>Még nem partner?</strong> A B2B árazáshoz cégadatait egyeztetjük.
              <a style={{color: "var(--gf-accent)", display: "block", marginTop: 6, textDecoration: "none", fontWeight: 600}}>
                Partneri regisztráció kérése →
              </a>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

const Footer = () => (
  <footer style={{background: "var(--gf-ink)", color: "var(--gf-bg)", paddingTop: 56, paddingBottom: 24, marginTop: 48}}>
    <div className="gf-container">
      <div style={{display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1.4fr", gap: 32}}>
        <div>
          <div className="gf-logo" style={{cursor: "default"}}>
            <div className="gf-logo__mark" style={{background: "var(--gf-accent)", color: "var(--gf-ink)"}}>G·F</div>
            <div className="gf-logo__text">
              <div className="gf-logo__name" style={{color: "var(--gf-bg)"}}>Gepárd-FEN</div>
              <div className="gf-logo__sub" style={{color: "rgba(244, 242, 236, 0.5)"}}>B2B alkatrész portál</div>
            </div>
          </div>
          <p style={{
            color: "rgba(244, 242, 236, 0.6)", fontSize: 13, lineHeight: 1.6,
            marginTop: 16, maxWidth: 360, textWrap: "pretty",
          }}>
            30+ éve a magyar haszongépjármű-, pótkocsi- és világítástechnikai piac kiszolgálója. WESEM hivatalos magyarországi képviselete, 40+ európai gyártó cikkeivel.
          </p>
          <div style={{
            display: "flex", gap: 8, marginTop: 16, fontSize: 12,
            color: "rgba(244, 242, 236, 0.5)",
          }}>
            <span>Adószám: 10936849-2-13</span>
            <span>·</span>
            <span>Cégjegyzékszám: 13-09-200623</span>
          </div>
        </div>

        {[
          { title: "Termékek", links: ["Fényszórók", "Fényhidak", "Vonófejek", "Rakományrögzítők", "Trabant", "AVIA"] },
          { title: "Vásárlás", links: ["Gyorsrendelés", "Kosár", "Szállítási feltételek", "Fizetési módok", "Visszárú"] },
          { title: "Cég", links: ["Rólunk", "Karrier", "Hírek", "Kapcsolat", "Üzletszabályzat"] },
        ].map(col => (
          <div key={col.title}>
            <div style={{fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(244, 242, 236, 0.5)", marginBottom: 16}}>{col.title}</div>
            <div style={{display: "flex", flexDirection: "column", gap: 10}}>
              {col.links.map(l => (
                <a key={l} style={{color: "rgba(244, 242, 236, 0.85)", fontSize: 14, textDecoration: "none", cursor: "pointer"}}>{l}</a>
              ))}
            </div>
          </div>
        ))}

        <div>
          <div style={{fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(244, 242, 236, 0.5)", marginBottom: 16}}>B2B Hírlevél</div>
          <div style={{fontSize: 13, color: "rgba(244, 242, 236, 0.7)", marginBottom: 12, lineHeight: 1.5}}>
            Új termékek, akciók, és partnerszintekre szabott ajánlatok közvetlenül a postaládájába.
          </div>
          <div style={{display: "flex", gap: 6}}>
            <input className="gf-input" placeholder="email@cege.hu" style={{
              background: "rgba(244, 242, 236, 0.05)", color: "var(--gf-bg)",
              borderColor: "rgba(244, 242, 236, 0.15)",
            }}/>
            <button className="gf-btn gf-btn--primary"><GFIcon name="chev-r" size={16}/></button>
          </div>
          <div style={{display: "flex", gap: 16, marginTop: 24, fontSize: 13}}>
            <a style={{color: "rgba(244, 242, 236, 0.85)", textDecoration: "none", display: "flex", gap: 6}}>
              <GFIcon name="phone" size={14}/> +36 1 340 2550
            </a>
            <a style={{color: "rgba(244, 242, 236, 0.85)", textDecoration: "none", display: "flex", gap: 6}}>
              <GFIcon name="mail" size={14}/> info@gepardfen.hu
            </a>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 48, paddingTop: 24,
        borderTop: "1px solid rgba(244, 242, 236, 0.1)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 12, color: "rgba(244, 242, 236, 0.5)",
      }}>
        <div>© 1993–2026 GEPÁRD-FEN Kft. · Minden jog fenntartva</div>
        <div style={{display: "flex", gap: 16}}>
          <a style={{color: "inherit", textDecoration: "none"}}>Adatvédelem</a>
          <a style={{color: "inherit", textDecoration: "none"}}>Süti beállítások</a>
          <a style={{color: "inherit", textDecoration: "none"}}>ÁSZF</a>
        </div>
      </div>
    </div>
  </footer>
);

const Toast = ({ toast, onDismiss }) => {
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [toast]);
  if (!toast) return null;
  return (
    <div className="gf-toast">
      <div style={{
        width: 24, height: 24, borderRadius: 12,
        background: "var(--gf-accent)", color: "var(--gf-ink)",
        display: "grid", placeItems: "center",
      }}>
        <GFIcon name="check" size={14}/>
      </div>
      <div style={{flex: 1}}>{toast}</div>
      <button onClick={onDismiss} style={{all: "unset", cursor: "pointer", opacity: 0.6}}>
        <GFIcon name="x" size={16}/>
      </button>
    </div>
  );
};

Object.assign(window, { Modal, CartDrawer, QuickOrderModal, LoginModal, Footer, Toast });
