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

var naturalNotesCheckbox = document.getElementById("natural-checkbox");
var commonSharpCheckbox = document.getElementById("common-sharp-checkbox");
var uncommonSharpCheckbox = document.getElementById("uncommon-sharp-checkbox");
var commonFlatCheckbox = document.getElementById("common-flat-checkbox");
var uncommonFlatCheckbox = document.getElementById("uncommon-flat-checkbox");

var timeInput = document.getElementById("wait-input");
var output = document.getElementById("output-div");

var fretboardContainer = document.getElementById("fretboard-div");
var fretSizes = [56, 109, 159, 206, 251, 293, 333, 370, 405, 439, 470, 500];

function play() {
	var currentGString = gStrings[Math.floor(Math.random() * gStrings.length)];

	var currentNotes = [];
	if (naturalNotesCheckbox.checked) {
		currentNotes = currentNotes.concat(naturalNotes);
	}
	if (commonSharpCheckbox.checked) {
		currentNotes = currentNotes.concat(commonSharpNotes);
	}
	if (uncommonSharpCheckbox.checked) {
		currentNotes = currentNotes.concat(uncommonSharpNotes);
	}
	if (commonFlatCheckbox.checked) {
		currentNotes = currentNotes.concat(commonFlatNotes);
	}
	if (uncommonFlatCheckbox.checked) {
		currentNotes = currentNotes.concat(uncommonFlatNotes);
	}

	var currentNote = currentNotes[Math.floor(Math.random() * currentNotes.length)];

	output.innerHTML = "Find the note <b>" + currentNote + "</b> on the <b>" + currentGString + "</b> String!";
	setTimeout(function () {
		output.innerHTML = "Find the note <b>" + currentNote + "</b> on the <b>" + currentGString + "</b> String!<br><br><b>" + getFretForNote(currentNote, currentGString) + "<br>";
	}, timeInput.value * 1000);
}

document.getElementById("start-button").addEventListener("click", play);

function addGString() {
	var currentString = document.createElement("div");
	currentString.setAttribute("class", "g-string-div");
	fretboardContainer.appendChild(currentString);
	var i;
	for (i = 0; i < fretSizes.length; i++) {
		var currentSpan = document.createElement("div");
		currentSpan.setAttribute("class", "fret-div");
		currentSpan.style.width = fretSizes[i] + "px";
		currentString.appendChild(currentSpan);
	}
}