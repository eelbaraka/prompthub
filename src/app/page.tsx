"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import promptsData from "../../public/prompts-data.json";

interface PromptCard {
  id: number;
  image: string;
  title: string;
  model: string;
  modelLabel: string;
  likes: number;
  views: number;
  creator: string;
  category: string;
  prompt: string;
  tags: string[];
}

const PROMPTS: PromptCard[] = promptsData as PromptCard[];

const MODELS: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "midjourney", label: "Midjourney" },
  { value: "nano-banana", label: "Nano Banana" },
  { value: "chatgpt", label: "ChatGPT" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [model, setModel] = useState("all");
  const [category, setCategory] = useState("all");
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [selectedPrompt, setSelectedPrompt] = useState<PromptCard | null>(null);

  const categories = Array.from(new Set(PROMPTS.map(p => p.category))).filter(Boolean);

  const filtered = PROMPTS.filter(
    (p) =>
      (model === "all" || p.model === model) &&
      (category === "all" || p.category === category) &&
      (p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.prompt.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.includes(search.toLowerCase())))
  );

  const toggleSave = (id: number) => {
    setSaved(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const copy = (text: string) => navigator.clipboard.writeText(text);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a2e]">

      {/* Minimal Navigation */}
      <header className="bg-white border-b border-[#e8e8e8] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-bold text-base">Prompt<span className="text-[#f07651]">Hub</span></span>
            </div>
            <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
              {MODELS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setModel(m.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    model === m.value ? "bg-[#f5f5f5] text-black" : "text-[#737373] hover:text-black hover:bg-[#f5f5f5]"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <svg className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#a3a3a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search prompts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-[#f5f5f5] rounded-lg text-xs w-40 focus:outline-none focus:ring-1 focus:ring-black/20"
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#737373]">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {PROMPTS.reduce((a, p) => a + p.likes, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </header>

      {/* Content Stats Bar */}
      <div className="bg-white border-b border-[#e8e8e8]">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-4 text-xs text-[#737373]">
          <span className="font-medium text-black">{filtered.length} prompts</span>
          <span>·</span>
          <span>{saved.size} saved</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              category === "all"
                ? "bg-black text-white"
                : "bg-[#f5f5f5] text-[#525252] hover:bg-[#e5e5e5]"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                category === cat
                  ? "bg-black text-white"
                  : "bg-[#f5f5f5] text-[#525252] hover:bg-[#e5e5e5]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 space-y-3">
          {filtered.map((prompt) => (
            <div
              key={prompt.id}
              onClick={() => setSelectedPrompt(prompt)}
              className="break-inside-avoid bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
            >
              {/* Image */}
              <div className="relative">
                <Image
                  src={prompt.image}
                  alt={prompt.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <span className="bg-white text-black text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    View Prompt
                  </span>
                </div>
                {/* Model badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-white/90 backdrop-blur-sm text-[10px] font-medium px-2 py-0.5 rounded-md text-[#737373]">
                    {prompt.modelLabel}
                  </span>
                </div>
                {/* Save button */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleSave(prompt.id); }}
                  className={`absolute top-2 right-2 p-1.5 rounded-lg transition-all ${
                    saved.has(prompt.id)
                      ? "bg-[#f07651] text-white opacity-100"
                      : "bg-white/80 text-[#737373] opacity-0 group-hover:opacity-100 hover:bg-white"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill={saved.has(prompt.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>

              {/* Card Info */}
              <div className="p-3">
                <h3 className="text-sm font-medium text-black leading-tight line-clamp-1 mb-2">{prompt.title}</h3>
                <div className="flex items-center justify-between text-[10px] text-[#a3a3a3]">
                  <span>by {prompt.creator}</span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {prompt.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {prompt.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-12 h-12 mx-auto mb-3 bg-white rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-[#a3a3a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-[#737373] text-sm font-medium">No prompts found</p>
            <p className="text-xs text-[#a3a3a3] mt-1">Try different keywords</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPrompt && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPrompt(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <Image src={selectedPrompt.image} alt={selectedPrompt.title} width={800} height={500} className="w-full h-64 object-cover rounded-t-2xl" unoptimized />
              <button onClick={() => setSelectedPrompt(null)} className="absolute top-3 right-3 bg-white/80 hover:bg-white p-1.5 rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-lg">{selectedPrompt.modelLabel}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-black">{selectedPrompt.title}</h2>
                  <p className="text-xs text-[#a3a3a3] mt-0.5">by {selectedPrompt.creator} · {selectedPrompt.category}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#737373]">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {selectedPrompt.likes.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {selectedPrompt.views.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-[#fafafa] border border-[#e8e8e8] rounded-xl p-4 mb-4">
                <p className="text-sm text-[#525252] leading-relaxed">{selectedPrompt.prompt}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedPrompt.tags.map((tag) => (
                  <span key={tag} className="bg-[#f5f5f5] text-[#737373] px-2 py-0.5 rounded-md text-[10px] font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => copy(selectedPrompt.prompt)}
                  className="flex-1 bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#333] transition-colors"
                >
                  Copy Prompt
                </button>
                <button
                  onClick={() => toggleSave(selectedPrompt.id)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                    saved.has(selectedPrompt.id)
                      ? "bg-[#fff4f0] border-[#f07651] text-[#f07651]"
                      : "bg-white border-[#e5e5e5] text-[#525252] hover:bg-[#f5f5f5]"
                  }`}
                >
                  <svg className="w-4 h-4" fill={saved.has(selectedPrompt.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimal Footer */}
      <footer className="border-t border-[#e8e8e8] mt-8 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-[#a3a3a3]">
          <p>PromptHub — Free AI prompt gallery. Not affiliated with any AI model provider.</p>
        </div>
      </footer>
    </div>
  );
}
