export const email = "juleskittoastrop@gmail.com";

export const links = {
  linkedin: "https://www.linkedin.com/in/jules-kitto-astrop-10a693330",
  instagramPersonal: "https://www.instagram.com/jules.ktoast/",
  instagramSeamuns: "https://www.instagram.com/seamuns.th/",
  seamun: "https://seamun.com",
  seamuns: "https://seamuns.site",
  intermun: "https://intermun.site",
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/about", label: "About" },
  { to: "/passions", label: "Passions" },
  { to: "/esa", label: "ESA" },
  { to: "/now", label: "Now" },
];

export type Role = {
  title: string;
  org: string;
  place?: string;
  dates?: string;
  logo?: string;
  href?: string;
  hrefLabel?: string;
  bullets?: string[];
};

export const roles: Role[] = [
  {
    title: "Secretary-General",
    org: "SEAMUN I 2027",
    place: "Bangkok / Phnom Penh",
    dates: "Oct 2025 – Present",
    logo: "/images/seamun-i-2027-logo.png",
    href: links.seamun,
    hrefLabel: "Visit SEAMUN",
    bullets: [
      "Lead executive operations for a 200+ delegate conference.",
      "Manage an 11-member Senior Management Team using ClickUp.",
      "Oversee cross-functional delivery across committees, logistics, and communications.",
      "Built foundational digital infrastructure, including seamun.com and operational trackers.",
    ],
  },
  {
    title: "Founder",
    org: "SEAMUNs Thailand",
    place: "Digital Community Project",
    dates: "2025 – Present",
    logo: "/images/seamuns-thailand-logo.png",
    href: links.seamuns,
    hrefLabel: "Visit SEAMUNs Thailand",
    bullets: [
      "Built and manage a regional MUN promotion and guidance platform for youth diplomacy.",
      "Grew @seamuns.th to 200+ followers through educational posts and procedural explainers.",
      "Designed infographics and short-form resources to improve access to MUN knowledge.",
    ],
  },
  {
    title: "Event Coordinator",
    org: "Youth Diplomacy Network",
    place: "Phnom Penh",
    dates: "June 2026 – Present",
    logo: "/images/ydn-logo.png",
    href: `mailto:${email}`,
    hrefLabel: "Request details",
    bullets: [
      "Design and execute regional youth diplomacy and educational events.",
      "Coordinate workflows across logistics, scheduling, and stakeholder communication.",
      "Support partner alignment to ensure on-time event delivery and consistent attendee experience.",
    ],
  },
  {
    title: "Deputy Secretary-General",
    org: "AriseMUN 2026",
  },
  {
    title: "Ambassador",
    org: "International Organization of Youth",
    href: "https://www.ioyforyouth.org/",
    hrefLabel: "Visit IOY",
  },
  {
    title: "Community Supporter",
    org: "Guardian of Childhood",
  },
  {
    title: "Global Advisory Council",
    org: "Creative Leadership Conference",
  },
  {
    title: "Youth Advisory Board Member",
    org: "SDG with Youth",
  },
];

export const munAwards = [
  "MUN07 IV — Best Delegate & Best Position Paper",
  "STAMUN XI — Best Position Paper",
  "TSIMUN I — Best Position Paper",
  "THAIMUN XIII — USCC (Ted Cruz)",
  "Regents MUN I — Best Delegate",
  "HEXAMUN ’26 — Honorable Mention",
];

export const hackAwards = [
  {
    title: "VERSO Hack 2020",
    result: "1st Place",
    detail:
      "Winner for a high-impact technology solution focused on practical implementation.",
  },
  {
    title: "VERSO Hack 2025",
    result: "2nd Place",
    detail:
      "Winner for a regional-impact prototype combining innovation with real-world feasibility.",
  },
];

export const skills = [
  {
    title: "Event & logistics management",
    body: "Conference planning, timeline control, stakeholder coordination, and operational delivery.",
  },
  {
    title: "Leadership & delegation",
    body: "Task ownership, cross-functional communication, and team alignment in fast-paced environments.",
  },
  {
    title: "Digital & technical operations",
    body: "Web development, domain management, and workflow automation for smooth execution.",
  },
];

export const toolkit = ["Cursor AI", "ClickUp", "Canva", "Google Workspace"];
export const toolkitTags = ["Planning", "Documentation", "Design", "Execution"];

export const education = [
  {
    grades: "Grades 9–11",
    school: "VERSO International School, Bangkok",
    logo: "/images/verso-logo.png",
  },
  {
    grades: "Grades 7–9",
    school: "Amsterdam International Community School (AICS)",
    logo: "/images/aics-logo.png",
  },
  {
    grades: "Grade 6",
    school: "VERSO International School, Bangkok",
    logo: "/images/verso-logo.png",
  },
  {
    grades: "Grade 5",
    school: "Amsterdam International Community School (AICS)",
    logo: "/images/aics-logo.png",
  },
  {
    grades: "Grade 4",
    school: "Stamford American International School (SAIS), Singapore",
    logo: "/images/sais-logo.png",
  },
  {
    grades: "Grades Pre-K to 3",
    school: "International School Ho Chi Minh City (ISHCMC)",
    logo: "/images/ishcmc-logo.png",
  },
];

export const livedIn = [
  "Thailand",
  "Singapore",
  "Netherlands",
  "New Zealand",
  "Vietnam",
  "Canada",
  "Japan",
];

export const journey = [
  { place: "Tokyo", country: "Japan" },
  { place: "Toronto", country: "Canada" },
  { place: "Auckland", country: "New Zealand" },
  { place: "Ho Chi Minh City", country: "Vietnam" },
  { place: "Amsterdam", country: "Netherlands" },
  { place: "Bangkok", country: "Thailand" },
  { place: "Amsterdam", country: "Netherlands", note: "again" },
  { place: "Bangkok", country: "Thailand", note: "again" },
  { place: "Phnom Penh", country: "Cambodia", current: true },
];

export const passport = [
  { country: "Belgium", stamp: true },
  { country: "Cambodia", stamp: true },
  { country: "Canada", stamp: true },
  { country: "Cook Islands", stamp: true },
  { country: "Czech Republic", stamp: true },
  { country: "France", stamp: false },
  { country: "Germany", stamp: false },
  { country: "Indonesia", stamp: false },
  { country: "Japan", stamp: false },
  { country: "Malaysia", stamp: false },
  { country: "Netherlands", stamp: false },
  { country: "New Zealand", stamp: false },
  { country: "Saint Kitts and Nevis", stamp: false },
  { country: "Saint-Martin", stamp: false },
  { country: "Singapore", stamp: false },
  { country: "Spain", stamp: false },
  { country: "Thailand", stamp: false },
  { country: "United States", stamp: false },
  { country: "Vietnam", stamp: false },
];

export const passions = [
  {
    title: "Education",
    body: "I care deeply about student growth, accessible learning, and improving how young people engage with global issues.",
  },
  {
    title: "Psychology",
    body: "Understanding behavior and motivation helps me communicate better, lead effectively, and design inclusive team environments.",
  },
  {
    title: "Human rights",
    body: "I am committed to dignity, fairness, and equal opportunity through diplomacy, dialogue, and practical action.",
  },
  {
    title: "Disability advocacy",
    body: "I support systems that remove barriers and ensure participation for everyone in education, events, and public spaces. I am committed to disability justice by learning from people most impacted.",
  },
  {
    title: "Autism & neurodivergence",
    body: "I am AuDHD and a Level 1 LSN autistic person. I value neurodiversity and advocate for understanding, accommodations, and strengths-based perspectives.",
    featured: true,
  },
  {
    title: "Web development",
    body: "Building websites lets me turn ideas into useful tools and platforms that help people connect and take action.",
  },
];

export const companions = [
  {
    name: "Bria",
    fact: "I was a christmas gift from Jules' boyfriend and his mum.",
    bday: "Dec 2025",
    pronouns: "she/her",
    brand: "Jellycat",
    product: "Bashful Pink Bunny",
    href: "https://us.jellycat.com/bashful-pink-bunny/",
    img: "/images/bria-bashful-bunny.png",
    alt: "Bria the pink bashful bunny",
  },
  {
    name: "Rainbow Dash",
    fact: "I was a gift from Jules' boyfriend for absolutely no reason.",
    bday: "Feb 2026",
    pronouns: "he/him",
    brand: "Jellycat",
    product: "Sky Dragon",
    href: "https://jellycat.com/sky-dragon/",
    img: "/images/rainbow-dash-sky-dragon.png",
    alt: "Rainbow Dash the sky dragon plush",
  },
  {
    name: "Jaffa",
    fact: 'I say "I love you, I love you" and smell like birthday cake.',
    bday: "Dec 2025",
    pronouns: "they/them",
    brand: "Build-A-Bear",
    product: "Kiwi Plush",
    href: "https://buildabear.com.au/products/kiwi-plush",
    img: "/images/jaffa-kiwi-plush.png",
    alt: "Jaffa the kiwi plush",
  },
  {
    name: "Sandcastle",
    fact: "I'm made on the beach!",
    bday: "Unknown",
    pronouns: "it/its",
    brand: "Jellycat",
    product: "Amuseables Sandcastle",
    href: "https://us.jellycat.com/amuseables/amuseables-objects",
    img: "/images/sandcastle-jellycat.png",
    alt: "Sandcastle the Jellycat sandcastle plush",
  },
];

export const legoSets = [
  "40791",
  "40517",
  "77256",
  "21345",
  "11508",
  "31216",
  "43217",
  "43230",
  "40801",
  "31163",
  "40923",
  "10309",
  "10329",
  "40762",
  "71426",
  "31173",
  "10349",
  "40683",
  "40816",
  "40587",
  "40527",
  "40764",
  "40861",
  "40926",
  "40902",
  "21357",
  "40516",
  "43264",
  "40879",
  "40820",
  "40713",
  "31147",
  "43279",
  "76469",
  "21362",
  "21358",
  "77255",
  "72046",
  "21366",
  "72037",
  "76449",
  "40916",
  "31208",
  "11506",
  "40954",
  "31214",
  "40860",
  "40813",
  "76462",
  "76456",
  "21333",
  "21342",
  "40569",
  "21347",
  "40886",
  "40776",
];

export const snackles = [
  {
    name: "Mini Reindeer Snackle",
    img: "/images/snackles-reindeer.jpg",
    alt: "Snackles 5 inch mini reindeer and Reese's Trees Christmas plush",
  },
  {
    name: "Mini Santa Snackle",
    img: "/images/snackles-santa.jpg",
    alt: "Snackles 5 inch mini Santa Claus and Mentos Candy Cane Christmas plush",
  },
  {
    name: "Mini Haribo Snackle",
    img: "/images/snackles-haribo.png",
    alt: "Snackles 5 inch mini Nancy and Haribo Goldbears plush",
  },
];
