import { people } from "./data.js";

let offset_range = 100;
let container = document.querySelector(".container");

let queue = [];
let direction = "next";

const create_frame = (image, person) => {
  let click = () => {
    if (direction === "next") {
      hide_frame(image);
    } else {
      show_frame(queue.pop());
    }
  };

  let offset = get_offset();

  let frame = document.createElement("div");
  frame.classList.add("frame");
  frame.innerHTML = `
			<img style="transform: translate(${offset.x}px, ${offset.y}px)" src="${image}" class="image" />
			<h3 class="name">${person.name}</h3>
		`;
  frame.onclick = click;
  container.appendChild(frame);
};

function check_direction() {
  if (total_visible_frames() === 1) {
    direction = "prev";
  }
  if (queue.length === 0) {
    direction = "next";
  }
}

function get_offset() {
  let v = (r) => Math.random() * r - r / 2;
  return { x: v(0.6 * window.innerWidth), y: v(0.3 * window.innerHeight) };
}

function hide_frame(image_src) {
  let image_el = document.querySelector("img[src='" + image_src + "']");
  let frame = image_el.parentNode;
  queue.push(frame);
  frame.style.display = "none";

  check_direction();
}

function show_frame(element) {
  element.style.display = "flex";

  check_direction();
}

function total_visible_frames() {
  let frames = document.querySelectorAll(".frame");
  return Array.from(frames).reduce((acc, frame) => {
    if (frame.style.display !== "none") {
      acc += 1;
    }
    return acc;
  }, 0);
}

people.forEach((person) =>
  person.images.forEach((img) => create_frame(img, person))
);
document.querySelectorAll("a").forEach((a) => (a.target = "_blank"));
