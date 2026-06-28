export const SITE = {
  name: "Polar Plunge Therapy Co.",
  shortName: "Polar Plunge",
  tagline: "Clinically supervised cold exposure, minus the bravado",
  city: "Reykjavik",
  country: "Iceland",
  established: "2020",
  priceRange: "$$$",
  hours: "Mon–Fri 07:00–19:00 · Sat 08:00–14:00 · Closed Sunday",
  socials: {
    instagram: "@polarplunge.clinic",
    data: "@adaptationdata",
  },
};

/** Misty Reykjavik landscape imagery (Wix Media). Build sized, format-negotiated URLs. */
const MEDIA = {
  mistHero: "a7fb22_a42380624624423aad213fad38b6e987~mv2.jpg",
  mistWater: "a7fb22_623f1887e07443d09dbcdc064a429d48~mv2.jpg",
  mistVapor: "a7fb22_b530e1e4ea1b46debb99e08cc9a0e551~mv2.jpg",
  surface: "a7fb22_61c727b382c943d2ba687b644a09ff97~mv2.jpg",
  mistDeep: "a7fb22_e5dce530920f4fd0a4950eb083a8df6f~mv2.jpg",
  mistHorizon: "a7fb22_8f83bb53a37b46f7a25a787fe048d693~mv2.jpg",
  mistRipple: "a7fb22_9215f375f902433f807ee71fb2e2d93a~mv2.jpg",
};

export function wixImg(key: keyof typeof MEDIA, w: number, h: number): string {
  return `https://static.wixstatic.com/media/${MEDIA[key]}/v1/fill/w_${w},h_${h},al_c,q_82,enc_auto/${key}.jpg`;
}

export const NAV_LINKS = [
  { label: "Protocol", href: "/protocol" },
  { label: "Safety", href: "/safety" },
  { label: "Evidence", href: "/evidence" },
  { label: "Data", href: "/data" },
  { label: "Clinic", href: "/about" },
];

export const FAQ = [
  {
    question: "Do I need medical clearance before starting?",
    answer:
      "Yes. Every client completes a health questionnaire and a cardiac screen with our partnering cardiologist before the first immersion. No clearance, no water. There are no exceptions.",
  },
  {
    question: "Who should not do cold-exposure therapy?",
    answer:
      "People with uncontrolled hypertension, certain arrhythmias, recent cardiac events, Raynaud's, cold urticaria, or who are pregnant are typically not cleared. The screening exists to find these before, not after, and we do turn people away.",
  },
  {
    question: "How cold is the water and how long do I stay in?",
    answer:
      "The protocol starts around 12 degrees Celsius for short, supervised exposures and progresses over eight weeks. Every temperature and duration is written into your program; nothing is improvised or pushed past your tolerance.",
  },
  {
    question: "What exactly do you measure?",
    answer:
      "Resting heart rate, heart-rate variability, perceived recovery, and adherence. You see your own trend lines on a dashboard so the result is data you can read, not a feeling you have to take on faith.",
  },
  {
    question: "Is there real evidence behind this, or is it a trend?",
    answer:
      "There is moderate evidence for reduced inflammation and short-term mood lift, and weaker evidence for the bigger claims. Our evidence page summarizes the studies honestly, including where the research is thin.",
  },
  {
    question: "Is a supervisor present during immersions?",
    answer:
      "Always. A trained supervisor stays on the deck for every session and monitors your response. Cold exposure carries real cardiovascular load, and we treat it that way.",
  },
];

/** The 8-week protocol: temperature decreases, duration increases. */
export const PROTOCOL_WEEKS = [
  { week: 1, tempC: 12, duration: "0:30", monitoring: "Cold-shock response, heart rate" },
  { week: 2, tempC: 11, duration: "1:00", monitoring: "Heart rate, breathing control" },
  { week: 3, tempC: 10, duration: "1:30", monitoring: "Heart rate, blood pressure" },
  { week: 4, tempC: 9, duration: "2:00", monitoring: "HRV, perceived recovery" },
  { week: 5, tempC: 8, duration: "2:30", monitoring: "HRV, resting heart rate" },
  { week: 6, tempC: 7, duration: "3:00", monitoring: "HRV, recovery, adherence" },
  { week: 7, tempC: 6, duration: "3:30", monitoring: "Full panel review" },
  { week: 8, tempC: 5, duration: "4:00", monitoring: "Full panel + program report" },
];
