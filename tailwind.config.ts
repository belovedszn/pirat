import type { Config } from "tailwindcss"
export default { content: ["./app/**/*.tsx","./components/**/*.tsx"], theme: { extend: {
 colors: { canvas:"#F5F4F0", ink:"#101114", muted:"#686B73", coral:"#F0304F", ok:"#0E9F6E", warn:"#D98A0B", bad:"#B3162D", dark:"#0E0F12" },
 fontFamily: { display:["var(--font-display)"], sans:["var(--font-body)"] } } }, plugins: [] } satisfies Config
