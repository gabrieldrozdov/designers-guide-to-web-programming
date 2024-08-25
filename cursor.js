// Based on p5.js Follow 3 example
// https://editor.p5js.org/p5/sketches/Interaction:_Follow3
const colors = {
	"white": "#e5e5e5",
	"black": "#353535",
	"red": "#FF734D",
	"blue": "#5ADDE8",
	"purple": "#A690FC",
	"yellow": "#fcc03a",
	"pink": "#F3A8DD",
	"green": "#98DB6B"
}
let sectionColor = "yellow";
let activeColor = sectionColor;

var x = [],
	y = [],
	segNum = 200,
	segLength = 2,
	rot = 0,
	rotDir = 0.07
	modifier = .8;

for (var i = 0; i < segNum; i++) {
	x[i] = window.innerWidth/2;
	y[i] = window.innerHeight/2;
}

function setup() {
	var myCanvas = createCanvas(windowWidth, windowHeight);
	myCanvas.parent("trail");
	strokeWeight(3);
	stroke(colors["black"]);
	mouseX = window.innerWidth/2;
	mouseY = window.innerHeight/2;
}

function draw() {
	clear();
	dragSegment(0, mouseX, mouseY);
	for (var i = 0; i < x.length - 1; i++) {
		dragSegment(i + 1, x[i], y[i]);
	}
	// nofill
	fill(colors[activeColor]);
	translate(mouseX, mouseY);
	rotate(rot);
	translate(-mouseX, -mouseY);
	beginShape();
		vertex(mouseX-20*modifier, mouseY-5*modifier);
		vertex(mouseX-20*modifier, mouseY+5*modifier);
		vertex(mouseX-5*modifier, mouseY+5*modifier);
		vertex(mouseX-5*modifier, mouseY+20*modifier);
		vertex(mouseX+5*modifier, mouseY+20*modifier);
		vertex(mouseX+5*modifier, mouseY+5*modifier);
		vertex(mouseX+20*modifier, mouseY+5*modifier);
		vertex(mouseX+20*modifier, mouseY-5*modifier);
		vertex(mouseX+5*modifier, mouseY-5*modifier);
		vertex(mouseX+5*modifier, mouseY-20*modifier);
		vertex(mouseX-5*modifier, mouseY-20*modifier);
		vertex(mouseX-5*modifier, mouseY-5*modifier);
	endShape(CLOSE);
	rot += rotDir;
}

function dragSegment(i, xin, yin) {
	const dx = xin - x[i];
	const dy = yin - y[i];
	const angle = atan2(dy, dx);
	x[i] = xin - cos(angle) * segLength;
	y[i] = yin - sin(angle) * segLength;
	segment(x[i], y[i], angle);
}

function segment(x, y, a) {
	push();
	translate(x, y);
	rotate(a);
	line(0, 0, segLength, 0);
	pop();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
	rotDir *= -1;
}

// Change color whenever a link is hovered
for (let link of document.querySelectorAll('a')) {
	link.addEventListener('mouseenter', () => {
		activeColor = "white";
		modifier = 1.2;
	})
	link.addEventListener('mouseleave', () => {
		activeColor = sectionColor;
		modifier = .8;
	})
}
for (let link of document.querySelectorAll('button')) {
	link.addEventListener('mouseenter', () => {
		activeColor = "white";
		modifier = 1.2;
	})
	link.addEventListener('mouseleave', () => {
		activeColor = sectionColor;
		modifier = .8;
	})
}

// Change color per section
for (let section of document.querySelectorAll('.resources-section')) {
	section.addEventListener('mouseenter', () => {
		sectionColor = section.dataset.color;
		activeColor = sectionColor
	})
}

// Hide/show mouse when entering and exiting window
let cursorActive = false;
document.addEventListener('mousemove', () => {
	if (!cursorActive) {
		cursorActive = true;
		const trail = document.querySelector('#trail');
		trail.style.opacity = 1;
	}
})
document.addEventListener('mouseleave', () => {
	if (cursorActive) {
		const trail = document.querySelector('#trail');
		trail.style.opacity = 0;
		cursorActive = false;
	}
})