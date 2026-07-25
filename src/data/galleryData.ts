export type GalleryCategory = "our-classrooms" | "turf-celebrations" | "annual-function";

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
  { id: "our-classrooms", label: "Our Classrooms" },
  { id: "turf-celebrations", label: "Turf & Celebrations" },
  { id: "annual-function", label: "Annual Function" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // ================= 1. OUR CLASSROOMS =================
  {
    id: 101,
    category: "our-classrooms",
    type: "image",
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
    title: "Interactive Smart Classroom",
    description: "Faculty delivering concepts using modern digital smartboards for ICSE & CBSE students.",
    aspectRatio: "landscape",
  },
  {
    id: 102,
    category: "our-classrooms",
    type: "image",
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=900&auto=format&fit=crop",
    title: "Dedicated Problem Solving",
    description: "Individual mentorship and step-by-step guidance for JEE & NEET numerical problems.",
    aspectRatio: "portrait",
  },
  {
    id: 103,
    category: "our-classrooms",
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    title: "Physics Practical Demonstration",
    description: "Live experiment showing mechanics and wave optics in our modern science lab.",
    aspectRatio: "landscape",
    duration: "1:15",
  },
  {
    id: 104,
    category: "our-classrooms",
    type: "image",
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=900&auto=format&fit=crop",
    title: "Group Study & Discussion",
    description: "Students collaborating on advanced board & competitive exam test series.",
    aspectRatio: "tall",
  },
  {
    id: 105,
    category: "our-classrooms",
    type: "image",
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=900&auto=format&fit=crop",
    title: "Whiteboard Analytical Discussion",
    description: "Deep-dive into Organic Chemistry mechanisms and calculus fundamentals.",
    aspectRatio: "square",
  },
  {
    id: 106,
    category: "our-classrooms",
    type: "image",
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    title: "Computer & Online Test Practice",
    description: "Simulated computer-based test (CBT) sessions for JEE Main and Advanced.",
    aspectRatio: "landscape",
  },
  {
    id: 107,
    category: "our-classrooms",
    type: "image",
    src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=900&auto=format&fit=crop",
    title: "Classroom Evaluation & Feedback",
    description: "Detailed one-on-one test paper review with senior faculty.",
    aspectRatio: "portrait",
  },
  {
    id: 108,
    category: "our-classrooms",
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    title: "Biology Laboratory Session",
    description: "Microscopic analysis and anatomical model study for NEET aspirants.",
    aspectRatio: "landscape",
    duration: "2:04",
  },
  {
    id: 109,
    category: "our-classrooms",
    type: "image",
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    title: "Conceptual Mathematics Lecture",
    description: "Vectors and 3D geometry breakdown with real-world visualization.",
    aspectRatio: "landscape",
  },
  {
    id: 110,
    category: "our-classrooms",
    type: "image",
    src: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=900&auto=format&fit=crop",
    title: "Doubt Clearing Session",
    description: "Dedicated daily doubt resolution hours after core classes.",
    aspectRatio: "portrait",
  },
  {
    id: 111,
    category: "our-classrooms",
    type: "image",
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    title: "Peer Problem Solving Workshop",
    description: "Encouraging collaborative critical thinking and peer learning.",
    aspectRatio: "landscape",
  },

  // ================= 2. TURF & CELEBRATIONS =================
  {
    id: 201,
    category: "turf-celebrations",
    type: "image",
    src: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop",
    title: "Annual Sports & Turf Cricket",
    description: "Exciting box cricket tournament organized for Shiksharthi students.",
    aspectRatio: "landscape",
  },
  {
    id: 202,
    category: "turf-celebrations",
    type: "image",
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=900&auto=format&fit=crop",
    title: "Saraswati Puja Celebrations",
    description: "Seeking blessings of Goddess Saraswati with traditional rituals and floral decorations.",
    aspectRatio: "portrait",
  },
  {
    id: 203,
    category: "turf-celebrations",
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    title: "Holi Colors of Joy",
    description: "Vibrant festival of colors celebrated together by students and faculty.",
    aspectRatio: "landscape",
    duration: "0:52",
  },
  {
    id: 204,
    category: "turf-celebrations",
    type: "image",
    src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=900&auto=format&fit=crop",
    title: "Teacher's Day Gratitude",
    description: "Heartfelt celebrations and surprise tributes prepared by students for our teachers.",
    aspectRatio: "tall",
  },
  {
    id: 205,
    category: "turf-celebrations",
    type: "image",
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=900&auto=format&fit=crop",
    title: "Annual Student Picnic",
    description: "Outdoor fun, team-building games, and unforgettable memories away from studies.",
    aspectRatio: "square",
  },
  {
    id: 206,
    category: "turf-celebrations",
    type: "image",
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    title: "Turf Football League",
    description: "High-energy intra-institute football match at Baguiati turf ground.",
    aspectRatio: "landscape",
  },
  {
    id: 207,
    category: "turf-celebrations",
    type: "image",
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=900&auto=format&fit=crop",
    title: "Freshers Welcome Party",
    description: "Welcoming new batches with music, games, snacks, and friendship.",
    aspectRatio: "portrait",
  },
  {
    id: 208,
    category: "turf-celebrations",
    type: "image",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    title: "Festival Cultural Gathering",
    description: "Celebration of Bengal cultural heritage and festivals at the institute.",
    aspectRatio: "landscape",
  },

  // ================= 3. ANNUAL FUNCTION =================
  {
    id: 301,
    category: "annual-function",
    type: "image",
    src: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?q=80&w=1200&auto=format&fit=crop",
    title: "Grand Stage Opening",
    description: "Opening lamp lighting ceremony at the annual cultural auditorium.",
    aspectRatio: "landscape",
  },
  {
    id: 302,
    category: "annual-function",
    type: "image",
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=900&auto=format&fit=crop",
    title: "Cultural Dance Performance",
    description: "Mesmerizing group dance act by senior batch students.",
    aspectRatio: "portrait",
  },
  {
    id: 303,
    category: "annual-function",
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
    title: "Prize Distribution & Awards",
    description: "Honoring Board toppers and JEE/NEET rank holders on stage.",
    aspectRatio: "landscape",
    duration: "1:40",
  },
  {
    id: 304,
    category: "annual-function",
    type: "image",
    src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=900&auto=format&fit=crop",
    title: "Musical Band Performance",
    description: "Live musical concert rendered by talented student vocalists and instrumentalists.",
    aspectRatio: "tall",
  },
  {
    id: 305,
    category: "annual-function",
    type: "image",
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop",
    title: "Distinguished Guest Felicitation",
    description: "Chief Guests addressing students and inspiring them for academic excellence.",
    aspectRatio: "square",
  },
  {
    id: 306,
    category: "annual-function",
    type: "image",
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop",
    title: "Batch Group Photo",
    description: "Unforgettable group picture capturing all students, alumni, and faculty.",
    aspectRatio: "landscape",
  },
  {
    id: 307,
    category: "annual-function",
    type: "image",
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
    title: "Auditorium Evening Finale",
    description: "Curtain call performance featuring all student performers.",
    aspectRatio: "landscape",
  },
];
