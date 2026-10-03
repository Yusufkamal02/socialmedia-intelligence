// All copy and illustrative numbers live here so they are easy to update.

export const contact = {
  name: "Aura Sinergi Partnerships Team",
  email: "partners@aura-sinergi.ai",
};

export const nav = [
  { href: "/", label: "Overview" },
  { href: "/programs", label: "Programs" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/partnership", label: "Partnership" },
  { href: "/roadmap", label: "Roadmap" },
];

// The kind of people we want to partner with, and the role each fits best.
export const lookingFor = [
  {
    from: "You have taught or run financial literacy, church or community programs",
    role: "Local Trainer",
    why: "You know how to explain money and technology in a way people trust.",
  },
  {
    from: "You lead or are active in a student association or youth group",
    role: "Campus Ambassador",
    why: "People already listen to you. A campus pilot can start with your network.",
  },
  {
    from: "You have organised events or brought in sponsors",
    role: "Business Development",
    why: "You can open doors to organisations that want to fund digital skills in PNG.",
  },
  {
    from: "You have a background in business, finance, economics or agriculture",
    role: "Program Co-designer",
    why: "Your knowledge helps shape lessons around real PNG issues.",
  },
];

// Answers to the questions people ask before trusting a new offer.
export const trustPoints = [
  { title: "No fee to join", text: "You never pay anything to become a partner. If anyone asks you for money, it is not us." },
  { title: "Start small", text: "Begin with a short call and a pilot. There is no long contract until both sides are happy." },
  { title: "Paid on results", text: "Your share is calculated from real program revenue, and you can see every number." },
  { title: "Talk to a real person", text: "Every partner gets a video call with our team before anything is agreed." },
];

export const programs = [
  {
    id: "money",
    name: "Digital Money Skills for SMEs",
    tok: "Save long moni",
    audience: "Market sellers, small shop owners, village co-ops",
    duration: "4 weeks · 2 sessions/week",
    outcomes: [
      "Simple bookkeeping on a phone",
      "Reading a sales dashboard",
      "Budgeting, saving and safe mobile money",
    ],
    accent: "red",
  },
  {
    id: "farm",
    name: "Smart Farming with IoT",
    tok: "Gaden i save",
    audience: "Farmers, agriculture students, youth groups",
    duration: "6 weeks · hands-on kits",
    outcomes: [
      "Soil moisture and weather sensors",
      "Automatic watering for gardens",
      "Tracking harvest and market prices",
    ],
    accent: "leaf",
  },
  {
    id: "data",
    name: "Data Analytics for Students",
    tok: "Ritim namba",
    audience: "University students and fresh graduates",
    duration: "8 weeks · project-based",
    outcomes: [
      "Excel to Power BI dashboards",
      "Intro to Python for finance data",
      "A portfolio project on PNG economic data",
    ],
    accent: "gold",
  },
  {
    id: "scholarship",
    name: "Scholarship Pathway",
    tok: "Skul long narapela kantri",
    summary: "Find international scholarships open to Papua New Guineans.",
    audience: "Students, graduates and young professionals",
    duration: "Free guide · Official links only",
    outcomes: [
      "Find scholarships that accept PNG citizens",
      "Prepare requirements, documents and deadlines with a Kirap partner",
      "Apply officially on the provider's own website",
    ],
    accent: "ink",
    href: "/scholarships",
  },
] as const;

// Illustrative commission rates and support for each partnership role.
export const roles = [
  {
    id: "ambassador",
    name: "Campus Ambassador",
    commission: 0.15,
    time: "3–5 hrs / week",
    you: ["Share programs with students and groups", "Gather sign-ups and feedback", "Host one info session per month"],
    we: ["Ready-made posters and slides", "Referral link and tracking", "Monthly payout"],
  },
  {
    id: "trainer",
    name: "Local Trainer",
    commission: 0.35,
    time: "8–12 hrs / week",
    you: ["Deliver classes in English or Tok Pisin", "Run community and village sessions", "Report learner progress"],
    we: ["Full curriculum and trainer guide", "Train-the-trainer certification", "Kits and learning platform access"],
  },
  {
    id: "reseller",
    name: "Regional Reseller",
    commission: 0.25,
    time: "Flexible",
    you: ["Sign up schools, NGOs and companies", "Bring sponsors for scholarships", "Manage local partners"],
    we: ["Sales deck and price list", "Co-branded materials", "Dedicated partner manager"],
  },
] as const;

export const roadmap = [
  {
    month: "Month 1",
    title: "Campus pilot",
    place: "Port Moresby",
    steps: ["Train-the-trainer onboarding", "Launch Data Analytics cohort (20 students)", "First info session with student associations"],
  },
  {
    month: "Month 2",
    title: "Church and student communities",
    place: "NCD & Southern Highlands networks",
    steps: ["Digital Money Skills for small sellers", "Collect testimonials", "Approach first sponsor"],
  },
  {
    month: "Month 3",
    title: "Village outreach",
    place: "Gazelle district, East New Britain",
    steps: ["Smart Farming demo garden", "Money Skills sessions for co-ops", "Review results and plan scale-up"],
  },
];

export const callSlots = [
  // PNG is UTC+10, WIB is UTC+7.
  { png: "10:00 PGT", wib: "07:00 WIB" },
  { png: "13:00 PGT", wib: "10:00 WIB" },
  { png: "16:00 PGT", wib: "13:00 WIB" },
  { png: "19:00 PGT", wib: "16:00 WIB" },
];

export const callDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export type RoleId = (typeof roles)[number]["id"];
export type ProgramId = (typeof programs)[number]["id"];

// Role finder quiz. Each answer adds a point to a role, or picks a program.
export const quiz: {
  question: string;
  answers: { label: string; role?: RoleId; program?: ProgramId }[];
}[] = [
  {
    question: "How much time could you give each week?",
    answers: [
      { label: "A few hours, around work or study", role: "ambassador" },
      { label: "A day or more, I want to teach", role: "trainer" },
      { label: "It depends, I like flexible deals", role: "reseller" },
    ],
  },
  {
    question: "What do you enjoy most?",
    answers: [
      { label: "Talking to students and youth groups", role: "ambassador" },
      { label: "Teaching and explaining things clearly", role: "trainer" },
      { label: "Meeting organisations and making deals", role: "reseller" },
    ],
  },
  {
    question: "Where is your network strongest?",
    answers: [
      { label: "On campus", role: "ambassador" },
      { label: "In villages, churches and communities", role: "trainer" },
      { label: "With businesses, schools and NGOs", role: "reseller" },
    ],
  },
  {
    question: "Which topic excites you most?",
    answers: [
      { label: "Money, savings and small business", program: "money" },
      { label: "Farming and gardens", program: "farm" },
      { label: "Data, numbers and dashboards", program: "data" },
    ],
  },
];

// Turns quiz picks (answer index per question) into a role and program.
// Ties go to Local Trainer. Used by the quiz UI and re-checked by /api/quiz.
export function scoreQuiz(picks: number[]): { role: RoleId; program: ProgramId } {
  const score: Record<RoleId, number> = { ambassador: 0, trainer: 0, reseller: 0 };
  let program: ProgramId = "money";
  picks.forEach((p, q) => {
    const a = quiz[q]?.answers[p];
    if (a?.role) score[a.role] += 1;
    if (a?.program) program = a.program;
  });
  const role = (Object.keys(score) as RoleId[]).reduce((best, r) => (score[r] > score[best] ? r : best), "trainer");
  return { role, program };
}

export const faq = [
  {
    q: "How do I know this offer is real?",
    a: "Before anything is agreed you meet our team on a video call and receive a written partner agreement to read in your own time. We will never ask you for money, bank PINs, passwords or ID documents through this website.",
  },
  {
    q: "Do I have to pay anything to join?",
    a: "No. Becoming a partner is free. If anyone asks you to pay to join Aura Sinergi, please report it to us.",
  },
  {
    q: "How and when do I get paid?",
    a: "Your share is paid monthly, based on the programs you run or refer. Every payment comes with a statement listing each enrolment, so you can check the numbers yourself.",
  },
  {
    q: "Do I need technical skills?",
    a: "No. Trainers get a full curriculum, a trainer guide and a train-the-trainer course before teaching. Ambassadors only need to share and gather sign-ups.",
  },
  {
    q: "Can I do this alongside work or study?",
    a: "Yes. The Ambassador role takes about 3–5 hours a week, and you can move into a bigger role later if you want.",
  },
  {
    q: "What language are the programs in?",
    a: "Materials are in English, and classes can be delivered in English or Tok Pisin, whichever works best for the group.",
  },
];
