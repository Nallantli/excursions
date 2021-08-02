
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
	s += `<td class="line"><div class="ipa">[${data.ipa}]</div><div ${font ? `class="atl"` : ``}>${font ? transliterate(data.text.replace(/²/g, "")) : data.text.replace(/²/g, "")}</div><div class="trn">${data.en}</div></td>`;
	s += `</tr>`;
	return s;
}

function genPassage(data, font) {
	let s = `<div class="para"><h1 ${font ? `class="atl"` : ``}>${font ? transliterate(data.title.replace(/²/g, "")) : data.title.replace(/²/g, "")}</h1>`;
	s += `<table>`;
	if (data.image) {
		s += `<img class="image" src="${data.image}">`;
	}
	data.lines.forEach((c, i) => {
		s += genVerse(i + 1, c, font);
	});
	return s + "</table></div>";
}

window.onload = function () {
	DATA.forEach(e => {
		document.getElementById("text-atl").innerHTML += genPassage(e, true);
	});
	DATA.forEach(e => {
		document.getElementById("text-trl").innerHTML += genPassage(e, false);
	});
}
