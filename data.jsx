// Gepárd-FEN B2B webshop — adatmodell (frissítve: képek, gyári + áru cikkszám, márkalogók)

const GF_CATEGORIES = [
  { id: "fenyszorok",   name: "Fényszórók",                icon: "headlight", count: 247, sub: ["Halogén", "LED", "Munkalámpák", "Pótfények", "Vontató fényszórók"] },
  { id: "fenyhidak",    name: "Fényhidak",                 icon: "lightbar",  count: 64,  sub: ["LED fényhidak", "Halogén fényhidak", "Tartók, konzolok"] },
  { id: "vonofejek",    name: "Vonófejek",                 icon: "hitch",     count: 138, sub: ["Gömbös", "Csapos D40", "Csapos D50", "Pótkocsi vonóhorog", "Mech. alkatrészek"] },
  { id: "hengeres",     name: "Hengeres alkatrészek",      icon: "cylinder",  count: 92,  sub: ["Hidraulika hengerek", "Pneumatikus", "Tömítések"] },
  { id: "hibrid",       name: "Hibrid alkatrészek",        icon: "hybrid",    count: 41,  sub: ["Vezérlés", "Kapcsolók"] },
  { id: "rakomanyrog",  name: "Rakományrögzítők",          icon: "strap",     count: 88,  sub: ["Hevederek", "Kötelek", "Sarokvédők"] },
  { id: "prizmak",      name: "Prizmák, helyzetjelzők",    icon: "prism",     count: 156, sub: ["LED helyzetjelző", "Prizmák", "Visszajelzők"] },
  { id: "zsanerok",     name: "Zsanérok, oldalfalkapcsok", icon: "hinge",     count: 73,  sub: ["Zsanérok", "Oldalfalkapcsok", "Rögzítők"] },
  { id: "trabant",      name: "Trabant alkatrészek",       icon: "trabant",   count: 184, sub: ["Karosszéria", "Motor", "Futómű", "Elektromos"], legacy: true },
  { id: "avia",         name: "AVIA alkatrészek",          icon: "truck",     count: 122, sub: ["Karosszéria", "Motor", "Futómű"], legacy: true },
  { id: "egyebek",      name: "Egyebek",                   icon: "more",      count: 211, sub: ["Tartozékok", "Szerszámok"] },
];

// Beszállítók — címkéknél márkaszűrő szakaszhoz, logókkal
const GF_BRANDS = [
  { name: "WESEM",      country: "PL", role: "Magyarországi képviselet", logo: "assets/brand-wesem.jpg",    tagId: "wesem" },
  { name: "Tesla",      country: "CZ", role: "Partner",  logo: "assets/brand-tesla.jpg",     tagId: "tesla" },
  { name: "Fristom",    country: "PL", role: "Partner",  logo: "assets/brand-fristom.jpg",   tagId: "fristom" },
  { name: "Dasteri",    country: "GR", role: "Partner",  logo: "assets/brand-dasteri.png",   tagId: "dasteri" },
  { name: "Dobmar",     country: "PL", role: "Partner",  logo: "assets/brand-dobmar.png",    tagId: "dobmar" },
  { name: "Gamet",      country: "PL", role: "Partner",  logo: "assets/brand-gamet.png",     tagId: "gamet" },
  { name: "Hisar",      country: "TR", role: "Partner",  logo: "assets/brand-hisar.png",     tagId: "hisar" },
  { name: "Hybsz",      country: "PL", role: "Partner",  logo: "assets/brand-hybsz.png",     tagId: "hybsz" },
  { name: "Hydrotor",   country: "PL", role: "Partner",  logo: "assets/brand-hydrotor.png",  tagId: "hydrotor" },
  { name: "Sertplas",   country: "TR", role: "Partner",  logo: "assets/brand-sertplas.png",  tagId: "sertplas" },
  { name: "Simcor",     country: "TR", role: "Partner",  logo: "assets/brand-simcor.png",    tagId: "simcor" },
  { name: "Seger",      country: "TR", role: "Partner",  logo: "assets/brand-seger.jpg",     tagId: "seger" },
  { name: "Utal",       country: "PL", role: "Partner",  logo: "assets/brand-utal.jpg",      tagId: "utal" },
  { name: "Vignal",     country: "FR", role: "Partner",  logo: "assets/brand-vignal.jpg",    tagId: "vignal" },
  { name: "WAS",        country: "PL", role: "Partner",  logo: "assets/brand-was.jpg",       tagId: "was" },
  { name: "ASSO",       country: "IT", role: "Partner",  logo: "assets/brand-asso.png",      tagId: "asso" },
  { name: "1967",       country: "IT", role: "Partner",  logo: "assets/brand-1967.jpg",      tagId: "1967" },
  { name: "GMO",        country: "IT", role: "Partner",  logo: "assets/brand-gmo.jpg",       tagId: "gmo" },
];

// Termékek — gyári cikkszám (factoryCode) + áru kód (sku) külön
const GF_PRODUCTS = [
  {
    sku: "GF-3450", factoryCode: "WES0070", name: "WESEM RE.22500 munkalámpa LED 12V",
    cat: "fenyszorok", sub: "Munkalámpák", brand: "WESEM", brandTag: "wesem",
    image: "assets/prod-wesem-re22500.jpg",
    listPrice: 18900, unit: "db", moq: 1, stock: 142, eta: "Készleten", badge: "Bestseller",
    specs: { "Feszültség": "12V", "Teljesítmény": "27W", "Lumen": "1800 lm", "IP": "IP67", "Foglalat": "LED integrált" },
  },
  {
    sku: "GF-3451", factoryCode: "WES0065", name: "WESEM HM3.07000 főfényszóró H4 24V",
    cat: "fenyszorok", sub: "Halogén", brand: "WESEM", brandTag: "wesem",
    image: "assets/prod-wesem-hm3.jpg",
    listPrice: 24500, unit: "db", moq: 1, stock: 38, eta: "Készleten",
    specs: { "Feszültség": "24V", "Foglalat": "H4", "Átmérő": "Ø178 mm", "Homologizáció": "E-jel" },
  },
  {
    sku: "GF-3452", factoryCode: "WES0005", name: "WESEM RE.22510 nappali pótfény 12V",
    cat: "fenyszorok", sub: "Pótfények", brand: "WESEM", brandTag: "wesem",
    image: "assets/prod-wes0005.jpg",
    listPrice: 12400, unit: "db", moq: 1, stock: 64, eta: "Készleten",
    specs: { "Feszültség": "12V", "IP": "IP67" },
  },
  {
    sku: "GF-3453", factoryCode: "WES0019", name: "WESEM CRC2 főfényszóró 24V távolsági",
    cat: "fenyszorok", sub: "Halogén", brand: "WESEM", brandTag: "wesem",
    image: "assets/prod-wes0019.jpg",
    listPrice: 21800, unit: "db", moq: 1, stock: 18, eta: "Készleten",
    specs: { "Feszültség": "24V", "Foglalat": "H1" },
  },
  {
    sku: "GF-3454", factoryCode: "WES0024", name: "WESEM 2BC.07210 munkalámpa szögletes 35W",
    cat: "fenyszorok", sub: "Munkalámpák", brand: "WESEM", brandTag: "wesem",
    image: "assets/prod-wes0024.jpg",
    listPrice: 17600, unit: "db", moq: 1, stock: 86, eta: "Készleten",
    specs: { "Teljesítmény": "35W", "IP": "IP67" },
  },
  {
    sku: "GF-3455", factoryCode: "WES0026", name: "WESEM HOR.43800 ködlámpa szögletes",
    cat: "fenyszorok", sub: "Halogén", brand: "WESEM", brandTag: "wesem",
    image: "assets/prod-wes0026.jpg",
    listPrice: 14900, unit: "db", moq: 1, stock: 42, eta: "Készleten", badge: "Akció", discount: 12,
    specs: { "Foglalat": "H3" },
  },
  {
    sku: "GF-3456", factoryCode: "WES0038", name: "WESEM 3BC LED munkalámpa kerek 40W",
    cat: "fenyszorok", sub: "Munkalámpák", brand: "WESEM", brandTag: "wesem",
    image: "assets/prod-wes0038.jpg",
    listPrice: 28400, unit: "db", moq: 1, stock: 26, eta: "Készleten",
    specs: { "Teljesítmény": "40W", "IP": "IP69K" },
  },
  {
    sku: "GF-3457", factoryCode: "350800", name: "WESEM FERVOR LED távolsági fényszóró Ø180",
    cat: "fenyszorok", sub: "LED", brand: "WESEM", brandTag: "wesem",
    image: "assets/prod-fervor-led1.png",
    listPrice: 64200, unit: "db", moq: 1, stock: 9, eta: "Készleten", badge: "Bestseller",
    specs: { "Lumen": "4500 lm", "IP": "IP69K", "Átmérő": "Ø180 mm" },
  },
  {
    sku: "GF-3458", factoryCode: "351800", name: "WESEM LED munkalámpa kerek 6×LED 24W",
    cat: "fenyszorok", sub: "Munkalámpák", brand: "WESEM", brandTag: "wesem",
    image: "assets/prod-fervor-led2.png",
    listPrice: 18200, unit: "db", moq: 1, stock: 124, eta: "Készleten",
    specs: { "Teljesítmény": "24W", "Lumen": "2160 lm", "IP": "IP67" },
  },
  {
    sku: "GF-3459", factoryCode: "WES-LED-RND", name: "WESEM kerek LED fényszóró 5\"",
    cat: "fenyszorok", sub: "LED", brand: "WESEM", brandTag: "wesem",
    image: "assets/prod-led-round.png",
    listPrice: 32800, unit: "db", moq: 1, stock: 31, eta: "Készleten",
    specs: { "Átmérő": "127 mm", "Feszültség": "12/24V" },
  },
  {
    sku: "GF-2710", factoryCode: "FT-272", name: "Fristom FT-272 LED helyzetjelző sárga",
    cat: "prizmak", sub: "LED helyzetjelző", brand: "Fristom", brandTag: "fristom",
    image: "assets/prod-000270.png",
    listPrice: 3450, unit: "db", moq: 2, stock: 612, eta: "Készleten", badge: "Akció", discount: 15,
    specs: { "Feszültség": "12-24V", "Szín": "Borostyán", "IP": "IP68" },
  },
  {
    sku: "GF-2711", factoryCode: "DAS0104", name: "Dasteri DSL-1040 hátsó kombinált lámpa",
    cat: "prizmak", sub: "Visszajelzők", brand: "Dasteri", brandTag: "dasteri",
    image: "assets/prod-das0104.jpg",
    listPrice: 8900, unit: "db", moq: 1, stock: 88, eta: "Készleten",
    specs: { "Feszültség": "12/24V" },
  },
  {
    sku: "GF-2712", factoryCode: "DAS0274", name: "Dasteri DSL-2740 LED szélességjelző",
    cat: "prizmak", sub: "LED helyzetjelző", brand: "Dasteri", brandTag: "dasteri",
    image: "assets/prod-das0274.jpg",
    listPrice: 4200, unit: "db", moq: 2, stock: 240, eta: "Készleten",
    specs: { "Feszültség": "12-24V", "IP": "IP67" },
  },
  {
    sku: "GF-1820", factoryCode: "POL-VFD50", name: "POLMO Vonófej D50 csapos 40t",
    cat: "vonofejek", sub: "Csapos D50", brand: "POLMO", brandTag: "polmo",
    image: null,
    listPrice: 89400, unit: "db", moq: 1, stock: 7, eta: "Készleten",
    specs: { "Csaptípus": "D50", "Húzóerő": "40 t" },
  },
];

const GF_TIERS = {
  guest:    { label: "Vendég",          discount: 0,    color: "#94a3b8" },
  bronze:   { label: "Bronz partner",   discount: 0.08, color: "#b45309" },
  silver:   { label: "Ezüst partner",   discount: 0.14, color: "#64748b" },
  gold:     { label: "Arany partner",   discount: 0.22, color: "#d97706" },
  platinum: { label: "Platina partner", discount: 0.30, color: "#0f172a" },
};

const GF_QTY_TIERS = [
  { from: 1, extra: 0 },
  { from: 5, extra: 0.03 },
  { from: 20, extra: 0.06 },
  { from: 50, extra: 0.10 },
];

const GF_SAMPLE_PARTNER = {
  company: "AutóTechnik Bt.",
  contact: "Kovács Péter",
  email: "kovacs.peter@autotechnik.hu",
  partnerId: "P-2189",
  tier: "gold",
  creditLimit: 2_500_000,
  creditUsed: 412_300,
  paymentTerms: "Nettó 30 nap",
  recentOrders: 47,
};

Object.assign(window, {
  GF_CATEGORIES, GF_BRANDS, GF_PRODUCTS, GF_TIERS, GF_QTY_TIERS, GF_SAMPLE_PARTNER,
});
