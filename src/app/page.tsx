"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store";

export default function HomePage() {
  const { toggleDrawer, items } = useCartStore();
  const cartCount = items.reduce((n, i) => n + i.quantity, 0);

  return (
    <div className="bg-[#fef4f6] text-[#322d2f] min-h-screen">



      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HERO ────────────────────────────────────────────────────────────── */}
        <header className="relative mt-8 mb-24 overflow-hidden rounded-[2rem] h-[600px] flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="The Baker"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPYnyM1Hoa2UN3olc0GGFCOZZ20W7uw3w07ODsQA7_tC_bQks4-SDeYuix4KsYFFzvKihpTrEhNm4RV4-MyI1pyc8I2perRDWc3ePKyludckrhySyr5VrPyBfUvpnyYLnfTJE8Hi3mCwX7ykA4l007eN6GokXliiSZD1WdUt1TaIFLVsTpm1o1A48Ky5r_oZitJ4Ut7MJkcAI9kVaFyhd0tKCQDH2p303OYNKlS1GJD1Jd362lt-XZUkAWd_BO_E3mCrvvFoEN5PA"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4c0023]/60 to-transparent" />
          <div className="relative z-10 px-12 max-w-2xl">
            <h1 className="text-6xl md:text-7xl text-white leading-tight mb-6" style={{ fontFamily: "var(--font-fredoka)" }}>
              Baked with Love, Shipped to You
            </h1>
            <p className="text-white/90 text-xl mb-10" style={{ fontFamily: "var(--font-vietnam)" }}>
              Handcrafted delights from our atelier straight to your doorstep.
            </p>
            <Link
              href="/menu"
              className="inline-block bg-[#ff70a0] text-[#4c0023] px-10 py-4 rounded-full text-xl font-bold hover:scale-105 active:scale-95 transition-transform shadow-lg"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Order Now
            </Link>
          </div>
        </header>

        {/* ── STORY SECTION ───────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center mb-32" id="our-story">

          {/* Image collage */}
          <div className="md:col-span-5 relative">
            <div className="relative z-10 rounded-[2rem] overflow-hidden rotate-[-2deg] shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Dough prep"
                className="w-full aspect-[4/5] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDzKole2C5I_FM-Q2GjRbhOqujvRpZULMetIdORiIRedSbx-Vi1AFwx7ns7K0y_R4fnDQP-gmVc3mRcsBQ4BOwT55nycOfBYt5cEXOUBatDlzQemu8hfF7JXxGjjRXJO4_rzt4ZdQxaATZhEsOSvpCrmTF-fdqJ20NWpQDja7fraWybSvrn5AkN18xW3RCq8fSmT4yjl0AGC9em6P1ZBA2V93fgTOVJd77njPA9eejwBJxKoibgR7jwmdxAxr4oJl1tBfbgXUtCUI"
              />
            </div>
            {/* Overlapping small image */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 z-0 rounded-[2rem] overflow-hidden rotate-[4deg] shadow-lg border-8 border-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Cookie decorating"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaHGOsfpaQBGGnsB41pCMGjTbLSiudwRhAivs3tE84RXvnA8Mmrj0wCJYWRYkhRZharQdVgO9P4tuT7M0VrB0dB4RsG11OkU0B9xGq-gCf7A6vTJpZUP4sAnRc5nMNG6dXutqM_ck2lJwImf-Wo3l9kJbJuwUivBTasPhiDOeTQ9z-5zr0RZl3iaRwK4BWRrfpaHlzwgD8y7YD8gEbD5cStzqUttIUkUu6WFts78DhO49ELh0q5EmaA1ckUgZxSuND8i6SEB0Rdxw"
              />
            </div>
            {/* Sprinkle decoration */}
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 opacity-10 sprinkle-bg w-40 h-40" />
          </div>

          {/* Text */}
          <div className="md:col-span-7 flex flex-col gap-6">
            <span className="text-[#a8275b] font-bold uppercase tracking-widest text-sm" style={{ fontFamily: "var(--font-jakarta)" }}>
              Our Story
            </span>
            <h2 className="text-5xl text-[#a8275b] leading-tight" style={{ fontFamily: "var(--font-fredoka)" }}>
              Meet the Baker
            </h2>
            <p className="text-[#322d2f]/80 text-lg leading-relaxed drop-cap">
              Since the first time I held a whisk at age six in my grandmother&apos;s sun-drenched kitchen, I knew that sugar and spice were more than just ingredients—they were a language of love. What started as a local obsession in a tiny coastal village has grown into The Dessert Box, an atelier dedicated to the art of the perfect bite.
            </p>
            <p className="text-[#322d2f]/80 text-lg leading-relaxed">
              Every recipe in our collection has been tested dozens of times to ensure that &quot;melt-in-your-mouth&quot; isn&apos;t just a phrase, but a promise. We don&apos;t just bake; we compose textures and flavors to create a fleeting moment of pure, sugary joy.
            </p>
            <div className="mt-4 p-8 bg-[#f9eef0] rounded-[1rem] border-l-8 border-[#a8275b] italic text-[#654449] font-medium">
              &ldquo;A box of cookies is a hug you can mail. That&apos;s the philosophy behind every batch we pull from the oven.&rdquo;
            </div>
          </div>
        </section>

        {/* ── QUALITY & CRAFT ─────────────────────────────────────────────────── */}
        <section className="bg-[#f0e6e8] rounded-[2rem] p-12 md:p-20 mb-32 relative overflow-hidden">
          <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl text-[#4c0023] mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
              Quality &amp; Craft
            </h2>
            <p className="text-[#605a5c] text-lg">
              We refuse to compromise. Only the finest, most ethical ingredients make it into our mixing bowls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              {
                icon: "grass",
                bg: "bg-[#f9cc61]",
                text: "text-[#5b4400]",
                title: "Organic Flour",
                desc: "Stone-ground and unbleached, sourced directly from heritage grain farmers who respect the land.",
              },
              {
                icon: "bakery_dining",
                bg: "bg-[#fdced4]",
                text: "text-[#654449]",
                title: "Real Butter",
                desc: "High-fat, European-style cultured butter churned from grass-fed cows for that unmistakable rich flavor.",
              },
              {
                icon: "nutrition",
                bg: "bg-[#ff70a0]",
                text: "text-[#4c0023]",
                title: "Premium Chocolate",
                desc: "Single-origin, ethically traded cacao with a minimum of 70% solids for a deep, lingering finish.",
              },
            ].map((card) => (
              <div key={card.title} className="bg-white p-10 rounded-[2rem] text-center shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 ${card.bg} ${card.text} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <span className="material-symbols-outlined text-4xl">{card.icon}</span>
                </div>
                <h3 className="text-2xl mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>{card.title}</h3>
                <p className="text-[#605a5c]">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* BG decoration */}
          <div className="absolute bottom-0 right-0 opacity-5 sprinkle-bg w-64 h-64 rotate-45 translate-x-1/2 translate-y-1/2" />
        </section>

        {/* ── ATELIER PROCESS ─────────────────────────────────────────────────── */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl text-[#a8275b]" style={{ fontFamily: "var(--font-fredoka)" }}>
              The Atelier Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQMCQsG0QcdavL7eS77rdWHJP_4RxgYi-XYirNE826o2zZ7pyzCfRtzm7ZlFY6zFph7EGr5M_36pW1ajOpCbhdf0eIV_ts5zh1hkcPYklSgNudUh3msnRTX3EIspwKpZUZE2gE5R7OLgbczmCfsRoHC5DZ-fA4EaaEK2HlFn7KhFRNC2RN8EiIvHnoknue51QBR9nYit0uqvBP_1ChTV-nVe3Fvdn6pq0zKMz4hbvoOBzC2j20-2mB8O_GKUn-T14_6pGTqHQeoe4",
                alt: "Baking batches",
                step: "1",
                title: "Baked in Small Batches",
                desc: "Precision over volume. We bake in limited quantities to ensure every single cookie gets the individual attention it deserves.",
              },
              {
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyeK1G4yPP1-i2KUzq8qTKNB8n7Us-cnnHDpr3xN2zh_5bT-hmZfCdgeRw9vNM0bSgoqI1YDjzxb_gL4fZm5IQCxQtd59mX06Rmtxj-9C5RfDTNs30vqoKznvRoihIR04hLERVe52kqPuDEscG-N1rvEpBj9Nd-zK0Q86A0G6tGnJkZZb46ItVK0AOJUxU8RZKzCYRxjcO_R-snLNHhPmbzW2E9vFZ7DzHAiPey20QdLhubApZRKOMyPFZihPIGTkVMupVenLpScc",
                alt: "Packaging",
                step: "2",
                title: "Packed with Care",
                desc: "Each treat is individually wrapped and nested in our custom-designed sustainable packaging to keep it fresh and beautiful.",
              },
              {
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf0HHRymxSCE5Bmdl7_t9oEFwqbrrNEB51JT36_iiqCO30BfYJ6AhLNWCjkcGOenCar5VwIt6Y2FFZFRJAymyr4q2DJ9rKjQmicAK7HSzNYOGGB7s0BfXQCDOjzw_iTAp8Zpmx6u8Vlo6Uc6PMbI4ypXCR5Ni67SEFzFc0oka1UH1TyOxlt6yGTP-chBkgHQoqD_jr0mgF8_IipRNwBDMSQOmAhHM4crG5OU59UQ_mXm4Vm3cE83FRxAtNHLjsf82kKUL7OCLc7FA",
                alt: "Shipping",
                step: "3",
                title: "Delivered to Your Door",
                desc: "From our busy kitchen to your quiet home, we deliver the magic of our freshly baked treats directly to you.",
              },
            ].map((step) => (
              <div key={step.step} className="group">
                <div className="rounded-[3rem] overflow-hidden mb-6 aspect-square shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={step.alt} className="w-full h-full object-cover" src={step.img} />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="w-10 h-10 rounded-full bg-[#a8275b] text-white flex items-center justify-center text-xl" style={{ fontFamily: "var(--font-fredoka)" }}>
                    {step.step}
                  </span>
                  <h3 className="text-2xl text-[#322d2f]" style={{ fontFamily: "var(--font-fredoka)" }}>{step.title}</h3>
                </div>
                <p className="text-[#605a5c] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM CTA ──────────────────────────────────────────────────────── */}
        <section className="bg-[#a8275b] text-white rounded-[2rem] p-16 text-center shadow-2xl relative overflow-hidden mb-20">
          <div className="absolute inset-0 sprinkle-bg opacity-10" />
          <div className="relative z-10">
            <h2 className="text-5xl mb-6" style={{ fontFamily: "var(--font-fredoka)" }}>
              Ready for a taste of magic?
            </h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto mb-10">
              Join our sweet family today and get your first box with a complimentary artisan tea pairing.
            </p>
            <Link
              href="/menu"
              className="inline-block bg-[#ff70a0] text-[#4c0023] px-12 py-5 rounded-full text-2xl font-bold hover:scale-105 active:scale-95 transition-transform shadow-lg"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Order Now
            </Link>
          </div>
        </section>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="bg-[#fef4f6] w-full rounded-t-[32px] mt-12 flex flex-col md:flex-row justify-between items-center px-12 py-6 text-sm leading-relaxed text-[#4a2c31]" style={{ fontFamily: "var(--font-jakarta)" }}>
        <div className="mb-6 md:mb-0">
          <div className="h-12 mb-2 flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="The Dessert Box Logo" className="h-full w-auto object-contain mix-blend-multiply" src="/logo.svg" />
            <span className="text-xl text-[#a8275b]" style={{ fontFamily: "var(--font-fredoka)" }}>The Dessert Box</span>
          </div>
          <p>© 2024 The Dessert Box. Handmade with love.</p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-[#a8275b] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#a8275b] transition-colors">Facebook</a>
          <a href="#" className="hover:text-[#a8275b] transition-colors">Contact Us</a>
        </div>
      </footer>

    </div>
  );
}
