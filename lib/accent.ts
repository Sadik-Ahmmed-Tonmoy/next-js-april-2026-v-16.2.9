import { useSyncExternalStore } from "react";
import { FLAVORS } from "./products";

/** Tiny shared store: the accent colour of the flavour currently selected in each section.
 *  Hero and Shop write to it, the Header reads it (so the navbar can follow whichever is on screen). */
export type Section = "home" | "shop";

const INITIAL: Record<Section, string> = {
  home: FLAVORS[0].accent, // Hero starts on the first flavour
  shop: FLAVORS.find((f) => f.id === "green")!.accent, // Shop starts on Nitro Green
};

let state = INITIAL;
const listeners = new Set<() => void>();

export function setSectionAccent(section: Section, color: string) {
  if (state[section] === color) return;
  state = { ...state, [section]: color };
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; };

export function useSectionAccent(section: Section) {
  return useSyncExternalStore(subscribe, () => state[section], () => INITIAL[section]);
}
