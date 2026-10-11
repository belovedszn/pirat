"use client"
import { useRef, useState } from "react"
import { motion, useScroll, useMotionValueEvent, useReducedMotion, MotionValue } from "framer-motion"
import { Check, Clock, X } from "lucide-react"
export function useStory(count:number){
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset:["start start","end end"] })
  const [stage,setStage] = useState(0)
  useMotionValueEvent(scrollYProgress,"change",v=>setStage(Math.min(count-1,Math.floor(v*count))))
  return { ref, p:scrollYProgress as MotionValue<number>, stage }
}
export function useCalm(){ return !!useReducedMotion() }
export function Status({ ok, label }:{ ok:boolean; label:string }){
  return <span className={`inline-flex items-center gap-1 text-xs font-medium ${ok?"text-ok":"text-warn"}`}>{ok?<Check size={13}/>:<Clock size={13}/>}{label}{ok?" · verified":" · pending"}</span>
}
export function Modal({ open, onClose, children }:{ open:boolean; onClose:()=>void; children:React.ReactNode }){
  if(!open) return null
  return <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4" onClick={onClose}>
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="w-full max-w-md rounded-3xl bg-canvas p-8" onClick={e=>e.stopPropagation()}>
      <button aria-label="Close" onClick={onClose} className="float-right text-muted"><X/></button>{children}</motion.div></div>
}
export function AccessModal({ open, onClose }:{ open:boolean; onClose:()=>void }){
  const [sent,setSent]=useState(false)
  return <Modal open={open} onClose={()=>{setSent(false);onClose()}}>
    <h3 className="display text-3xl">Early access request</h3>
    <p className="mt-3 text-sm text-muted">Prototype only. Nothing is submitted and no money moves.</p>
    {sent? <p className="mt-6 font-medium text-ok">Request recorded locally. Thank you.</p> :
    <><input aria-label="Email" placeholder="you@company.com" className="mt-6 w-full rounded-xl border border-ink/15 bg-white px-4 py-3"/>
    <button onClick={()=>setSent(true)} className="mt-4 w-full rounded-full bg-ink py-3 text-canvas transition active:scale-[.98] hover:bg-coral">Request early access</button></>}
  </Modal>
}
export function Nav({ onJoin }:{ onJoin:()=>void }){
  const [small,setSmall]=useState(false)
  const { scrollY } = useScroll(); useMotionValueEvent(scrollY,"change",v=>setSmall(v>60))
  return <nav className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 md:px-12 transition-all ${small?"h-12 bg-canvas/80 backdrop-blur-md border-b border-ink/10":"h-20"}`}>
    <a href="#top" className="display text-xl">Firstlight<span className="text-coral">.</span></a>
    <div className="hidden gap-8 text-sm md:flex">{[["Discover","#discover"],["How It Works","#trust"],["For Builders","#preview"],["For Investors","#preview"]].map(([l,h])=><a key={l} href={h} className="text-muted hover:text-ink">{l}</a>)}</div>
    <button onClick={onJoin} className="rounded-full bg-ink px-4 py-2 text-sm text-canvas transition hover:bg-coral active:scale-95">Join the early network</button></nav>
}
