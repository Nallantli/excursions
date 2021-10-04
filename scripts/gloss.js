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
	"on": `A multi-purpose particle; shares properties of a subordinator, determiner, and generic pronoun`,
	"redup": `Reduplicant`,
	"top": `Topic`,
	"1pl": `First Person Plural`,
	"1sg": "First Person Singular",
	"2sg": "Second Person Singular",
	"3pl": "Third Person Plural",
	"3sg": "Third Person Singular",
	"ab": "Abessive Negation of Habitual Verbs",
	"abl": "Ablative",
	"absl": "Absolute",
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
	"dim": `Diminutive`,
	"drefl": `Deep Reflexive - Refers to higher clause subject`,
	"emoji": `Emoji`,
	"exclam": "Exclamation",
	"fut": "Future",
	"hab": "Habitual",
	"hyp": "Hypothetical",
	"imp": `Imperative`,
	"ind": "Indicative",
	"inf": `Infinitive`,
	"instr": "Instrumental",
	"loc": "Locative",
	"neg": "Negation",
	"nmz": "Nominalizer",
	"npst": `Non-Past`,
	"ntr": "Intransitivizer",
	"pass": "Passive",
	"pl": "Plural",
	"posd": "Possessive",
	"pot": "Potential",
	"prf": "Perfect",
	"proper name": "Proper Name, e.g. of a person",
	"pst": "Past",
	"q": "Question",
	"ncom": `Non-commitative`,
	"qual": "Adjective of Quality",
	"rdp": `Reduplicant`,
	"refl": "Reflexive",
	"rel": "Relative Pronoun",
	"sg": "Singular",
	"subr": "Subordinator",
	"t": "Thematic Pronoun",
	"v": `Verb`
};

function resolveKey(key) {
	if (gloss_keys[key] == undefined) {
		console.log(`key ${key} not found`);
	}
	return gloss_keys[key];
}

function parseGloss(g) {
	let s = `<div class="line">`;
	if (g["ref"] != undefined) {
		s += `<a class="gloss-link" href="#${g["ref"]}" id="${g["ref"]}">#${g["ref"]}</a>`;
	}
	s += `<div class="line-at">`;
	s += `<span class="text-lat">${g["etl"].replace(/²/g, "")}</span>`;
	s += `<span style="display: none;" class="text-etl-ser">${transliterate(g["etl"].replace(/²/g, ""))}</span>`;
	s += `<span style="display: none;" class="text-etl-san">${transliterate(g["etl"].replace(/²/g, ""))}</span>`;
	s += `<span style="display: none;" class="text-god">${transliterate(g["etl"].replace(/²/g, ""))}</span>`;
	s += `<span style="display: none;" class="text-toz">${transliterate(g["etl"].replace(/²/g, "").toLowerCase())}</span>`;
	s += `</div><div class="tabulate">`;
	if (g["ipa"]) {
		s += `<div class="ipa">[${g["ipa"]}]</div>`;
	}
	g["units"].forEach(u => {
		s += `<table class="unit-block">`;
		s += `<tr class="unit-etlat"><td>${u["etlat"].replace(/²/g, "").replace(/\Ø/g, "∅")}</td></tr>`;
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
					s += `<span class="small-caps">${p}<div class="hover"><p>${resolveKey(p)}</p></div></span>`;
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