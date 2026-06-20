// Tunisian cities and airports for the transfer agency booking system

export interface Location {
  id: string;
  name: string;
  type: "city" | "airport";
  airportCode?: string;
  region: string;
}

export const LOCATIONS: Location[] = [
  // Airports
  { id: "TUN", name: "Aéroport Tunis-Carthage (TUN)", type: "airport", airportCode: "TUN", region: "Tunis" },
  { id: "MIR", name: "Aéroport Monastir Habib Bourguiba (MIR)", type: "airport", airportCode: "MIR", region: "Monastir" },
  { id: "DJE", name: "Aéroport Djerba-Zarzis (DJE)", type: "airport", airportCode: "DJE", region: "Djerba" },
  { id: "SFA", name: "Aéroport Sfax-Thyna (SFA)", type: "airport", airportCode: "SFA", region: "Sfax" },
  { id: "TOE", name: "Aéroport Tozeur-Nefta (TOE)", type: "airport", airportCode: "TOE", region: "Tozeur" },
  { id: "TBJ", name: "Aéroport Tabarka-Aïn Draham (TBJ)", type: "airport", airportCode: "TBJ", region: "Tabarka" },
  { id: "GAF", name: "Aéroport Gafsa-Ksar (GAF)", type: "airport", airportCode: "GAF", region: "Gafsa" },

  // Cities — Grand Tunis
  { id: "tunis", name: "Tunis (Centre-Ville)", type: "city", region: "Tunis" },
  { id: "ariana", name: "Ariana", type: "city", region: "Grand Tunis" },
  { id: "la-marsa", name: "La Marsa", type: "city", region: "Grand Tunis" },
  { id: "carthage", name: "Carthage", type: "city", region: "Grand Tunis" },
  { id: "sidi-bou-said", name: "Sidi Bou Saïd", type: "city", region: "Grand Tunis" },
  { id: "ben-arous", name: "Ben Arous", type: "city", region: "Grand Tunis" },
  { id: "manouba", name: "Manouba", type: "city", region: "Grand Tunis" },

  // North
  { id: "bizerte", name: "Bizerte", type: "city", region: "Nord" },
  { id: "nabeul", name: "Nabeul", type: "city", region: "Nord-Est" },
  { id: "hammamet", name: "Hammamet", type: "city", region: "Nord-Est" },
  { id: "kelibia", name: "Kélibia", type: "city", region: "Nord-Est" },
  { id: "jendouba", name: "Jendouba", type: "city", region: "Nord-Ouest" },
  { id: "tabarka", name: "Tabarka", type: "city", region: "Nord-Ouest" },
  { id: "beja", name: "Béja", type: "city", region: "Nord-Ouest" },
  { id: "siliana", name: "Siliana", type: "city", region: "Nord-Ouest" },
  { id: "el-kef", name: "Le Kef", type: "city", region: "Nord-Ouest" },

  // Centre
  { id: "sousse", name: "Sousse", type: "city", region: "Centre-Est" },
  { id: "monastir", name: "Monastir", type: "city", region: "Centre-Est" },
  { id: "mahdia", name: "Mahdia", type: "city", region: "Centre-Est" },
  { id: "kairouan", name: "Kairouan", type: "city", region: "Centre" },
  { id: "kasserine", name: "Kasserine", type: "city", region: "Centre-Ouest" },
  { id: "sidi-bouzid", name: "Sidi Bouzid", type: "city", region: "Centre" },

  // Sud
  { id: "sfax", name: "Sfax", type: "city", region: "Sud" },
  { id: "gabes", name: "Gabès", type: "city", region: "Sud" },
  { id: "medenine", name: "Médenine", type: "city", region: "Sud" },
  { id: "tataouine", name: "Tataouine", type: "city", region: "Extrême-Sud" },
  { id: "djerba", name: "Djerba (Houmt Souk)", type: "city", region: "Sud" },
  { id: "zarzis", name: "Zarzis", type: "city", region: "Sud" },
  { id: "tozeur", name: "Tozeur", type: "city", region: "Sud-Ouest" },
  { id: "kebili", name: "Kébili", type: "city", region: "Sud-Ouest" },
  { id: "gafsa", name: "Gafsa", type: "city", region: "Sud-Ouest" },
];

// Approximate distances in km between key location pairs
// Used for price estimation
const DISTANCES: Record<string, number> = {
  "TUN-sousse": 140,
  "TUN-monastir": 160,
  "TUN-hammamet": 65,
  "TUN-nabeul": 70,
  "TUN-bizerte": 65,
  "TUN-MIR": 160,
  "TUN-sfax": 270,
  "TUN-SFA": 270,
  "TUN-kairouan": 155,
  "TUN-gabes": 360,
  "TUN-medenine": 450,
  "TUN-djerba": 500,
  "TUN-DJE": 500,
  "TUN-tozeur": 440,
  "TUN-TOE": 440,
  "TUN-tataouine": 530,
  "TUN-zarzis": 500,
  "TUN-jendouba": 160,
  "TUN-TBJ": 190,
  "TUN-el-kef": 175,
  "TUN-siliana": 140,
  "TUN-beja": 105,
  "TUN-gafsa": 340,
  "TUN-GAF": 340,
  "TUN-kasserine": 260,
  "TUN-sidi-bouzid": 270,
  "TUN-mahdia": 200,
  "TUN-kelibia": 110,
  "TUN-ariana": 10,
  "TUN-la-marsa": 18,
  "TUN-ben-arous": 12,
  "TUN-manouba": 15,
  "TUN-sidi-bou-said": 20,
  "TUN-carthage": 16,
  "MIR-sousse": 20,
  "MIR-monastir": 8,
  "MIR-mahdia": 45,
  "MIR-sfax": 115,
  "MIR-hammamet": 100,
  "MIR-tunis": 160,
  "DJE-medenine": 60,
  "DJE-gabes": 90,
  "DJE-sfax": 200,
  "DJE-tozeur": 250,
  "DJE-zarzis": 80,
  "SFA-sousse": 130,
  "SFA-gabes": 95,
  "SFA-mahdia": 80,
  "SFA-kairouan": 120,
  "sousse-monastir": 20,
  "sousse-mahdia": 70,
  "sousse-hammamet": 80,
  "sousse-kairouan": 60,
  "sousse-sfax": 130,
  "gabes-medenine": 75,
  "gabes-tozeur": 200,
  "gabes-sfax": 95,
};

export function getDistance(from: string, to: string): number {
  const key1 = `${from}-${to}`;
  const key2 = `${to}-${from}`;
  return DISTANCES[key1] ?? DISTANCES[key2] ?? estimateDistance(from, to);
}

// Fallback: estimate based on region proximity
function estimateDistance(from: string, to: string): number {
  const fromLoc = LOCATIONS.find((l) => l.id === from);
  const toLoc = LOCATIONS.find((l) => l.id === to);
  if (!fromLoc || !toLoc) return 300; // default

  if (fromLoc.region === toLoc.region) return 25;
  const regionDistances: Record<string, Record<string, number>> = {
    "Tunis": { "Nord": 80, "Nord-Est": 70, "Nord-Ouest": 150, "Centre-Est": 155, "Centre": 200, "Centre-Ouest": 280, "Sud": 280, "Sud-Ouest": 450, "Extrême-Sud": 540, "Grand Tunis": 15 },
    "Nord": { "Nord-Est": 100, "Nord-Ouest": 90, "Centre-Est": 200, "Centre": 250, "Sud": 380 },
    "Nord-Est": { "Centre-Est": 90, "Centre": 150 },
    "Centre-Est": { "Centre": 80, "Sud": 150, "Centre-Ouest": 200 },
    "Centre": { "Sud": 200, "Sud-Ouest": 250 },
    "Sud": { "Sud-Ouest": 250, "Extrême-Sud": 100 },
  };

  const fromRegion = fromLoc.region;
  const toRegion = toLoc.region;
  return regionDistances[fromRegion]?.[toRegion] ?? regionDistances[toRegion]?.[fromRegion] ?? 300;
}

export function getLocationName(id: string): string {
  return LOCATIONS.find((l) => l.id === id)?.name ?? id;
}

export const AIRPORTS = LOCATIONS.filter((l) => l.type === "airport");
export const CITIES = LOCATIONS.filter((l) => l.type === "city");
