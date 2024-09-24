// Animate header title
function initializeHeaderTitle() {
	const headerTitleBigSpans = document.querySelectorAll('.header-title-big span');
	let temp = '';
	let index = 0;
	for (let span of headerTitleBigSpans) {
		for (let letter of span.innerText) {
			if (letter == " ") {
				letter = "&nbsp;";
			}
			temp += `<span style="animation-delay: -${index*50}ms">${letter}</span>`;
			index++;
		}
		span.innerHTML = temp;
		temp = "";
	}
}
initializeHeaderTitle();

// Nav
let navOpen = false;
function toggleNav() {
	const nav = document.querySelector('.nav');
	if (!navOpen) {
		navOpen = true;
		nav.dataset.active = 1;
	} else {
		navOpen = false;
		nav.dataset.active = 0;
	}
}

// Favicon
for (let section of document.querySelectorAll('.unit')) {
	const favicon = document.querySelector('[rel="icon"]');
	section.addEventListener('mouseenter', () => {
		favicon.href=`/assets/meta/favicon-${section.dataset.color}.png`;
	})
}

// Cursor
document.querySelector('body').addEventListener('mousemove', (e) => {
	const cursor = document.querySelector('.cursor');
	cursor.style.left = e.clientX + "px";
	cursor.style.top = e.clientY + "px";
	cursor.style.opacity = 1;
})
for (let link of document.querySelectorAll('a')) {
	const cursor = document.querySelector('.cursor');
	link.addEventListener('mouseenter', (e) => {
		cursor.dataset.hover = 1;
	})
	link.addEventListener('mouseleave', (e) => {
		cursor.dataset.hover = 0;
	})
}
for (let link of document.querySelectorAll('button')) {
	const cursor = document.querySelector('.cursor');
	link.addEventListener('mouseenter', (e) => {
		cursor.dataset.hover = 1;
	})
	link.addEventListener('mouseleave', (e) => {
		cursor.dataset.hover = 0;
	})
}
document.querySelector('body').addEventListener('mousedown', (e) => {
	const cursor = document.querySelector('.cursor');
	cursor.dataset.press = 1;
})
document.querySelector('body').addEventListener('mouseup', (e) => {
	const cursor = document.querySelector('.cursor');
	cursor.dataset.press = 0;
})