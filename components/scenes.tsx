"use client"
import { motion, useTransform, useSpring, useMotionValueEvent, MotionValue } from "framer-motion"
import { useState } from "react"
import { useStory, useCalm } from "./shared"
import { opportunities, investor } from "@/data/opportunities"
import { usd } from "@/lib/utils"

const frags = [["AI infrastructure",8,12],["$3,000 seeking",62,8],["MVP",30,38],["Founder verified",70,42],["$1,500 available",12,66],["Fintech",52,70],["2.4x watchlist growth",78,78],["$500 available",38,88]] as const
function Frag({ t, x, y, i, p, calm }:{ t:string; x:number; y:number; i:number; p:MotionValue<number>; calm:boolean }){
  const cap=t.includes("available")
  const dx=useTransform(p,[0,1],["0vw",`${calm?0:(cap?1:-1)*(8+i*2)}vw`])
  return <motion.div style={{left:`${x}%`,top:`${y}%`,x:dx}} animate={calm?{}:{y:[0,-8,0]}} transition={{duration:6+i,repeat:Infinity}}
    className={`absolute hidden rounded-xl border bg-white px-3 py-2 text-xs shadow-sm md:block ${cap?"border-ok/40 text-ok":"border-ink/10"}`}>{t}</motion.div>
}
export function Hero({ onJoin }:{ onJoin:()=>void }){
  const { ref, p } = useStory(1); const calm = useCalm()
  return <section ref={ref} id="top" className="relative h-[220vh]">
    <div className="sticky top-0 h-screen overflow-hidden px-6 md:px-12">
      {frags.map(([t,x,y],i)=><Frag key={t} t={t} x={x} y={y} i={i} p={p} calm={calm}/>)}
      <div className="relative z-10 pt-[22vh]"><p className="meta">Scene 01 · The market is forming</p>
        <h1 className="display mt-4 max-w-4xl text-5xl md:text-8xl">Capital for the stage before the spotlight.</h1>
        <p className="mt-6 max-w-md text-muted">An early-stage marketplace connecting ambitious builders with people willing to back them early.</p>
        <div className="mt-8 flex gap-3"><button onClick={onJoin} className="rounded-full bg-coral px-6 py-3 text-white transition hover:brightness-110 active:scale-95">Join the early network</button>
        <a href="#trust" className="rounded-full border border-ink/20 px-6 py-3 transition hover:border-ink">See how it works</a></div></div>
    </div></section>
}
export function Converge(){
  const { ref, p } = useStory(1)
  const l = useTransform(p,[0,.6],["-30%","0%"]), r = useTransform(p,[0,.6],["30%","0%"]), line = useTransform(p,[.5,.8],[0,1])
  return <section ref={ref} className="relative h-[240vh] bg-dark text-canvas"><div className="sticky top-0 grid h-screen place-items-center overflow-hidden px-6">
    <p className="meta absolute left-6 top-24 !text-white/50 md:left-12">Scene 02 · Two sides of the market</p>
    <div className="relative flex w-full max-w-5xl items-center justify-between gap-4">
      <motion.div style={{x:l}} className="w-5/12 rounded-3xl border border-white/15 p-6 md:p-10"><p className="meta !text-coral">Builder</p><p className="display mt-4 text-2xl md:text-5xl">I have something worth building.</p></motion.div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden><motion.path d="M40 10 C 48 10, 52 10, 60 10" stroke="#F0304F" strokeWidth=".4" fill="none" style={{pathLength:line}}/></svg>
      <motion.div style={{x:r}} className="w-5/12 rounded-3xl border border-white/15 p-6 md:p-10"><p className="meta !text-ok">Investor</p><p className="display mt-4 text-2xl md:text-5xl">I have capital worth deploying.</p></motion.div></div>
    <motion.p style={{opacity:line}} className="absolute bottom-24 text-sm text-white/60">Builder → Opportunity ← Investor</motion.p></div></section>
}
const layers:[string,string][] = [["Identity","Verified"],["Company","Verified"],["Product","Verified"],["Traction","Verified"],["Documents","Reviewed"]]
export function Trust(){
  const { ref, stage } = useStory(7); const o = opportunities[0]
  return <section ref={ref} id="trust" className="relative h-[320vh]"><div className="sticky top-0 grid h-screen items-center gap-10 px-6 md:grid-cols-2 md:px-12">
    <div><p className="meta">Scene 04 · The trust layer</p><h2 className="display mt-3 text-4xl md:text-6xl">Verification doesn’t mean a startup will succeed.</h2>
      <motion.p animate={{opacity:stage>=6?1:.15}} className="mt-5 max-w-md text-lg">It means claims can be inspected before conviction becomes capital.</motion.p></div>
    <div className="rounded-3xl border border-ink/10 bg-white p-6"><p className="display text-2xl">{o.name}</p>
      <ul className="mt-4 divide-y divide-ink/10">{layers.map(([n,l],i)=>{const on=stage>i; return <li key={n} className="flex items-center justify-between py-3"><span className="meta">{n}</span>
        <motion.span animate={{opacity:on?1:.3,x:on?0:12}} className={`text-sm font-medium ${on?"text-ok":"text-muted"}`}>{on?`${l} ✓`:"Checking…"}</motion.span></li>})}</ul>
      <p className="mt-4 text-xs text-warn">Risk: {o.risks.join(" · ")}</p></div></div></section>
}
function Count({ to }:{ to:number }){ const [v,setV]=useState(0); const s=useSpring(0,{stiffness:80,damping:20}); useMotionValueEvent(s,"change",x=>setV(Math.round(x))); s.set(to); return <>{v}</> }
export function Matching(){
  const { ref, stage } = useStory(3)
  const ranked=[...opportunities].sort((a,b)=>b.matchScore-a.matchScore).slice(0,3)
  return <section ref={ref} id="matching" className="relative h-[240vh] bg-white"><div className="sticky top-0 grid h-screen items-center gap-10 px-6 md:grid-cols-2 md:px-12">
    <div className="rounded-3xl border border-ink/10 bg-canvas p-6"><p className="meta">Scene 05 · Investor profile (demo)</p>
      <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">{[["Available",usd(investor.capital)],["Sectors",investor.sectors.join(", ")],["Stage",investor.stage],["Allocation",investor.allocation],["Risk appetite",investor.risk]].map(([k,v])=><div key={k}><dt className="meta">{k}</dt><dd className="mt-1 font-medium">{v}</dd></div>)}</dl>
      <p className="mt-6 text-xs text-muted">Capital + Stage + Sector + Risk + Preferences → Opportunity match. A match measures compatibility, not investment quality.</p></div>
    <div className="space-y-3">{ranked.map((o,i)=><motion.div key={o.id} animate={{opacity:stage>=i?1:.2}} className="rounded-2xl border border-ink/10 p-4"><div className="flex justify-between"><span className="display text-xl">{o.name}</span><span className="font-medium text-coral">{stage>=i?<Count to={o.matchScore}/>:0}% match</span></div>
      <div className="mt-3 h-1.5 rounded bg-ink/10"><motion.div className="h-full rounded bg-coral" animate={{width:stage>=i?`${o.matchScore}%`:"0%"}}/></div></motion.div>)}</div></div></section>
}
const flow=["Investor interest","Due diligence","Offering","Funds held by regulated infrastructure","Legal instrument","Ownership record","Portfolio"]
export function Flow(){
  const { ref, stage } = useStory(flow.length)
  return <section ref={ref} className="relative h-[320vh] bg-dark text-canvas"><div className="sticky top-0 flex h-screen flex-col justify-center px-6 md:px-12">
    <p className="meta !text-white/50">Scene 06 · From interest to ownership</p>
    <ol className="mt-6 space-y-2">{flow.map((f,i)=><motion.li key={f} animate={{opacity:stage>=i?1:.2,x:stage>=i?0:-12}} className={`display text-2xl md:text-4xl ${stage===i?"text-coral":""}`}>{String(i+1).padStart(2,"0")} {f}</motion.li>)}</ol>
    <p className="mt-8 max-w-lg text-xs text-white/60">Conceptual transaction flow — production settlement would be handled through regulated financial infrastructure. This prototype processes no payments.</p></div></section>
}
