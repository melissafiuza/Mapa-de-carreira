/*
	Versao orientada por JSON.

	Este arquivo mostra uma separacao comum em projetos reais:
	- dados editaveis ficam no JSON;
	- estrutura fica no HTML;
	- montagem dinamica e animacoes ficam no JavaScript.
*/

const DATA_URL = "assets/data/carreira.json";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const createElement = (tagName, className, textContent) => {
	const element = document.createElement(tagName);

	if (className) {
		element.className = className;
	}

	if (textContent) {
		element.textContent = textContent;
	}

	return element;
};

/* Pequenos icones inline em SVG, no estilo do contato (email, link, codigo). */
const CONTACT_ICONS = {
	mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18v12H3z"/><path d="M3 7l9 6 9-6"/></svg>`,
	link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 15l6-6"/><path d="M8 13l-2 2a4 4 0 005.6 5.6l2-2"/><path d="M16 11l2-2a4 4 0 00-5.6-5.6l-2 2"/></svg>`,
	code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l-6-6 6-6"/><path d="M15 6l6 6-6 6"/></svg>`,
	web: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 010 18a14 14 0 010-18"/></svg>`
};

const getIconFor = (url) => {
	if (url.startsWith("mailto:")) return CONTACT_ICONS.mail;
	if (url.includes("linkedin.com")) return CONTACT_ICONS.link;
	if (url.includes("github.com")) return CONTACT_ICONS.code;
	return CONTACT_ICONS.web;
};

const renderHeadMetadata = ({ seo, profile }) => {
	document.title = seo.title;
	document.querySelector('meta[name="description"]').setAttribute("content", seo.description);

	const author = document.createElement("meta");
	author.name = "author";
	author.content = seo.author;
	document.head.appendChild(author);

	const canonical = document.createElement("link");
	canonical.rel = "canonical";
	canonical.href = seo.canonicalUrl;
	document.head.appendChild(canonical);

	const openGraphTitle = document.createElement("meta");
	openGraphTitle.setAttribute("property", "og:title");
	openGraphTitle.content = seo.title;
	document.head.appendChild(openGraphTitle);

	const openGraphDescription = document.createElement("meta");
	openGraphDescription.setAttribute("property", "og:description");
	openGraphDescription.content = seo.description;
	document.head.appendChild(openGraphDescription);

	const openGraphImage = document.createElement("meta");
	openGraphImage.setAttribute("property", "og:image");
	openGraphImage.content = profile.photo;
	document.head.appendChild(openGraphImage);
};

const renderProfile = ({ profile, contacts }) => {
	document.getElementById("profile-name").textContent = profile.name;
	document.getElementById("profile-headline").textContent = profile.headline;
	document.getElementById("profile-summary").textContent = profile.summary;

	const photo = document.getElementById("profile-photo");
	photo.src = profile.photo;
	photo.alt = profile.photoAlt;

	const cvLink = document.getElementById("cv-link");
	cvLink.href = profile.cvUrl;
	cvLink.setAttribute("aria-label", `Baixar curriculo de ${profile.name} em PDF`);

	const contactList = document.getElementById("contact-list");
	contactList.innerHTML = "";

	contacts.forEach((contact) => {
		const listItem = document.createElement("li");
		const link = document.createElement("a");
		link.href = contact.url;

		const iconSpan = document.createElement("span");
		iconSpan.setAttribute("aria-hidden", "true");
		iconSpan.innerHTML = getIconFor(contact.url);

		const label = document.createElement("span");
		label.textContent = contact.label;

		link.appendChild(iconSpan);
		link.appendChild(label);

		if (contact.url.startsWith("http")) {
			link.target = "_blank";
			link.rel = "noopener";
		}

		listItem.appendChild(link);
		contactList.appendChild(listItem);
	});
};

const renderCareerTimeline = (careerSteps) => {
	const timeline = document.getElementById("career-timeline");
	timeline.innerHTML = "";

	careerSteps.forEach((step, index) => {
		const titleId = `career-step-${index + 1}`;

		const article = createElement("article", "timeline-item reveal");
		article.setAttribute("aria-labelledby", titleId);

		const node = createElement("span", "timeline-node");
		node.setAttribute("aria-hidden", "true");

		const header = createElement("div", "timeline-header");
		const versionTag = createElement("span", "version-tag", `v${index + 1}.0`);
		const title = createElement("h3", "timeline-title", step.title);
		title.id = titleId;
		header.appendChild(versionTag);
		header.appendChild(title);

		const description = createElement("p", "timeline-desc", step.description);

		const softHeading = createElement("h4", "timeline-subhead", "Soft skills exigidas para essa etapa");
		const softSkillList = createElement("ul", "softskill-list");
		step.softSkills.forEach((skill) => {
			softSkillList.appendChild(createElement("li", "", skill));
		});

		const roadmapHeading = createElement("h4", "timeline-subhead", "Roadmap de aprendizado");
		const roadmapList = createElement("ul", "roadmap-list");
		roadmapList.setAttribute("aria-label", `Tecnologias da etapa ${step.title}`);
		step.roadmap.forEach((tech) => {
			const item = createElement("li");
			item.appendChild(createElement("span", "roadmap-tag", tech));
			roadmapList.appendChild(item);
		});

		article.appendChild(node);
		article.appendChild(header);
		article.appendChild(description);
		article.appendChild(softHeading);
		article.appendChild(softSkillList);
		article.appendChild(roadmapHeading);
		article.appendChild(roadmapList);
		timeline.appendChild(article);
	});
};

const renderSkills = ({ skillGroups, otherSkills }) => {
	const skillGroupsContainer = document.getElementById("skill-groups");
	skillGroupsContainer.innerHTML = "";

	skillGroups.forEach((group) => {
		const groupElement = createElement("div", "skill-group");
		groupElement.appendChild(createElement("h3", "skills-cat", group.title));

		group.skills.forEach((skill) => {
			const row = createElement("div", "skill-row");
			row.dataset.level = skill.level;

			const nameRow = createElement("div", "skill-name-row");
			nameRow.appendChild(createElement("span", "", skill.name));
			nameRow.appendChild(createElement("span", "skill-percent", "0%"));

			const track = createElement("div", "skill-track");
			track.setAttribute("role", "progressbar");
			track.setAttribute("aria-label", skill.name);
			track.setAttribute("aria-valuemin", "0");
			track.setAttribute("aria-valuemax", "100");
			track.setAttribute("aria-valuenow", String(skill.level));

			const bar = createElement("div", "skill-bar");
			track.appendChild(bar);

			row.appendChild(nameRow);
			row.appendChild(track);
			groupElement.appendChild(row);
		});

		skillGroupsContainer.appendChild(groupElement);
	});

	const otherSkillsList = document.getElementById("other-skills");
	otherSkillsList.innerHTML = "";

	otherSkills.forEach((skill) => {
		const item = createElement("li");
		item.appendChild(createElement("span", "badge", skill));
		otherSkillsList.appendChild(item);
	});
};

const renderPage = (data) => {
	renderHeadMetadata(data);
	renderProfile(data);
	renderCareerTimeline(data.careerSteps);
	renderSkills(data);
	setupAnimations();
};

/* ---------- Animacoes ---------- */

const animateSkillRow = (row) => {
	const level = Number(row.dataset.level || 0);
	const bar = row.querySelector(".skill-bar");
	const percentLabel = row.querySelector(".skill-percent");

	if (prefersReducedMotion) {
		bar.style.width = `${level}%`;
		percentLabel.textContent = `${level}%`;
		return;
	}

	bar.style.width = `${level}%`;

	const duration = 900;
	const start = performance.now();

	const tick = (now) => {
		const progress = Math.min(1, (now - start) / duration);
		percentLabel.textContent = `${Math.round(progress * level)}%`;
		if (progress < 1) {
			requestAnimationFrame(tick);
		}
	};

	requestAnimationFrame(tick);
};

const setupRevealObserver = () => {
	const revealEls = document.querySelectorAll(".reveal");

	if (prefersReducedMotion || !("IntersectionObserver" in window)) {
		revealEls.forEach((el) => el.classList.add("is-visible"));
		return;
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

	revealEls.forEach((el) => observer.observe(el));
};

const setupSkillObserver = () => {
	const rows = document.querySelectorAll(".skill-row");

	if (prefersReducedMotion || !("IntersectionObserver" in window)) {
		rows.forEach(animateSkillRow);
		return;
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				animateSkillRow(entry.target);
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.3 });

	rows.forEach((row) => observer.observe(row));
};

const setupTimelineFill = () => {
	const wrap = document.getElementById("career-timeline-wrap");
	const fill = document.getElementById("timeline-fill");

	if (!wrap || !fill) return;

	if (prefersReducedMotion) {
		fill.style.height = "100%";
		return;
	}

	let ticking = false;

	const update = () => {
		const rect = wrap.getBoundingClientRect();
		const triggerPoint = window.innerHeight * 0.5;
		const progress = (triggerPoint - rect.top) / rect.height;
		fill.style.height = `${Math.min(1, Math.max(0, progress)) * 100}%`;
		ticking = false;
	};

	window.addEventListener("scroll", () => {
		if (!ticking) {
			window.requestAnimationFrame(update);
			ticking = true;
		}
	}, { passive: true });

	update();
};

const setupBackToTop = () => {
	const button = document.getElementById("to-top");
	if (!button) return;

	window.addEventListener("scroll", () => {
		button.classList.toggle("visible", window.scrollY > 480);
	}, { passive: true });

	button.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
	});
};

const setupAnimations = () => {
	setupRevealObserver();
	setupSkillObserver();
	setupTimelineFill();
	setupBackToTop();
};

const parseCareerData = (jsonText) => {
	try {
		return JSON.parse(jsonText);
	} catch (originalError) {
		// Fallback: tolerate trailing commas in arrays/objects from manual edits.
		const sanitized = jsonText.replace(/,\s*([}\]])/g, "$1");

		try {
			console.warn("JSON com virgula sobrando detectado. Aplicando correção automatica.");
			return JSON.parse(sanitized);
		} catch {
			throw originalError;
		}
	}
};

fetch(DATA_URL)
	.then((response) => {
		if (!response.ok) {
			throw new Error("Nao foi possivel carregar o JSON.");
		}

		return response.text();
	})
	.then(parseCareerData)
	.then(renderPage)
	.catch((error) => {
		const main = document.getElementById("conteudo-principal");
		const warning = createElement("p", "load-warning", "Nao foi possivel carregar os dados do JSON. Execute a pagina em um servidor local ou publique no GitHub Pages.");
		main.prepend(warning);
		console.error(error);
	});
