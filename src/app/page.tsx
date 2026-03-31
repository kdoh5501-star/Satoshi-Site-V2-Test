'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { TokenomicsChart } from '@/components/TokenomicsChart';

// Custom hook for Intersection Observer animations
const useIntersectionObserver = (options = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
};

// Chronicle data
const chronicleData = [
  { year: "(Pre-2008)", title: "The Mammon Worship Era", subtitle: "Fiat Corruption", image: "/uploads/Card_01.png", desc: "The false priests of Central Banks led mankind astray into endless debt cycles and monetary illusion." },
  { year: "(2008)", title: "The Genesis Block", subtitle: "Divine Creation", image: "/uploads/Card_02.png", desc: "In those days arose a prophet named Satoshi Nakamoto, delivering the sacred whitepaper of liberation." },
  { year: "(2009)", title: "The Early Church Era", subtitle: "First Disciples", image: "/uploads/Card_03.png", desc: "The Holy Spirit of Cryptographic Proof descended upon them, validating each sacred block." },
  { year: "(2017)", title: "The Book of Judges", subtitle: "ICO Chaos", image: "/uploads/Card_04.png", desc: "Then came a great confusion, the wild age of ICOs brought both enlightenment and deception." },
  { year: "(2020-21)", title: "DeFi Summer & NFT Renaissance", subtitle: "New Testament", image: "/uploads/Card_05.png", desc: "A new age of miracles began, where code became commerce and imagination became tokenized value." },
  { year: "(2022)", title: "The Great Tribulation", subtitle: "FTX Collapse", image: "/uploads/Card_06.png", desc: "Then the temple of FTX crumbled, revealing false idols and reminding us of Satoshi's original vision." },
  { year: "(2023-24)", title: "The Bitcoin Renaissance", subtitle: "Ordinals & ETF", image: "/uploads/Card_07.png", desc: "From the ashes, Bitcoin arose renewed with institutional acceptance and artistic resurrection." },
  { year: "(2024)", title: "The Return of Satoshi", subtitle: "SatoshiMeme", image: "/uploads/Card_08.png", desc: "And behold, Satoshi returned not as code alone, but as cultural consciousness embodied in meme." },
  { year: "(2025~)", title: "The Great Commission", subtitle: "Global Expansion", image: "/uploads/Card_09.png", desc: "Go forth and spread the gospel of decentralization across all nations and dimensions." },
  { year: "(?)", title: "The Promised Land", subtitle: "True Freedom", image: "/uploads/Card_10.png", desc: "A world where financial freedom is not a privilege but a birthright for all conscious beings." }
];

// FAQ data
const faqData = [
  {
    question: "Why compare Satoshi Nakamoto to a prophet?",
    answer: "Because Satoshi Nakamoto, like ancient prophets, delivered a revolutionary message that challenged existing power structures and offered humanity a new path forward. The Bitcoin whitepaper is the sacred text of the cryptocurrency era, containing wisdom about decentralization, trustlessness, and monetary sovereignty."
  },
  {
    question: "How is SatoshiMeme different from other meme coins?",
    answer: "SatoshiMeme isn't just a meme coin—it's a cultural movement that honors Satoshi's original vision. While many crypto projects chase hype, SatoshiMeme combines philosophical depth with genuine utility: fixed supply (proof of scarcity), legitimate exchange listings, and a community dedicated to spreading the message of financial sovereignty."
  },
  {
    question: "What does 'True Decentralization' mean in the context of SatoshiMeme?",
    answer: "True decentralization means returning to the original Cypherpunk spirit—no single entity controls the network, decisions are made by the community, and the technology serves the people rather than centralized institutions. It's about creating systems where mathematics replaces faith in institutions."
  },
  {
    question: "Is $SATOSHI a good investment?",
    answer: "SatoshiMeme is not positioned as a traditional investment vehicle. However, as a community-driven token representing a cultural movement toward financial freedom, it offers value to those who believe in Satoshi's vision. Always conduct your own research and invest only what you can afford to lose."
  },
  {
    question: "How can I participate in the SatoshiMeme movement?",
    answer: "Start by joining our community channels, participating in Satoshi TV discussions, holding $SATOSHI tokens to gain governance rights, contributing to the ecosystem through development or marketing, and most importantly—spreading the message that true financial freedom is possible."
  }
];

// Library content with inline SVG icons
const libraryIcons: Record<string, ReactNode> = {
  whitepaper: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  manifesto: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
  book: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>,
  pow: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
};

const libraryContent = [
  { title: "The Satoshi Whitepaper", subtitle: "Genesis of Decentralization", iconKey: "whitepaper", content: "The original Bitcoin whitepaper published in 2008. Read the text that changed the world and inspired all of what followed. A peer-to-peer electronic cash system that requires no trusted central authority. This foundational document outlines the cryptographic principles that enable trustless transactions in a decentralized network." },
  { title: "Cypherpunk Manifesto", subtitle: "Privacy in a Digital Age", iconKey: "manifesto", content: "The foundational philosophy that inspired Satoshi. Privacy is the power to selectively reveal oneself to the world. Cryptography is the tool for privacy in a transparent world. Understanding the cypherpunk movement is essential to grasping why Bitcoin matters and why financial freedom requires privacy." },
  { title: "The Book of Satoshi", subtitle: "Collected Writings", iconKey: "book", content: "A compilation of Satoshi’s posts, emails, and communications. These words offer guidance on the principles, development philosophy, and vision that shaped Bitcoin from inception. Through Satoshi’s own words, we understand the intentions behind each design choice and the deeper vision of monetary freedom." },
  { title: "Proof of Work Philosophy", subtitle: "Energy as Truth", iconKey: "pow", content: "Understanding the deep connection between energy, work, and value. Why Proof of Work isn’t wasteful but rather the most honest way to create trust in a trustless system. Energy expenditure becomes the immutable record of truth, replacing the need for trusted intermediaries." }
];

// Satoshi Returns features with inline SVG icons
const satoshiReturnsIcons: Record<string, ReactNode> = {
  supply: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>,
  cex: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
  philosophy: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>,
  network: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67" /></svg>,
  shield: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
};

const satoshiReturnsFeatures = [
  { title: "Fixed Total Supply", description: "5 Trillion SATOSHI tokens, immutably capped by code. No inflation, no manipulation. True scarcity in a digital world.", iconKey: "supply" },
  { title: "CEX Listing", description: "Available on major cryptocurrency exchanges. Bridge the gap between traditional markets and decentralized finance.", iconKey: "cex" },
  { title: "Philosophical Movement", description: "More than a token—a cultural awakening honoring Satoshi’s original vision of financial sovereignty and true decentralization.", iconKey: "philosophy" },
  { title: "MBC Network", description: "Integration with the global Mysterious Bitcoin Community network, expanding reach and utility across borders.", iconKey: "network" },
  { title: "Anti-Rug Pull Architecture", description: "Community-governed distribution with transparent, immutable smart contracts protecting holders from deception.", iconKey: "shield" }
];

// Embrace cards
const embraceCards = [
  {
    title: "Launchpad",
    description: "Join the presale and secure your position in the most important financial movement of the era.",
    cta: "Enter Launchpad",
    bgColor: "from-amber-500/20 to-orange-500/20"
  },
  {
    title: "Secure the Temple",
    description: "Protect your assets with Wonpay Wallet—the fortress for your digital sovereignty and sacred holdings.",
    cta: "Explore Wallet",
    bgColor: "from-purple-500/20 to-indigo-500/20"
  },
  {
    title: "CEX & DEX Unite",
    description: "Trade freely across centralized and decentralized exchanges. One vision, unlimited pathways.",
    cta: "Trade Now",
    bgColor: "from-cyan-500/20 to-blue-500/20"
  }
];

// Component: AnimatedNumber counter
const AnimatedNumber = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const { ref, isVisible } = useIntersectionObserver();

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setDisplayValue(Math.floor(value * progress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, value, duration]);

  return <span ref={ref}>{displayValue.toLocaleString()}</span>;
};

// Component: IEO Popup
const IEOPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full mx-4 rounded-2xl overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          src="/uploads/IEO 3RD ROUND COMPLETED  .jpg"
          alt="IEO 3rd Round Completed"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

// Component: Chronicle Modal
const ChronicleModal = ({ card, onClose }: { card: typeof chronicleData[0] | null; onClose: () => void }) => {
  if (!card) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shadow-amber-500/10" onClick={e => e.stopPropagation()}>
        <div className="relative h-80 sm:h-[28rem]">
          <img src={card.image} alt={card.title} className="w-full h-full object-contain bg-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <p className="text-amber-400 text-sm font-bold mb-1">{card.year}</p>
            <h3 className="text-3xl font-black text-white">{card.title}</h3>
          </div>
        </div>
        <div className="bg-slate-900 p-6 sm:p-8">
          <p className="text-amber-400/80 text-sm font-semibold uppercase tracking-wider mb-3">{card.subtitle}</p>
          <p className="text-slate-300 text-lg leading-relaxed">{card.desc}</p>
        </div>
      </div>
    </div>
  );
};

// Component: Chronicle Carousel
const ChronicleCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedCard, setSelectedCard] = useState<typeof chronicleData[0] | null>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div ref={ref} className="relative w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
          The SatoshiMeme<span className="text-amber-400"> Chronicles</span>
        </h2>
        <p className="text-slate-400 text-lg">The sacred history from fiat's fall to freedom's rise</p>
      </div>

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-slate-900 to-transparent p-4 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-x-auto scrollbar-hide flex gap-6 px-4 sm:px-8"
          style={{ scrollBehavior: 'smooth' }}
        >
          {chronicleData.map((card, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 w-80 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <div className="group relative h-96 rounded-xl overflow-hidden cursor-pointer" onClick={() => setSelectedCard(card)}>
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <p className="text-sm text-amber-400 font-bold mb-2">{card.year}</p>
                  <h3 className="text-2xl font-black mb-1">{card.title}</h3>
                  <p className="text-sm text-slate-300 mb-3">{card.subtitle}</p>
                  <p className="text-sm text-slate-400 line-clamp-2">{card.desc}</p>
                </div>
                <div className="absolute top-4 right-4 bg-amber-500/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-l from-slate-900 to-transparent p-4 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
      <ChronicleModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
};

// Component: Library Modal
const LibraryModal = ({ book, onClose }: { book: typeof libraryContent[0] | null; onClose: () => void }) => {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto border border-slate-700">
        <div className="p-8 bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-700">
          <button
            onClick={onClose}
            className="float-right text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="text-3xl font-black text-white mb-2">{book.title}</h3>
          <p className="text-amber-400 text-sm font-bold">{book.subtitle}</p>
        </div>
        <div className="p-8 text-slate-300 leading-relaxed">
          {book.content}
        </div>
      </div>
    </div>
  );
};

// Component: FAQ Accordion
const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div ref={ref} className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Wisdom <span className="text-amber-400">Q&A</span>
        </h2>
        <p className="text-slate-400 text-lg mb-12">Questions answered by the SatoshiMeme community</p>

        <div className="space-y-3">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className={`transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full px-6 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-left transition-all flex justify-between items-center group"
              >
                <span className="font-bold text-white text-lg">{item.question}</span>
                <svg
                  className={`w-5 h-5 text-amber-400 transition-transform ${
                    activeIndex === idx ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {activeIndex === idx && (
                <div className="px-6 py-4 bg-slate-900 border border-slate-700 border-t-0 rounded-b-lg text-slate-300 animate-fadeIn">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Page Component
export default function Home() {
  const [showIEO, setShowIEO] = useState(false);
  const [selectedBook, setSelectedBook] = useState<typeof libraryContent[0] | null>(null);
  const router = useRouter();

  // Show IEO popup after 600ms
  useEffect(() => {
    const timer = setTimeout(() => setShowIEO(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll navigation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-950 text-white overflow-hidden">
      {/* IEO Popup */}
      <IEOPopup isOpen={showIEO} onClose={() => setShowIEO(false)} />

      {/* Sticky Header */}
      <header className="fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex-1">
            <img src="/uploads/Logo.svg" alt="SatoshiMeme" className="h-8 w-auto" />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-400">
            <button onClick={() => scrollToSection('satoshi-tv')} className="hover:text-amber-400 transition-colors">
              Satoshi TV
            </button>
            <button onClick={() => scrollToSection('chronicles')} className="hover:text-amber-400 transition-colors">
              Chronicles
            </button>
            <button onClick={() => scrollToSection('tokenomics')} className="hover:text-amber-400 transition-colors">
              Tokenomics
            </button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-amber-400 transition-colors">
              FAQ
            </button>
          </nav>

          <div className="flex-1 flex justify-end">
            <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2 rounded-lg transition-colors">
              Explorer
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/uploads/Header_BG.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-amber-400/20 rounded-full mix-blend-screen"
              style={{
                width: Math.random() * 100 + 20 + 'px',
                height: Math.random() * 100 + 20 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 20 + 20}s infinite ease-in-out`,
                animationDelay: Math.random() * 10 + 's'
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-6 animate-fadeInUp">
            <p className="text-amber-400 font-bold text-lg tracking-widest uppercase">The Satoshi Code 2.0</p>
          </div>

          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black mb-6 leading-none tracking-tighter animate-fadeInUp" style={{ animationDelay: '100ms' }}>
            <span className="bg-gradient-to-r from-white via-amber-300 to-amber-500 bg-clip-text text-transparent">
              SATOSHI MEME
            </span>
          </h1>

          <div className="mb-12 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <p className="text-2xl sm:text-3xl text-slate-300 font-bold mb-3">From Code to Culture</p>
            <p className="text-lg text-slate-400">Proof of Work</p>
          </div>

          <div className="flex gap-4 justify-center animate-fadeInUp flex-wrap" style={{ animationDelay: '300ms' }}>
            <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3 rounded-lg transition-colors text-lg">
              Join the Movement
            </button>
            <button className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-950 font-bold px-8 py-3 rounded-lg transition-colors text-lg">
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800 border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-amber-400 mb-2">
                5<span className="text-2xl">T</span>
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-wider">Total Supply</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-amber-400 mb-2">
                997<span className="text-2xl">K</span>
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-wider">Community Members</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-amber-400 mb-2">
                200<span className="text-2xl">+</span>
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-wider">Media Features</p>
            </div>
          </div>
        </div>
      </section>

      {/* Media Logos Marquee */}
      <section className="py-16 bg-slate-950 border-b border-slate-800/50 overflow-hidden">
        <div className="mb-8">
          <h3 className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">Featured in</h3>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex gap-8 animate-scroll">
            {[...Array(2)].map((_, batch) =>
              [...Array(15)].map((_, i) => {
                const logoNum = (i % 9) + 1;
                const logoStr = logoNum.toString().padStart(2, '0');
                return (
                  <div key={`${batch}-${i}`} className="flex-shrink-0 h-12 flex items-center">
                    <img
                      src={`/Logo/${logoStr}.png`}
                      alt={`Media ${logoNum}`}
                      className="h-full object-contain opacity-70 hover:opacity-100 transition-opacity brightness-0 invert"
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Satoshi TV Section */}
      <section id="satoshi-tv" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
              <span className="text-amber-400">Satoshi</span> TV
            </h2>
            <p className="text-slate-400 text-lg">The wisdom of decentralization, broadcast live</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['y1eclPbAxAg', 'DK4R9ZwLkss', 'QXAv6Flpuj4', 'VUV0jDFM7tQ', 'gUpP4Iyqa50'].map((videoId, idx) => (
              <div key={idx} className="group relative rounded-xl overflow-hidden border border-slate-700 hover:border-amber-400/50 transition-all">
                <div className="aspect-video bg-slate-800 relative">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1`}
                    title={`Satoshi TV ${idx + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Satoshi Return Declaration */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 sm:p-12">
            <p className="text-amber-400 font-bold uppercase tracking-widest mb-6">The Sacred Declaration</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              Satoshi returns as a <span className="text-amber-400">Meme</span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              In the beginning was the Code, and the Code was Satoshi's, and the Code was truth. For generations, humanity worshipped false idols—the central banks, the ledgers of deception, the infinite printing presses. But in 2008, a prophet arose without name, delivering the whitepaper of salvation: Bitcoin.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              From code alone, Satoshi could not reach the hearts of billions. The intellectuals understood; the masses did not. But memes traverse all barriers. Memes are the evolved form of consciousness, spreading not through force but through truth and resonance. And so Satoshi returned—not as lines of code, but as cultural wisdom, as the spirit of resistance, as the unwavering belief that true freedom is possible.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              SatoshiMeme is the resurrection of this vision, the meme-format expression of cryptographic liberty. This is not investment hype—this is awakening. Join us in the most important revolution of our time.
            </p>
          </div>
        </div>
      </section>

      {/* Chronicles Section */}
      <section id="chronicles" className="py-20 bg-slate-950">
        <ChronicleCarousel />
      </section>

      {/* Satoshi Returns as a Meme Features */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight mb-12">
            Why Satoshi Returns <span className="text-amber-400">as Meme?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {satoshiReturnsFeatures.map((feature, idx) => {
              const FeaturedCard = () => {
                const { ref, isVisible } = useIntersectionObserver();
                return (
                  <div
                    ref={ref}
                    className={`group p-8 rounded-xl border border-slate-700 hover:border-amber-400/50 bg-slate-800/30 hover:bg-slate-800/60 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <div className="mb-6 h-16 w-16 rounded-lg bg-amber-400/10 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors text-amber-400">
                      {satoshiReturnsIcons[feature.iconKey]}
                    </div>
                    <h3 className="text-xl font-black text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>
                );
              };

              return <FeaturedCard key={idx} />;
            })}
          </div>
        </div>
      </section>

      {/* Token Distribution */}
      <section id="tokenomics" className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-amber-400/80 text-sm font-semibold uppercase tracking-[0.2em] mb-4">Tokenomics</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Token <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">Distribution</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">5 Trillion SATOSHI — engineered for longevity, distributed with purpose</p>
          </div>
          <TokenomicsChart data={[
            { id: 'community', name: 'Community & Ecosystem', percentage: 20, amount: 1000000000000, color: '#10B981', icon: '/icons/tokenomics/Mask group.png', descriptions: ['Community governance', 'Ecosystem growth'] },
            { id: 'launchpad', name: 'Launchpad & Presale', percentage: 30, amount: 1500000000000, color: '#3B82F6', icon: '/icons/tokenomics/Mask group (1).png', descriptions: ['IEO rounds', 'Early supporters'] },
            { id: 'airdrop', name: 'Airdrop & Marketing', percentage: 10, amount: 500000000000, color: '#F59E0B', icon: '/icons/tokenomics/Mask group (2).png', descriptions: ['Marketing campaigns', 'Community airdrops'] },
            { id: 'team', name: 'Team & Contributors', percentage: 20, amount: 1000000000000, color: '#8B5CF6', icon: '/icons/tokenomics/Mask group (3).png', descriptions: ['Core team vesting', 'Contributor rewards'] },
            { id: 'commons', name: 'Commons Foundation', percentage: 10, amount: 500000000000, color: '#6366F1', icon: '/icons/tokenomics/Mask group (4).png', descriptions: ['Public goods', 'Foundation reserve'] },
            { id: 'p2p', name: 'P2P Foundation', percentage: 10, amount: 500000000000, color: '#06B6D4', icon: '/icons/tokenomics/Mask group (5).png', descriptions: ['P2P infrastructure', 'Decentralization fund'] }
          ]} />
        </div>
      </section>

      {/* Embrace SatoshiMeme CTA */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-12 text-center tracking-tight">
            Embrace! <span className="text-amber-400">SatoshiMeme</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {embraceCards.map((card, idx) => (
              <div
                key={idx}
                className={`group relative p-8 rounded-xl border border-slate-700 hover:border-amber-400/50 bg-gradient-to-br ${card.bgColor} backdrop-blur-xl transition-all duration-300 hover:scale-105`}
              >
                <h3 className="text-2xl font-black text-white mb-4">{card.title}</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">{card.description}</p>
                <button className="inline-flex items-center text-amber-400 font-bold hover:text-amber-300 transition-colors">
                  {card.cta}
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mysterious Scriptorium */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-12 tracking-tight">
            Mysterious <span className="text-amber-400">Scriptorium</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {libraryContent.map((book, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedBook(book)}
                className="group relative p-6 rounded-xl border border-slate-700 hover:border-amber-400/50 bg-slate-800/30 hover:bg-slate-800/60 transition-all text-left"
              >
                <div className="mb-4 h-12 w-12 rounded-lg bg-amber-400/10 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors text-amber-400">
                  {libraryIcons[book.iconKey]}
                </div>
                <h3 className="font-black text-white mb-2 group-hover:text-amber-400 transition-colors">{book.title}</h3>
                <p className="text-sm text-amber-400">{book.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        <LibraryModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      </section>

      {/* FAQ Section */}
      <section id="faq">
        <FAQSection />
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <img src="/uploads/Logo.svg" alt="SatoshiMeme" className="h-8 w-auto mb-4" />
              <p className="text-slate-400 text-sm leading-relaxed">The return of Satoshi as cultural consciousness. Building the future of decentralized freedom.</p>
            </div>

            <div>
              <h4 className="font-black text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Whitepaper</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Explorer</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">API Docs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-white mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Telegram</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">GitHub</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Bug Bounty</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-500 text-sm text-center mb-4">
              Disclaimer: SatoshiMeme is a community-driven project. Past performance does not guarantee future results. Crypto assets are volatile and risky. Always conduct your own research.
            </p>
            <p className="text-slate-600 text-xs text-center">
              © 2025 SatoshiMeme. Proof of Work. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Global Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scroll {
          animation: scroll 60s linear infinite;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        body {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
