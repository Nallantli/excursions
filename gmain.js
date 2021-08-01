function genVerse(n, data, isFirst) {
	s = `<tr>`;
	s += `<td class="num">${n}</td>`
	s += `<td class="line"><div class="atl">${data.text.replace(/²/g, "")}</div><div class="trn">${data.en}</div><div class="ipa">[${data.ipa}]</div></td>`;
	s += `</tr>`;
	return s;
}

function genPassage(data) {
	let s = `<div class="para"><h1>${data.title.replace(/²/g, "")}</h1><table>`;
	data.lines.forEach((c, i) => {
		s += genVerse(i + 1, c, i == 0);
	});
	return s + "</table></div>";
}

window.onload = function () {
	DATA.forEach(e => {
		document.getElementById("text").innerHTML += genPassage(e);
	});
}
