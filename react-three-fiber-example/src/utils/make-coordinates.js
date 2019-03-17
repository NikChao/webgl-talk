export default function makeCoordinates () {
  const coords = [];

  for (let i = -3; i < 3; i++) {
    const x = Math.max(Math.min(i * 1.5 - 3, 6), -50);
    const y = Math.min(i * 3 * (0.5 - Math.random()) - 2, 18);
    const z = i * 1.5 - 5;
    
    coords.push({ key: `${x}${y}${z}`, x, y, z });
    coords.push({ key: `${x}${y}${z+8}`, x, y, z: z + 8 });
    coords.push({ key: `${x}${y}${z-8}`, x, y, z: z - 8 });
  }

  return coords;
}