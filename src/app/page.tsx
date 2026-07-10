"use client";

import { useState } from "react";

type Category = "all" | "chatgpt" | "midjourney" | "dalle" | "stable-diffusion" | "writing" | "coding";

interface Prompt {
  id: number;
  title: string;
  prompt: string;
  category: Category;
  categoryLabel: string;
  likes: number;
  saved: boolean;
}

const SAMPLE_PROMPTS: Prompt[] = [
  { id: 1, title: "Expert Copywriter", prompt: "Act as an expert copywriter with 20 years of experience in direct response marketing. Write a sales page for [product] that targets [audience]. Use the PAS framework (Problem-Agitate-Solution).", category: "chatgpt", categoryLabel: "ChatGPT", likes: 1243, saved: false },
  { id: 2, title: "Cinematic Portrait", prompt: "Cinematic portrait of [subject], dramatic lighting, shallow depth of field, 85mm lens, professional color grading, photorealistic, 8K, award-winning photography --ar 2:3 --style raw --v 6", category: "midjourney", categoryLabel: "Midjourney", likes: 892, saved: false },
  { id: 3, title: "Minimalist Logo Design", prompt: "Minimalist logo for [brand name], clean lines, geometric shapes, negative space, professional, vector style, simple color palette, white background --ar 1:1 --v 6", category: "midjourney", categoryLabel: "Midjourney", likes: 756, saved: false },
  { id: 4, title: "Code Reviewer", prompt: "Review the following code for bugs, performance issues, and security vulnerabilities. Provide specific fixes with explanations. Focus on [specific concern]: [paste code]", category: "coding", categoryLabel: "Coding", likes: 2101, saved: false },
  { id: 5, title: "Photorealistic Product", prompt: "A photorealistic product shot of [product], soft studio lighting, clean white background, commercial photography, 8K, professional grade, shot on Phase One --ar 4:3 --v 6", category: "dalle", categoryLabel: "DALL·E", likes: 634, saved: false },
  { id: 6, title: "Blog Post Writer", prompt: "Write a comprehensive, SEO-optimized blog post about [topic]. Include H2 and H3 headings, bullet points for key takeaways, a table comparing options, and a conclusion with a call to action. Target keyword: [keyword]", category: "writing", categoryLabel: "Writing", likes: 1567, saved: false },
  { id: 7, title: "Fantasy Landscape", prompt: "Epic fantasy landscape, floating islands, waterfalls cascading into clouds, ancient ruins overgrown with moss, magical glowing crystals, sunrise, volumetric lighting, ultra-detailed --ar 16:9 --v 6", category: "stable-diffusion", categoryLabel: "Stable Diffusion", likes: 1843, saved: false },
  { id: 8, title: "React Component Builder", prompt: "Create a reusable React component for [component purpose]. Use TypeScript, Tailwind CSS, and follow best practices. Include props interface, loading state, error state, and empty state. Add storybook stories.", category: "coding", categoryLabel: "Coding", likes: 987, saved: false },
  { id: 9, title: "Social Media Manager", prompt: "Create a 30-day social media content calendar for [brand/niche]. Include post ideas for Instagram, Twitter, and LinkedIn. Mix of educational, entertaining, and promotional content. Include caption templates.", category: "chatgpt", categoryLabel: "ChatGPT", likes: 543, saved: false },
  { id: 10, title: "Abstract Art", prompt: "Abstract fluid art, vibrant colors swirling in motion, gold leaf accents, digital painting, texture, detailed brush strokes, gallery quality, 4K --ar 1:1 --v 6", category: "midjourney", categoryLabel: "Midjourney", likes: 421, saved: false },
  { id: 11, title: "Interview Questions", prompt: "Generate 10 behavioral interview questions for [role] position. For each question, explain what the interviewer is looking for and provide an example of a strong answer using the STAR method.", category: "writing", categoryLabel: "Writing", likes: 876, saved: false },
  { id: 12, title: "3D Character Render", prompt: "3D render of a cute [character type], Pixar-style animation, vibrant colors, soft lighting, smooth textures, playful expression, isometric view, blender style --ar 3:4 --v 6", category: "stable-diffusion", categoryLabel: "Stable Diffusion", likes: 654, saved: false },
];

const CATEGORIES: { value: Category; label: string; icon: string }[] = [
  { value: "all", label: "All Prompts", icon: "grid" },
  { value: "chatgpt", label: "ChatGPT", icon: "message" },
  { value: "midjourney", label: "Midjourney", icon: "image" },
  { value: "dalle", label: "DALL·E", icon: "sparkles" },
  { value: "stable-diffusion", label: "Stable Diffusion", icon: "wand" },
  { value: "writing", label: "Writing", icon: "edit" },
  { value: "coding", label: "Coding", icon: "code" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [prompts, setPrompts] = useState(SAMPLE_PROMPTS);
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const filtered = prompts.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.prompt.toLowerCase().includes(search.toLowerCase()))
  );

  const handleToggleSave = (id: number) => {
    setPrompts(prompts.map(p => p.id === id ? { ...p, saved: !p.saved } : p));
  };

  const handleGenerate = () => {
    const adj = ["Creative", "Expert", "Professional", "Advanced", "Powerful", "Smart", "Dynamic"];
    const nouns = ["Prompt", "Template", "Generator", "Framework", "Blueprint"];
    const tools = ["ChatGPT", "Midjourney", "DALL·E", "Claude", "Stable Diffusion"];
    setGeneratedPrompt(
      `Act as ${adj[Math.floor(Math.random() * adj.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]} for ${tools[Math.floor(Math.random() * tools.length)]}. [Describe what you want the AI to do in detail].`
    );
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="bg-[#fafafa] border-b border-[#e5e5e5] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#f07651] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-[#1a1a2e]">Prompt<span className="text-[#f07651]">Hub</span></span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#a3a3a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search prompts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-[#f5f5f5] border border-[#e5e5e5] rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-[#f07651] focus:border-transparent"
              />
            </div>
            <button
              onClick={handleGenerate}
              className="bg-[#f07651] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e0633a] transition-colors shadow-sm"
            >
              Generate Prompt
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f07651] via-[#e8633a] to-[#d4532a] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Your AI Prompt Library
            </h1>
            <p className="text-white/80 text-lg max-w-xl mb-8">
              Discover the best prompts for ChatGPT, Midjourney, DALL·E, and more. Save your favorites and create your personal gallery.
            </p>
            <div className="flex items-center gap-3">
              <span className="bg-white/20 text-sm px-3 py-1.5 rounded-lg">12,000+ prompts</span>
              <span className="bg-white/20 text-sm px-3 py-1.5 rounded-lg">6 categories</span>
              <span className="bg-white/20 text-sm px-3 py-1.5 rounded-lg">Free forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* Generated Prompt Modal */}
      {generatedPrompt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-[#1a1a2e]">Generated Prompt</h3>
              <button onClick={() => setGeneratedPrompt("")} className="text-[#a3a3a3] hover:text-[#1a1a2e]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="bg-[#fafafa] border border-[#e5e5e5] rounded-xl p-4 mb-4">
              <p className="text-sm text-[#525252] leading-relaxed">{generatedPrompt}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { handleCopy(generatedPrompt); setGeneratedPrompt(""); }}
                className="flex-1 bg-[#f07651] text-white py-2.5 rounded-lg font-medium hover:bg-[#e0633a] transition-colors"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={handleGenerate}
                className="flex-1 bg-[#f5f5f5] text-[#525252] py-2.5 rounded-lg font-medium hover:bg-[#e5e5e5] transition-colors"
              >
                Generate Another
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                category === cat.value
                  ? "bg-[#f07651] text-white shadow-sm"
                  : "bg-white border border-[#e5e5e5] text-[#525252] hover:border-[#f07651] hover:text-[#f07651]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-[#737373] mb-6">
          <span className="font-medium text-[#1a1a2e]">{filtered.length} prompts</span>
          <div className="w-1 h-1 bg-[#d4d4d4] rounded-full" />
          <span>{prompts.filter(p => p.saved).length} saved</span>
        </div>

        {/* Prompt Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-white rounded-xl border border-[#e5e5e5] p-5 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
                  prompt.category === "chatgpt" ? "bg-[#f0fdf4] text-[#166534]" :
                  prompt.category === "midjourney" ? "bg-[#fef3c7] text-[#92400e]" :
                  prompt.category === "dalle" ? "bg-[#f3e8ff] text-[#6b21a8]" :
                  prompt.category === "stable-diffusion" ? "bg-[#dbeafe] text-[#1e40af]" :
                  prompt.category === "writing" ? "bg-[#fce7f3] text-[#9d174d]" :
                  "bg-[#d1fae5] text-[#065f46]"
                }`}>
                  {prompt.categoryLabel}
                </span>
                <button
                  onClick={() => handleToggleSave(prompt.id)}
                  className={`p-1.5 rounded-lg transition-all ${
                    prompt.saved ? "text-[#f07651] bg-[#fff4f0]" : "text-[#a3a3a3] hover:text-[#f07651] hover:bg-[#fff4f0] opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <svg className="w-4 h-4" fill={prompt.saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
              <h3 className="font-semibold text-[#1a1a2e] mb-2 line-clamp-1">{prompt.title}</h3>
              <p className="text-sm text-[#737373] line-clamp-3 leading-relaxed mb-4">{prompt.prompt}</p>
              <div className="flex items-center justify-between pt-3 border-t border-[#e5e5e5]">
                <div className="flex items-center gap-1.5 text-xs text-[#a3a3a3]">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {prompt.likes.toLocaleString()}
                </div>
                <button
                  onClick={() => handleCopy(prompt.prompt)}
                  className="text-xs text-[#f07651] font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
                >
                  Copy Prompt
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#f5f5f5] rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-[#a3a3a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-[#737373] font-medium">No prompts found</p>
            <p className="text-sm text-[#a3a3a3] mt-1">Try a different search or category</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#e5e5e5] mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-[#a3a3a3]">
          <p>© 2026 PromptHub. Free AI prompt gallery for everyone.</p>
        </div>
      </footer>
    </div>
  );
}
