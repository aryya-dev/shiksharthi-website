export type NavItemType = "section" | "page";

export interface NavItem {
  id: string;
  label: string;
  type: NavItemType;
  target: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: "about",
    label: "About",
    type: "section",
    target: "about",
  },
  {
    id: "programs",
    label: "Programs",
    type: "section",
    target: "programs",
  },
  {
    id: "achievers",
    label: "Achievers",
    type: "page",
    target: "/achievers",
  },
  {
    id: "gallery",
    label: "Gallery",
    type: "section",
    target: "gallery",
  },
  {
    id: "testimonials",
    label: "Testimonials",
    type: "section",
    target: "testimonials",
  },
  {
    id: "contact",
    label: "Contact",
    type: "section",
    target: "contact",
  },
];
