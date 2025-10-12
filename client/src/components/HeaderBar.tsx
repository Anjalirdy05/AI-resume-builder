
import React from 'react'
import { useReactToPrint } from 'react-to-print'

export default function HeaderBar({ dark, setDark, printRef }:{ dark:boolean; setDark:(v:boolean)=>void; printRef: React.RefObject<HTMLDivElement> }){
  const handlePrint = useReactToPrint({ content: ()=>printRef.current })
  return (
    <header className="no-print sticky top-0 z-30 backdrop-blur-md bg-white/60 dark:bg-slate-900/60 shadow-glass">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600" />
          <h1 className="text-xl font-bold">AI Resume Builder</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={()=>setDark(!dark)} className="px-3 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">{dark ? 'Light' : 'Dark'}</button>
          <button onClick={handlePrint} className="px-3 py-2 rounded-xl bg-brand-600 text-white">Export PDF</button>
        </div>
      </div>
    </header>
  )
}
