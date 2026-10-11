"use client"
import { useState } from "react"
import { Nav, AccessModal } from "@/components/shared"
import { Hero, Converge, Trust, Matching, Flow } from "@/components/scenes"
import { Feed } from "@/components/feed"
import { Preview } from "@/components/preview"
export default function Page(){
  const [open,setOpen]=useState(false)
  return <main><Nav onJoin={()=>setOpen(true)}/><Hero onJoin={()=>setOpen(true)}/><Converge/><Feed/><Trust/><Matching/><Flow/><Preview/>
    <section className="bg-dark px-6 py-32 text-canvas md:px-12"><h2 className="display text-5xl md:text-8xl">The next great company may already be building.</h2><p className="display mt-4 text-3xl text-coral">Be early.</p>
      <div className="mt-8 flex gap-3"><button onClick={()=>setOpen(true)} className="rounded-full bg-coral px-6 py-3 transition hover:brightness-110 active:scale-95">Request early access</button><a href="#trust" className="rounded-full border border-white/25 px-6 py-3">Explore the model</a></div>
      <p className="mt-10 max-w-xl text-xs text-white/50">Showcase prototype. Not a regulated platform; no securities are offered and no payments are processed. All companies and figures are fictional.</p></section>
    <AccessModal open={open} onClose={()=>setOpen(false)}/></main>
}
