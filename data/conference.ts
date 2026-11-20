/**
 * AIM-HUB 2027 — single source of truth for every piece of brochure content.
 *
 * All wording is transcribed from the conference brochure. Anything the
 * brochure does not settle carries a TODO / VERIFY note so the organisers can
 * confirm it before launch. Do not invent facts here.
 */

export type SectionTone = "dark" | "light";

export type NavItem = { id: string; label: string };

export type ObjectiveIcon =
  | "ScanSearch"
  | "Globe2"
  | "ShieldCheck"
  | "BookOpenCheck"
  | "Sprout";

export type PublicationIcon =
  | "Presentation"
  | "MessageSquareQuote"
  | "BookMarked"
  | "LibraryBig";

export type Track = {
  n: string;
  title: string;
  /** Language badge for the French open track. */
  badge?: string;
  language?: "EN" | "FR";
};

export type TimelineEntry = {
  id: string;
  label: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** ISO date for the final day of a window. */
  endDate?: string;
  note?: string;
};

export type FeeRegion = "india" | "international";
export type FeeSeason = "early" | "regular";

export type FeeCard = {
  id: string;
  label: string;
  detail?: string;
  india: Record<FeeSeason, number>;
  international: Record<FeeSeason, number>;
};

export type CommitteeMember = {
  name: string;
  role: string;
};

export type CommitteeGroup = {
  id: string;
  label: string;
  members: CommitteeMember[];
};

export const conference = {
  name: "AIM-HUB 2027",
  fullTitle:
    "International Conference on AI-Driven Marketing, Human-Centric Consumer Experience, Responsible Innovation and Sustainable Business Transformation",
  organiser:
    "JAIN (Deemed-to-be University), Faculty of Management Studies, CMS Business School, Bengaluru",
  organiserShort: "JAIN (Deemed-to-be University), CMS Business School",
  inAssociationWith: "Brest Business School, France",
  institutionalMembership: "ASSOCHAM",
  datesLabel: "24–25 June 2027",
  startDate: "2027-06-24",
  endDate: "2027-06-25",
  city: "Bengaluru, India",
  venue: "Seminar Hall – 5",
  // TODO/VERIFY: brochure names only "Seminar Hall - 5". Confirm campus,
  // building and full postal address with the organisers before launch.
  venueNote: "Campus address to be confirmed",
  mode: "Hybrid mode of paper presentation may be available.",
} as const;

export const navItems: NavItem[] = [
  { id: "theme", label: "Theme" },
  { id: "tracks", label: "Tracks" },
  { id: "dates", label: "Dates" },
  { id: "guidelines", label: "Guidelines" },
  { id: "fees", label: "Fees" },
  { id: "committee", label: "Committee" },
  { id: "contact", label: "Contact" },
];

export type SectionMeta = {
  id: string;
  index: string;
  label: string;
  tone: SectionTone;
};

/** Section order drives numbering, the circuit line and the scroll progress. */
export const sections: SectionMeta[] = [
  { id: "hero", index: "01", label: "AIM-HUB 2027", tone: "dark" },
  { id: "marquee", index: "02", label: "Tracks Ticker", tone: "dark" },
  { id: "theme", index: "03", label: "Theme", tone: "dark" },
  { id: "objectives", index: "04", label: "Objectives", tone: "light" },
  { id: "tracks", index: "05", label: "Tracks", tone: "dark" },
  { id: "dates", index: "06", label: "Important Dates", tone: "light" },
  { id: "guidelines", index: "07", label: "Call for Papers", tone: "dark" },
  { id: "fees", index: "08", label: "Registration", tone: "light" },
  { id: "publication", index: "09", label: "Publication", tone: "dark" },
  { id: "institutions", index: "10", label: "Institutions", tone: "dark" },
  { id: "committee", index: "11", label: "Committee", tone: "light" },
  { id: "contact", index: "12", label: "Contact", tone: "dark" },
];

export const theme = {
  title: "About AIM-HUB 2027",
  paragraphs: [
    "The global business environment is witnessing significant transformation driven by artificial intelligence, data analytics, automation, platform ecosystems, digital commerce, sustainability expectations and changing consumer behaviour. Marketing is one of the most affected areas because organisations are increasingly using AI-enabled tools for customer segmentation, personalisation, predictive analytics, campaign optimisation, content creation, customer service, retail transformation, influencer marketing and consumer experience management.",
    "The theme reflects the need to understand how marketing is being reshaped by artificial intelligence, analytics, digital transformation, platform ecosystems, consumer experience design, ethical innovation and sustainability-led business models. The conference will examine how organisations can balance personalisation with privacy, efficiency with ethics, growth with responsibility and innovation with sustainability.",
    "At the same time, AI-driven marketing raises critical questions related to consumer privacy, algorithmic bias, data ethics, digital trust, responsible innovation, transparency, platform governance, greenwashing and sustainable business impact. The conference responds to these issues by integrating AI, consumer experience, ethics, sustainability and marketing education into a single contemporary academic platform.",
  ],
  pairs: [
    { a: "Personalisation", b: "Privacy" },
    { a: "Efficiency", b: "Ethics" },
    { a: "Growth", b: "Responsibility" },
    { a: "Innovation", b: "Sustainability" },
  ],
  whyTitle: "Why conferences matter",
  why: "Conferences enrich the educational process through the exchange of ideas, the dissemination of research, networking and exposure to new areas of knowledge, and they strengthen institutional research culture. AIM-HUB 2027 is designed as a high-quality academic, industry and policy platform for AI-driven marketing and responsible business transformation.",
} as const;

export const objectives: {
  n: string;
  title: string;
  body: string;
  icon: ObjectiveIcon;
}[] = [
  {
    n: "01",
    title: "AI, analytics and marketing strategy",
    body: "Examine the role of artificial intelligence, analytics, automation and digital platforms in reshaping marketing strategy, consumer engagement, customer experience and business decision-making.",
    icon: "ScanSearch",
  },
  {
    n: "02",
    title: "A global academic and industry platform",
    body: "Provide a global academic and industry platform for deliberating on emerging trends in AI-driven marketing, human-centric consumer experience, responsible innovation and sustainable business transformation.",
    icon: "Globe2",
  },
  {
    n: "03",
    title: "Responsible and ethical innovation",
    body: "Promote scholarly discussion on responsible and ethical innovation by addressing AI ethics, consumer trust, privacy, transparency, digital governance and responsible use of consumer data.",
    icon: "ShieldCheck",
  },
  {
    n: "04",
    title: "Research culture and publication outcomes",
    body: "Strengthen research culture, industry-academia collaboration, publication outcomes and institutional visibility through peer-reviewed paper presentations, expert feedback, ISBN-based abstract publication, possible proceedings/journal opportunities and accreditation-oriented documentation.",
    icon: "BookOpenCheck",
  },
  {
    n: "05",
    title: "Sustainable and inclusive transformation",
    body: "Encourage interdisciplinary research on sustainable and inclusive business transformation by integrating marketing, technology, ESG, responsible consumption, entrepreneurship, public policy and SDG-aligned business models.",
    icon: "Sprout",
  },
];

export const tracks: Track[] = [
  {
    n: "01",
    title: "Retail, E-Commerce, Services Marketing and Experience Economy",
  },
  {
    n: "02",
    title:
      "Marketing Analytics, Research Methods, Entrepreneurship and Marketing Education",
  },
  {
    n: "03",
    title:
      "Open Track: Interdisciplinary Perspectives on AI, Sustainability, Innovation and Business Transformation",
  },
  {
    n: "04",
    title:
      "Open Track: Interdisciplinary Perspectives on AI, Sustainability, Innovation and Business Transformation",
    badge: "FR",
    language: "FR",
  },
  {
    n: "05",
    title: "Branding, Social Media, Influencer Marketing and Creator Economy",
  },
  {
    n: "06",
    title: "Sustainable Business Transformation, ESG Marketing and Responsible Consumption",
  },
  {
    n: "07",
    title: "AI-Driven Marketing, Marketing Intelligence and Digital Transformation",
  },
  {
    n: "08",
    title: "Human-Centric Consumer Experience, Engagement and Consumer Behaviour",
  },
  {
    n: "09",
    title: "Responsible Innovation, AI Ethics, Consumer Trust and Digital Governance",
  },
];

/**
 * Dates as printed in the brochure.
 * TODO/VERIFY: "Call for Papers circulation — July 2026 onwards" has no exact
 * day; 1 July 2026 is used for sorting and calendar export only.
 * TODO/VERIFY: "Early bird registration 16 March – 15 April 2027" and regular
 * window dates must be confirmed alongside the fee columns.
 */
export const timeline: TimelineEntry[] = [
  {
    id: "call-for-papers",
    label: "Call for Papers circulation",
    date: "2026-07-01",
    note: "July 2026 onwards",
  },
  {
    id: "abstract-deadline",
    label: "Abstract submission deadline",
    date: "2026-11-30",
  },
  {
    id: "abstract-notification",
    label: "Notification of abstract acceptance",
    date: "2026-12-20",
  },
  {
    id: "full-paper-deadline",
    label: "Full paper submission deadline",
    date: "2027-02-15",
  },
  {
    id: "full-paper-notification",
    label: "Notification of full paper acceptance",
    date: "2027-03-15",
  },
  {
    id: "early-bird",
    label: "Early bird registration",
    date: "2027-03-16",
    endDate: "2027-04-15",
  },
  {
    id: "regular-registration",
    label: "Regular registration",
    date: "2027-04-16",
    endDate: "2027-05-31",
  },
  {
    id: "revised-paper",
    label: "Final revised paper submission",
    date: "2027-05-31",
  },
  {
    id: "schedule",
    label: "Final conference schedule release",
    date: "2027-06-10",
  },
  {
    id: "conference-dates",
    label: "Conference dates",
    date: "2027-06-24",
    endDate: "2027-06-25",
    note: `${conference.venue}, ${conference.city}`,
  },
];

export const guidelines = {
  intro:
    "The AIM-HUB 2027 International Conference invites original and unpublished research papers from academicians, researchers, industry professionals, policymakers, research scholars and students.",
  submissionTypes: [
    "Full papers",
    "Conceptual papers",
    "Empirical studies",
    "Case studies",
    "Policy papers",
    "Doctoral research papers",
    "Industry papers",
    "Interdisciplinary submissions",
  ],
  formatting: {
    font: "Times New Roman",
    size: "12 pt",
    spacing: "1.5 line spacing",
    margins: "1-inch margins",
  },
  /**
   * VERIFY: the brochure states both a 3,000–4,000 word range and "preferably
   * up to 8 pages including references". Both are shown exactly as written.
   */
  limits: [
    { label: "Length", value: "3,000–4,000 words" },
    { label: "Page count", value: "Preferably up to 8 pages including references" },
  ],
  checklist: [
    { title: "Title, Abstract, Main Body and References", detail: "Structure the manuscript in these four sections." },
    { title: "Abstract with 4–6 keywords", detail: "Keywords follow the abstract." },
    { title: "Clear research problem and appropriate methodology", detail: "State the problem explicitly and justify the method." },
    { title: "Maximum four authors", detail: "Or as notified by the committee." },
    { title: "Tables in editable format", detail: "Do not submit tables as images." },
    { title: "Figures preferably 300 DPI", detail: "High-resolution figures for review and publication." },
    { title: "Chicago Style preferred", detail: "Or as notified by the committee." },
    { title: "MS Word format", detail: "Submit the manuscript as a .doc or .docx file." },
    { title: "Hybrid presentation may be available", detail: "Indicate your preference during submission." },
  ],
  submitNote: "Submit your abstract through the conference submission form.",
} as const;

export const fees = {
  regions: [
    { id: "india" as FeeRegion, label: "India", currency: "INR", symbol: "₹" },
    {
      id: "international" as FeeRegion,
      label: "International",
      currency: "USD",
      symbol: "$",
      hint: "SAARC, African and Other Countries",
    },
  ],
  seasons: [
    { id: "early" as FeeSeason, label: "Early Bird", window: "16 March – 15 April 2027" },
    { id: "regular" as FeeSeason, label: "Regular", window: "16 April – 31 May 2027" },
  ],
  /**
   * VERIFY: confirm the early-bird vs regular column mapping for the
   * international categories against the brochure image.
   */
  cards: [
    {
      id: "industry",
      label: "Industry Professionals",
      india: { early: 3500, regular: 4500 },
      international: { early: 50, regular: 60 },
    },
    {
      id: "academia",
      label: "Academia",
      india: { early: 3500, regular: 4500 },
      international: { early: 35, regular: 45 },
    },
    {
      id: "scholars",
      label: "Research Scholars & Students",
      detail: "Research scholars and students",
      india: { early: 1500, regular: 2000 },
      international: { early: 25, regular: 30 },
    },
    {
      id: "additional-author",
      label: "Additional Author Registration",
      india: { early: 1000, regular: 1000 },
      international: { early: 15, regular: 20 },
    },
  ] satisfies FeeCard[],
  gstNote: "Fees are inclusive of GST.",
  includes: [
    "Conference Kit",
    "Conference Lunch",
    "High Tea",
    "Paper presentation and entry to all the sessions",
    "E-certificates",
  ],
  /**
   * Bank details are hidden by default (SHOW_BANK_DETAILS = false).
   * TODO/VERIFY: confirm account name, number and IFSC with the conference desk
   * before surfacing them publicly.
   */
  bank: {
    accountName: "JAIN UNIVERSITY",
    accountNumber: "60143268072",
    bank: "Bank of Maharashtra",
    branch: "J P Nagar 6th Phase",
    ifsc: "MAHB0001155",
    micr: "560014013",
    swift: "MAHBINBBBGL",
    note: "Please confirm with the conference desk before transferring.",
  },
} as const;

export const publication = {
  title: "Publication and outcomes",
  items: [
    {
      title: "Peer-reviewed paper presentations",
      detail: "Present your work to an academic and industry audience.",
      icon: "Presentation" as PublicationIcon,
    },
    {
      title: "Expert feedback",
      detail: "Comments from reviewers and session chairs.",
      icon: "MessageSquareQuote" as PublicationIcon,
    },
    {
      title: "ISBN-based abstract publication",
      detail: "Accepted abstracts are published with an ISBN.",
      icon: "BookMarked" as PublicationIcon,
    },
    {
      title: "Possible proceedings/journal opportunities",
      detail: "Selected papers may be considered for proceedings or journals.",
      icon: "LibraryBig" as PublicationIcon,
    },
  ],
} as const;

export const institutions = {
  jain: {
    name: "JAIN (Deemed-to-be University)",
    body: "Ranked among the top universities in India, JAIN is known for education, entrepreneurship, research and sports, with entrepreneurs and sportspersons among its alumni.",
    highlights: [
      { value: "A++", label: "NAAC accreditation", detail: "CGPA 3.71" },
      { value: "62", label: "NIRF 2025 rank" },
    ],
    award:
      "Khel Protsahan Rashtriya Puraskar 2023, Ministry of Youth Affairs and Sports, Government of India — category “Identification and Nurturing of Budding/Young Talent”.",
  },
  cms: {
    name: "CMS Business School",
    body: "India’s leading business school with an international perspective. The MBA is built on a strong foundation in academic research.",
    highlights: [
      { value: "73", label: "NIRF 2025 rank" },
      { value: "NBA", label: "MBA accreditation" },
    ],
    memberships: ["AACSB (USA)", "BGA (UK)"],
    rankingNote:
      "Times B-School Ranking 2024: 21st in the top 100 business schools and 10th among the top 40 private universities in India.",
  },
  /**
   * TODO(assets): place real SVG/PNG logo files in /public/logos using these
   * filenames. Until then the UI renders clean typographic placeholders.
   */
  partners: [
    { name: "Brest Business School", country: "France", logo: "/logos/brest-business-school.svg" },
    { name: "ASSOCHAM", country: "India", logo: "/logos/assocham.svg" },
    { name: "AACSB", country: "USA", logo: "/logos/aacsb.svg" },
    { name: "BGA", country: "UK", logo: "/logos/bga.svg" },
  ],
} as const;

/**
 * Committee group assignments are a best-effort reading of the brochure PDF.
 * TODO/VERIFY: confirm every name spelling, designation and committee grouping
 * with the conference secretariat.
 */
export const committee = {
  leadership: [
    { name: "Dr. Chenraj Roychand", role: "Chancellor", group: "Chief Patron" },
    { name: "Dr. J. Letha", role: "Vice-Chancellor", group: "Patron" },
  ],
  groups: [
    {
      id: "advisory",
      label: "Advisory Board",
      members: [
        { name: "Sri. Ravindra Bhandary", role: "Vice President, JGI Group" },
        { name: "Dr. N Sundararajan", role: "Member, JGI Steering Board" },
        { name: "Dr. N V H Krishnan", role: "Chancellor’s Advisory Board" },
        { name: "Prof. N S Manjunath", role: "Controller of Examinations" },
        { name: "Mr. M S Santhosh", role: "Joint Registrar" },
        { name: "Dr. Easwaran Iyer", role: "Chancellor’s Advisory Board" },
        { name: "Prof. K Sridhara Murthi", role: "Chancellor’s Advisory Board" },
        {
          name: "Ms. Aparna Prasad",
          role: "Director, Communications, HR and Student Fee Services",
        },
        { name: "Mr. M S Paraswanath", role: "Director, Projects and Facilities" },
        { name: "Dr. Shradha Kanwar", role: "Chief Academic Officer" },
        { name: "Dr. S A Hariprasad", role: "Dean, Academics" },
        {
          name: "Dr. Krishna Koppa",
          role: "Deputy Director, CMS Business School; HOD, Department of Management Studies",
        },
      ],
    },
    {
      id: "convener",
      label: "Convener",
      members: [{ name: "Dr. Umesh Chandra", role: "Associate Professor" }],
    },
    {
      id: "co-convener",
      label: "Co-Convener",
      members: [{ name: "Dr. Madhavi Kappagantula", role: "Assistant Professor" }],
    },
    {
      id: "conference-committee",
      label: "Conference Committee",
      members: [
        { name: "Dr. Sudarshan V Seshanna", role: "Professor" },
        { name: "Ms. Suparna Ghosal", role: "Adjunct Faculty" },
        { name: "Dr. Smita M Gaikwad", role: "Associate Professor" },
        { name: "Dr. Halaswamy D", role: "Assistant Professor" },
        { name: "Dr. Tejaswini S", role: "Assistant Professor" },
        { name: "Dr. Shakeela Banu C", role: "Adjunct Faculty" },
        { name: "Dr. Shrinivas Patil", role: "Professor" },
        { name: "Dr. Vinayak Anil Bhat", role: "Associate Professor" },
        { name: "Dr. Pujari Sudharsana Reddy", role: "Assistant Professor" },
        { name: "Dr. Ravishankar S Ulle", role: "Associate Professor" },
      ],
    },
    {
      id: "organising-committee",
      label: "Organising Committee",
      members: [
        { name: "Ms. Jyothi M", role: "Teaching Assistant" },
        { name: "Ms. Varalakshmi R C", role: "Teaching Assistant" },
        { name: "Ms. Umme Rumani", role: "Admin Executive" },
      ],
    },
    {
      id: "programme-management",
      label: "Programme Management Committee",
      members: [
        { name: "Dr. Anantha Subramanya Iyer K N", role: "Associate Professor and Area Chair" },
        { name: "Dr. Ravichandran K", role: "Professor" },
        { name: "Dr. Selvi", role: "Professor" },
        { name: "Ms. Ishita Gopi", role: "Assistant Professor" },
        { name: "Dr. Saurabh Srivastava", role: "Professor" },
        { name: "Dr. Sudarshan V Seshanna", role: "Professor" },
        { name: "Dr. Trupti Dandekar Humnekar", role: "Professor" },
        { name: "Mr. Rahul Gupta", role: "Adjunct Faculty" },
        { name: "Dr. Kalavathy K S", role: "Associate Professor" },
        { name: "Dr. M Govindaraj", role: "Associate Professor" },
        { name: "Dr. Mahalakshmi S", role: "Associate Professor" },
        { name: "Dr. Sharat Kumar", role: "Adjunct Faculty" },
        { name: "Mr. Navaneeth S", role: "Teaching Assistant" },
        { name: "Dr. Varalakshmi L", role: "Associate Professor" },
      ],
    },
  ] satisfies CommitteeGroup[],
} as const;

export const contact = {
  title: "Contact",
  lead: "For submissions, registration and conference enquiries, reach the conference desk.",
  // TODO/VERIFY: confirm the contact person, phone number and email address.
  details: [
    { label: "Conference contact", value: "Dr. Smita M Gaikwad" },
    { label: "Phone", value: "+91 88611 15612", href: "tel:+918861115612" },
    { label: "Email", value: "conference.desk@jainuniversity.ac.in", href: "mailto:conference.desk@jainuniversity.ac.in" },
    { label: "Venue", value: "JAIN (Deemed-to-be University), CMS Business School, Bengaluru" },
  ],
  // TODO(map): replace with the confirmed Google Maps embed URL for the campus.
  mapEmbedUrl: "",
  copyright: "© 2027 AIM-HUB, JAIN (Deemed-to-be University), CMS Business School",
} as const;
