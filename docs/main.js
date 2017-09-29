const NATURAL_NOTES = ["C", "D", "E", "F", "G", "A", "B"];
const COMMON_SHARP_NOTES = ["C#", "D#", "F#", "G#", "A#"];
const UNCOMMON_SHARP_NOTES = ["E#", "B#"];
const COMMON_FLAT_NOTES = ["Db", "Eb", "Gb", "Ab", "Bb"];
const UNCOMMON_FLAT_NOTES = ["Cb", "Fb"];

const G_STRINGS = ["E", "A", "D", "G"];

const FRET_NOTES = [
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
		for (let i = 0; i < FRET_NOTES.length; i++) {
			if (FRET_NOTES[i].indexOf(actualNote) !== -1) {
				return i;
			}
		}
	}

	let stringOffset = findInArray(gString);
	let noteInArray = findInArray(note);

	let fretPosition = noteInArray - stringOffset;
	if (fretPosition <= 0) {
		fretPosition += 12;
	}

	return fretPosition;
}

const NATURAL_NOTES_CHECKBOX = document.getElementById("natural-checkbox");
const COMMON_SHARP_CHECKBOX = document.getElementById("common-sharp-checkbox");
const UNCOMMON_SHARP_CHECKBOX = document.getElementById("uncommon-sharp-checkbox");
const COMMON_FLAT_CHECKBOX = document.getElementById("common-flat-checkbox");
const UNCOMMON_FLAT_CHECKBOX = document.getElementById("uncommon-flat-checkbox");

const TIME_INPUT = document.getElementById("wait-input");
const OUTPUT = document.getElementById("output-div");

const FRETBOARD_CONTAINER = document.getElementById("fretboard-div");
const FRET_SIZES = [56, 109, 159, 206, 251, 293, 333, 370, 405, 439, 470, 500];

function play() {
	let currentGString = G_STRINGS[Math.floor(Math.random() * G_STRINGS.length)];

	let currentNotes = [];
	if (NATURAL_NOTES_CHECKBOX.checked) {
		currentNotes = currentNotes.concat(NATURAL_NOTES);
	}
	if (COMMON_SHARP_CHECKBOX.checked) {
		currentNotes = currentNotes.concat(COMMON_SHARP_NOTES);
	}
	if (UNCOMMON_SHARP_CHECKBOX.checked) {
		currentNotes = currentNotes.concat(UNCOMMON_SHARP_NOTES);
	}
	if (COMMON_FLAT_CHECKBOX.checked) {
		currentNotes = currentNotes.concat(COMMON_FLAT_NOTES);
	}
	if (UNCOMMON_FLAT_CHECKBOX.checked) {
		currentNotes = currentNotes.concat(UNCOMMON_FLAT_NOTES);
	}

	let currentNote = currentNotes[Math.floor(Math.random() * currentNotes.length)];

	OUTPUT.innerHTML = "Find the note <b>" + currentNote + "</b> on the <b>" + currentGString + "</b> String!";
	setTimeout(function () {
		OUTPUT.innerHTML = "Find the note <b>" + currentNote + "</b> on the <b>" + currentGString + "</b> String!<br><br><b>" + getFretForNote(currentNote, currentGString) + "<br>";
	}, TIME_INPUT.value * 1000);
}

document.getElementById("start-button").addEventListener("click", play);

const DRAWING_AREA = document.getElementById("drawing-area");

addGString();

function addGString() {
	let currentFretboardPart = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	currentFretboardPart.setAttribute("class", "fretboard-part");
	DRAWING_AREA.appendChild(currentFretboardPart);
	
	let currentString = document.createElementNS("http://www.w3.org/2000/svg", "line");
	currentString.setAttribute("class", "string");
	currentString.setAttribute("x1", "0");
	currentString.setAttribute("x2", "500");
	currentString.setAttribute("y1", "7");
	currentString.setAttribute("y2", "7");
	DRAWING_AREA.appendChild(currentString);
	// currentString.setAttribute("class", "g-string-div");
	// FRETBOARD_CONTAINER.appendChild(currentString);
	// for (let i = 0; i < FRET_SIZES.length; i++) {
	// 	let currentSpan = document.createElement("div");
	// 	currentSpan.setAttribute("class", "fret-div");
	// 	currentSpan.style.width = FRET_SIZES[i] + "px";
	// 	currentString.appendChild(currentSpan);
	// }
}