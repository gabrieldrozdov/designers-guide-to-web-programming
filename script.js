// Header animation
const headerTitleBig = document.querySelector('.header-title-big');
for (let span of headerTitleBig.querySelectorAll('span')) {
	let temp = "";
	for (let letter of span.innerText) {
		temp += `<span style="animation-delay: ${-Math.random()*10}s;">${letter}</span>`;
	}
	span.innerHTML = temp;
}

// Chapter heading title name animation
for (let heading of document.querySelectorAll('.chapter-heading-title-name')) {
	let temp = "";
	for (let letter of heading.innerText) {
		temp += `<span style="animation-delay: ${-Math.random()*10}s;">${letter}</span>`;
	}
	heading.innerHTML = temp;
}

// Transition in/out observer
const transitionObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		let elmnt = entry.target;
		if (entry.isIntersecting) {
			elmnt.dataset.active = 1;
		} else {
			// elmnt.dataset.active = 0;
		}
	});
});
for (let elmnt of document.querySelectorAll('.observed')) {
	elmnt.dataset.active = 0;
	transitionObserver.observe(elmnt);
}

// Open/close nav
function toggleNav() {
	const nav = document.querySelector('.nav');
	if (parseInt(nav.dataset.active) == 0) {
		nav.dataset.active = 1;
	} else {
		nav.dataset.active = 0;
	}
}