
import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Github, 
  Settings, 
  ShieldCheck, 
  Play, 
  Code2, 
  FileJson, 
  Workflow,
  ExternalLink,
  RefreshCw,
  Clock,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

// --- Tipe Data ---
interface Confession {
  category: 'jujur' | 'lucu' | 'savage';
  text: string;
}

// --- Komponen Pendukung ---
const SectionHeader: React.FC<{ icon: React.ReactNode; title: string; subtitle: string }> = ({ icon, title, subtitle }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
      {icon}
    </div>
    <div>
      <h2 className="text-lg font-bold text-slate-900 leading-tight">{title}</h2>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-200/50 ${className}`}>
    {children}
  </div>
);

const CodeBlock: React.FC<{ code: string; filename?: string }> = ({ code, filename }) => (
  <div className="mt-4 group">
    {filename && (
      <div className="flex items-center gap-2 bg-slate-50 border-t border-x border-slate-200 px-4 py-2 rounded-t-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <Code2 size={12} />
        {filename}
      </div>
    )}
    <pre className={`bg-[#F8FAFC] p-5 rounded-b-xl overflow-x-auto text-[13px] font-mono text-slate-700 leading-relaxed border border-slate-200 ${!filename ? 'rounded-t-xl' : ''}`}>
      <code className="block">{code}</code>
    </pre>
  </div>
);

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'jujur' | 'lucu' | 'savage'>('jujur');
  const [currentMessage, setCurrentMessage] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  
  const confessions: Confession[] = [
    { category: 'jujur', text: "Commit ini cuma biar streak nggak mati." },
    { category: 'jujur', text: "Produktif? Tidak. Konsisten? Iya." },
    { category: 'jujur', text: "Hari ini skip ngoding, tapi skip streak jangan." },
    { category: 'jujur', text: "Low motivation, high automation." },
    { category: 'jujur', text: "Commit kosong karena otak juga kosong hari ini." },
    { category: 'lucu', text: "Another green square, another lie." },
    { category: 'lucu', text: "Membayar hutang streak dengan kebohongan manis." },
    { category: 'lucu', text: "Green squares = Validasi Sosial." },
    { category: 'savage', text: "Satu lagi bukti bahwa otomatisasi mengalahkan disiplin." },
    { category: 'savage', text: "Buat apa ngoding kalau bisa script reputasi?" },
    { category: 'savage', text: "Skill aslinya bukan coding, tapi devops cheating." },
  ];

  const rollMessage = () => {
    const filtered = confessions.filter(c => c.category === activeCategory);
    const random = filtered[Math.floor(Math.random() * filtered.length)] || filtered[0];
    setCurrentMessage(random.text);
  };

  useEffect(() => {
    rollMessage();
  }, [activeCategory]);

  const simulateAction = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigasi Atas */}
      <nav className="border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-sm z-20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Github size={20} />
            </div>
            <span className="font-extrabold text-slate-900 tracking-tight text-lg">StreakSaver</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#tentang" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Tentang</a>
            <a href="#workflow" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Workflow</a>
            <button className="bg-slate-900 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-sm">
              Gunakan Sekarang
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 md:py-20">
        {/* Bagian Hero */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={14} />
            Kit Otomatisasi Satire v1.0
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
            Jaga streak GitHub Anda <span className="text-blue-600">tanpa harus bekerja.</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            Alat otomasi cerdas berbasis GitHub Actions yang memastikan profil Anda tetap hijau dengan pesan commit yang jujur dan sarkastik.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Panel Simulator */}
          <div className="lg:col-span-5 space-y-6">
            <Card>
              <SectionHeader 
                icon={<Settings size={18} />} 
                title="Pratinjau Pesan" 
                subtitle="Lihat bagaimana bot Anda berbicara" 
              />
              
              <div className="flex p-1 bg-slate-50 rounded-xl mb-8">
                {(['jujur', 'lucu', 'savage'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                      activeCategory === cat 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="bg-blue-50/30 border border-blue-100/50 rounded-2xl p-10 mb-8 flex flex-col items-center justify-center text-center">
                <p className="text-xl font-semibold text-slate-800 leading-relaxed italic">
                  "{currentMessage}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={rollMessage}
                  className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-3.5 px-4 rounded-xl transition-all text-sm"
                >
                  <RefreshCw size={16} />
                  Acak Pesan
                </button>
                <button 
                  onClick={simulateAction}
                  disabled={isSimulating}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-blue-100 text-sm"
                >
                  {isSimulating ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
                  Tes Workflow
                </button>
              </div>
            </Card>

            {/* Log Mini */}
            <div className="bg-slate-900 rounded-2xl p-6 font-mono text-[12px] shadow-xl">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <span className="ml-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">Log Runner</span>
              </div>
              <div className="space-y-1.5 overflow-hidden">
                <p className="text-slate-500">$ node scripts/saver.mjs</p>
                <p className="text-blue-400">[INFO] Mengecek status repositori...</p>
                <p className="text-yellow-500">[WARN] Tidak ada commit untuk hari ini.</p>
                <p className="text-white">{'>>'} Mode: <span className="text-blue-300">{activeCategory.toUpperCase()}</span></p>
                <p className="text-slate-400">{'>>'} Commit: "{currentMessage.substring(0, 15)}..."</p>
                <p className="text-emerald-500 font-bold flex items-center gap-1.5 mt-2">
                  <CheckCircle2 size={14} /> BERHASIL: Streak aman.
                </p>
              </div>
            </div>
          </div>

          {/* Panel Dokumentasi */}
          <div className="lg:col-span-7 space-y-16">
            <div id="tentang">
              <SectionHeader 
                icon={<Terminal size={18} />} 
                title="Konsep & Cara Kerja" 
                subtitle="Otomatisasi tanpa server tambahan." 
              />
              <div className="space-y-6 text-slate-600 leading-relaxed text-sm md:text-base">
                <p>
                  Proyek ini bekerja sepenuhnya di lingkungan <strong>GitHub Actions</strong>. Script Node.js kami bertindak sebagai penjaga gawang yang akan mengecek kontribusi Anda setiap malam.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                      <Clock size={16} className="text-blue-600" /> Penjadwalan
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Berjalan otomatis setiap pukul 23:59 WIB melalui Cron Job untuk memastikan slot hari tersebut terisi.</p>
                  </div>
                  <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                      <ShieldCheck size={16} className="text-emerald-600" /> Tanpa Risiko
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Hanya memperbarui file log internal, tidak akan mengganggu atau merusak kode sumber Anda.</p>
                  </div>
                </div>
              </div>
            </div>

            <div id="workflow">
              <SectionHeader 
                icon={<Workflow size={18} />} 
                title="Konfigurasi Workflow" 
                subtitle="Salin kode YAML ini ke folder workflow Anda." 
              />
              <CodeBlock code={`name: GitHub Streak Saver
on:
  schedule:
    - cron: '59 16 * * *' # Jam 23:59 WIB
  workflow_dispatch:

jobs:
  keep-streak:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Jalankan Script
        env:
          STREAK_MODE: \${{ vars.STREAK_MODE }}
        run: node scripts/saver.mjs`} filename=".github/workflows/streak-saver.yml" />
            </div>

            <div className="pt-10 border-t border-slate-100">
              <div className="bg-slate-50 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 border border-slate-100">
                <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm text-blue-600 flex-shrink-0">
                  <FileJson size={28} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Panduan Lengkap (README)</h3>
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed">Dapatkan instruksi instalasi langkah demi langkah dan cara mengubah pesan bot Anda.</p>
                  <a href="#" className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-sm hover:gap-2 transition-all">
                    Lihat Dokumentasi Lengkap <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
              Dibuat dengan Satire & Otomatisasi
            </p>
            <p className="text-slate-300 text-[10px]">© 2024 StreakSaver Project</p>
          </div>
          <div className="flex gap-10">
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Github size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors text-[10px] font-black uppercase tracking-widest">Twitter</a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors text-[10px] font-black uppercase tracking-widest">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
