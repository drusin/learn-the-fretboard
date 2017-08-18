var naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
var commonSharpNotes = ["C#", "D#", "F#", "G#", "A#"];
var uncommonSharpNotes = ["E#", "B#"];
var commonFlatNotes = ["Db", "Eb", "Gb", "Ab", "Bb"];
var uncommonFlatNotes = ["Cb", "Fb"];

var gStrings = ["E", "A", "D", "G"];

var fretNotes = [
	["E", "Fb"],
	["E#", "F"],
	["F#", "Gb"],
	["G"],
	["G#", "Ab"],
	["A"],
	["A#", "Bb"],
	["B", "Cb"],
	["B#", "C"],
	["C#", "Db"],
	["D"],
	["D#", "Eb"]
];

function getFretForNote(note, gString) {
	function findInArray(actualNote) {
		var i;
		for (i = 0; i < fretNotes.length; i++) {
			if (fretNotes[i].indexOf(actualNote) !== -1) {
				return i;
			}
		}

	}
	var stringOffset = findInArray(gString);
	var noteInArray = findInArray(note);

	var fretPosition = noteInArray - stringOffset;
	if (fretPosition <= 0) {
		fretPosition += 12;
	}

	return fretPosition;
}

function play() {
	var currentGString = gStrings[Math.floor(Math.random() * gStrings.length)];

	var currentNotes = [];
	if (document.getElementById("natural-checkbox").checked) {
		currentNotes = currentNotes.concat(naturalNotes);
	}
	if (document.getElementById("common-sharp-checkbox").checked) {
		currentNotes = currentNotes.concat(commonSharpNotes);
	}
	if (document.getElementById("uncommon-sharp-checkbox").checked) {
		currentNotes = currentNotes.concat(uncommonSharpNotes);
	}
	if (document.getElementById("common-flat-checkbox").checked) {
		currentNotes = currentNotes.concat(commonFlatNotes);
	}
	if (document.getElementById("uncommon-flat-checkbox").checked) {
		currentNotes = currentNotes.concat(uncommonFlatNotes);
	}

	var currentNote = currentNotes[Math.floor(Math.random() * currentNotes.length)];

	var output = document.getElementById("output-div");
	output.innerHTML = "Find the note <b>" + currentNote + "</b> on the <b>" + currentGString + "</b> String! " + getFretForNote(currentNote, currentGString);
}

document.getElementById("start-button").addEventListener("click", play);