// Animate header title
function initializeHeaderTitle() {
	const headerTitleBig = document.querySelector('.header-title-big');
	let temp = '';
	let index = 0;
	for (let letter of headerTitleBig.innerText) {
		if (letter == " ") {
			letter = "&nbsp;";
		}
		temp += `<span style="animation-delay: -${index*50}ms">${letter}</span>`;
		index++;
	}
	headerTitleBig.innerHTML = temp;
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