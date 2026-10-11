"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { holdings, updates, investor } from "@/data/opportunities"
import { usd } from "@/lib/utils"
export function Preview(){
  const [role,setRole]=useState<"builder"|"investor">("investor")
  const total=holdings.reduce((a,h)=>a+h.amount,0)
  return <section id="preview" className="px-6 py-28 md:px-12"><p className="meta">Scene 07 · One ecosystem, two views</p>
    <div role="tablist" className="mt-4 inline-flex rounded-full border border-ink/15 p-1">{(["builder","investor"] as const).map(r=><button key={r} role="tab" aria-selected={role===r} onClick={()=>setRole(r)} className={`rounded-full px-5 py-2 text-sm transition ${role===r?"bg-ink text-canvas":""}`}>I am {r==="builder"?"a builder":"an investor"}</button>)}</div>
    <motion.div key={role} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="mt-8 grid gap-6 md:grid-cols-2">
    {role==="investor"?<>
      <div className="rounded-3xl border border-ink/10 bg-white p-6"><h3 className="display text-3xl">Your early portfolio</h3><p className="mt-2 text-sm text-muted">{usd(total)} deployed (demo) · {holdings.length} opportunities · 3 sectors · 2 countries</p>
        <ul className="mt-4 divide-y divide-ink/10">{holdings.map(h=><li key={h.id} className="flex justify-between py-2 text-sm"><span>{h.name}</span><span>{usd(h.amount)} · <span className="text-ok">{h.status}</span></span></li>)}</ul></div>
      <div className="rounded-3xl border border-ink/10 bg-white p-6"><p className="meta">Founder updates</p><ul className="mt-3 space-y-2">{updates.map(u=><li key={u}>{u}</li>)}</ul><p className="meta mt-6">Available capital</p><p className="display text-3xl">{usd(investor.capital)}</p></div></>
    :<>
      <div className="rounded-3xl border border-ink/10 bg-white p-6"><h3 className="display text-3xl">OrbitLayer fundraising profile</h3><p className="mt-2 text-sm text-muted">Seeking {usd(7500)} · 1,800 beta developers</p>
        <div className="mt-4 h-2 rounded bg-ink/10"><motion.div initial={{width:0}} animate={{width:"46%"}} transition={{duration:.8}} className="h-full rounded bg-coral"/></div><p className="mt-2 text-xs text-muted">Demo funding progress: 46% interest-indicated. No funds collected.</p></div>
      <div className="rounded-3xl border border-ink/10 bg-white p-6"><p className="meta">Investor matches (anonymous)</p><ul className="mt-3 space-y-2 text-sm">{[94,89,83].map((m,i)=><li key={i} className="flex justify-between"><span>Micro-angel #{i+1}</span><span className="text-coral">{m}% match</span></li>)}</ul><p className="meta mt-6">Verification</p><p className="text-sm text-ok">5 of 5 layers complete</p></div></>}
    </motion.div></section>
}
