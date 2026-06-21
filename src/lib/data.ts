export type Project = {
  title: string;
  description: string;
  url: string;
  icon: "cart" | "laptop" | "chart" | "mobile" | "car";
};

export const projects: Project[] = [
  {
    title: "SmartPaws",
    description:
      "An e-commerce and marketing platform that sells sophisticated smart devices for pets.",
    url: "https://pawstore-rust.vercel.app/",
    icon: "cart",
  },
  {
    title: "Diplomatly",
    description:
      "A high performance web application for MUN conferences with real-time updates and interactive features.",
    url: "https://sdimun.vercel.app/",
    icon: "laptop",
  },
  {
    title: "Student Tracking System",
    description:
      "Interactive student tracking platform with real-time visualization.",
    url: "https://gitbot-br4n.vercel.app/",
    icon: "chart",
  },
  {
    title: "RichMUN",
    description: "Fully responsive Model United Nations application.",
    url: "https://rich-mun.vercel.app/",
    icon: "mobile",
  },
  {
    title: "Pizza Hub",
    description: "Modern online pizza store with payment integration.",
    url: "https://pizza-eta-ten.vercel.app/",
    icon: "cart",
  },
  {
    title: "Fastverse",
    description:
      "A visually compelling web application capturing the aesthetic and adrenaline of the Fast & Furious universe.",
    url: "https://fast-ashen.vercel.app/",
    icon: "car",
  },
  {
    title: "Lumigon",
    description: "Work in progress.",
    url: "https://www.lumigon.site/",
    icon: "laptop",
  },
];

export const social = {
  github: "https://github.com/mightydragon07",
  linkedin: "https://www.linkedin.com/in/semika-anusara-13b00a214",
  email: "mailto:semikaanusara3@gmail.com",
  instagram:
    "https://www.instagram.com/_z3m1ka_?igsh=dzh5bTd2eTV1MGtr&utm_source=qr",
};

export const skills = [
  { name: "Web Development", level: 90 },
  { name: "UI/UX Design", level: 85 },
  { name: "Video Editing", level: 80 },
];
