export type Verification = { founder:boolean; company:boolean; product:boolean; traction:boolean; documents:boolean }
export type Opportunity = { id:string; name:string; description:string; sector:string; stage:string; ask:number; traction:string; matchScore:number; verification:Verification
  founder:string; useOfFunds:string; market:string; team:string; risks:string[]; documents:string[]; interest:number }
export type Holding = { id:string; name:string; amount:number; status:"Active" }
export const opportunities: Opportunity[] = [
 { id:"orbitlayer", name:"OrbitLayer", description:"Developer infrastructure for African APIs.", sector:"Developer Tools", stage:"MVP", ask:7500, traction:"1,800 beta developers", matchScore:94,
   verification:{founder:true,company:true,product:true,traction:true,documents:true}, founder:"Ada N. (fictional)", useOfFunds:"60% engineering, 25% infra, 15% developer community", market:"Fragmented API access across 20+ markets", team:"2 founders, 1 contractor", risks:["Early traction","Single-founder dependency"], documents:["Pitch memo","Cap table summary","Product demo"], interest:38 },
 { id:"ledgerloop", name:"LedgerLoop", description:"Automated financial operations for African SMEs.", sector:"Fintech", stage:"Early revenue", ask:12000, traction:"MRR $2,400", matchScore:91,
   verification:{founder:true,company:true,product:true,traction:true,documents:false}, founder:"Tunde O. (fictional)", useOfFunds:"Sales hire, compliance tooling", market:"SME back-office automation", team:"3 people", risks:["Founder claims pending review","Short revenue history"], documents:["Revenue export","Pitch memo"], interest:52 },
 { id:"frameforge", name:"FrameForge", description:"Collaborative tooling for independent game developers.", sector:"Creative Tools", stage:"Prototype", ask:3500, traction:"Playable demo", matchScore:88,
   verification:{founder:true,company:false,product:true,traction:false,documents:false}, founder:"Lena K. (fictional)", useOfFunds:"Beta launch, 2 months runway", market:"Indie game studios", team:"Solo founder", risks:["No revenue history","Low verification coverage","Single-founder dependency"], documents:["Demo build"], interest:21 },
 { id:"tidekit", name:"TideKit", description:"Logistics tracking for small coastal traders.", sector:"Logistics", stage:"MVP", ask:5000, traction:"40 pilot traders", matchScore:79,
   verification:{founder:true,company:true,product:false,traction:false,documents:true}, founder:"Kofi A. (fictional)", useOfFunds:"Pilot expansion", market:"Regional informal trade", team:"2 founders", risks:["Early traction"], documents:["Pilot summary"], interest:14 } ]
export const investor = { capital:2000, sectors:["SaaS","AI","Developer Tools"], stage:"Idea → MVP", allocation:"$250–$750", risk:"High" }
export const holdings: Holding[] = [
 {id:"orbitlayer",name:"OrbitLayer",amount:500,status:"Active"},{id:"ledgerloop",name:"LedgerLoop",amount:500,status:"Active"},
 {id:"frameforge",name:"FrameForge",amount:250,status:"Active"},{id:"tidekit",name:"TideKit",amount:750,status:"Active"}]
export const updates = ["OrbitLayer shipped v2.","LedgerLoop reached 100 paying businesses.","FrameForge opened its beta."]
