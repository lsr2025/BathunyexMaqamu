// Static event content for Nokulunga's Journey to MammaLand.

export const SITE = {
  title: "Nokulunga's Journey to MammaLand",
  subtitle: "A Little Explorer Is On The Way",
  welcome:
    "Today we celebrate not only the arrival of a precious baby, but the birth of a mother.",
  date: "20 June 2026",
  venue: "Fire & Vine",
  city: "Pietermaritzburg",
} as const;

export interface ProgrammeItem {
  time: string;
  title: string;
  details?: string[];
}

export const PROGRAMME: ProgrammeItem[] = [
  {
    time: "12:00",
    title: "Gathering at Base Camp",
    details: ["Arrival of Guests", "Welcome Drinks", "Photography & Socialising"],
  },
  {
    time: "12:30",
    title: "Official Welcome",
    details: ["MC — Mrs Lonathemba Shangase"],
  },
  {
    time: "12:35",
    title: "A Blessing For The Journey",
    details: ["Mrs Sne Zondi"],
  },
  {
    time: "12:40",
    title: "Welcome To MammaLand",
    details: ["Mrs Winisile Sibiya"],
  },
  {
    time: "12:50",
    title: "Words From The Village",
    details: ["Family Blessing Moment"],
  },
  {
    time: "13:05",
    title: "Safari Feast",
    details: ["Lunch Service"],
  },
  {
    time: "13:50",
    title: "Wisdom From Experienced Explorers",
    details: ["Mrs Sne Ndlovu", "Ms Zandile Ngcobo"],
  },
  {
    time: "14:10",
    title: "The Little Explorer Guide",
    details: ["Advice Cards"],
  },
  {
    time: "14:25",
    title: "Treasures For The Journey",
    details: ["Gift Presentation"],
  },
  {
    time: "14:50",
    title: "Letters To Baby",
  },
  {
    time: "15:00",
    title: "Toast To The New Adventure",
    details: ["Miss Phelokazi Tshekela"],
  },
  {
    time: "15:05",
    title: "Vote Of Thanks",
  },
  {
    time: "15:10",
    title: "Celebration Of The New Adventure",
    details: ["Cake Cutting", "Photos"],
  },
  {
    time: "15:20",
    title: "The Journey Continues",
    details: ["Dessert", "Social Time"],
  },
];

export interface NavLink {
  href: string;
  label: string;
  short: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home", short: "Home" },
  { href: "/programme", label: "Programme", short: "Programme" },
  { href: "/message-to-mommy", label: "Message to Mommy", short: "Mommy" },
  { href: "/letter-to-baby", label: "Letter to Baby", short: "Baby" },
  { href: "/predictions", label: "Baby Predictions", short: "Predict" },
  { href: "/photos", label: "Photo Memories", short: "Photos" },
  { href: "/guestbook", label: "Guestbook", short: "Guestbook" },
];
