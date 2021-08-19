function transliterate(s) {
	return s
		.replace(/qu/g, "q")
		.replace(/Qu/g, "Q")
		.replace(/hu/g, "w")
		.replace(/Hu/g, "W")
		.replace(/tl/g, 'j')
		.replace(/Tl/g, 'J');
}

const gloss_keys = {
	"inf": `Infinitive`,
	"drefl": `Deep Reflexive - Refers to higher clause subject`,
	"1pl": `First Person Plural`,
	"dim": `Diminutive`,
	"npst": `Non-Past`,
	"1sg": "First Person Singular",
	"2sg": "Second Person Singular",
	"3pl": "Third Person Plural",
	"3sg": "Third Person Singular",
	"ab": "Abessive Negation of Habitual Verbs",
	"absl": "Absolute Case",
	"abstr": "Abstract Nominalizer",
	"act": "Actor of a Passive Clause",
	"adv": "Adverbial",
	"agt": "Agent",
	"all": "Allative",
	"attr": "Attributive",
	"caus": "Causative",
	"cond": "Conditional",
	"cop": "Copula",
	"dat": "Dative",
	"exclam": "Exclamation",
	"fut": "Future",
	"hab": "Habitual",
	"hyp": "Hypothetical",
	"ind": "Indicative",
	"instr": "Instrumental",
	"loc": "Locative",
	"neg": "Negation",
	"nmz": "Nominalizer",
	"ntr": "Intransitivizer",
	"pass": "Passive",
	"pl": "Plural",
	"posd": "Possessive Case",
	"pot": "Potential",
	"prf": "Perfect",
	"proper name": "Proper Name, e.g. of a person",
	"pst": "Past",
	"q": "Question",
	"qual": "Adjective of Quality",
	"refl": "Reflexive",
	"rel": "Relative Pronoun",
	"sg": "Singular",
	"subr": "Subordinator",
	"t": "Thematic Pronoun",
};

function resolveKey(key) {
	if (gloss_keys[key] == undefined) {
		console.log(`key ${key} not found`);
	}
	return gloss_keys[key];
}

function parseGloss(g, link) {
	let s = `<div class="line">`;
	if (link) {
		s += `<a class="gloss-link" href="#${link}" id="${link}">#${link}</a>`;
	}
	s += `<div class="line-at">`;
	s += `<span class="text-lat">${g["at"].replace(/²/g, "")}</span>`;
	s += `<span style="display: none;" class="text-atl-ser">${transliterate(g["at"].replace(/²/g, ""))}</span>`;
	s += `<span style="display: none;" class="text-atl-san">${transliterate(g["at"].replace(/²/g, ""))}</span>`;
	s += `<span style="display: none;" class="text-god">${transliterate(g["at"].replace(/²/g, ""))}</span>`;
	s += `</div><div class="tabulate">`;
	if (g["ipa"]) {
		s += `<div class="ipa">[${g["ipa"]}]</div>`;
	}
	g["units"].forEach(u => {
		s += `<table class="unit-block">`;
		s += `<tr class="unit-atlat"><td>${u["atlat"].replace(/²/g, "").replace(/\Ø/g, "∅")}</td></tr>`;
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
		s += `</table>`;
	});
	s += `<div class="line-en">${g["en"]}</div></div>`;
	if (g["ex"] != undefined) {
		s += `<div class="line-ex">${g["ex"]}</div>`;
	}
	s += `</div>`;
	return s;
}