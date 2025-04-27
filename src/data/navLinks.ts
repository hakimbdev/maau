import { NavLink } from "../types";

export const navLinks: NavLink[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
    children: [
      {
        title: "Our History",
        href: "/about/history",
      },
      {
        title: "Vision & Mission",
        href: "/about/vision-mission",
      },
      {
        title: "Leadership",
        href: "/about/leadership",
      },
      {
        title: "Campus Tour",
        href: "/about/campus-tour",
      },
    ],
  },
  {
    title: "Academics",
    href: "/academics",
    children: [
      {
        title: "Undergraduate Programs",
        href: "/academics/undergraduate",
      },
      {
        title: "Graduate Programs",
        href: "/academics/graduate",
      },
      {
        title: "Faculties",
        href: "/academics/faculties",
      },
      {
        title: "Academic Calendar",
        href: "/academics/calendar",
      },
    ],
  },
  {
    title: "Admissions",
    href: "/admissions",
    children: [
      {
        title: "Undergraduate",
        href: "/admissions/undergraduate",
      },
      {
        title: "Graduate",
        href: "/admissions/graduate",
      },
      {
        title: "International Students",
        href: "/admissions/international",
      },
      {
        title: "Tuition & Fees",
        href: "/admissions/tuition",
      },
      {
        title: "Scholarships",
        href: "/admissions/scholarships",
      },
    ],
  },
  {
    title: "Campus Life",
    href: "/campus-life",
    children: [
      {
        title: "Student Organizations",
        href: "/campus-life/organizations",
      },
      {
        title: "Housing",
        href: "/campus-life/housing",
      },
      {
        title: "Dining",
        href: "/campus-life/dining",
      },
      {
        title: "Sports & Recreation",
        href: "/campus-life/sports",
      },
    ],
  },
  {
    title: "Research",
    href: "/research",
  },
  {
    title: "News & Events",
    href: "/news-events",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];