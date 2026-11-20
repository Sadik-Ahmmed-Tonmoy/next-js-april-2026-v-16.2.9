export type Flavor = {
  id: string; name: string; price: string; accent: string; img: string; tag: string;
};
export const FLAVORS: Flavor[] = [
  { id: "green", name: "Nitro Green", price: "12.00", accent: "#E0E600", img: "/images/green-can.webp", tag: "High intensity" },
  { id: "red", name: "Nitro Red", price: "11.00", accent: "#FF2E3F", img: "/images/red-can.webp", tag: "High intensity" },
  { id: "sky", name: "Nitro Sky", price: "11.00", accent: "#1FC8EE", img: "/images/sky-can.webp", tag: "High intensity" },
  { id: "blue", name: "Nitro Blue", price: "10.58", accent: "#5B5CFF", img: "/images/blue-can.webp", tag: "High intensity" },
  { id: "gold", name: "Nitro Gold", price: "10.58", accent: "#F6B21C", img: "/images/gold-can.webp", tag: "High intensity" },
];
export const NAV = [
  { label: "Home", href: "#home" }, { label: "Shop", href: "#shop" },
  { label: "About", href: "#about" }, { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];
