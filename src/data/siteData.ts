// ============================================
// L.L COUVERTURE — Site Data (Static for now, will be dynamic from WP)
// ============================================

export const siteConfig = {
  businessName: "L.L COUVERTURE",
  tagline: "Charpente & Toiture",
  description:
    "Expert en couverture, charpente et toiture à Pontoise (95). Devis gratuit, intervention rapide et travail soigné.",
  phone: "06 41 26 02 59",
  phoneRaw: "+33641260259",
  phone2: "01 83 77 72 66",
  phone2Raw: "+33183777266",
  email: "livaycouverture@gmail.com",
  address: {
    street: "77 rue de l'Hermitage",
    city: "Pontoise",
    postalCode: "95300",
    region: "Île-de-France",
    country: "France",
  },
  coordinates: {
    lat: 49.0501,
    lng: 2.1007,
  },
  socialLinks: {
    facebook: "#",
    instagram: "#",
    google: "#",
  },
  businessHours: {
    weekdays: "Lun - Ven: 07:00 - 19:00",
    saturday: "Sam: 08:00 - 17:00",
    sunday: "Dim: Fermé",
  },
};

export const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Réalisations", href: "/realisations" },
  { name: "À Propos", href: "/a-propos" },
  { name: "Contact", href: "/contact" },
];

export const services = [
  {
    id: 1,
    slug: "zinguerie",
    title: "Zinguerie",
    shortDescription:
      "Expert zingueur à Pontoise — gouttières, chéneaux et solins en zinc. Pose & réparation (95). Devis gratuit sous 24h.",
    description:
      "La zinguerie est indispensable pour assurer l'étanchéité et la longévité de votre toiture. Les artisans de L.L COUVERTURE interviennent à Pontoise et (95) pour la pose, la réparation et le remplacement de vos gouttières, chéneaux, descentes d'eaux pluviales, solins et habillages en zinc. Un ouvrage soigné qui protège votre habitation des infiltrations d'eau et des dégâts liés aux intempéries. Garantie décennale. Devis gratuit sous 24h.",
    icon: "droplets",
    features: [
      "Pose et remplacement de gouttières",
      "Chéneaux et descentes en zinc",
      "Solins, noues et habillages zinc",
      "Réparation de fuites et infiltrations",
      "Entretien préventif annuel",
    ],
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80&fit=crop",
  },
  {
    id: 2,
    slug: "renovation-toiture",
    title: "Rénovation de Toiture",
    shortDescription:
      "Rénovation complète de toiture à Pontoise (95). Tuiles, ardoises, charpente et isolation. Devis gratuit sous 24h.",
    description:
      "Votre toiture est vieillissante, endommagée ou énergivore ? L.L COUVERTURE prend en charge la rénovation complète de votre toiture à Pontoise et (95). De la dépose des anciennes tuiles ou ardoises à la pose d'une nouvelle couverture, en passant par la reprise de charpente, l'isolation thermique et les finitions en zinc, nous gérons l'ensemble du chantier. Matériaux certifiés, garantie décennale et devis gratuit sans engagement.",
    icon: "roof",
    features: [
      "Remplacement de tuiles et ardoises",
      "Réfection complète de sous-toiture",
      "Isolation thermique intégrée",
      "Reprise et renforcement de charpente",
      "Traitement hydrofuge et démoussage",
    ],
    image: "https://images.unsplash.com/photo-1635424709845-3a85ad5e1f5e?w=600&q=80&fit=crop",
  },
  {
    id: 3,
    slug: "reparation-urgence",
    title: "Réparation de Fuite en Urgence",
    shortDescription:
      "Fuite de toiture en urgence à Pontoise ? Intervention rapide 7j/7 (95). Diagnostic et réparation sous 24h.",
    description:
      "Une infiltration d'eau ne peut pas attendre. L.L COUVERTURE intervient en urgence à Pontoise et (95), 7 jours sur 7, pour stopper rapidement vos fuites de toiture. Notre équipe réactive se déplace pour établir un diagnostic précis, sécuriser votre toit par un bâchage d'urgence si nécessaire, puis réaliser la réparation définitive : tuiles cassées, noue bouchée, solin décollé, chevron pourri. Nous prenons également en charge les dossiers assurance. Appelez maintenant : 06 41 26 02 59.",
    icon: "zap",
    features: [
      "Intervention sous 24h — 7j/7",
      "Diagnostic et devis sur place",
      "Bâchage d'urgence si nécessaire",
      "Réparation définitive garantie",
      "Assistance déclaration assurance",
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&fit=crop",
  },
  {
    id: 5,
    slug: "renovation-rives",
    title: "Rénovation de Rives",
    shortDescription:
      "Rénovation de rives de toiture à Pontoise (95). Remplacement de rives, bandeaux et finitions zinc. Devis gratuit sous 24h.",
    description:
      "Les rives de toiture protègent les bords du toit contre les infiltrations et les dégâts des intempéries. L.L COUVERTURE intervient à Pontoise et (95) pour la rénovation, le remplacement et l'étanchéité de vos rives en tuiles, en zinc ou en PVC. Un ouvrage essentiel pour la durabilité et l'esthétique de votre toiture. Sellettes de faîtage, bandeaux de rive et habillages : finitions soignées et durables. Devis gratuit sous 24h.",
    icon: "sparkles",
    features: [
      "Remplacement de rives en tuiles",
      "Rives et bandeaux en zinc",
      "Finitions en PVC et aluminium",
      "Étanchéité des bords de toiture",
      "Joints et sellette de faîtage",
    ],
    image: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=600&q=80&fit=crop",
  },
  {
    id: 6,
    slug: "reparation-gouttieres",
    title: "Réparation de Gouttières",
    shortDescription:
      "Réparation de gouttières à Pontoise (95). Débouchage, remplacement et entretien zinc, PVC, aluminium. Intervention rapide.",
    description:
      "Des gouttières bouchées, fissurées ou mal fixées peuvent provoquer des dégâts importants sur votre façade et vos fondations. L.L COUVERTURE intervient rapidement à Pontoise et (95) pour déboucher, réparer ou remplacer vos gouttières en zinc, PVC ou aluminium. Descentes d'eaux pluviales, joints, crochets et agrafes : nous traitons toutes les pannes. Devis gratuit sous 24h.",
    icon: "shield",
    features: [
      "Débouchage et nettoyage de gouttières",
      "Réparation de joints et fissures",
      "Remplacement de gouttières zinc/PVC",
      "Descentes et évacuations eaux pluviales",
      "Contrat entretien annuel",
    ],
    image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&q=80&fit=crop",
  },
  {
    id: 4,
    slug: "charpente-toiture",
    title: "Charpente & Toiture",
    shortDescription:
      "Charpente et toiture à Pontoise (95). Pose, rénovation et réparation de charpente bois. Garantie décennale. Devis gratuit.",
    description:
      "La charpente est la structure porteuse de votre toiture. L.L COUVERTURE réalise tous vos travaux de charpente à Pontoise (95) : charpente traditionnelle en bois massif, fermettes industrielles, surélévation de toiture, renforcement et traitement de charpente existante. Nous combinons charpenterie et couverture pour une prestation complète, de la structure au faîtage. Garantie décennale et devis gratuit sous 24h.",
    icon: "frame",
    features: [
      "Charpente traditionnelle en bois",
      "Fermettes et charpente industrielle",
      "Surélévation et agrandissement",
      "Traitement et renforcement de charpente",
      "Pose de couverture tuiles/ardoises",
    ],
    image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&q=80&fit=crop",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Pierre Martin",
    location: "Pontoise",
    rating: 5,
    text: "Excellent travail de rénovation de notre toiture. L'équipe est professionnelle, ponctuelle et le résultat est impeccable. Je recommande vivement L.L COUVERTURE !",
  },
  {
    id: 2,
    name: "Marie Dupont",
    location: "Cergy",
    rating: 5,
    text: "Intervention rapide pour une fuite urgente. Prix très raisonnable et travail soigné. Merci à toute l'équipe pour leur réactivité et leur professionnalisme.",
  },
  {
    id: 3,
    name: "Jean-Claude Bernard",
    location: "Osny",
    rating: 5,
    text: "Charpente traditionnelle réalisée dans les règles de l'art. Respect des délais et du budget annoncé. Une entreprise sérieuse et compétente.",
  },
  {
    id: 4,
    name: "Sophie Laurent",
    location: "Saint-Ouen-l'Aumône",
    rating: 5,
    text: "Démoussage et traitement hydrofuge de notre toiture. Le résultat est spectaculaire, notre toit a retrouvé son aspect d'origine. Service impeccable !",
  },
  {
    id: 5,
    name: "François Girard",
    location: "Auvers-sur-Oise",
    rating: 4,
    text: "Très satisfait de l'isolation de notre toiture. On sent déjà la différence de température. Équipe sympathique et travail propre. Je recommande.",
  },
];

export const projects = [
  {
    id: 1,
    title: "Zinguerie Complète — Gouttières Zinc",
    location: "Pontoise",
    category: "Zinguerie",
    beforeImage: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&q=80&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80&fit=crop",
    description: "Remplacement complet des gouttières et descentes en zinc sur maison individuelle à Pontoise.",
  },
  {
    id: 2,
    title: "Rénovation Toiture en Tuiles",
    location: "Cergy",
    category: "Couverture",
    beforeImage: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=80&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1635424709845-3a85ad5e1f5e?w=600&q=80&fit=crop",
    description: "Réfection complète d'une toiture vieillissante avec pose de tuiles neuves et sous-toiture.",
  },
  {
    id: 3,
    title: "Réparation Fuite d'Urgence",
    location: "Osny",
    category: "Urgence",
    beforeImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&fit=crop",
    description: "Intervention d'urgence 7j/7 pour réparation de fuite après tempête. Résultat définitif sous 24h.",
  },
  {
    id: 4,
    title: "Charpente Traditionnelle Bois",
    location: "Saint-Ouen-l'Aumône",
    category: "Charpente",
    beforeImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&q=80&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&q=80&fit=crop",
    description: "Pose d'une charpente traditionnelle en bois massif avec couverture tuiles mécaniques.",
  },
  {
    id: 5,
    title: "Rénovation des Rives de Toiture",
    location: "Auvers-sur-Oise",
    category: "Rives",
    beforeImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=600&q=80&fit=crop",
    description: "Remplacement des rives dégradées et pose de bandeaux zinc pour une finition impeccable.",
  },
  {
    id: 6,
    title: "Réparation Gouttières Zinc/PVC",
    location: "Éragny",
    category: "Gouttières",
    beforeImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&q=80&fit=crop",
    description: "Débouchage, réparation de joints et remplacement de sections endommagées sur gouttières zinc.",
  },
];

export const stats = [
  { value: 500, suffix: "+", label: "Projets Réalisés" },
  { value: 15, suffix: "+", label: "Années d'Expérience" },
  { value: 100, suffix: "%", label: "Clients Satisfaits" },
  { value: 24, suffix: "h", label: "Intervention Rapide" },
];

export const zones = [
  "Pontoise",
  "Cergy",
  "Osny",
  "Saint-Ouen-l'Aumône",
  "Auvers-sur-Oise",
  "Éragny",
  "Herblay",
  "Conflans-Sainte-Honorine",
  "Taverny",
  "Franconville",
  "L'Isle-Adam",
  "Beaumont-sur-Oise",
];
