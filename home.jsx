// Gepárd-FEN B2B webshop — Hero + banner-szakaszok + márkaszűrő + kategóriák

const Hero = ({ tweaks, partner, onCategorySelect, onQuickOrder, onLoginClick }) => {
  const isLoggedIn = partner.tier !== "guest";
  const variant = tweaks.heroVariant || "split";

  // Vendég nézet — eltérő, üzenete fókuszáltabb
  if (!isLoggedIn) {
    return <GuestHero onCategorySelect={onCategorySelect} onLoginClick={onLoginClick} onQuickOrder={onQuickOrder}/>;
  }

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
              Üdv újra,<br/>
              <span style={{color: "var(--gf-accent)"}}>{partner.company.split(" ")[0]}!</span>
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

          {/* Jobb: banner kép */}
          <div style={{
            position: "relative", overflow: "hidden",
            backgroundImage: "url(assets/banner-bg.jpg)",
            backgroundSize: "cover", backgroundPosition: "center",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(15,17,20,0.55) 0%, rgba(15,17,20,0.15) 60%)",
            }}/>
            <div style={{
              position: "absolute", left: 24, bottom: 24, right: 24,
              color: "#fff",
            }}>
              <div style={{fontFamily: "var(--gf-mono)", fontSize: 10, opacity: 0.8, letterSpacing: "0.1em"}}>SPOTLIGHT · WESEM HIVATALOS</div>
              <div style={{fontSize: 22, fontWeight: 700, marginTop: 6, textShadow: "0 2px 12px rgba(0,0,0,0.4)"}}>RE.22500 sorozat</div>
              <div style={{fontSize: 13, opacity: 0.85, marginTop: 2}}>Robusztus LED munkalámpa család · IP67 · 12/24V</div>
            </div>
            <div style={{position: "absolute", top: 0, right: 0, width: 60, height: 60, background: "var(--gf-accent)"}}/>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{background: "var(--gf-ink)", color: "var(--gf-bg)", padding: "72px 0"}}>
      <div className="gf-container">
        <h1 style={{fontSize: 56, fontWeight: 800, margin: 0}}>Gepárd-FEN B2B</h1>
      </div>
    </section>
  );
};

// Vendég hero — más üzenet, hangsúlyban a regisztráció / belépés
const GuestHero = ({ onCategorySelect, onLoginClick, onQuickOrder }) => (
  <section className="gf-anim-in" style={{
    position: "relative", overflow: "hidden",
    minHeight: 520,
    backgroundImage: "url(assets/banner-bg.jpg)",
    backgroundSize: "cover", backgroundPosition: "center",
    color: "#fff",
    borderBottom: "1px solid var(--gf-line)",
  }}>
    <div style={{
      position: "absolute", inset: 0,
      background: "linear-gradient(95deg, rgba(10,12,14,0.88) 0%, rgba(10,12,14,0.55) 55%, rgba(10,12,14,0.2) 100%)",
    }}/>
    <div className="gf-container" style={{position: "relative", padding: "72px 24px 64px"}}>
      <div style={{maxWidth: 720}}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 12px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          borderRadius: 100,
          fontSize: 12, fontWeight: 600,
          marginBottom: 24,
          border: "1px solid rgba(255,255,255,0.18)",
        }}>
          <span style={{width:6, height:6, borderRadius:"50%", background:"var(--gf-accent)"}}/>
          B2B alkatrész portál — viszonteladók részére
        </div>
        <h1 style={{
          fontSize: "clamp(42px, 6vw, 68px)",
          fontWeight: 800, letterSpacing: "-0.025em",
          lineHeight: 1.0, margin: 0,
          textShadow: "0 4px 32px rgba(0,0,0,0.5)",
        }}>
          Alkatrészek<br/>
          <span style={{color: "var(--gf-accent)"}}>haszongépjárműhöz.</span>
        </h1>
        <p style={{
          fontSize: 17, lineHeight: 1.55,
          color: "rgba(255,255,255,0.9)",
          maxWidth: 540, marginTop: 22, textWrap: "pretty",
        }}>
          A Gepárd-FEN Kft. 1992 óta importál és forgalmaz haszongépjármű-alkatrészeket. WESEM hivatalos magyarországi képviselete, 40+ európai gyártó portfóliójával.
        </p>
        <div style={{display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap"}}>
          <button className="gf-btn gf-btn--primary gf-btn--lg" onClick={onLoginClick}>
            <GFIcon name="user" size={16}/> Bejelentkezés / Regisztráció
          </button>
          <button className="gf-btn gf-btn--lg" onClick={() => onCategorySelect("fenyszorok")} style={{
            background: "rgba(255,255,255,0.08)",
            color: "#fff",
            borderColor: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(8px)",
          }}>
            Termékek böngészése <GFIcon name="chev-r" size={16}/>
          </button>
        </div>
        <div style={{
          display: "flex", gap: 32, marginTop: 48, flexWrap: "wrap",
          fontSize: 13, color: "rgba(255,255,255,0.85)",
        }}>
          <div style={{display: "flex", gap: 10, alignItems: "center"}}>
            <GFIcon name="shield" size={18} style={{color: "var(--gf-accent)"}}/>
            Eredeti gyártói garancia
          </div>
          <div style={{display: "flex", gap: 10, alignItems: "center"}}>
            <GFIcon name="truck-fast" size={18} style={{color: "var(--gf-accent)"}}/>
            Másnap kiszállítás
          </div>
          <div style={{display: "flex", gap: 10, alignItems: "center"}}>
            <GFIcon name="warehouse" size={18} style={{color: "var(--gf-accent)"}}/>
            Hazai raktárkészlet
          </div>
        </div>
      </div>
    </div>
    {/* sárga sarok */}
    <div style={{position: "absolute", top: 0, right: 0, width: 80, height: 80, background: "var(--gf-accent)"}}/>
    <div style={{position: "absolute", top: 80, right: 0, width: 24, height: 24, background: "var(--gf-accent)"}}/>
  </section>
);

// Vendég jelzősáv: árak rejtve
const GuestCallout = ({ onLoginClick }) => (
  <section style={{padding: "20px 0", background: "var(--gf-ink)", color: "var(--gf-bg)"}}>
    <div className="gf-container" style={{
      display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap",
    }}>
      <div style={{
        width: 36, height: 36, background: "var(--gf-accent)", color: "var(--gf-ink)",
        borderRadius: 8, display: "grid", placeItems: "center", flexShrink: 0,
      }}>
        <GFIcon name="info" size={20}/>
      </div>
      <div style={{flex: 1, minWidth: 280}}>
        <div style={{fontWeight: 700, fontSize: 14}}>B2B partneráraink kizárólag bejelentkezett viszonteladóknak láthatók.</div>
        <div style={{fontSize: 13, opacity: 0.75, marginTop: 2}}>Adószámmal regisztráljon — partnerszintje és kedvezménye 1 munkanapon belül aktiválódik.</div>
      </div>
      <button className="gf-btn gf-btn--primary gf-btn--sm" onClick={onLoginClick}>
        Bejelentkezés <GFIcon name="chev-r" size={14}/>
      </button>
    </div>
  </section>
);

// Beszállítók márkaszűrő szakasz — logókkal, mint az eredeti oldalon
const BrandFilterSection = ({ onBrandSelect }) => (
  <section style={{padding: "56px 0", background: "var(--gf-bg)"}}>
    <div className="gf-container">
      <div style={{
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        marginBottom: 24, flexWrap: "wrap", gap: 16,
      }}>
        <div>
          <div className="gf-uppercase" style={{color: "var(--gf-accent)", marginBottom: 6}}>Beszállítók / márkák</div>
          <h2 style={{fontSize: 32, fontWeight: 700, margin: 0, letterSpacing: "-0.02em"}}>Szűrés gyártó szerint</h2>
          <p style={{fontSize: 14, color: "var(--gf-muted)", marginTop: 8, maxWidth: 560}}>
            Kattintson a logóra a gyártó teljes katalógusához. Hivatalos partneri kapcsolatban állunk minden listázott márkával.
          </p>
        </div>
        <a className="gf-btn gf-btn--ghost" style={{color: "var(--gf-muted)"}}>
          Összes beszállító <GFIcon name="chev-r" size={14}/>
        </a>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 12,
      }}>
        {window.GF_BRANDS.map((b) => (
          <button
            key={b.tagId}
            onClick={() => onBrandSelect?.(b.tagId)}
            style={{
              border: "1px solid var(--gf-line)",
              background: "var(--gf-surface)",
              padding: 16,
              borderRadius: "var(--gf-radius-lg)",
              cursor: "pointer", fontFamily: "inherit",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 10,
              minHeight: 108,
              transition: "border-color .15s, transform .15s",
              position: "relative",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gf-ink)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--gf-line)"; e.currentTarget.style.transform = "none"; }}
            title={`${b.name} — ${b.role}`}
          >
            <img
              src={b.logo}
              alt={b.name}
              style={{
                maxWidth: "100%", maxHeight: 48,
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
            <div style={{
              fontSize: 10, color: "var(--gf-muted)",
              fontFamily: "var(--gf-mono)", letterSpacing: "0.06em",
            }}>{b.country}</div>
          </button>
        ))}
      </div>
    </div>
  </section>
);

// Nagy promo banner — Fristom FT-230/FT-320
const PromoBannerLarge = ({ onCategorySelect }) => (
  <section style={{padding: "32px 0"}}>
    <div className="gf-container">
      <div
        onClick={() => onCategorySelect?.("prizmak")}
        style={{
          position: "relative", overflow: "hidden", cursor: "pointer",
          borderRadius: "var(--gf-radius-lg)",
          aspectRatio: "1920 / 720",
          backgroundImage: "url(assets/banner-fristom-ft.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          border: "1px solid var(--gf-line)",
        }}
      >
        <div style={{
          position: "absolute", top: 24, right: 24,
          background: "var(--gf-accent)", color: "var(--gf-ink)",
          padding: "8px 14px", fontWeight: 700, fontSize: 12,
          letterSpacing: "0.06em", textTransform: "uppercase",
        }}>Új termék · Fristom</div>
      </div>
    </div>
  </section>
);

// Két oszlopos banner: bal = WESEM Spotlight, jobb = Steelpress
const PromoDuo = ({ onCategorySelect }) => (
  <section style={{padding: "16px 0 48px"}}>
    <div className="gf-container">
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
      }}>
        <div
          onClick={() => onCategorySelect?.("fenyszorok")}
          style={{
            position: "relative", overflow: "hidden", cursor: "pointer",
            borderRadius: "var(--gf-radius-lg)", border: "1px solid var(--gf-line)",
            aspectRatio: "16 / 9",
            backgroundImage: "url(assets/banner-homen.jpg)",
            backgroundSize: "cover", backgroundPosition: "center",
          }}
        >
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%)",
          }}/>
          <div style={{position: "absolute", left: 24, bottom: 24, color: "#fff"}}>
            <div style={{fontFamily: "var(--gf-mono)", fontSize: 11, opacity: 0.8, letterSpacing: "0.1em"}}>WESEM SPOTLIGHT</div>
            <div style={{fontSize: 26, fontWeight: 800, marginTop: 6, lineHeight: 1.1}}>Off-road LED fényhidak<br/>és pótlámpák</div>
            <button className="gf-btn gf-btn--primary gf-btn--sm" style={{marginTop: 14}}>Megnézem <GFIcon name="chev-r" size={14}/></button>
          </div>
        </div>
        <div
          onClick={() => onCategorySelect?.("vonofejek")}
          style={{
            position: "relative", overflow: "hidden", cursor: "pointer",
            borderRadius: "var(--gf-radius-lg)", border: "1px solid var(--gf-line)",
            aspectRatio: "16 / 9",
            background: "linear-gradient(135deg, #1a2942 0%, #0f1a2c 100%)",
          }}
        >
          <img src="assets/banner-marker.jpg" alt="" style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: 0.6,
            mixBlendMode: "luminosity",
          }}/>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(20,40,80,0.2) 0%, rgba(15,26,44,0.85) 100%)",
          }}/>
          <div style={{position: "absolute", left: 24, bottom: 24, color: "#fff"}}>
            <div style={{fontFamily: "var(--gf-mono)", fontSize: 11, opacity: 0.8, letterSpacing: "0.1em"}}>STEELPRESS · ÚJ TÉTEL</div>
            <div style={{fontSize: 26, fontWeight: 800, marginTop: 6, lineHeight: 1.1}}>Vonófejek &<br/>pótkocsi-mechanika</div>
            <button className="gf-btn gf-btn--primary gf-btn--sm" style={{marginTop: 14}}>Katalógus <GFIcon name="chev-r" size={14}/></button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Hosszú banner: prizmak + helyzetjelzők (testing.jpg)
const PromoBannerWide = ({ onCategorySelect }) => (
  <section style={{padding: "16px 0"}}>
    <div className="gf-container">
      <div
        onClick={() => onCategorySelect?.("prizmak")}
        style={{
          position: "relative", overflow: "hidden", cursor: "pointer",
          borderRadius: "var(--gf-radius-lg)", border: "1px solid var(--gf-line)",
          aspectRatio: "1920 / 540",
          backgroundImage: "url(assets/banner-truck-tail.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
        }}
      >
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)",
        }}/>
        <div style={{position: "absolute", left: 32, top: "50%", transform: "translateY(-50%)", color: "#fff", maxWidth: 480}}>
          <div style={{fontFamily: "var(--gf-mono)", fontSize: 11, opacity: 0.85, letterSpacing: "0.12em"}}>HASZONGÉPJÁRMŰ-VILÁGÍTÁS</div>
          <div style={{fontSize: 32, fontWeight: 800, marginTop: 8, lineHeight: 1.05}}>Hátsó lámpák, prizmák, helyzetjelzők — egy helyen.</div>
          <button className="gf-btn gf-btn--primary gf-btn--sm" style={{marginTop: 16}}>Tovább a kategóriához <GFIcon name="chev-r" size={14}/></button>
        </div>
      </div>
    </div>
  </section>
);

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
              textAlign: "left", cursor: "pointer",
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

const FeaturedRow = ({ products, partner, onAdd, onView, title, subtitle, isLoggedIn }) => (
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
          <ProductCard key={p.sku} product={p} partner={partner} onAdd={onAdd} onView={onView} isLoggedIn={isLoggedIn}/>
        ))}
      </div>
    </div>
  </section>
);

const ProductCard = ({ product: p, partner, onAdd, onView, fav, onFav, isLoggedIn }) => {
  const price = calcPrice(p, partner.tier, 1);
  const hasDisc = price.unitDisc > 0;
  return (
    <article className="gf-pcard" onClick={() => onView(p)}>
      <div className="gf-pcard__media" style={{position: "relative", aspectRatio: "1 / 1", background: "#fff", overflow: "hidden"}}>
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
        {p.image ? (
          <img src={p.image} alt={p.name} style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%", objectFit: "contain",
            padding: 16,
          }}/>
        ) : (
          <GFProductGlyph cat={p.cat} sku={p.sku}/>
        )}
      </div>
      <div className="gf-pcard__body">
        <div className="gf-pcard__brand">{p.brand} · {p.sub}</div>
        <div className="gf-pcard__name">{p.name}</div>
        <div style={{display: "flex", gap: 8, fontSize: 11, color: "var(--gf-muted)", flexWrap: "wrap"}}>
          <span className="gf-mono">Gyári: {p.factoryCode}</span>
          <span className="gf-mono">Áru: {p.sku}</span>
        </div>
        <div style={{display: "flex", justifyContent: "flex-end"}}>
          <StockBadge stock={p.stock} eta={p.eta}/>
        </div>
        <div className="gf-pcard__price-row">
          {isLoggedIn ? (
            <React.Fragment>
              <div style={{flex: 1}}>
                {hasDisc && <div className="gf-pcard__price-list">{fmtHUF(p.listPrice)}</div>}
                <div className="gf-pcard__price-net">{fmtHUF(price.unit)}</div>
                <div className="gf-pcard__price-unit">/ {p.unit} · ÁFA nélkül</div>
              </div>
              {hasDisc && (
                <span className="gf-tag gf-tag--success">−{Math.round(price.unitDisc * 100)}%</span>
              )}
            </React.Fragment>
          ) : (
            <div style={{
              flex: 1, padding: "8px 10px", borderRadius: 6,
              background: "var(--gf-surface-2)", color: "var(--gf-ink-2)",
              fontSize: 12, lineHeight: 1.35,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <GFIcon name="user" size={14}/>
              <span>Ár csak <strong>bejelentkezés</strong> után</span>
            </div>
          )}
        </div>
      </div>
      <div className="gf-pcard__actions">
        {isLoggedIn ? (
          <button
            className="gf-btn gf-btn--primary gf-btn--sm"
            disabled={p.stock === 0}
            onClick={(e) => { e.stopPropagation(); onAdd(p, p.moq); }}
          >
            <GFIcon name="cart" size={14}/> Kosárba ({p.moq})
          </button>
        ) : (
          <button
            className="gf-btn gf-btn--sm"
            onClick={(e) => { e.stopPropagation(); onView(p); }}
            style={{justifyContent: "center"}}
          >
            Részletek
          </button>
        )}
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
  <section style={{padding: "24px 0", background: "var(--gf-surface)", borderTop: "1px solid var(--gf-line)", borderBottom: "1px solid var(--gf-line)"}}>
    <div className="gf-container">
      <div style={{display: "flex", alignItems: "center", gap: 32}}>
        <div style={{flexShrink: 0, minWidth: 220}}>
          <div className="gf-uppercase" style={{color: "var(--gf-muted)", marginBottom: 4}}>Hivatalosan képviselt gyártók</div>
          <div style={{fontSize: 14, fontWeight: 600, color: "var(--gf-ink)"}}>40+ partner a piacvezető márkák közül</div>
        </div>
        <div style={{
          display: "flex", gap: 28, flex: 1, justifyContent: "space-around",
          alignItems: "center", flexWrap: "wrap",
        }}>
          {window.GF_BRANDS.slice(0, 8).map((b) => (
            <img key={b.tagId} src={b.logo} alt={b.name} title={b.name} style={{
              maxHeight: 32, maxWidth: 100, objectFit: "contain",
              opacity: 0.8, mixBlendMode: "multiply",
              transition: "opacity .15s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}
            />
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

Object.assign(window, {
  Hero, GuestHero, GuestCallout,
  BrandFilterSection, PromoBannerLarge, PromoDuo, PromoBannerWide,
  CategoryGrid, FeaturedRow, ProductCard, BrandsStrip, ValueProps,
});
