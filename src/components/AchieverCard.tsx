import { Trophy } from "lucide-react";

type Achiever = {
  category: string;
  class?: string;
  year?: string;
  image: string;
  name?: string;
  school?: string;
  air?: string;
  score?: string;
  percent?: string;
  badge?: string;
};

export default function AchieverCard({ achiever }: { achiever: Achiever }) {
  const hasSeparatePortrait = achiever.image.toLowerCase().includes("airpreview");
  const displayName = achiever.name || achiever.image.split("/").pop()?.replace(/\.(jpg|jpeg|png)(\.(jpg|jpeg|png))?$/i, "").replace(/\s*Achiever(?:\s*\(\d+\))?$/i, "").replace(/\s*AIRPreview$/i, "") || "Shiksharthi Achiever";
  const score = achiever.score || achiever.percent;

  return (
    <article className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5">
      {achiever.badge && <span className="absolute left-3 top-3 z-10 rounded-full bg-[#eab308] px-3 py-1 text-[10px] font-bold text-slate-950 shadow-sm">{achiever.badge}</span>}
      <div className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#eab308]/15">
        <Trophy className="h-4 w-4 text-[#eab308]" />
      </div>
      <div className="mx-auto mb-4 mt-5 aspect-[4/5] w-28 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm sm:w-32">
        <img
          src={achiever.image}
          alt={displayName}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover ${hasSeparatePortrait ? "" : "scale-[1.4]"}`}
          style={hasSeparatePortrait ? undefined : { objectPosition: "50% 28%" }}
        />
      </div>
      <p className="text-xs uppercase tracking-wider text-slate-400">{achiever.class ? `Class ${achiever.class}` : "Entrance"}</p>
      {achiever.year && <span className="mt-2 inline-flex rounded-full border border-[#eab308]/30 bg-[#eab308]/10 px-4 py-1 text-sm font-bold tracking-wider text-[#c28b00]">{achiever.year}</span>}
      <h3 className="mt-3 line-clamp-2 min-h-6 font-bold text-[#142850]">{displayName}</h3>
      {achiever.school && <p className="mt-1 line-clamp-2 min-h-8 text-xs text-slate-500">{achiever.school}</p>}
      {(achiever.air || score) && <div className="mt-4 flex items-center justify-center gap-3">
        {achiever.air && <div><p className="text-base font-extrabold text-[#eab308] sm:text-lg">{achiever.air}</p><p className="text-[10px] uppercase tracking-wider text-slate-400">Rank</p></div>}
        {achiever.air && score && <div className="h-9 w-px bg-slate-200" />}
        {score && <div><p className="text-base font-extrabold text-[#142850] sm:text-lg">{score}</p><p className="text-[10px] uppercase tracking-wider text-slate-400">Score</p></div>}
      </div>}
    </article>
  );
}
