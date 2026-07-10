"use client";

import { useState } from "react";
import Image from "next/image";

type Model = "all" | "gpt-image" | "midjourney" | "dalle" | "seedance" | "nano-banana" | "chatgpt";

interface PromptCard {
  id: number;
  image: string;
  title: string;
  model: Model;
  modelLabel: string;
  likes: number;
  views: number;
  creator: string;
  category: string;
  prompt: string;
  tags: string[];
}

const PROMPTS: PromptCard[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&q=80", title: "Man in elegant perfume ad", model: "gpt-image", modelLabel: "GPT Image", likes: 1243, views: 12430, creator: "PromptMaster", category: "Fashion", prompt: "A cinematic portrait of a confident man in a tailored suit, soft golden lighting, luxury perfume advertisement style, shallow depth of field, warm tones", tags: ["portrait", "luxury", "fashion", "cinematic"] },
  { id: 2, image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80", title: "Cyberpunk city at night", model: "midjourney", modelLabel: "Midjourney", likes: 2891, views: 45210, creator: "CyberArt", category: "Sci-Fi", prompt: "Cyberpunk city street at night, neon signs reflecting on wet asphalt, flying cars, rain, volumetric lighting, blade runner aesthetic, highly detailed --ar 16:9 --v 6", tags: ["cyberpunk", "neon", "city", "night"] },
  { id: 3, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80", title: "Abstract fluid sculpture", model: "nano-banana", modelLabel: "Nano Banana Pro", likes: 756, views: 8920, creator: "ArtAI", category: "Abstract", prompt: "Abstract fluid sculpture, vibrant colors, organic shapes, marble texture, smooth gradients, 3D render style, soft lighting", tags: ["abstract", "sculpture", "colorful", "3d"] },
  { id: 4, image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=80", title: "Ethereal forest spirit", model: "dalle", modelLabel: "DALL·E", likes: 1567, views: 23400, creator: "DreamWeaver", category: "Fantasy", prompt: "Ethereal forest spirit made of glowing blue light, ancient oak trees, fireflies, misty morning, photorealistic, magical atmosphere", tags: ["fantasy", "spirit", "forest", "magical"] },
  { id: 5, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", title: "Minimalist mountain logo", model: "gpt-image", modelLabel: "GPT Image", likes: 543, views: 6780, creator: "LogoPro", category: "Design", prompt: "Minimalist mountain logo design, clean geometric lines, two peaks, sunrise behind, vector style, simple color palette, white background", tags: ["logo", "minimal", "mountain", "design"] },
  { id: 6, image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&q=80", title: "Surreal desert landscape", model: "midjourney", modelLabel: "Midjourney", likes: 2101, views: 32100, creator: "SurrealVisions", category: "Landscape", prompt: "Surreal desert landscape, crystal clear oasis mirroring purple sky, geometric rock formations, vibrant sunset, ultra-detailed, National Geographic style --ar 3:2 --v 6", tags: ["desert", "surreal", "landscape", "sunset"] },
  { id: 7, image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80", title: "Vintage camera product", model: "dalle", modelLabel: "DALL·E", likes: 876, views: 10900, creator: "ProductPro", category: "Product", prompt: "Vintage film camera on marble surface, soft studio lighting, warm sepia tones, commercial product photography, 8K, professional grade", tags: ["product", "vintage", "camera", "commercial"] },
  { id: 8, image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&q=80", title: "Futuristic car concept", model: "nano-banana", modelLabel: "Nano Banana Pro", likes: 1890, views: 28700, creator: "ConceptCars", category: "Automotive", prompt: "Futuristic sports car concept, aerodynamic design, glowing blue neon underglow, night setting, city background, photorealistic, 8K", tags: ["car", "futuristic", "concept", "neon"] },
  { id: 9, image: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=600&q=80", title: "Japanese garden watercolor", model: "gpt-image", modelLabel: "GPT Image", likes: 654, views: 7890, creator: "WaterColorAI", category: "Art", prompt: "Japanese garden in watercolor style, cherry blossoms, koi pond, wooden bridge, soft pastel colors, painterly texture, elegant composition", tags: ["watercolor", "japanese", "garden", "painting"] },
  { id: 10, image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80", title: "Cosmic nebula abstract", model: "midjourney", modelLabel: "Midjourney", likes: 3245, views: 56000, creator: "SpaceArt", category: "Space", prompt: "Colorful cosmic nebula, stars forming, deep space, vibrant purples and blues, ethereal glow, ultra HD, James Webb telescope aesthetic --ar 16:9 --v 6", tags: ["space", "nebula", "cosmic", "stars"] },
  { id: 11, image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&q=80", title: "Professional headshot studio", model: "dalle", modelLabel: "DALL·E", likes: 432, views: 5430, creator: "PortraitPro", category: "Portrait", prompt: "Professional corporate headshot, soft studio lighting, neutral gray background, confident smile, business attire, LinkedIn profile style", tags: ["portrait", "professional", "headshot", "corporate"] },
  { id: 12, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80", title: "Steampunk inventor workshop", model: "nano-banana", modelLabel: "Nano Banana Pro", likes: 1123, views: 16500, creator: "SteamPunk", category: "Fantasy", prompt: "Steampunk inventor workshop, brass gears, vintage tools, warm candle lighting, Victorian aesthetic, intricate details, cozy atmosphere", tags: ["steampunk", "workshop", "vintage", "brass"] },
  { id: 13, image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80", title: "Abstract geometric pattern", model: "gpt-image", modelLabel: "GPT Image", likes: 987, views: 12300, creator: "PatternLab", category: "Abstract", prompt: "Abstract geometric pattern, repeating colorful shapes, modern art, vibrant gradients, wallpaper design, symmetrical composition, 4K", tags: ["abstract", "geometric", "pattern", "colorful"] },
  { id: 14, image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80", title: "Underwater coral reef", model: "midjourney", modelLabel: "Midjourney", likes: 1678, views: 25600, creator: "OceanArt", category: "Nature", prompt: "Vibrant underwater coral reef, tropical fish, sun rays piercing through water, crystal clear, rich colors, National Geographic underwater photography --ar 4:3 --v 6", tags: ["underwater", "coral", "reef", "ocean"] },
  { id: 15, image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&q=80", title: "Synthwave sunset drive", model: "seedance", modelLabel: "Seedance", likes: 2345, views: 38900, creator: "RetroWave", category: "Animation", prompt: "Synthwave sunset drive animation, 1980s aesthetic, purple and pink gradient sky, grid road, retro car silhouette, neon glow, VHS effect", tags: ["synthwave", "retro", "animation", "sunset"] },
  { id: 16, image: "https://images.unsplash.com/photo-1536924940846-227afb31e968?w=600&q=80", title: "Gourmet food plating", model: "dalle", modelLabel: "DALL·E", likes: 765, views: 8900, creator: "FoodArt", category: "Food", prompt: "Gourmet dish plating, fine dining presentation, micro greens, sauce drizzle, soft natural lighting, restaurant quality, mouth-watering detail", tags: ["food", "gourmet", "plating", "dining"] },
  { id: 17, image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80", title: "Fashion editorial Vogue", model: "gpt-image", modelLabel: "GPT Image", likes: 1456, views: 19800, creator: "FashionAI", category: "Fashion", prompt: "High fashion editorial shot, bold colors, dramatic poses, studio lighting, avant-garde styling, Vogue magazine aesthetic, editorial quality", tags: ["fashion", "editorial", "vogue", "editorial"] },
  { id: 18, image: "https://images.unsplash.com/photo-1559827291-2650f45c1a20?w=600&q=80", title: "Snowy mountain peak", model: "midjourney", modelLabel: "Midjourney", likes: 1987, views: 31200, creator: "NaturePro", category: "Landscape", prompt: "Snowy mountain peak at golden hour, dramatic clouds, alpine lake reflection, pine forest foreground, majestic, ultra-detailed --ar 16:9 --v 6", tags: ["mountain", "snow", "landscape", "golden-hour"] },
];

const MODELS: { value: Model; label: string }[] = [
  { value: "all", label: "All" },
  { value: "gpt-image", label: "GPT Image" },
  { value: "midjourney", label: "Midjourney" },
  { value: "dalle", label: "DALL·E" },
  { value: "seedance", label: "Seedance" },
  { value: "nano-banana", label: "Nano Banana" },
  { value: "chatgpt", label: "ChatGPT" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [model, setModel] = useState<Model>("all");
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [selectedPrompt, setSelectedPrompt] = useState<PromptCard | null>(null);

  const filtered = PROMPTS.filter(
    (p) =>
      (model === "all" || p.model === model) &&
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
            <nav className="hidden md:flex items-center gap-1">
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
          <span>·</span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {PROMPTS.reduce((a, p) => a + p.views, 0).toLocaleString()} views
          </span>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
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
