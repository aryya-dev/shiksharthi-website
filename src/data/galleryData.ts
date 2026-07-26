export type GalleryCategory =
  | "our-classrooms"
  | "turf-celebrations"
  | "annual-function";

export interface GalleryCategoryTab {
  id: GalleryCategory;
  label: string;
}

export interface GalleryItem {
  id: number | string;
  category: GalleryCategory;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  title: string;
  description?: string;
  aspectRatio: "portrait" | "landscape" | "square" | "tall";
  duration?: string;
}

export const GALLERY_CATEGORIES: GalleryCategoryTab[] = [
  {
    id: "our-classrooms",
    label: "Our Classrooms",
  },
  {
    id: "turf-celebrations",
    label: "Turf & Celebrations",
  },
  {
    id: "annual-function",
    label: "Annual Function",
  },
];

// =========================
// OUR CLASSROOMS
// =========================

const classroomItems: GalleryItem[] = Array.from(
  { length: 57 },
  (_, index) => ({
    id: index + 1,
    category: "our-classrooms",
    type: "image",
    src: `/gallery/classroom/classroom-${String(index + 1).padStart(3, "0")}.jpg`,
    title: `Classroom Session ${index + 1}`,
    description:
      "Interactive classroom sessions at Shiksharthi Academic Institute.",
    aspectRatio: "landscape",
  })
);

// =========================
// TURF & CELEBRATIONS
// =========================

const celebrationItems: GalleryItem[] = Array.from(
  { length: 20 },
  (_, index) => ({
    id: 100 + index + 1,
    category: "turf-celebrations",
    type: "image",
    src: `/gallery/celebration/celebration-${String(index + 1).padStart(
      3,
      "0"
    )}.jpg`,
    title: `Celebration ${index + 1}`,
    description:
      "Memorable celebrations, student activities and special moments at Shiksharthi.",
    aspectRatio: "landscape",
  })
);

// =========================
// ANNUAL FUNCTION
// (Currently Empty)
// =========================

const annualFunctionItems: GalleryItem[] = [];

// =========================
// EXPORT
// =========================

export const GALLERY_ITEMS: GalleryItem[] = [
  ...classroomItems,
  ...celebrationItems,
  ...annualFunctionItems,
];