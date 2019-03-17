let x = 0;
let y = 0;

document.addEventListener('mousemove', e => {
  x = e.x / window.innerWidth - 0.5;
  y = e.y / window.innerHeight - 0.5;
});

export default function getMouse () {
  return { x, y };
}

export function xOutOfDeadzone () {
  return x > 0.1 || x < -0.1;
}

export function yOutOfDeadzone () {
  return y > 0.1 || y < -0.1;
}