
function transliterate(s) {
	return s
		.replace(/qu/g, "q")
		.replace(/Qu/g, "Q")
		.replace(/hu/g, "w")
		.replace(/Hu/g, "W")
		.replace(/tl/g, 'j')
		.replace(/Tl/g, 'J');
}

function genVerse(n, data, font) {
	s = `<tr>`;
	s += `<td class="num">${n}</td>`
	s += `<td class="line"><div class="ipa">[${data.ipa}]</div><div ${font == 0 ? `class="atl"` : (font == 1 ? `class="god"` : ``)}>${font < 2 ? transliterate(data.text.replace(/²/g, "")) : data.text.replace(/²/g, "")}</div><div class="trn">${data.en}</div></td>`;
	s += `</tr>`;
	return s;
}

function genPassage(data, font) {
	let s = `<div class="para"><h1 ${font == 0 ? `class="atl"` : (font == 1 ? `class="god"` : ``)}>${font < 2 ? transliterate(data.title.replace(/²/g, "")) : data.title.replace(/²/g, "")}</h1>`;

	if (data.image) {
		s += `<img class="image" src="${data.image}">`;
	}

	if (font != 1) {
		s += `<table>`;
		data.lines.forEach((c, i) => {
			s += genVerse(i + 1, c, font);
		});
		return s + "</table>";
	} else {
		s += `<div style="text-align: justify">`
		data.lines.forEach((c, i) => {
			s += `<span class="line god">${transliterate(c.text.replace(/²/g, "").replace(/[\?\!]/g, ".").replace(/([A-ZĀĒĪŌŪ])/g, `<span class="init-c">$1</span>`))}&nbsp</span>`;
		});
		s += "</div>";
	}
	return s + "</div>";
}

window.onload = function () {
	DATA.forEach(e => {
		document.getElementById("text-atl").innerHTML += genPassage(e, 0);
	});
	DATA.forEach(e => {
		document.getElementById("text-god").innerHTML += genPassage(e, 1);
	});
	DATA.forEach(e => {
		document.getElementById("text-trl").innerHTML += genPassage(e, 2);
	});
}
