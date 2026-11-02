export type Speaker = {
  name: string;
  title: string;
  org: string;
  image: string;
  featured?: boolean;
};

export type Host = {
  name: string;
  logo: string;
  events: number;
  followers: number;
};

export type EventItem = {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  city: string;
  venue: string;
  address: string;
  start: string;
  end: string;
  price: number;
  priceSuffix?: string;
  gst?: boolean;
  thumbnail: string;
  banner: string;
  featured?: boolean;
  bannerAccent?: string;
  description: string[];
  theme?: string;
  speakers: Speaker[];
  host: Host;
  eventId: number;
  lat: number;
  lng: number;
  tickets: { name: string; price: number; note?: string }[];
};

export const CITIES = [
  "Bengaluru",
  "Mumbai",
  "Hyderabad",
  "Chennai",
  "Delhi",
  "Pune",
  "Ahmedabad",
  "Goa",
  "Kochi",
  "Jaipur",
  "Gurgaon",
  "Kolkata",
] as const;

export const CATEGORIES = [
  "Expo",
  "Summit",
  "Site Visit",
  "Networking",
  "Awards",
  "Workshop",
  "Launch",
] as const;

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const person = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&h=400&q=80`;

export const events: EventItem[] = [
  {
    slug: "bangalore-real-estate-summit-2026",
    title: "Bangalore Real Estate Summit 2026",
    subtitle: "India's Premier Property Conclave",
    category: "Summit",
    city: "Bengaluru",
    venue: "Sterling's Mac Hotel Bengaluru",
    address:
      "134 HAL Old Airport Road, Konena Agrahara, Bengaluru, Karnataka, India - 560017",
    start: "2026-12-12T09:30:00+05:30",
    end: "2026-12-12T17:30:00+05:30",
    price: 9000,
    gst: true,
    thumbnail: img("photo-1486406146926-c627a92ad1ab", 800),
    banner: img("photo-1486406146926-c627a92ad1ab", 1800),
    featured: true,
    bannerAccent: "#0b1b4a",
    theme: "Realty 2030 — Build, Invest, Belong",
    eventId: 101,
    lat: 12.9584,
    lng: 77.6581,
    tickets: [
      { name: "Delegate Pass", price: 9000, note: "Includes lunch & high tea" },
      { name: "VIP Pass", price: 18000, note: "Front row + networking dinner" },
      { name: "Developer Booth", price: 45000, note: "Exhibition stall" },
    ],
    description: [
      "Welcome to Bangalore Real Estate Summit 2026: Realty 2030 — Build, Invest, Belong",
      "Bengaluru's skyline is being rewritten. Join India's top developers, investors, brokers and policy leaders as they unpack housing demand, REIT growth, plotted development, luxury villas and the next decade of commercial real estate. From Whitefield to Electronic City, this summit turns market noise into a clear playbook for buyers and sellers.",
      "Expect keynotes on affordable housing, NRI investment corridors, RERA compliance, green buildings and AI-led lead generation. Network with 80+ exhibitors, tour curated project showcases and walk away with site-visit slots for the city's most watched launches.",
    ],
    speakers: [
      {
        name: "Ananya Rao",
        title: "Managing Director",
        org: "Prestige Group",
        image: person("photo-1573496359142-b8d87734a5a2"),
        featured: true,
      },
      {
        name: "Vikram Mehta",
        title: "CEO",
        org: "Embassy Developments",
        image: person("photo-1560250097-0b93528c311a"),
        featured: true,
      },
      {
        name: "Priya Nair",
        title: "Head of Investments",
        org: "HDFC Capital",
        image: person("photo-1580489944761-15a19d654956"),
        featured: true,
      },
      {
        name: "Rohit Khanna",
        title: "National Director",
        org: "JLL India",
        image: person("photo-1472099645785-5658abf4ff4e"),
      },
      {
        name: "Sana Qureshi",
        title: "Founder",
        org: "UrbanNest Advisors",
        image: person("photo-1544005313-94ddf0286df2"),
      },
      {
        name: "Arjun Desai",
        title: "Partner, Real Estate",
        org: "Trilegal",
        image: person("photo-1507003211169-0a1dd7228f2d"),
      },
      {
        name: "Meera Iyer",
        title: "Chief Planner",
        org: "BDA",
        image: person("photo-1438761681033-6461ffad8d80"),
      },
      {
        name: "Nikhil Bansal",
        title: "VP, Housing Finance",
        org: "ICICI Bank",
        image: person("photo-1519085360753-af0119f7cbe7"),
      },
    ],
    host: {
      name: "India Realty Forum",
      logo: img("photo-1560179707-f14e90ef3623", 200),
      events: 18,
      followers: 1420,
    },
  },
  {
    slug: "mumbai-property-expo-2026",
    title: "Mumbai Property Expo 2026",
    subtitle: "Coastal Luxury & High-Rise Living",
    category: "Expo",
    city: "Mumbai",
    venue: "Jio World Convention Centre",
    address: "Bandra Kurla Complex, Mumbai, Maharashtra - 400051",
    start: "2026-11-21T10:00:00+05:30",
    end: "2026-11-22T19:00:00+05:30",
    price: 499,
    priceSuffix: " onwards",
    gst: true,
    thumbnail: img("photo-1545324418-cc1a3fa10c00", 800),
    banner: img("photo-1545324418-cc1a3fa10c00", 1800),
    featured: true,
    theme: "Sea-facing. Sky-high. Sold out.",
    eventId: 102,
    lat: 19.065,
    lng: 72.868,
    tickets: [
      { name: "Visitor Pass", price: 499 },
      { name: "Investor Lounge", price: 2999 },
    ],
    description: [
      "Walk through 120+ residential, commercial and plotted projects from MMR's leading developers.",
      "From Worli sea-face penthouses to Navi Mumbai townships, compare inventories, book at expo-only prices and meet channel partners in one weekend.",
    ],
    speakers: [
      {
        name: "Karan Malhotra",
        title: "Director",
        org: "Lodha Group",
        image: person("photo-1507003211169-0a1dd7228f2d"),
        featured: true,
      },
      {
        name: "Rhea Kapoor",
        title: "Head of Sales",
        org: "Godrej Properties",
        image: person("photo-1487412720507-e7ab37603c6f"),
      },
    ],
    host: {
      name: "MMR Property Council",
      logo: img("photo-1486406146926-c627a92ad1ab", 200),
      events: 9,
      followers: 880,
    },
  },
  {
    slug: "hyderabad-luxury-homes-showcase",
    title: "Hyderabad Luxury Homes Showcase",
    category: "Launch",
    city: "Hyderabad",
    venue: "HICC Novotel",
    address: "Cyberabad, Hyderabad, Telangana - 500081",
    start: "2026-11-28T11:00:00+05:30",
    end: "2026-11-28T18:00:00+05:30",
    price: 0,
    thumbnail: img("photo-1600585154340-be6161a56a0c", 800),
    banner: img("photo-1600585154340-be6161a56a0c", 1800),
    eventId: 103,
    lat: 17.448,
    lng: 78.381,
    tickets: [{ name: "Invite Pass", price: 0, note: "Free with registration" }],
    description: [
      "A curated evening of villa, gated-community and penthouse launches across Gachibowli, Kokapet and Shamshabad.",
    ],
    speakers: [
      {
        name: "Sandeep Reddy",
        title: "CMD",
        org: "My Home Constructions",
        image: person("photo-1506794778202-cad84cf45f1d"),
        featured: true,
      },
    ],
    host: {
      name: "Deccan Realty Club",
      logo: img("photo-1600596542815-ffad4c1539a9", 200),
      events: 6,
      followers: 410,
    },
  },
  {
    slug: "pune-nri-housing-conclave",
    title: "Pune NRI Housing Conclave 2026",
    category: "Summit",
    city: "Pune",
    venue: "The Westin Pune Koregaon Park",
    address: "36/3-B Koregaon Park Annexe, Mundhwa Road, Pune - 411001",
    start: "2026-12-05T09:00:00+05:30",
    end: "2026-12-05T16:30:00+05:30",
    price: 3500,
    gst: true,
    thumbnail: img("photo-1512917774080-9991f1c4c750", 800),
    banner: img("photo-1512917774080-9991f1c4c750", 1800),
    eventId: 104,
    lat: 18.5362,
    lng: 73.893,
    tickets: [
      { name: "NRI Delegate", price: 3500 },
      { name: "Virtual Pass", price: 1499 },
    ],
    description: [
      "Built for overseas Indians buying in Pune. FEMA, home loans, rental yields and township tours in one day.",
    ],
    speakers: [
      {
        name: "Neha Kulkarni",
        title: "Head, NRI Banking",
        org: "Axis Bank",
        image: person("photo-1594744803329-e58b31de8bf5"),
        featured: true,
      },
    ],
    host: {
      name: "Pune Realtors Association",
      logo: img("photo-1560518883-ce09059eeffa", 200),
      events: 11,
      followers: 640,
    },
  },
  {
    slug: "delhi-ncr-realty-awards-2026",
    title: "Delhi-NCR Realty Awards 2026",
    category: "Awards",
    city: "Delhi",
    venue: "The Lalit New Delhi",
    address: "Barakhamba Avenue, Connaught Place, New Delhi - 110001",
    start: "2026-12-19T18:00:00+05:30",
    end: "2026-12-19T22:30:00+05:30",
    price: 7500,
    gst: true,
    thumbnail: img("photo-1582407947304-fd86f028f716", 800),
    banner: img("photo-1582407947304-fd86f028f716", 1800),
    eventId: 105,
    lat: 28.631,
    lng: 77.227,
    tickets: [
      { name: "Awards Night", price: 7500, note: "Black tie · plated dinner" },
    ],
    description: [
      "Celebrate the year's most iconic projects, channel partners and sustainability stories across Delhi-NCR.",
    ],
    speakers: [
      {
        name: "Aditi Sharma",
        title: "Editor",
        org: "Realty Today",
        image: person("photo-1534528741775-53994a69daeb"),
        featured: true,
      },
    ],
    host: {
      name: "NCR Developers Guild",
      logo: img("photo-1460317442991-0ec209397118", 200),
      events: 4,
      followers: 2100,
    },
  },
  {
    slug: "chennai-affordable-housing-forum",
    title: "Chennai Affordable Housing Forum",
    category: "Summit",
    city: "Chennai",
    venue: "ITC Grand Chola",
    address: "63 Anna Salai, Guindy, Chennai - 600032",
    start: "2026-11-15T09:30:00+05:30",
    end: "2026-11-15T17:00:00+05:30",
    price: 2500,
    gst: true,
    thumbnail: img("photo-1570129477492-45c003edd2be", 800),
    banner: img("photo-1570129477492-45c003edd2be", 1800),
    eventId: 106,
    lat: 13.0108,
    lng: 80.2206,
    tickets: [{ name: "Forum Pass", price: 2500 }],
    description: [
      "Policy, PMAY, plotted layouts and mid-income apartments south of Chennai — with live inventory from 40 developers.",
    ],
    speakers: [
      {
        name: "Karthik Subramanian",
        title: "Director",
        org: "Casagrand",
        image: person("photo-1492562080023-ab3db95bfbce"),
        featured: true,
      },
    ],
    host: {
      name: "Tamil Nadu Housing Network",
      logo: img("photo-1502672260266-1c1ef2d93688", 200),
      events: 7,
      followers: 390,
    },
  },
  {
    slug: "goa-villa-investment-summit",
    title: "Goa Villa Investment Summit",
    category: "Networking",
    city: "Goa",
    venue: "Grand Hyatt Goa",
    address: "Bambolim Beach, North Goa - 403206",
    start: "2026-12-06T16:00:00+05:30",
    end: "2026-12-07T13:00:00+05:30",
    price: 12000,
    gst: true,
    thumbnail: img("photo-1613490493576-7fde63acd811", 800),
    banner: img("photo-1613490493576-7fde63acd811", 1800),
    featured: true,
    eventId: 107,
    lat: 15.463,
    lng: 73.855,
    tickets: [
      { name: "Summit + Stay", price: 12000, note: "Includes brunch" },
    ],
    description: [
      "Second-home and hospitality-asset investing in North and South Goa, with beachfront inventory tours on day two.",
    ],
    speakers: [
      {
        name: "Isabel D'Souza",
        title: "Principal",
        org: "Coastal Estates",
        image: person("photo-1524504388940-b1c1722653e1"),
        featured: true,
      },
    ],
    host: {
      name: "Goa Property Circle",
      logo: img("photo-1600607687939-ce8a6c25118c", 200),
      events: 5,
      followers: 270,
    },
  },
  {
    slug: "ahmedabad-smart-city-expo",
    title: "Ahmedabad Smart City Expo",
    category: "Expo",
    city: "Ahmedabad",
    venue: "Mahatma Mandir Convention Centre",
    address: "Sector 13, Gandhinagar, Gujarat - 382016",
    start: "2026-11-14T10:00:00+05:30",
    end: "2026-11-15T18:00:00+05:30",
    price: 199,
    priceSuffix: " onwards",
    thumbnail: img("photo-1479839672679-a46483c0e07c", 800),
    banner: img("photo-1479839672679-a46483c0e07c", 1800),
    eventId: 108,
    lat: 23.2156,
    lng: 72.6369,
    tickets: [{ name: "Expo Entry", price: 199 }],
    description: [
      "Smart townships, GIFT City offices and industrial parks — the Gujarat growth story, mapped for buyers.",
    ],
    speakers: [
      {
        name: "Hardik Patel",
        title: "VP Sales",
        org: "Adani Realty",
        image: person("photo-1507591064344-4c6ce005b128"),
        featured: true,
      },
    ],
    host: {
      name: "Gujarat Infra Forum",
      logo: img("photo-1486325212027-8081e485255e", 200),
      events: 8,
      followers: 510,
    },
  },
  {
    slug: "bengaluru-whitefield-site-visit-weekend",
    title: "Whitefield Site Visit Weekend",
    category: "Site Visit",
    city: "Bengaluru",
    venue: "Whitefield Transit Hub",
    address: "ITPL Main Road, Whitefield, Bengaluru - 560066",
    start: "2026-11-15T08:00:00+05:30",
    end: "2026-11-16T14:00:00+05:30",
    price: 0,
    thumbnail: img("photo-1564013799919-ab600027ffc6", 800),
    banner: img("photo-1564013799919-ab600027ffc6", 1800),
    eventId: 109,
    lat: 12.9698,
    lng: 77.7499,
    tickets: [{ name: "Site Visit Seat", price: 0, note: "Shuttle included" }],
    description: [
      "A guided weekend of 8 project walkthroughs across Whitefield, Hope Farm and Varthur — apartments, villas and plots.",
    ],
    speakers: [
      {
        name: "Lakshmi Prasad",
        title: "Channel Head",
        org: "Sobha Limited",
        image: person("photo-1580489944761-15a19d654956"),
        featured: true,
      },
    ],
    host: {
      name: "BuyersEdge Walks",
      logo: img("photo-1560518883-ce09059eeffa", 200),
      events: 22,
      followers: 980,
    },
  },
  {
    slug: "gurgaon-commercial-real-estate-forum",
    title: "Gurgaon Commercial Real Estate Forum",
    category: "Workshop",
    city: "Gurgaon",
    venue: "Leela Ambience Gurugram",
    address: "Ambience Island, NH-8, Gurugram - 122002",
    start: "2026-12-04T09:00:00+05:30",
    end: "2026-12-04T17:00:00+05:30",
    price: 5999,
    gst: true,
    thumbnail: img("photo-1497366216548-37526070297c", 800),
    banner: img("photo-1497366216548-37526070297c", 1800),
    eventId: 110,
    lat: 28.505,
    lng: 77.097,
    tickets: [{ name: "Workshop Pass", price: 5999 }],
    description: [
      "Office, warehousing and Grade-A yield math for Golf Course Road, Cyber City and Dwarka Expressway.",
    ],
    speakers: [
      {
        name: "Rahul Bhatia",
        title: "Markets Lead",
        org: "CBRE India",
        image: person("photo-1519085360753-af0119f7cbe7"),
        featured: true,
      },
    ],
    host: {
      name: "CRE Roundtable",
      logo: img("photo-1486406146926-c627a92ad1ab", 200),
      events: 14,
      followers: 760,
    },
  },
  {
    slug: "kochi-coastal-properties-meet",
    title: "Kochi Coastal Properties Meet",
    category: "Networking",
    city: "Kochi",
    venue: "Grand Hyatt Kochi Bolgatty",
    address: "Bolgatty Island, Kochi, Kerala - 682504",
    start: "2026-11-29T15:00:00+05:30",
    end: "2026-11-29T20:00:00+05:30",
    price: 1500,
    thumbnail: img("photo-1600585154526-990dced4db0d", 800),
    banner: img("photo-1600585154526-990dced4db0d", 1800),
    eventId: 111,
    lat: 9.998,
    lng: 76.267,
    tickets: [{ name: "Evening Meet", price: 1500 }],
    description: [
      "Waterfront apartments, marina plots and holiday homes along Kochi, Vypin and Alleppey — with sunset networking.",
    ],
    speakers: [
      {
        name: "Anjali Menon",
        title: "Founder",
        org: "Malabar Homes",
        image: person("photo-1544005313-94ddf0286df2"),
        featured: true,
      },
    ],
    host: {
      name: "Kerala Realtors",
      logo: img("photo-1600596542815-ffad4c1539a9", 200),
      events: 3,
      followers: 190,
    },
  },
  {
    slug: "jaipur-heritage-homes-fair",
    title: "Jaipur Heritage Homes Fair",
    category: "Expo",
    city: "Jaipur",
    venue: "Jaipur Exhibition & Convention Centre",
    address: "Sitapura Industrial Area, Jaipur, Rajasthan - 302022",
    start: "2026-12-13T10:00:00+05:30",
    end: "2026-12-14T18:00:00+05:30",
    price: 299,
    priceSuffix: " onwards",
    thumbnail: img("photo-1524492412937-b28074a5d7c5", 800),
    banner: img("photo-1524492412937-b28074a5d7c5", 1800),
    eventId: 112,
    lat: 26.785,
    lng: 75.838,
    tickets: [{ name: "Fair Entry", price: 299 }],
    description: [
      "Havelis, plotted schemes and new-age townships around Jaipur, with a heritage restoration clinic on day two.",
    ],
    speakers: [
      {
        name: "Rajveer Singh",
        title: "Principal Architect",
        org: "Pink City Studio",
        image: person("photo-1507003211169-0a1dd7228f2d"),
        featured: true,
      },
    ],
    host: {
      name: "Rajasthan Property Board",
      logo: img("photo-1460317442991-0ec209397118", 200),
      events: 2,
      followers: 150,
    },
  },
  {
    slug: "electronic-city-housing-expo",
    title: "Electronic City Housing Expo",
    category: "Expo",
    city: "Bengaluru",
    venue: "E-City Club Convention",
    address: "Electronic City Phase 1, Bengaluru - 560100",
    start: "2026-11-22T10:00:00+05:30",
    end: "2026-11-23T18:00:00+05:30",
    price: 199,
    priceSuffix: " onwards",
    thumbnail: img("photo-1460317442991-0ec209397118", 800),
    banner: img("photo-1460317442991-0ec209397118", 1800),
    eventId: 113,
    lat: 12.8458,
    lng: 77.665,
    tickets: [{ name: "Visitor Pass", price: 199 }],
    description: [
      "Apartments, plotted layouts and co-living inventory south of Bengaluru, with on-spot home-loan desks.",
    ],
    speakers: [
      {
        name: "Deepa Krishnan",
        title: "Sales Director",
        org: "Puravankara",
        image: person("photo-1573496359142-b8d87734a5a2"),
        featured: true,
      },
    ],
    host: {
      name: "South Bengaluru Realtors",
      logo: img("photo-1545324418-cc1a3fa10c00", 200),
      events: 5,
      followers: 320,
    },
  },
  {
    slug: "north-bengaluru-township-preview",
    title: "North Bengaluru Township Preview",
    category: "Launch",
    city: "Bengaluru",
    venue: "Manyata Tech Park Lawn",
    address: "Nagawara, Bengaluru - 560045",
    start: "2026-12-02T16:00:00+05:30",
    end: "2026-12-02T20:00:00+05:30",
    price: 0,
    thumbnail: img("photo-1600596542815-ffad4c1539a9", 800),
    banner: img("photo-1600596542815-ffad4c1539a9", 1800),
    eventId: 114,
    lat: 13.047,
    lng: 77.62,
    tickets: [{ name: "Preview Invite", price: 0 }],
    description: [
      "First look at integrated townships along the airport corridor — villas, schools and retail streets.",
    ],
    speakers: [
      {
        name: "Gaurav Jain",
        title: "Project Head",
        org: "Brigade Group",
        image: person("photo-1560250097-0b93528c311a"),
        featured: true,
      },
    ],
    host: {
      name: "Airport Corridor Collective",
      logo: img("photo-1600585154340-be6161a56a0c", 200),
      events: 3,
      followers: 210,
    },
  },
  {
    slug: "realty-tech-meetup-bengaluru",
    title: "Realty Tech Meetup Bengaluru",
    category: "Workshop",
    city: "Bengaluru",
    venue: "WeWork Galaxy",
    address: "Residency Road, Bengaluru - 560025",
    start: "2026-11-18T18:00:00+05:30",
    end: "2026-11-18T21:00:00+05:30",
    price: 799,
    thumbnail: img("photo-1497366216548-37526070297c", 800),
    banner: img("photo-1497366216548-37526070297c", 1800),
    eventId: 115,
    lat: 12.9716,
    lng: 77.5946,
    tickets: [{ name: "Meetup Pass", price: 799 }],
    description: [
      "PropTech founders, CRM builders and channel partners on AI lead scoring, virtual site visits and RERA filings.",
    ],
    speakers: [
      {
        name: "Ishaan Gupta",
        title: "Founder",
        org: "Plotly Labs",
        image: person("photo-1507003211169-0a1dd7228f2d"),
        featured: true,
      },
    ],
    host: {
      name: "PropTech Bengaluru",
      logo: img("photo-1486406146926-c627a92ad1ab", 200),
      events: 16,
      followers: 540,
    },
  },
  {
    slug: "koramangala-broker-networking-night",
    title: "Koramangala Broker Networking Night",
    category: "Networking",
    city: "Bengaluru",
    venue: "The Ritz-Carlton Bengaluru",
    address: "99 Residency Road, Bengaluru - 560025",
    start: "2026-11-20T19:00:00+05:30",
    end: "2026-11-20T22:00:00+05:30",
    price: 2500,
    gst: true,
    thumbnail: img("photo-1560518883-ce09059eeffa", 800),
    banner: img("photo-1560518883-ce09059eeffa", 1800),
    eventId: 116,
    lat: 12.9719,
    lng: 77.5937,
    tickets: [{ name: "Networking Pass", price: 2500 }],
    description: [
      "An invite-only mixer for channel partners, developers and private bankers covering central Bengaluru inventory.",
    ],
    speakers: [
      {
        name: "Tara Menon",
        title: "VP Partnerships",
        org: "NoBrokerHood",
        image: person("photo-1487412720507-e7ab37603c6f"),
        featured: true,
      },
    ],
    host: {
      name: "Channel Connect",
      logo: img("photo-1560179707-f14e90ef3623", 200),
      events: 9,
      followers: 430,
    },
  },
  {
    slug: "hebbal-lakeside-villas-launch",
    title: "Hebbal Lakeside Villas Launch",
    category: "Launch",
    city: "Bengaluru",
    venue: "Hebbal Lake Club",
    address: "Hebbal, Bengaluru - 560024",
    start: "2026-12-08T11:00:00+05:30",
    end: "2026-12-08T16:00:00+05:30",
    price: 0,
    thumbnail: img("photo-1613490493576-7fde63acd811", 800),
    banner: img("photo-1613490493576-7fde63acd811", 1800),
    eventId: 117,
    lat: 13.035,
    lng: 77.597,
    tickets: [{ name: "Launch Invite", price: 0 }],
    description: [
      "Waterfront villas with private jetties — a limited inventory launch with same-day booking benefits.",
    ],
    speakers: [
      {
        name: "Ritu Sharma",
        title: "Head of Luxury",
        org: "Sattva Group",
        image: person("photo-1544005313-94ddf0286df2"),
        featured: true,
      },
    ],
    host: {
      name: "Sattva Experiences",
      logo: img("photo-1600596542815-ffad4c1539a9", 200),
      events: 4,
      followers: 290,
    },
  },
  {
    slug: "bengaluru-plot-buyers-workshop",
    title: "Bengaluru Plot Buyers Workshop",
    category: "Workshop",
    city: "Bengaluru",
    venue: "IISc J.N. Tata Auditorium",
    address: "CV Raman Road, Bengaluru - 560012",
    start: "2026-11-16T09:30:00+05:30",
    end: "2026-11-16T13:30:00+05:30",
    price: 1299,
    gst: true,
    thumbnail: img("photo-1502672260266-1c1ef2d93688", 800),
    banner: img("photo-1502672260266-1c1ef2d93688", 1800),
    eventId: 118,
    lat: 13.021,
    lng: 77.567,
    tickets: [{ name: "Workshop Seat", price: 1299 }],
    description: [
      "How to read a layout map, check DC conversion, khata and betterment charges before you buy a plot on the outskirts.",
    ],
    speakers: [
      {
        name: "Advocate Naveen Rao",
        title: "Property Lawyer",
        org: "Rao & Co.",
        image: person("photo-1472099645785-5658abf4ff4e"),
        featured: true,
      },
    ],
    host: {
      name: "PlotWise Academy",
      logo: img("photo-1560518883-ce09059eeffa", 200),
      events: 12,
      followers: 870,
    },
  },
];

export function getEvent(slug: string) {
  return events.find((event) => event.slug === slug);
}

export function formatPrice(event: EventItem) {
  if (event.price === 0) return "Free";
  return `₹${event.price.toLocaleString("en-IN")}${event.priceSuffix ?? ""}`;
}

export function formatCardDate(iso: string) {
  const date = new Date(iso);
  const tz = { timeZone: "Asia/Kolkata" } as const;
  const day = date.toLocaleDateString("en-GB", { ...tz, day: "2-digit" });
  const month = date.toLocaleDateString("en-GB", { ...tz, month: "short" });
  const weekday = date.toLocaleDateString("en-GB", { ...tz, weekday: "short" });
  const time = date
    .toLocaleTimeString("en-US", {
      ...tz,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();
  return `${day} ${month} · ${weekday} · ${time}`;
}

export function formatLongDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTimeRange(startIso: string, endIso: string) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const opts: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return `${start.toLocaleTimeString("en-US", opts)} – ${end.toLocaleTimeString("en-US", opts)}`;
}

export function formatSidebarWhen(startIso: string, endIso: string) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const day = start.toLocaleDateString("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const opts: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return `${day}, ${start.toLocaleTimeString("en-US", opts)} – ${end.toLocaleTimeString("en-US", opts)}`;
}

export function isSameDay(iso: string, day: Date) {
  const date = new Date(iso);
  return (
    date.getFullYear() === day.getFullYear() &&
    date.getMonth() === day.getMonth() &&
    date.getDate() === day.getDate()
  );
}

export function isThisWeekend(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const day = now.getDay();
  const saturday = new Date(now);
  saturday.setDate(now.getDate() + ((6 - day + 7) % 7));
  saturday.setHours(0, 0, 0, 0);
  const sunday = new Date(saturday);
  sunday.setDate(saturday.getDate() + 1);
  sunday.setHours(23, 59, 59, 999);
  return date >= saturday && date <= sunday;
}
