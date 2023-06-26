// Brought in to fix gtag "Property does not exist on type 'Window & typeof globalThis"
// https://bobbyhadz.com/blog/typescript-property-does-not-exist-on-type-window

export {}

declare global {
  interface Window {
    gtag: (arg1, arg2, arg3) => void
  }
}
