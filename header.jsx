// Gepárd-FEN B2B webshop — Header + Top bar + Nav strip

const TopBar = ({ tweaks, setTweak, partner }) => (
  <div className="gf-topbar">
    <div className="gf-topbar__inner">
      <div style={{display: "flex", gap: 18, alignItems: "center"}}>
        <a href="#"><GFIcon name="phone" size={13}/> +36 1 340 2550</a>
        <a href="#"><GFIcon name="mail" size={13}/> info@gepardfen.hu</a>
        <span style={{opacity: 0.6}}>2142 Nagytarcsa, Déri Miksa u. 4.</span>
      </div>
      <div style={{display: "flex", gap: 18, alignItems: "center"}}>
        <span style={{opacity: 0.6}}>30+ év · 40+ képviselt gyártó · WESEM hivatalos partner</span>
        <a href="#"><GFIcon name="globe" size={13}/> {tweaks.lang.toUpperCase()}</a>
        <a href="#">Katalógus letöltés</a>
      </div>
    </div>
  </div>
);

const Header = ({ tweaks, setTweak, partner, cart, onSearch, query, onCartOpen, onQuickOrder, onCategorySelect, onLogoClick, onLoginClick }) => {
  const tier = window.GF_TIERS[partner.tier];
  const isLoggedIn = partner.tier !== "guest";
  return (
    <header className="gf-header">
      <div className="gf-header__inner">
        <div className="gf-logo" onClick={onLogoClick}>
          <div className="gf-logo__mark">G·F</div>
          <div className="gf-logo__text">
            <div className="gf-logo__name">Gepárd-FEN</div>
            <div className="gf-logo__sub">B2B alkatrész portál</div>
          </div>
        </div>

        <div className="gf-search">
          <span className="gf-search__icon"><GFIcon name="search" size={18}/></span>
          <input
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Keress cikkszámra, termékre vagy gyártóra (pl. WESEM, RE.22500…)"
          />
          <div className="gf-search__cat-select">
            Minden kategória <GFIcon name="chev-d" size={14}/>
          </div>
          <button className="gf-search__btn" onClick={() => onSearch(query)}>Keresés</button>
        </div>

        <div className="gf-actions">
          <div className="gf-action" onClick={onQuickOrder} title="Gyorsrendelés cikkszám alapján">
            <GFIcon name="bolt"/>
            <span className="gf-action__label">Gyors&shy;rendelés</span>
          </div>
          <div className="gf-action" title="Kedvencek listája">
            <GFIcon name="heart"/>
            <span className="gf-action__label">Kedvencek</span>
          </div>
          <div className="gf-action" onClick={onLoginClick} title={isLoggedIn ? partner.company : "Bejelentkezés"}>
            <GFIcon name="user"/>
            <span className="gf-action__label">{isLoggedIn ? partner.company.split(" ")[0] : "Belépés"}</span>
            {isLoggedIn && (
              <span style={{
                position: "absolute", top: 4, right: 8,
                width: 8, height: 8, borderRadius: "50%",
                background: "var(--gf-success)",
              }}/>
            )}
          </div>
          <div className="gf-action" onClick={onCartOpen} title="Kosár">
            <GFIcon name="cart"/>
            <span className="gf-action__label">Kosár</span>
            {cart.length > 0 && <span className="gf-action__badge">{cart.reduce((s, i) => s + i.qty, 0)}</span>}
          </div>
        </div>
      </div>

      {isLoggedIn && (
        <div style={{
          background: "var(--gf-surface-2)",
          borderTop: "1px solid var(--gf-line)",
          padding: "8px 24px",
          fontSize: 12,
        }}>
          <div style={{
            maxWidth: 1440, margin: "0 auto",
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24,
          }}>
            <div style={{display: "flex", gap: 24, alignItems: "center"}}>
              <span style={{display: "inline-flex", alignItems: "center", gap: 6}}>
                <span style={{width:6, height:6, borderRadius:"50%", background: "var(--gf-success)"}}/>
                Bejelentkezve: <strong style={{color: "var(--gf-ink)"}}>{partner.contact}</strong> ({partner.company})
              </span>
              <span style={{color: "var(--gf-muted)"}}>Partner ID: <span className="gf-mono">{partner.partnerId}</span></span>
              <span style={{
                display: "inline-flex", gap: 6, alignItems: "center",
                padding: "2px 10px",
                background: "var(--gf-ink)", color: "var(--gf-bg)",
                borderRadius: 4, fontWeight: 600,
              }}>
                <GFIcon name="star" size={12}/> {tier.label} — {Math.round(tier.discount * 100)}% kedvezmény
              </span>
            </div>
            <div style={{display: "flex", gap: 24, color: "var(--gf-muted)"}}>
              <span>Hitelkeret: <strong className="gf-mono" style={{color: "var(--gf-ink)"}}>{fmtHUF(partner.creditLimit - partner.creditUsed)}</strong> elérhető / {fmtHUF(partner.creditLimit)}</span>
              <span>Fizetés: {partner.paymentTerms}</span>
            </div>
          </div>
        </div>
      )}

      {/* Nav strip */}
      <div className="gf-navstrip">
        <div className="gf-navstrip__inner">
          <a className="gf-navstrip__all">
            <GFIcon name="menu" size={18}/> Minden kategória
          </a>
          {window.GF_CATEGORIES.slice(0, 8).map((c) => (
            <a key={c.id} onClick={() => onCategorySelect(c.id)}>
              <GFIcon name={c.icon} size={16}/> {c.name}
            </a>
          ))}
          <a style={{marginLeft: "auto", color: "var(--gf-accent)"}}>
            <GFIcon name="bolt" size={16}/> Akciók
          </a>
        </div>
      </div>
    </header>
  );
};

Object.assign(window, { TopBar, Header });
