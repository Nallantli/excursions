const gloss_keys = {
	"loc": "Locative Particle",
	"posd": "Possessive Case",
	"sg": "Singular",
	"pl": "Plural",
	"absl": "Absolute Case",
	"rel": "Relative Pronoun",
	"3sg": "Third Person Singular",
	"t": "Thematic Pronoun",
	"prf": "Perfect",
	"pass": "Passive",
	"prs": "Present",
	"ind": "Indicative",
	"qual": "Adjective of Quality",
	"adv": "Adverbial",
	"nmz": "Nominalizer",
	"subr": "Subordinator",
	"attr": "Attributive",
	"cop": "Copula",
	"exclam": "Exclamation",
	"neg": "Negation",
	"pot": "Potential",
	"instr": "Instrumental Particle",
	"dat": "Dative Particle",
	"hyp": "Hypothetical",
	"3pl": "Third Person Plural",
	"1sg": "First Person Singular",
	"abstr": "Abstract Nominalizer",
	"caus": "Causative",
	"all": "Allative Particle",
	"act": "Actor of a Passive Clause Particle",
	"ab": "Abessive Negation of Habitual Verbs",
	"hab": "Habitual",
	"ntr": "Intransitivizer",
	"2sg": "Second Person Singular"
};

function resolveKey(key) {
	if (gloss_keys[key] == undefined) {
		console.log(`key ${key} not found`);
	}
	return gloss_keys[key];
}

function parseGloss(g) {
	let s = `<div class="line">`;
	s += `<div class="line-at">${g["at"].replace(/²/g, "")}</div><div class="tabulate">`;
	g["units"].forEach(u => {
		s += `<table class="unit-block">`;
		s += `<tr class="unit-atlat"><td>${u["atlat"].replace(/²/g, "")}</td></tr>`;
		s += `<tr class="unit-gloss"><td>`;
		let gloss = u["gloss"];
		if (gloss.search(/\{(.+?)\}/) == -1) {
			s += gloss;
		} else {
			while (gloss.search(/\{.+?\}/) != -1) {
				let i = gloss.search(/\{.+?\}/);
				let m = gloss.match(/\{.+?\}/)[0];
				m = m.substring(1, m.length - 1);
				s += gloss.substring(0, i);
				gloss = gloss.substring(i + m.length + 2, gloss.length);
				m.split(".").forEach((p, i) => {
					if (i > 0) {
						s += `.`;
					}
					s += `<span class="small-caps">${p}<div class="hover">${resolveKey(p)}</div></span>`;
				});
			}
			s += gloss;
		}
		s += `</td></tr>`;
		// s += `<tr class="unit-gloss"><td>${u["gloss"].replace(/\{(.+?)\}/g, `<span class="small-caps">$1<div class="hover">document.write(parseKey("$1"))</div></span>`)}</td></tr>`;
		s += `</table>`;
	});
	s += `<div class="line-en">${g["en"]}</div></div>`;
	if (g["ex"] != undefined) {
		s += `<div class="line-ex">${g["ex"]}</div>`;
	}
	s += `</div>`;
	return s;
}