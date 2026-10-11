import type { TreeArt } from "@/lib/tree";

export default function Tree({ art, className }: { art: TreeArt; className: string }) {
  return (
    <svg
      className={className}
      viewBox={art.viewBox}
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {art.limbs.map((limb, level) => (
        <path
          key={level}
          d={limb.d}
          stroke="currentColor"
          strokeWidth={limb.width}
          opacity={Math.max(0.3, 0.95 - level * 0.075)}
        />
      ))}
      <path className="leaves" d={art.leaves[0]} strokeWidth="3.2" />
      <path className="leaves leaves-late" d={art.leaves[1]} strokeWidth="2.6" />
    </svg>
  );
}
