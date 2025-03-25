const fs = require('fs');

// Get JSON
const data = require('./data.json');

const colors = ["pink", "green", "blue", "yellow", "purple", "red"];

function generateHTML() {

	// Generate chapter content
	let chapterContent = ['', '', '', '', '', ''];
	let navContent = ['', '', '', '', '', ''];

	let chapterNumber = 0;
	for (let chapter of data) {
		let actualChapterNumber = chapterNumber+1;

		// Generate sections
		let sections = "";
		let sectionNumber = 1;
		for (let section of chapter) {

			navContent[chapterNumber] += `
			<a href="#chapter-${actualChapterNumber}-${section["id"]}" class="nav-link-subsection" style="--primary: var(--${colors[chapterNumber]}); --primary-rgb: var(--${colors[chapterNumber]}-rgb);" onclick="toggleNav();">${section["display-name"]}</a>`;

			// Generate subsections
			let subsections = "";
			for (let subsection of section["subsections"]) {

				// Generate resources
				let resources = "";
				for (let resource of subsection["resources"]) {

					let desc = '';
					if (resource['desc'] != "") {
						desc = `<p class="chapter-subsection-resource-desc">${resource['desc']}</p>`;
					}
					resources += `
						<a class="chapter-subsection-resource observed" href="${resource['link']}" target="_blank">
							<h5 class="chapter-subsection-resource-heading">${resource['title']}</h5>
							${desc}
						</a>
					`;
				}

				let subsectionHeading = '';
				if (subsection["display-name"] != "") {
					subsectionHeading = `
						<div class="chapter-subsection-heading observed">
							<h4 class="chapter-subsection-title">
								<a href="#chapter-${actualChapterNumber}-${section["id"]}-${subsection["id"]}"><span>${subsection["display-name"]}</span></a>
							</h4>
						</div>
						<div class="chapter-section-line"></div>
					`;
				} else {
					subsectionHeading = `<div class="chapter-section-line"></div>`;
				}

				subsections += `
					<div class="chapter-subsection" id="chapter-${actualChapterNumber}-${section["id"]}-${subsection["id"]}">
						${subsectionHeading}
						<div class="chapter-subsection-resources">
							${resources}
						</div>
						<div class="chapter-section-line"></div>
					</div>
				`;
			}

			sections += `
				<div class="chapter-section" id="chapter-${actualChapterNumber}-${section["id"]}">
					<div class="chapter-section-info observed">
						<div class="chapter-section-info-content">
							<h3><a href="#chapter-${actualChapterNumber}-${section["id"]}"><span>${section["display-name"]}</span></a></h3>
							${section["info"]}
						</div>
					</div>
					<div class="chapter-section-line"></div>
					<div class="chapter-subsections">
						${subsections}
					</div>
					<div class="chapter-section-line"></div>
				</div>
			`;
			sectionNumber++;
		}

		chapterContent[chapterNumber] = sections;

		chapterNumber++;
	}

	let pageContent = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>The Designer’s Guide to Web Programming</title>
			<meta name="author" content="GD with GD">
			<meta name="keywords" content="Web Design, Web Development, Creative Coding, Design Education, Code Education">
			<meta name="description" content="A guided tour through the weird, wacky, wonderful (and sometimes intimidating) world of web programming, with a focus on the fun stuff.">
			<meta property="og:url" content="https://webprogramming.gdwithgd.com/">
			<meta name="og:title" property="og:title" content="The Designer’s Guide to Web Programming">
			<meta property="og:description" content="">
			<meta property="og:image" content="/assets/meta/opengraph.jpg">
			<link rel="icon" type="png" href="/assets/meta/favicon.png">
			<link rel="stylesheet" href="/style.css">
		</head>
		<body>
			<header class="header">
				<h1 class="header-title">
					<div class="header-title-small">The Designer’s Guide to</div>
					<div class="header-title-big"><span>Web</span> <span>Programming</span></div>
					<div class="header-title-link">Learn to make websites with <a href="https://gdwithgd.com/" target="_blank">GD&nbsp;with&nbsp;GD</a></div>
				</h1>
			</header>
		
			<div class="container">

				<nav class="nav" data-active="0">
					<button class="nav-close" onclick="toggleNav();">X</button>
					<div class="nav-content">
						<div class="nav-group">
							<a href="https://gdwithgd.com/" class="nav-link-section" target="_blank" style="--primary: var(--light-gray); --primary-rgb: var(--light-gray-rgb);">More from GD with GD</a>
							<a href="https://babysteps.gdwithgd.com/" class="nav-link-subsection" target="_blank" style="--primary: var(--light-gray); --primary-rgb: var(--light-gray-rgb);">Launch a website</a>
							<a href="https://demoland.gdwithgd.com/editor/?book=tutorial&chapter=tutorial&demo=welcome" class="nav-link-subsection" target="_blank" style="--primary: var(--light-gray); --primary-rgb: var(--light-gray-rgb);">Code in your browser</a>
							<a href="https://testproject1.gdwithgd.com/" class="nav-link-subsection" target="_blank" style="--primary: var(--light-gray); --primary-rgb: var(--light-gray-rgb);">Start a project</a>
						</div>
						<div class="nav-group">
							<a href="#chapter-1" class="nav-link-section" style="--primary: var(--pink); --primary-rgb: var(--pink-rgb);" onclick="toggleNav();">What’s a website?</a>
							${navContent[0]}
						</div>
						<div class="nav-group">
							<a href="#chapter-2" class="nav-link-section" style="--primary: var(--green); --primary-rgb: var(--green-rgb);" onclick="toggleNav();">The Box Model</a>
							${navContent[1]}
						</div>
						<div class="nav-group">
							<a href="#chapter-3" class="nav-link-section" style="--primary: var(--blue); --primary-rgb: var(--blue-rgb);" onclick="toggleNav();">Layout</a>
							${navContent[2]}
						</div>
						<div class="nav-group">
							<a href="#chapter-4" class="nav-link-section" style="--primary: var(--yellow); --primary-rgb: var(--yellow-rgb);" onclick="toggleNav();">Interaction</a>
							${navContent[3]}
						</div>
						<div class="nav-group">
							<a href="#chapter-5" class="nav-link-section" style="--primary: var(--purple); --primary-rgb: var(--purple-rgb);" onclick="toggleNav();">Loops</a>
							${navContent[4]}
						</div>
						<div class="nav-group">
							<a href="#chapter-6" class="nav-link-section" style="--primary: var(--red); --primary-rgb: var(--red-rgb);" onclick="toggleNav();">Data</a>
							${navContent[5]}
						</div>
					</div>
				</nav>

				<button class="nav-toggle" onclick="toggleNav();">Menu</button>

				<main class="chapters">

					<section class="chapter" style="--primary: var(--pink); --primary-rgb: var(--pink-rgb);" data-color="pink" id="chapter-1">
						<div class="chapter-heading">
							<a href="#chapter-1" class="chapter-heading-title">
								<div class="chapter-heading-title-number">Chapter 1</div>
								<h2 class="chapter-heading-title-name">What’s a website?</h2>
							</a>
							<div class="chapter-heading-desc">
								<p>
									To a designer, typography is everything. But unlike on other mediums, typography on the web is fluid because it has to adapt to a changing canvas — your screen size. This fluidity means that we can’t use traditional software to design a website. Instead, we have to use two programming languages: HTML and CSS.
								</p>
								<p>
									Programming may seem scary, but web code is actually pretty simple. HTML and CSS basically just describe what should appear on your screen, and the most basic form of visual content is typography. So let’s jump right into coding and start making websites!
								</p>
							</div>
						</div>

						<div class="chapter-content">
							${chapterContent[0]}
						</div>
					</section>

					<section class="chapter" style="--primary: var(--green); --primary-rgb: var(--green-rgb);" data-color="green" id="chapter-2">
						<div class="chapter-heading">
							<a href="#chapter-2" class="chapter-heading-title">
								<div class="chapter-heading-title-number">Chapter 2</div>
								<h2 class="chapter-heading-title-name">The Box Model</h2>
							</a>
							<div class="chapter-heading-desc">
								<p>
									On the Internet, everything is a box. Even though we have different HTML elements, each one is essentially a preset style for the same boxy element. And each boxy element shares the same CSS properties, which together form the “CSS box model.”
								</p>
								<p>
									By learning how the box model works, you’ll have the power to move beyond typography and begin laying out your page graphically.
								</p>
							</div>
						</div>

						<div class="chapter-content">
							${chapterContent[1]}
						</div>
					</section>

					<section class="chapter" style="--primary: var(--blue); --primary-rgb: var(--blue-rgb);" data-color="blue" id="chapter-3">
						<div class="chapter-heading">
							<a href="#chapter-3" class="chapter-heading-title">
								<div class="chapter-heading-title-number">Chapter 3</div>
								<h2 class="chapter-heading-title-name">Layout</h2>
							</a>
							<div class="chapter-heading-desc">
								<p>
									Websites are vertical — as you add content, your page gets taller. That works great for basic articles, but what about non-vertical layouts? Help!
								</p>
								<p>
									The need for more complicated web layouts arose, so CSS evolved to meet these needs. It became capable of changing depending on your screen size. On top of that, designers gained two brand new ways to lay out content: in two-dimensional grids, and a quirky little thing called flexbox.
								</p>
							</div>
						</div>

						<div class="chapter-content">
							${chapterContent[2]}
						</div>
					</section>

					<section class="chapter" style="--primary: var(--yellow); --primary-rgb: var(--yellow-rgb);" data-color="yellow" id="chapter-4">
						<div class="chapter-heading">
							<a href="#chapter-4" class="chapter-heading-title">
								<div class="chapter-heading-title-number">Chapter 4</div>
								<h2 class="chapter-heading-title-name">Interaction</h2>
							</a>
							<div class="chapter-heading-desc">
								<p>
									Once you’re comfortable with HTML and CSS, you might find yourself asking a question: is this really all a website can do? Organize and present information?
								</p>
								<p>
									Of course not! Websites are incredible not just because they give us information, but because they also make that information <em>interactive</em>. Unfortunately for us developers, that means we’re going to have to learn yet another language, namely JavaScript. Get ready for something a little different!
								</p>
							</div>
						</div>

						<div class="chapter-content">
							${chapterContent[3]}
						</div>
					</section>
				
					<section class="chapter" style="--primary: var(--purple); --primary-rgb: var(--purple-rgb);" data-color="purple" id="chapter-5">
						<div class="chapter-heading">
							<a href="#chapter-5" class="chapter-heading-title">
								<div class="chapter-heading-title-number">Chapter 5</div>
								<h2 class="chapter-heading-title-name">Loops</h2>
							</a>
							<div class="chapter-heading-desc">
								<p>
									JavaScript is pretty darn powerful. Not only can we use it to make websites interactive, we can use JavaScript to make things happen on their own! To leverage this kind of power, we need to learn about a fundamental concept of computer science: loops.
								</p>
								<p>
									In this section, we’ll use loops to automate repetitive tasks and make full use of the web medium.
								</p>
							</div>
						</div>

						<div class="chapter-content">
							${chapterContent[4]}
						</div>
					</section>
				
					<section class="chapter" style="--primary: var(--red); --primary-rgb: var(--red-rgb);" data-color="red" id="chapter-6">
						<div class="chapter-heading">
							<a href="#chapter-6" class="chapter-heading-title">
								<div class="chapter-heading-title-number">Chapter 5</div>
								<h2 class="chapter-heading-title-name">Data</h2>
							</a>
							<div class="chapter-heading-desc">
								<p>
									One way JavaScript is so different from HTML and CSS is that it can actually write HTML and CSS for you. Once you realize that, you might ask yourself: how much of my website can I code just using JavaScript? The answer is quite a lot, but it helps to have some data to pull from.
								</p>
								<p>
									In this final chapter, we’ll look at how we can use JavaScript and data to create complex websites without having to write much HTML or CSS by hand.
								</p>
								<p>
									Even though this is the last chapter, remember that there isn’t really a finish line to web programming. You can always run into a problem that requires learning a new skill. After this, you’ll at least have all the basics you need to solve those problems.
								</p>
							</div>
						</div>

						<div class="chapter-content">
							${chapterContent[5]}
						</div>
					</section>

				</main>

			</div>

			<div class="vignette">
				<div class="scanlines"></div>
			</div>

			<script src="/script.js"></script>
		</body>
		</html>
	`;

	// Create work file
	fs.writeFile(`index.html`, pageContent, err => {
		if (err) {
			console.error(err);
		}
	});
}
generateHTML();