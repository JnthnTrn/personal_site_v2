// A deterministic, mirror-symmetric branching tree, generated once on the server and drawn as SVG.

export type TreeArt = {
  viewBox: string;
  // One path per branching level, thickest first.
  limbs: { d: string; width: number }[];
  // Zero-length strokes at the branch tips, split in two so each half can shimmer on its own beat.
  leaves: [string, string];
};

type Options = {
  seed: number;
  depth: number;
  trunk: number;
  bough: number;
  // Half-angle between the two children of a branch, in radians.
  spread: number;
  // Extra outward push on the first few levels, which opens up the crown.
  lean: number;
  girth: number;
};

function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

export function growTree({ seed, depth, trunk, bough, spread, lean, girth }: Options): TreeArt {
  const rand = rng(seed);
  const levels: string[][] = Array.from({ length: depth + 2 }, () => []);
  const tips: [number, number][] = [];
  let minX = 0;
  let minY = -trunk;

  // Every stroke is drawn twice, once on each side of the trunk.
  const stroke = (level: number, x: number, y: number, cx: number, cy: number, ex: number, ey: number) => {
    levels[level].push(
      `M${r1(x)} ${r1(y)}Q${r1(cx)} ${r1(cy)} ${r1(ex)} ${r1(ey)}`,
      `M${r1(-x)} ${r1(y)}Q${r1(-cx)} ${r1(cy)} ${r1(-ex)} ${r1(ey)}`,
    );
    minX = Math.min(minX, -ex, -x);
    minY = Math.min(minY, ey);
  };

  // `angle` is measured from straight up; positive leans away from the trunk.
  const grow = (x: number, y: number, angle: number, length: number, level: number) => {
    const ex = x + length * Math.sin(angle);
    const ey = y - length * Math.cos(angle);
    const bend = (rand() - 0.5) * 0.36 * length;
    const cx = (x + ex) / 2 + Math.cos(angle) * bend;
    const cy = (y + ey) / 2 + Math.sin(angle) * bend;
    stroke(level, x, y, cx, cy, ex, ey);

    if (level > depth) {
      tips.push([ex, ey]);
      return;
    }
    const push = level <= 3 ? lean / level : 0;
    for (const side of [-1, 1]) {
      const child = angle + side * spread * (0.6 + rand() * 0.7) + push;
      // Let limbs reach a little way back across the trunk so the crown fills in, but never droop below the horizon.
      grow(ex, ey, Math.max(-0.85, Math.min(1.6, child)), length * (0.7 + rand() * 0.14), level + 1);
    }
  };

  levels[0].push(`M0 0V${-trunk}`);
  grow(0, -trunk, spread + lean, bough, 1);

  const pad = 14;
  const halfWidth = Math.ceil(-minX) + pad;
  const height = Math.ceil(-minY) + pad;
  const dot = ([x, y]: [number, number]) => `M${r1(x)} ${r1(y)}h0M${r1(-x)} ${r1(y)}h0`;

  return {
    viewBox: `${-halfWidth} ${-height} ${halfWidth * 2} ${height}`,
    limbs: levels.map((paths, level) => ({ d: paths.join(""), width: r1(Math.max(0.5, girth * 0.7 ** level)) })),
    leaves: [tips.filter((_, i) => i % 2 === 0).map(dot).join(""), tips.filter((_, i) => i % 2 === 1).map(dot).join("")],
  };
}
