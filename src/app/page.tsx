import { ArrowRight, BadgeCheck, PackageCheck, Store } from "lucide-react";
import Link from "next/link";

const highlights = ["Everyday staples", "Premium basmati", "Healthy grains"];

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-2xl font-black tracking-tight text-[#315b35]">Rice<span className="text-[#c57936]">Hub</span></Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex"><Link href="/products">Shop rice</Link><Link href="/about">Our story</Link><Link href="/contact">Contact</Link></nav>
        <Link href="/login" className="rounded-full border border-[#315b35]/20 px-5 py-2.5 text-sm font-semibold text-[#315b35]">Sign in</Link>
      </header>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-12 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e8eddf] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#315b35]"><BadgeCheck size={15}/> Your neighborhood rice shop</span>
          <h1 className="mt-7 max-w-xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">Good rice.<br/><span className="text-[#c57936]">Good food.</span><br/>Right at home.</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-[#626558]">Find the right grain for every meal, in the bag size that suits your home. Order for local delivery or pick up at the shop.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-[#315b35] px-6 py-3.5 font-semibold text-white">Explore rice <ArrowRight size={18}/></Link><Link href="/about" className="rounded-full bg-white px-6 py-3.5 font-semibold text-[#315b35] ring-1 ring-[#315b35]/15">Meet RiceHub</Link></div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#626558]"><span className="inline-flex items-center gap-2"><PackageCheck size={17} className="text-[#315b35]"/>Carefully packed</span><span className="inline-flex items-center gap-2"><Store size={17} className="text-[#315b35]"/>Shop pickup available</span></div>
        </div>
        <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[2rem] bg-[#e9eadb] p-8 md:min-h-[500px]">
          <div className="absolute -right-12 -top-14 h-64 w-64 rounded-full bg-[#d5dcc3]"/><div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-[#e2c18e]/60"/>
          <div className="relative w-full max-w-sm rotate-[-3deg] rounded-3xl bg-[#fffdf7] p-8 shadow-xl shadow-[#36452c]/10">
            <div className="mx-auto flex h-48 w-44 items-center justify-center rounded-t-[45%] rounded-b-3xl bg-[#d9b875] text-7xl shadow-inner">🌾</div>
            <div className="mt-5 text-center"><p className="text-xs font-bold uppercase tracking-[.25em] text-[#8b7442]">RiceHub selection</p><p className="mt-2 text-2xl font-black">Sona Masoori</p><p className="mt-1 text-sm text-[#77796e]">Light, fragrant, everyday rice</p></div>
          </div>
        </div>
      </section>
      <section className="border-y border-[#e8e5da] bg-white/70"><div className="mx-auto max-w-7xl px-6 py-12"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#c57936]">Find your favorite</p><h2 className="mt-2 text-3xl font-black">Rice for every table</h2></div><Link href="/products" className="text-sm font-bold text-[#315b35]">Browse all varieties →</Link></div><div className="mt-7 grid gap-3 sm:grid-cols-3">{highlights.map((name, i)=><a key={name} href="/products" className="rounded-2xl border border-[#e8e5da] bg-[#faf8f2] p-5 transition hover:border-[#315b35]/40"><span className="text-2xl">{["🍚","🌾","🌿"][i]}</span><p className="mt-3 font-bold">{name}</p><p className="mt-1 text-sm text-[#77796e]">Thoughtful choices for your kitchen</p></Link>)}</div></div></section>
      <footer className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 text-sm text-[#77796e] sm:flex-row sm:justify-between"><span>© 2026 RiceHub</span><span>Fresh staples, friendly service.</span></footer>
    </main>
  );
}
