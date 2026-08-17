export const email = "juleskittoastrop@gmail.com";

export const links = {
  linkedin: "https://www.linkedin.com/in/jules-kitto-astrop-10a693330",
  instagramPersonal: "https://www.instagram.com/jules.ktoast/",
  instagramSeamuns: "https://www.instagram.com/seamuns.th/",
  seamun: "https://seamun.com",
  seamuns: "https://seamuns.site",
  intermun: "https://intermun.site",
  ydn: "https://youthdiplomacynetwork.org/",
};

export const socials = [
  {
    name: "LinkedIn",
    href: links.linkedin,
  },
  {
    name: "Instagram",
    href: links.instagramPersonal,
  },
  {
    name: "SEAMUNs",
    href: links.instagramSeamuns,
  },
  {
    name: "SEAMUN",
    href: links.seamun,
  },
];

export const nav = [
  { to: "/", label: "Home" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/about", label: "About" },
  { to: "/passions", label: "Passions" },
  { to: "/takes", label: "Takes" },
  { to: "/now", label: "Now" },
];

export const dockApps = [
  {
    id: "/",
    name: "Home",
    icon: "https://cdn.jim-nielsen.com/macos/1024/finder-2021-09-10.png?rf=1024",
  },
  {
    id: "/experience",
    name: "Experience",
    icon: "https://cdn.jim-nielsen.com/macos/1024/calendar-2021-04-29.png?rf=1024",
  },
  {
    id: "/skills",
    name: "Skills",
    icon: "https://cdn.jim-nielsen.com/macos/1024/terminal-2021-06-03.png?rf=1024",
  },
  {
    id: "/about",
    name: "About",
    icon: "https://cdn.jim-nielsen.com/macos/1024/safari-2021-06-02.png?rf=1024",
  },
  {
    id: "/passions",
    name: "Passions",
    icon: "https://cdn.jim-nielsen.com/macos/1024/photos-2021-05-28.png?rf=1024",
  },
  {
    id: "/takes",
    name: "Takes",
    icon: "https://cdn.jim-nielsen.com/macos/1024/voice-memos-2025-11-14.png?rf=1024",
  },
  {
    id: "/now",
    name: "Now",
    icon: "https://cdn.jim-nielsen.com/macos/1024/notes-2021-05-25.png?rf=1024",
  },
  {
    id: "mail",
    name: "Mail",
    icon: "https://cdn.jim-nielsen.com/macos/1024/mail-2021-05-25.png?rf=1024",
  },
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
    href: links.ydn,
    hrefLabel: "Visit Youth Diplomacy Network",
    bullets: [
      "Design and execute regional youth diplomacy and educational events.",
      "Coordinate workflows across logistics, scheduling, and stakeholder communication.",
      "Support partner alignment to ensure on-time event delivery and consistent attendee experience.",
    ],
  },
  {
    title: "Deputy Secretary-General",
    org: "AriseMUN 2026",
    logo: "/images/arisemun-logo.png",
  },
  {
    title: "Ambassador",
    org: "International Organization of Youth",
    logo: "/images/ioy-logo.png",
    href: "https://www.ioyforyouth.org/",
    hrefLabel: "Visit IOY",
  },
  {
    title: "Community Supporter",
    org: "Guardian of Childhood",
    logo: "/images/guardian-of-childhood-logo.png",
  },
  {
    title: "Global Advisory Council",
    org: "Creative Leadership Conference",
    logo: "/images/clc-logo.png",
    href: "https://creativeleadershipconference.com/",
    hrefLabel: "Visit Creative Leadership Conference",
  },
  {
    title: "Youth Advisory Board Member",
    org: "SDG with Youth",
    logo: "/images/sdg-with-youth-logo.png",
    href: "https://sdgwithyouth.org/",
    hrefLabel: "Visit SDG with Youth",
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

export type LivedPlace = {
  country: string;
  images?: { src: string; alt: string }[];
};

export const livedIn: LivedPlace[] = [
  {
    country: "Thailand",
    images: [
      {
        src: "/images/lived/thailand-3.jpg",
        alt: "Wat Arun across the Chao Phraya River at sunset",
      },
      {
        src: "/images/lived/thailand-1.jpg",
        alt: "The Grand Palace and Wat Phra Kaew at golden hour, with tuk-tuks on the street",
      },
      {
        src: "/images/lived/thailand-2.jpg",
        alt: "Neon signs and traffic on Yaowarat Road in Bangkok’s Chinatown",
      },
      {
        src: "/images/lived/thailand-4.jpg",
        alt: "Bangkok skyline along the Chao Phraya River at golden hour",
      },
    ],
  },
  {
    country: "Singapore",
    images: [
      {
        src: "/images/lived/singapore-2.jpg",
        alt: "Supertree Grove at Gardens by the Bay",
      },
      {
        src: "/images/lived/singapore-1.jpg",
        alt: "The Merlion at night, water arcing toward the Esplanade",
      },
      {
        src: "/images/lived/singapore-4.jpg",
        alt: "Marina Bay Sands and the ArtScience Museum at blue hour",
      },
      {
        src: "/images/lived/singapore-3.jpg",
        alt: "Siloso Beach on Sentosa, with turquoise water and palm-lined sand",
      },
    ],
  },
  {
    country: "Netherlands",
    images: [
      {
        src: "/images/lived/netherlands-2.jpg",
        alt: "Bicycles on an Amsterdam canal bridge, with gabled houses beyond",
      },
      {
        src: "/images/lived/netherlands-1.jpg",
        alt: "An Amsterdam canal bridge at twilight, arches lit over the water",
      },
      {
        src: "/images/lived/netherlands-4.jpg",
        alt: "Canal houses and boats on the Singel, with the Munttoren in the distance",
      },
      {
        src: "/images/lived/netherlands-3.jpg",
        alt: "Aerial view of Amsterdam’s concentric canal ring",
      },
    ],
  },
  {
    country: "New Zealand",
    images: [
      {
        src: "/images/lived/new-zealand-2.jpg",
        alt: "A ferry crossing Waitematā Harbour toward the Auckland waterfront",
      },
      {
        src: "/images/lived/new-zealand-1.jpg",
        alt: "Aerial Auckland with the Harbour Bridge and Sky Tower",
      },
      {
        src: "/images/lived/new-zealand-3.jpg",
        alt: "Auckland from a grassy volcanic hill, Sky Tower on the skyline",
      },
      {
        src: "/images/lived/new-zealand-4.jpg",
        alt: "Auckland Sky Tower at night reflected in the Viaduct Harbour",
      },
      {
        src: "/images/lived/new-zealand-5.jpg",
        alt: "Auckland CBD at golden hour with the Sky Tower and Rangitoto beyond",
      },
    ],
  },
  {
    country: "Vietnam",
    images: [
      {
        src: "/images/lived/vietnam-2.jpg",
        alt: "A motorbike-filled Saigon street with Bitexco Tower beyond",
      },
      {
        src: "/images/lived/vietnam-1.jpg",
        alt: "Notre-Dame Cathedral Basilica of Saigon from above",
      },
      {
        src: "/images/lived/vietnam-3.jpg",
        alt: "Nguyen Hue Walking Street at dusk, toward the People’s Committee Building",
      },
      {
        src: "/images/lived/vietnam-4.jpg",
        alt: "Neon-lit nightlife on a Ho Chi Minh City street",
      },
      {
        src: "/images/lived/vietnam-5.jpg",
        alt: "A crowded souvenir stall at Ben Thanh Market",
      },
    ],
  },
  {
    country: "Canada",
    images: [
      {
        src: "/images/lived/canada-1.jpg",
        alt: "Toronto waterfront marina with the CN Tower",
      },
      {
        src: "/images/lived/canada-2.jpg",
        alt: "Toronto skyline across Lake Ontario, with the CN Tower",
      },
      {
        src: "/images/lived/canada-3.jpg",
        alt: "The Gooderham Flatiron Building in downtown Toronto",
      },
      {
        src: "/images/lived/canada-4.jpg",
        alt: "The TORONTO sign at Nathan Phillips Square at dusk",
      },
      {
        src: "/images/lived/canada-5.jpg",
        alt: "Skating at Nathan Phillips Square with Old City Hall behind",
      },
    ],
  },
  {
    country: "Japan",
    images: [
      {
        src: "/images/lived/japan-1.jpg",
        alt: "A narrow Tokyo street packed with vertical signs",
      },
      {
        src: "/images/lived/japan-2.jpg",
        alt: "Cherry blossoms over a night walkway in Tokyo",
      },
      {
        src: "/images/lived/japan-3.jpg",
        alt: "Boats on a Tokyo canal under cherry blossoms, with Tokyo Tower beyond",
      },
      {
        src: "/images/lived/japan-4.jpg",
        alt: "Tokyo at dusk with Mount Fuji and Tokyo Tower",
      },
      {
        src: "/images/lived/japan-5.jpg",
        alt: "Aerial Tokyo at sunset with Tokyo Tower and Mount Fuji",
      },
    ],
  },
  {
    country: "Cambodia",
    images: [
      {
        src: "/images/lived/cambodia-1.jpg",
        alt: "Tuk-tuks and motorbikes on a Phnom Penh street",
      },
      {
        src: "/images/lived/cambodia-2.jpg",
        alt: "Dense, colorful rooftops across a Phnom Penh neighborhood",
      },
      {
        src: "/images/lived/cambodia-4.jpg",
        alt: "The National Museum of Cambodia in Phnom Penh",
      },
      {
        src: "/images/lived/cambodia-3.jpg",
        alt: "Phnom Penh skyline at night reflected in the river",
      },
    ],
  },
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

export const globeMarkers: { location: [number, number]; size: number }[] = [
  { location: [35.6762, 139.6503], size: 0.05 },
  { location: [43.6532, -79.3832], size: 0.06 },
  { location: [-36.8485, 174.7633], size: 0.06 },
  { location: [10.8231, 106.6297], size: 0.05 },
  { location: [52.3676, 4.9041], size: 0.06 },
  { location: [13.7563, 100.5018], size: 0.08 },
  { location: [11.5564, 104.9282], size: 0.12 },
];

export const passport = [
  "Belgium",
  "Cambodia",
  "Canada",
  "Cook Islands",
  "Czech Republic",
  "France",
  "Germany",
  "Indonesia",
  "Japan",
  "Malaysia",
  "Netherlands",
  "New Zealand",
  "Saint Kitts and Nevis",
  "Saint-Martin",
  "Singapore",
  "Spain",
  "Thailand",
  "United States",
  "Vietnam",
];

export const passportStamps: Record<
  string,
  { src: string; alt: string; wide?: boolean }
> = {
  Belgium: {
    src: "/images/stamp-belgium.png",
    alt: "Vintage Belgian postage stamp featuring the Perron of Liège",
  },
  Cambodia: {
    src: "/images/stamp-cambodia.png",
    alt: "Vintage Cambodian postage stamp of Angkor Wat",
    wide: true,
  },
  Canada: {
    src: "/images/stamp-canada.png",
    alt: "Vintage Canadian postage stamp of a winter coastal scene",
    wide: true,
  },
  "Cook Islands": {
    src: "/images/stamp-cook-islands.png",
    alt: "Vintage Rarotonga postage stamp of a Cook Islands figure with a spear",
  },
  "Czech Republic": {
    src: "/images/stamp-czech-republic.png",
    alt: "Czech postage stamp of Panská skála near Kamenický Šenov",
    wide: true,
  },
  France: {
    src: "/images/stamp-france.png",
    alt: "Vintage French Sage postage stamp of Peace and Commerce",
  },
  Germany: {
    src: "/images/stamp-germany.png",
    alt: "Vintage German Empire postage stamp of Germania",
  },
  Indonesia: {
    src: "/images/stamp-indonesia.png",
    alt: "Indonesian postage stamp of a red hibiscus, Kembang Sepatu",
  },
  Japan: {
    src: "/images/stamp-japan.png",
    alt: "Vintage Japanese postage stamp of Mount Fuji and cherry blossoms",
  },
  Malaysia: {
    src: "/images/stamp-malaysia.png",
    alt: "Malaysian postage stamp of Crested Wood Partridges, Burong Siul",
  },
  Netherlands: {
    src: "/images/stamp-netherlands.png",
    alt: "Vintage Dutch postage stamp of a girl from Marken",
  },
  "New Zealand": {
    src: "/images/stamp-new-zealand.png",
    alt: "New Zealand postage stamp of a kākāpō among ferns",
  },
  "Saint Kitts and Nevis": {
    src: "/images/stamp-saint-kitts-and-nevis.png",
    alt: "St. Kitts postage stamp of batik designs with two women and fruit",
  },
  "Saint-Martin": {
    src: "/images/stamp-saint-martin.png",
    alt: "St. Maarten postage stamp of Princess Juliana International Airport",
    wide: true,
  },
};

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

export const takes = [
  {
    title: "School no longer buys what it sold.",
    body: "Conventional schooling has become relatively ineffective. It is a means to an end that no longer even achieves the goal it set out to achieve: job security.",
  },
  {
    title: "Rooms over stamps.",
    body: "A well-used passport is a side effect. The work is making rooms that actually function — committees, ops, websites — after the novelty of a new city wears off.",
  },
  {
    title: "If it does not land, it did not happen.",
    body: "I would rather ship a conference, a tracker, or a page that holds under pressure than collect a title that looks good in a programme.",
  },
  {
    title: "The website is part of the floor.",
    body: "Digital work is not a side project next to logistics. Domain setup, pages, and trackers are the same delivery stack as the room.",
  },
  {
    title: "Access before prestige.",
    body: "MUN knowledge should not sit behind whoever already knows the procedure. That is why SEAMUNs Thailand exists: explainers, infographics, and a bridge between conferences.",
  },
  {
    title: "Strengths-based, or it is not inclusion.",
    body: "I am AuDHD and a Level 1 LSN autistic person. Understanding, accommodations, and strengths-based perspectives are how teams actually get work done — not extras.",
  },
  {
    title: "Learn from people most impacted.",
    body: "Disability justice is not a branding exercise. I am committed to removing barriers in education, events, and public spaces by learning from the people those systems fail first.",
  },
  {
    title: "Practical beats impressive.",
    body: "The VERSO Hack work I am proud of won on implementation and feasibility, not on looking futuristic. Same test I use for events.",
  },
  {
    title: "A council with actual teeth.",
    body: "The world would be better with a universal council acting in the best interest of all people, with legal authority over nations. That means action against war crimes — especially by people in power — healthcare access that local permission currently blocks, a shared language taught alongside mother tongues, and equity, unity, and diversity held at the same time. Members should be elected democratically, swear an oath to do no harm, and be punished if they break the rules of the job.",
  },
  {
    title: "Education should be free.",
    body: "Covered. Not a luxury product. If access depends on who can pay, it is not a public good.",
  },
  {
    title: "Healthcare should be free.",
    body: "Covered. People should not have to qualify financially to stay alive or get well.",
  },
  {
    title: "Mental health is health.",
    body: "It is not a side category of physical health. Treat it with the same seriousness, funding, and urgency.",
  },
  {
    title: "Mental health care should be free.",
    body: "Covered. A system that bills people for staying functional is not care.",
  },
  {
    title: "Disabled people are not an afterthought.",
    body: "Design for disabled people from the first draft — buildings, events, websites, policy — not as a retrofit when someone complains.",
  },
  {
    title: "Impact over intent.",
    body: "If the impact is negative, accountability is required. Good intentions do not cancel the harm.",
  },
  {
    title: "Neurodivergence belongs in every sector.",
    body: "Especially education and employment. If those rooms cannot hold neurodivergent people, the rooms are wrong.",
  },
  {
    title: "Move military money to healthcare.",
    body: "Military expenditure should be redirected toward keeping people alive and well. That is the better use of public funds.",
  },
  {
    title: "Restorative over punitive.",
    body: "Restorative justice is more effective than punishment-first systems. Repair should be the default, not the exception.",
  },
  {
    title: "BBIA people deserve better systems.",
    body: "Justice systems, social systems, and economic systems currently fail BBIA individuals. That is a design failure, not an accident.",
  },
  {
    title: "Rehabilitation beats prison.",
    body: "Rehabilitation is almost always a better option than a prison sentence. Locking people away is not the same as reducing harm.",
  },
  {
    title: "Target recidivism.",
    body: "Combating recidivism should be one of the main jobs of a justice system. If people cycle back through, the system did not work.",
  },
  {
    title: "The most impacted should lead.",
    body: "Genuine change comes from uplifting marginalized voices and letting the people most affected set the direction.",
  },
  {
    title: "Vulnerability is produced.",
    body: "BBIA people are not inherently fragile. Systemic injustice, inequality, and bias make them more vulnerable. Name the system.",
  },
  {
    title: "Neurodivergence is not a moral score.",
    body: "It does not make someone a good person or a bad person. There are good and bad neurodivergent people, same as anyone else.",
  },
  {
    title: "Aspie supremacy is ableism.",
    body: "Ranking autistic people by how palatable they look to non-disabled systems is still ableism. It is not pride.",
  },
  {
    title: "Neurodivergence is not an exemption.",
    body: "It does not cancel mistakes. It does not cancel accountability. Support and responsibility can exist in the same sentence.",
  },
  {
    title: "Disability is not a bad word.",
    body: "Do not replace it with euphemisms to make other people more comfortable. The word is accurate. Use it.",
  },
  {
    title: "Advocacy is valid in every format.",
    body: "Verbal, AAC, sign, writing, whatever actually works. The method is not a hierarchy. The skill is essential.",
  },
  {
    title: "Teach life, not only exams.",
    body: "K–12 should include cooking, driving, cleaning, money, communication, and literacy as real skills — not extras if there is time.",
  },
  {
    title: "Education should not be for profit.",
    body: "Schools and universities extracting profit from students are not serving the public. Education is not a product line.",
  },
  {
    title: "Educators need mental health and neurodiversity literacy.",
    body: "Basic mental health knowledge and neurodiversity knowledge should be part of the job, not an optional workshop.",
  },
  {
    title: "University is not the only valid path.",
    body: "Tertiary education is one route after high school, not the only respectable one. Other paths are still education.",
  },
  {
    title: "Suitable education is a right.",
    body: "All people deserve access to education that actually fits them — not a single track that only some can survive.",
  },
  {
    title: "Necessary aids should never be a bill.",
    body: "Disabled people should not pay for the tools they need to live. If it is necessary, it should be covered.",
  },
];
