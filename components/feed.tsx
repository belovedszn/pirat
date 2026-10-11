"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, Check } from "lucide-react"
import { opportunities, Opportunity } from "@/data/opportunities"
import { Modal, Status, AccessModal } from "./shared"
import { usd } from "@/lib/utils"
export function Feed(){
  const [stage,setStage]=useState("All"); const [sel,setSel]=useState<Opportunity|null>(null); const [watch,setWatch]=useState<string[]>([]); const [access,setAccess]=useState(false)
  const stages=["All",...Array.from(new Set(opportunities.map(o=>o.stage)))]
  const list=opportunities.filter(o=>stage==="All"||o.stage===stage)
  const toggle=(id:string)=>setWatch(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id])
  return <section id="discover" className="px-6 py-28 md:px-12"><p className="meta">Scene 03 · Discovery</p><h2 className="display mt-3 text-4xl md:text-6xl">Opportunities</h2>
    <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by stage">{stages.map(s=><button key={s} aria-pressed={stage===s} onClick={()=>setStage(s)} className={`rounded-full border px-4 py-1.5 text-sm transition ${stage===s?"border-ink bg-ink text-canvas":"border-ink/15 hover:border-ink"}`}>{s}</button>)}</div>
    <div className="mt-8 grid gap-4 md:grid-cols-3">{list.map(o=><motion.article layout key={o.id} whileHover={{y:-4}} className="rounded-3xl border border-ink/10 bg-white p-6">
      <div className="flex justify-between"><h3 className="display text-2xl">{o.name}</h3><span className="text-sm font-medium text-coral">{o.matchScore}% match</span></div>
      <p className="mt-2 text-sm text-muted">{o.description}</p><p className="meta mt-4">{o.stage} · {o.sector}</p>
      <p className="mt-3 text-sm">Seeking <b>{usd(o.ask)}</b> · {o.traction}</p><div className="mt-2"><Status ok={o.verification.founder} label="Founder"/></div>
      <div className="mt-5 flex gap-2"><button onClick={()=>setSel(o)} className="rounded-full bg-ink px-4 py-2 text-sm text-canvas transition hover:bg-coral">View opportunity</button>
      <button onClick={()=>toggle(o.id)} className="inline-flex items-center gap-1 rounded-full border border-ink/15 px-4 py-2 text-sm">{watch.includes(o.id)?<><Check size={14}/>Watching</>:<><Eye size={14}/>Watch</>}</button></div></motion.article>)}</div>
    <p className="mt-6 text-xs text-muted">All companies are fictional. Prototype data.</p>
    <Modal open={!!sel} onClose={()=>setSel(null)}>{sel&&<div className="max-h-[75vh] overflow-auto text-sm"><h3 className="display text-3xl">{sel.name}</h3><p className="mt-1 text-muted">{sel.description}</p>
      <dl className="mt-4 space-y-2">{([["Founder",sel.founder],["Stage",sel.stage],["Capital sought",usd(sel.ask)],["Use of funds",sel.useOfFunds],["Traction",sel.traction],["Market",sel.market],["Team",sel.team],["Documents",sel.documents.join(", ")],["Investor interest",`${sel.interest} watching`]] as const).map(([k,v])=><div key={k}><dt className="meta">{k}</dt><dd>{v}</dd></div>)}</dl>
      <div className="mt-4 space-y-1">{Object.entries(sel.verification).map(([k,v])=><div key={k}><Status ok={v} label={k[0].toUpperCase()+k.slice(1)}/></div>)}</div>
      <p className="meta mt-4">Risk indicators</p><ul className="list-disc pl-5 text-bad">{sel.risks.map(r=><li key={r}>{r}</li>)}</ul>
      <div className="mt-5 flex gap-2"><button onClick={()=>setAccess(true)} className="rounded-full bg-coral px-4 py-2 text-white">Request access</button><button onClick={()=>toggle(sel.id)} className="rounded-full border border-ink/15 px-4 py-2">{watch.includes(sel.id)?"Watching":"Watch opportunity"}</button></div></div>}</Modal>
    <AccessModal open={access} onClose={()=>setAccess(false)}/></section>
}
