let up = false;
let left = false;
let right = false;
let down = false;
let fwd = false;
let back = false;

document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 38:
      fwd = true;
      break;
    case 40:
      back = true;
      break;
    case 65:
      left = true;
      break;
    case 68:
      right = true;
      break;
    case 83:
      down = true;
      break;
    case 87:
      up = true;
      break;
    default:
      return
  }
});

document.addEventListener('keyup', e => {
  switch (e.keyCode) {
    case 38:
      fwd = false;
      break;
    case 40:
      back = false;
      break;
    case 65:
      left = false;
      break;
    case 68:
      right = false;
      break;
    case 87:
      up = false;
      break;
    case 83:
      down = false;
      break;
    default:
      return
  }
});

export default function getKeys () {
  return { up, left, right, down, fwd, back };
}