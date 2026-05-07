// Gepárd-FEN B2B webshop — root App komponens

const App = () => {
  // Tweak alapértékek (host által szerkesztett blokk)
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "#f5a524",
    "theme": "light",
    "density": "comfortable",
    "tier": "gold",
    "heroVariant": "split",
    "lang": "hu"
  }/*EDITMODE-END*/;

  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // App state
  const [page, setPage] = React.useState({ name: "home" });
  const [cart, setCart] = React.useState([]);
  const [favs, setFavs] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const [cartOpen, setCartOpen] = React.useState(false);
  const [quickOpen, setQuickOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  // Partner — tweakable tier
  const partner = React.useMemo(() => {
    if (tweaks.tier === "guest") {
      return { ...window.GF_SAMPLE_PARTNER, tier: "guest" };
    }
    return { ...window.GF_SAMPLE_PARTNER, tier: tweaks.tier };
  }, [tweaks.tier]);

  // Theme + density wiring
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", tweaks.theme);
    document.documentElement.setAttribute("data-density", tweaks.density);
    document.documentElement.style.setProperty("--gf-accent", tweaks.accent);
  }, [tweaks.theme, tweaks.density, tweaks.accent]);

  // Cart helpers
  const addToCart = (product, qty) => {
    setCart(c => {
      const existing = c.find(l => l.sku === product.sku);
      if (existing) {
        return c.map(l => l.sku === product.sku ? {...l, qty: l.qty + qty} : l);
      }
      return [...c, { sku: product.sku, qty }];
    });
    setToast(`${product.name} kosárba helyezve (${qty} db)`);
  };
  const updateQty = (sku, qty) => setCart(c => c.map(l => l.sku === sku ? {...l, qty} : l));
  const removeFromCart = (sku) => setCart(c => c.filter(l => l.sku !== sku));

  const toggleFav = (p) => {
    setFavs(f => f.includes(p.sku) ? f.filter(s => s !== p.sku) : [...f, p.sku]);
  };

  // Navigation
  const goHome = () => { setPage({ name: "home" }); window.scrollTo({top: 0, behavior: "smooth"}); };
  const goCategory = (catId) => { setPage({ name: "category", catId }); window.scrollTo({top: 0, behavior: "smooth"}); };
  const goProduct = (product) => { setPage({ name: "product", sku: product.sku }); window.scrollTo({top: 0, behavior: "smooth"}); };

  return (
    <div className="gf-app" data-screen-label={`01 ${page.name}`}>
      <TopBar tweaks={tweaks} setTweak={setTweak} partner={partner}/>
      <Header
        tweaks={tweaks} setTweak={setTweak} partner={partner}
        cart={cart} query={search} onSearch={setSearch}
        onCartOpen={() => setCartOpen(true)}
        onQuickOrder={() => setQuickOpen(true)}
        onCategorySelect={goCategory}
        onLogoClick={goHome}
        onLoginClick={() => setLoginOpen(true)}
      />

      {page.name === "home" && (
        <HomePage
          partner={partner}
          tweaks={tweaks}
          onCategorySelect={goCategory}
          onQuickOrder={() => setQuickOpen(true)}
          onAdd={addToCart}
          onView={goProduct}
          favs={favs}
          onFav={toggleFav}
        />
      )}
      {page.name === "category" && (
        <CategoryPage
          catId={page.catId}
          partner={partner}
          products={window.GF_PRODUCTS}
          onAdd={addToCart}
          onView={goProduct}
          onCategorySelect={goCategory}
          onLogoClick={goHome}
          favs={favs}
          onFav={toggleFav}
        />
      )}
      {page.name === "product" && (() => {
        const prod = window.GF_PRODUCTS.find(p => p.sku === page.sku);
        if (!prod) return <div style={{padding: 64}}>Termék nem található.</div>;
        return (
          <ProductPage
            product={prod}
            partner={partner}
            allProducts={window.GF_PRODUCTS}
            onAdd={addToCart}
            onLogoClick={goHome}
            onCategorySelect={goCategory}
            onView={goProduct}
            onBack={() => goCategory(prod.cat)}
          />
        );
      })()}

      <Footer/>

      {/* Floating chat */}
      <button style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 40,
        width: 56, height: 56, borderRadius: 28,
        background: "var(--gf-ink)", color: "var(--gf-accent)",
        border: "1px solid var(--gf-line-2)",
        display: "grid", placeItems: "center", cursor: "pointer",
        boxShadow: "var(--gf-shadow-lg)",
      }} title="Élő ügyintéző chat">
        <GFIcon name="chat" size={24}/>
      </button>

      {/* Modals */}
      <CartDrawer
        open={cartOpen} cart={cart} partner={partner}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onCheckout={() => { setToast("Megrendelés rögzítve — visszaigazolás emailben"); setCart([]); setCartOpen(false); }}
      />
      <QuickOrderModal
        open={quickOpen} partner={partner}
        onClose={() => setQuickOpen(false)}
        onAddBatch={(p, qty) => addToCart(p, qty)}
      />
      <LoginModal
        open={loginOpen} partner={partner}
        onClose={() => setLoginOpen(false)}
        onSelectTier={(tier) => { setTweak("tier", tier); setLoginOpen(false); setToast("Partner-szint frissítve: " + window.GF_TIERS[tier].label); }}
        onLogout={() => { setTweak("tier", "guest"); setLoginOpen(false); }}
      />

      <Toast toast={toast} onDismiss={() => setToast(null)}/>

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection title="Téma">
          <TweakRadio
            label="Mód"
            value={tweaks.theme}
            options={[
              { value: "light", label: "Világos" },
              { value: "dark", label: "Sötét" },
            ]}
            onChange={(v) => setTweak("theme", v)}
          />
          <TweakColor
            label="Akcent szín"
            value={tweaks.accent}
            options={["#f5a524", "#1e40af", "#dc2626", "#15803d", "#0f172a"]}
            onChange={(v) => setTweak("accent", v)}
          />
          <TweakRadio
            label="Sűrűség"
            value={tweaks.density}
            options={[
              { value: "comfortable", label: "Kényelmes" },
              { value: "compact", label: "Kompakt" },
            ]}
            onChange={(v) => setTweak("density", v)}
          />
        </TweakSection>

        <TweakSection title="B2B nézet">
          <TweakSelect
            label="Partner szint"
            value={tweaks.tier}
            options={[
              { value: "guest", label: "Vendég (nincs B2B)" },
              { value: "bronze", label: "Bronz partner — 8%" },
              { value: "silver", label: "Ezüst partner — 14%" },
              { value: "gold", label: "Arany partner — 22%" },
              { value: "platinum", label: "Platina partner — 30%" },
            ]}
            onChange={(v) => setTweak("tier", v)}
          />
        </TweakSection>

        <TweakSection title="Tartalom">
          <TweakRadio
            label="Hero variáns"
            value={tweaks.heroVariant}
            options={[
              { value: "split", label: "Split" },
              { value: "minimal", label: "Egyszerű" },
            ]}
            onChange={(v) => setTweak("heroVariant", v)}
          />
          <TweakRadio
            label="Nyelv"
            value={tweaks.lang}
            options={[
              { value: "hu", label: "HU" },
              { value: "en", label: "EN" },
              { value: "de", label: "DE" },
            ]}
            onChange={(v) => setTweak("lang", v)}
          />
        </TweakSection>

        <TweakSection title="Demó akciók">
          <TweakButton onClick={() => goCategory("fenyszorok")}>Ugrás kategória oldalra</TweakButton>
          <TweakButton onClick={() => goProduct(window.GF_PRODUCTS[0])}>Termékoldal megnyitása</TweakButton>
          <TweakButton onClick={() => setQuickOpen(true)}>Gyorsrendelés modal</TweakButton>
          <TweakButton onClick={() => {
            window.GF_PRODUCTS.slice(0, 3).forEach(p => addToCart(p, p.moq));
            setCartOpen(true);
          }}>Kosár demó tételekkel</TweakButton>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
};

// Home page composition
const HomePage = ({ partner, tweaks, onCategorySelect, onQuickOrder, onAdd, onView, favs, onFav }) => {
  const featured = window.GF_PRODUCTS.filter(p => p.badge === "Bestseller" || p.badge === "Akció").slice(0, 4);
  const newArrivals = window.GF_PRODUCTS.slice(4, 8);

  return (
    <main>
      <Hero tweaks={tweaks} partner={partner} onCategorySelect={onCategorySelect} onQuickOrder={onQuickOrder}/>
      <BrandsStrip/>
      <CategoryGrid onSelect={onCategorySelect}/>
      <FeaturedRow
        title="Kiemelt termékek és aktuális akciók"
        subtitle="Heti ajánlatok"
        products={featured} partner={partner}
        onAdd={onAdd} onView={onView}
      />
      <ValueProps/>
      <FeaturedRow
        title="Új beszerzések"
        subtitle="Friss raktár"
        products={newArrivals} partner={partner}
        onAdd={onAdd} onView={onView}
      />
      <CTABanner onQuickOrder={onQuickOrder}/>
    </main>
  );
};

const CTABanner = ({ onQuickOrder }) => (
  <section style={{padding: "64px 0"}}>
    <div className="gf-container">
      <div style={{
        background: "var(--gf-ink)", color: "var(--gf-bg)",
        borderRadius: "var(--gf-radius-lg)",
        padding: "48px 56px",
        display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48, alignItems: "center",
        position: "relative", overflow: "hidden",
      }}>
        <svg viewBox="0 0 600 300" preserveAspectRatio="none" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4,
        }}>
          <defs>
            <pattern id="ctagrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0H0V24" stroke="rgba(245,165,36,0.06)" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="600" height="300" fill="url(#ctagrid)"/>
        </svg>
        <div style={{position: "relative"}}>
          <div className="gf-uppercase" style={{color: "var(--gf-accent)", marginBottom: 8}}>B2B munkafolyamat</div>
          <h2 style={{
            fontSize: 38, fontWeight: 700, margin: 0, letterSpacing: "-0.02em",
            lineHeight: 1.1, textWrap: "balance",
          }}>
            Tudja a cikkszámot?<br/>
            <span style={{color: "var(--gf-accent)"}}>3 kattintás és a kosárban van.</span>
          </h2>
          <p style={{
            fontSize: 16, lineHeight: 1.55,
            color: "rgba(244, 242, 236, 0.75)",
            maxWidth: 480, marginTop: 16, textWrap: "pretty",
          }}>
            Excel-ből bemásolt rendelési listák, mentett kosarak az ismétlődő tételekhez, és cikkszám-alapú batch-rendelés. Az Ön ideje pénz — nem keresgélés.
          </p>
        </div>
        <div style={{position: "relative", display: "flex", flexDirection: "column", gap: 12}}>
          <button className="gf-btn gf-btn--primary gf-btn--lg" style={{justifyContent: "space-between", height: 56}} onClick={onQuickOrder}>
            <span style={{display: "flex", gap: 10, alignItems: "center"}}>
              <GFIcon name="bolt" size={18}/> Gyorsrendelés indítása
            </span>
            <GFIcon name="chev-r" size={18}/>
          </button>
          <button className="gf-btn gf-btn--lg" style={{
            justifyContent: "space-between", height: 56,
            background: "transparent", color: "var(--gf-bg)",
            borderColor: "rgba(244, 242, 236, 0.2)",
          }}>
            <span style={{display: "flex", gap: 10, alignItems: "center"}}>
              <GFIcon name="upload" size={18}/> Excel / CSV feltöltés
            </span>
            <GFIcon name="chev-r" size={18}/>
          </button>
          <button className="gf-btn gf-btn--lg" style={{
            justifyContent: "space-between", height: 56,
            background: "transparent", color: "var(--gf-bg)",
            borderColor: "rgba(244, 242, 236, 0.2)",
          }}>
            <span style={{display: "flex", gap: 10, alignItems: "center"}}>
              <GFIcon name="download" size={18}/> Teljes katalógus PDF
            </span>
            <GFIcon name="chev-r" size={18}/>
          </button>
        </div>
      </div>
    </div>
  </section>
);

// Mount
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
