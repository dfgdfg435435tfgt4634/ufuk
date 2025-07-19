import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const services = [
  {
    id: 1,
    name: "Klasik Saç Kesimi",
    price: "₺150",
    duration: "30 dk",
    description: "Profesyonel saç kesimi ve şekillendirme",
    image: "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 2,
    name: "Sakal Tıraşı",
    price: "₺100", 
    duration: "20 dk",
    description: "Geleneksel ustura ile sakal tıraşı",
    image: "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 3,
    name: "Komple Bakım",
    price: "₺200",
    duration: "60 dk", 
    description: "Saç kesimi + sakal tıraşı + yüz bakımı",
    image: "https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 4,
    name: "Fade Kesim",
    price: "₺180",
    duration: "40 dk",
    description: "Modern fade tekniği ile saç kesimi",
    image: "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 5,
    name: "Saç Yıkama",
    price: "₺50",
    duration: "15 dk",
    description: "Premium şampuan ile saç yıkama",
    image: "https://images.pexels.com/photos/1570808/pexels-photo-1570808.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 6,
    name: "Kaş Düzeltme",
    price: "₺75",
    duration: "15 dk",
    description: "Profesyonel kaş şekillendirme",
    image: "https://images.pexels.com/photos/1570809/pexels-photo-1570809.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
]

export const galleryImages = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Klasik saç kesimi",
    category: "saç-kesimi"
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Sakal tıraşı",
    category: "sakal"
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Fade kesim",
    category: "saç-kesimi"
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Komple bakım",
    category: "bakım"
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/1570808/pexels-photo-1570808.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Saç yıkama",
    category: "bakım"
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/1570809/pexels-photo-1570809.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Kaş düzeltme",
    category: "bakım"
  },
  {
    id: 7,
    src: "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Modern kesim",
    category: "saç-kesimi"
  },
  {
    id: 8,
    src: "https://images.pexels.com/photos/1805603/pexels-photo-1805603.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Profesyonel tıraş",
    category: "sakal"
  }
]

export const haircutStyles = {
  fade: {
    name: "Fade Kesim",
    description: "Yanlarda kısa, üstte uzun",
    hairColor: "#2D1810",
    sideColor: "#1A0F08"
  },
  buzz: {
    name: "Buzz Cut", 
    description: "Tüm saç kısa kesilmiş",
    hairColor: "#1F1208",
    sideColor: "#0F0804"
  },
  pompadour: {
    name: "Pompadour",
    description: "Önde yüksek, arkada düz", 
    hairColor: "#3D2415",
    sideColor: "#2D1810"
  },
  crop: {
    name: "Crop Cut",
    description: "Kısa ve düzenli",
    hairColor: "#2A1610", 
    sideColor: "#1A0E08"
  }
}