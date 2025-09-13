export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function lerpColor(c1: string, c2: string, t: number): string {
  const rgb1 = c1.match(/\w\w/g)!.map((v) => parseInt(v, 16));
  const rgb2 = c2.match(/\w\w/g)!.map((v) => parseInt(v, 16));
  const r = Math.round(lerp(rgb1[0], rgb2[0], t));
  const g = Math.round(lerp(rgb1[1], rgb2[1], t));
  const b = Math.round(lerp(rgb1[2], rgb2[2], t));
  return `rgb(${r},${g},${b})`;
}