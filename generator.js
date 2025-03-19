const fs = require('fs');

// Get JSON
const data = require('./data.json');

const colors = ["pink", "green", "blue", "yellow", "purple", "red"];

function generateHTML() {

	// Generate unit content
	let unitContent = ['', '', '', '', '', ''];
	let navContent = ['', '', '', '', '', ''];

	let unitNumber = 0;
	for (let unit of data) {
		let actualUnitNumber = unitNumber+1;

		// Generate sections
		let sections = "";
		let sectionNumber = 1;
		for (let section of unit) {

			navContent[unitNumber] += `
			<a href="#unit-${actualUnitNumber}-${section["id"]}" class="nav-link-subsection" style="--primary: var(--${colors[unitNumber]});" onclick="toggleNav();">${section["display-name"]}</a>`;

			// Generate subsections
			let subsections = "";
			for (let subsection of section["subsections"]) {

				// Generate resources
				let resources = "";
				for (let resource of subsection["resources"]) {

					let desc = '';
					if (resource['desc'] != "") {
						desc = `<p class="unit-subsection-resource-desc">${resource['desc']}</p>`;
					}
					resources += `
						<a class="unit-subsection-resource observed" href="${resource['link']}" target="_blank">
							<h5 class="unit-subsection-resource-heading">${resource['title']}</h5>
							${desc}
						</a>
					`;
				}

				let subsectionHeading = '';
				if (subsection["display-name"] != "") {
					subsectionHeading = `
						<div class="unit-subsection-heading observed">
							<h4 class="unit-subsection-title">
								<a href="#unit-${actualUnitNumber}-${section["id"]}-${subsection["id"]}"><span>${subsection["display-name"]}</span></a>
							</h4>
						</div>
						<div class="unit-section-line"></div>
					`;
				} else {
					subsectionHeading = `<div class="unit-section-line"></div>`;
				}

				subsections += `
					<div class="unit-subsection" id="unit-${actualUnitNumber}-${section["id"]}-${subsection["id"]}">
						${subsectionHeading}
						<div class="unit-subsection-resources">
							${resources}
						</div>
						<div class="unit-section-line unit-section-line-alt"></div>
					</div>
				`;
			}

			sections += `
				<div class="unit-section" id="unit-${actualUnitNumber}-${section["id"]}">
					<div class="unit-section-info observed">
						<div class="unit-section-info-content">
							<h3><a href="#unit-${actualUnitNumber}-${section["id"]}"><span>${section["display-name"]}</span></a></h3>
							${section["info"]}
						</div>
					</div>
					<div class="unit-section-line"></div>
					<div class="unit-subsections">
						${subsections}
					</div>
					<div class="unit-section-line unit-section-line-alt"></div>
				</div>
			`;
			sectionNumber++;
		}

		unitContent[unitNumber] = sections;

		unitNumber++;
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
					<a class="header-title-link" href="https://gdwithgd.com/" target="_blank">A project by GD&nbsp;with&nbsp;GD</a>
				</h1>

				<div class="header-desc">
					<p>
						When I became a designer, I wanted to make work that people could interact with. If you want to make work like this, <strong>then you should make websites.</strong>
					</p>
					<p>
						This site is your tour guide. Follow this guide to learn everything you need to know to make a website. Here’s the best part — no matter where you stop, you’ll be able to make something cool. Even a single line of code can make a memorable website, like <a href="https://www.sometimesredsometimesblue.com/" target="_blank">this one</a>.
					</p>
					<p>
						This guide will also teach you how to teach yourself. In it, you’ll find links to the resources that full-time coders use everyday, like <a href="https://developer.mozilla.org/en-US/" target="_blank">this one</a>. This guide makes those resources easier to find and puts them in order.
					</p>
					<p>
						To get started, <strong>keep scrolling.</strong>
					</p>
				</div>
			</header>
		
			<div class="container">

				<nav class="nav" data-active="0">
					<button class="nav-close" onclick="toggleNav();">X</button>
					<div class="nav-content">
						<div class="nav-group">
							<a href="https://gdwithgd.com/" class="nav-link-section" target="_blank" style="--primary: var(--light-gray);">More from GD with GD</a>
							<a href="https://babysteps.gdwithgd.com/" class="nav-link-subsection" target="_blank" style="--primary: var(--light-gray);">Launch a website</a>
							<a href="https://demoland.gdwithgd.com/editor/?book=tutorial&chapter=tutorial&demo=welcome" class="nav-link-subsection" target="_blank" style="--primary: var(--light-gray);">Code in your browser</a>
							<a href="https://testproject1.gdwithgd.com/" class="nav-link-subsection" target="_blank" style="--primary: var(--light-gray);">Start a project</a>
						</div>
						<div class="nav-group">
							<a href="#unit-1" class="nav-link-section" style="--primary: var(--pink);" onclick="toggleNav();">Typography</a>
							${navContent[0]}
						</div>
						<div class="nav-group">
							<a href="#unit-2" class="nav-link-section" style="--primary: var(--green);" onclick="toggleNav();">The Box Model</a>
							${navContent[1]}
						</div>
						<div class="nav-group">
							<a href="#unit-3" class="nav-link-section" style="--primary: var(--blue);" onclick="toggleNav();">Layout</a>
							${navContent[2]}
						</div>
						<div class="nav-group">
							<a href="#unit-4" class="nav-link-section" style="--primary: var(--yellow);" onclick="toggleNav();">Interaction</a>
							${navContent[3]}
						</div>
						<div class="nav-group">
							<a href="#unit-5" class="nav-link-section" style="--primary: var(--purple);" onclick="toggleNav();">Loops</a>
							${navContent[4]}
						</div>
						<div class="nav-group">
							<a href="#unit-6" class="nav-link-section" style="--primary: var(--red);" onclick="toggleNav();">Data</a>
							${navContent[5]}
						</div>
					</div>
				</nav>

				<button class="nav-toggle" onclick="toggleNav();">Menu</button>

				<main class="units">

					<section class="unit" style="--primary: var(--pink);" data-color="pink" id="unit-1">
						<div class="unit-heading">
							<a href="#unit-1" class="unit-heading-title">
								<div class="unit-heading-title-number">Unit 1</div>
								<h2 class="unit-heading-title-name">Typography</h2>
							</a>
							<div class="unit-heading-desc">
								<p>
									To a designer, typography is everything. But unlike on other mediums, typography on the web is fluid because it has to adapt to a changing canvas — your screen size. This fluidity means that we can’t use traditional software to design a website. Instead, we have to use two programming languages: HTML and CSS.
								</p>
								<p>
									Programming may seem scary, but web code is actually pretty simple. HTML and CSS basically just describe what should appear on your screen, and the most basic form of visual content is typography. So let’s jump right into coding and start making websites!
								</p>
							</div>
						</div>

						<div class="unit-content">
							${unitContent[0]}
						</div>
					</section>

					<section class="unit" style="--primary: var(--green)" data-color="green" id="unit-2">
						<div class="unit-heading">
							<a href="#unit-2" class="unit-heading-title">
								<div class="unit-heading-title-number">Unit 2</div>
								<h2 class="unit-heading-title-name">The Box Model</h2>
							</a>
							<div class="unit-heading-desc">
								<p>
									On the Internet, everything is a box. Even though we have different HTML elements, each one is essentially a preset style for the same boxy element. And each boxy element shares the same CSS properties, which together form the “CSS box model.”
								</p>
								<p>
									By learning how the box model works, you’ll have the power to move beyond typography and begin laying out your page graphically.
								</p>
							</div>
						</div>

						<div class="unit-content">
							${unitContent[1]}
						</div>
					</section>

					<section class="unit" style="--primary: var(--blue);" data-color="blue" id="unit-3">
						<div class="unit-heading">
							<a href="#unit-3" class="unit-heading-title">
								<div class="unit-heading-title-number">Unit 3</div>
								<h2 class="unit-heading-title-name">Layout</h2>
							</a>
							<div class="unit-heading-desc">
								<p>
									Websites are vertical — as you add content, your page gets taller. That works great for basic articles, but what about non-vertical layouts? Help!
								</p>
								<p>
									The need for more complicated web layouts arose, so CSS evolved to meet these needs. It became capable of changing depending on your screen size. On top of that, designers gained two brand new ways to lay out content: in two-dimensional grids, and a quirky little thing called flexbox.
								</p>
							</div>
						</div>

						<div class="unit-content">
							${unitContent[2]}
						</div>
					</section>

					<section class="unit" style="--primary: var(--yellow);" data-color="yellow" id="unit-4">
						<div class="unit-heading">
							<a href="#unit-4" class="unit-heading-title">
								<div class="unit-heading-title-number">Unit 4</div>
								<h2 class="unit-heading-title-name">Interaction</h2>
							</a>
							<div class="unit-heading-desc">
								<p>
									Once you’re comfortable with HTML and CSS, you might find yourself asking a question: is this really all a website can do? Organize and present information?
								</p>
								<p>
									Of course not! Websites are incredible not just because they give us information, but because they also make that information <em>interactive</em>. Unfortunately for us developers, that means we’re going to have to learn yet another language, namely JavaScript. Get ready for something a little different!
								</p>
							</div>
						</div>

						<div class="unit-content">
							${unitContent[3]}
						</div>
					</section>
				
					<section class="unit" style="--primary: var(--purple);" data-color="purple" id="unit-5">
						<div class="unit-heading">
							<a href="#unit-5" class="unit-heading-title">
								<div class="unit-heading-title-number">Unit 5</div>
								<h2 class="unit-heading-title-name">Loops</h2>
							</a>
							<div class="unit-heading-desc">
								<p>
									JavaScript is pretty darn powerful. Not only can we use it to make websites interactive, we can use JavaScript to make things happen on their own! To leverage this kind of power, we need to learn about a fundamental concept of computer science: loops.
								</p>
								<p>
									In this section, we’ll use loops to automate repetitive tasks and make full use of the web medium.
								</p>
							</div>
						</div>

						<div class="unit-content">
							${unitContent[4]}
						</div>
					</section>
				
					<section class="unit" style="--primary: var(--red);" data-color="red" id="unit-6">
						<div class="unit-heading">
							<a href="#unit-6" class="unit-heading-title">
								<div class="unit-heading-title-number">Unit 5</div>
								<h2 class="unit-heading-title-name">Data</h2>
							</a>
							<div class="unit-heading-desc">
								<p>
									One way JavaScript is so different from HTML and CSS is that it can actually write HTML and CSS for you. Once you realize that, you might ask yourself: how much of my website can I code just using JavaScript? The answer is quite a lot, but it helps to have some data to pull from.
								</p>
								<p>
									In this final unit, we’ll look at how we can use JavaScript and data to create complex websites without having to write much HTML or CSS by hand.
								</p>
								<p>
									Even though this is the last unit, remember that there isn’t really a finish line to web programming. You can always run into a problem that requires learning a new skill. After this, you’ll at least have all the basics you need to solve those problems.
								</p>
							</div>
						</div>

						<div class="unit-content">
							${unitContent[5]}
						</div>
					</section>

				</main>

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