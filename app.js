//REFERENCE: https://www.youtube.com/watch?v=6x6d4L_Z-Ds

const addhabits = document.querySelector(".addhabit");
// const items = document.querySelectorAll("label");
const li = document.getElementsByTagName("li");
const show = document.querySelector(".habits");
// const habits = [];
const habits = JSON.parse(localStorage.getItem("habits")) || [];
console.log(document.cookie);
// var tasks = document.getElementsByTagName("li").style.background;
// let tasks = document.getElementsByTagName("li");
const labels = JSON.parse(localStorage.getItem("label"));



//random background
//background gradient colors
//referenced https://codepen.io/chrisgresh/pen/aNjovb
function generate() {
	var hexValues = [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"a",
		"b",
		"c",
		"d",
		"e",
	];

	function populate(a) {
		for (var i = 0; i < 6; i++) {
			var x = Math.round(Math.random() * 14);
			var y = hexValues[x];
			a += y;
		}
		return a;
	}

	var newColor1 = populate("#");
	var newColor2 = populate("#");
	var angle = Math.round(Math.random() * 360);

	var gradient = "radial-gradient(" + newColor1 + ", " + newColor2 + ")";

	// tasks.style.color = gradient;

	// $('li').on('click', function () {
	// 	$('.li').removeClass('li');
	// 	$(this).addClass('draggable');
	// 	$(this).addClass('gradient');
	// });
}
// document.onload = generate();



//add habit
function addhabit(e) {
	e.preventDefault(); //keeps submit from refreshing page

	const text = this.querySelector("[name=habit]").value;
	const totals = +this.querySelector("[name=reps]").value;
	const timeframe = this.querySelector("[name=timeframe]").value;
	// const draggable = this.querySelector("[class=draggable]").value;

	//store data in object
	const habit = {
		text: text,
		// class: draggable,
		reps: 0,
		totals: totals,
		timeframe: timeframe,
		completed: false, //needs to be a boolean
	};

	// habit.className = "draggable";
	// li.classList.add("draggable");

	habits.push(habit);
	display(habits, show); //displays new habit
	localStorage.setItem("habits", JSON.stringify(habits));
	this.reset(); //resets inputs
	// console.log(text);
	// console.log(habit);
}

//display habit
function display(habit = [], show) {
	show.innerHTML = habits
		.map((habit, i) => {
			return `
		<li class="draggable">
		<input type="checkbox" data-index=${i} id="habit${i}" ${habit.completed ? "checked" : ""
				} />
		<label for="habit${i}">
            ${habit.text}<br>
            <span>${habit.reps}/${habit.totals} ${habit.timeframe}</span>
		    </label>
            <button class="del" data-index=${i} id="del${i}">x</button>
		</li>
		`;
		})
		.join(""); //removes comma out of the array and just lists items


	// let tasks = show.querySelector("habit${i}");
	// tasks.className = "draggable";

	// for (var i = 0; i < tasks.length; i++) {
	// 	tasks[i].addEventListener("click", function () {
	// 		document.querySelector(".menuActive")
	// 			? document.querySelector(".menuActive").classList.remove("menuActive")
	// 			: "";
	// 		this.classList.add("menuActive");
	// 	});
	// }
}

//toggle if complete
function toggle(e) {
	if (!e.target.matches("input")) return;
	const element = e.target;
	const index = element.dataset.index; //gets index passed into display function
	habits[index].reps += 1;

	if (habits[index].reps === habits[index].totals) {
		habits[index].completed = true;

	} else if (habits[index].reps > habits[index].totals) {
		habits[index].reps = 0;
		habits[index].completed = false;
	}

	display(habits, show); //shows updated count
	localStorage.setItem("habits", JSON.stringify(habits));
}

//delete habit
function del(e) {
	if (!e.target.matches("button")) return;
	const element = e.target;
	const index = element.dataset.index; //gets index passed into display function

	habits.splice(index, 1); //gets index + how many # to cut out of array

	display(habits, show); //shows updated count
	localStorage.setItem("habits", JSON.stringify(habits));
}

//habit size
function effects(e) {
	if (!e.target.matches("label")) return;
	const element = e.target;
	const index = element.dataset.index; //gets index passed into display function

	// habits.splice(index, 1); //gets index + how many # to cut out of array



	// display(habits, show); //shows updated count
	localStorage.setItem("habits", JSON.stringify(habits));
}


// RANDOM COLOR TUTORIAL: https://css-tricks.com/snippets/javascript/random-hex-color/
let randomColor = () => {
	let randomC = Math.floor(Math.random() * 16777215).toString(16);
	// document.getElementsByTag("li").style.backgroundColor = "#" + randomC;
	document.getElementsByTagName("li").style.backgroundColor = "#" + randomC;
	// document.getElementById("timestamp").style.borderColor = "#" + randomC;
	document.documentElement.style.setProperty('--pop', '#' + randomC);
}


//event listeners
addhabits.addEventListener("submit", addhabit); //creates new habit
show.addEventListener("click", toggle); //ups counter
show.addEventListener("click", del); //del habit



display(habits, show);

/////////////////////////
//////// COOKIES ///////
////////////////////////

let size = parseInt(getCookie("effects")) || 10;

// li.classList.add("draggable");
// tasks.className = "draggable";
// li.style.co;
show.style.width = size + "px";
show.style.height = size + "px";
show.style.opacity = "";
// labels.style.fontSize = size + "px";
// labels.style.fontSize = size + "px";

show.addEventListener("mousedown", function () {
	// this.preventDefault();
	size++;
	this.style.width = size + "px";
	this.style.height = size + "px";

	setCookie("effects", size, 999);
});

//cookies
const deleteAllCookies = () => {
	const cookies = document.cookie.split(";");

	for (const cookie of cookies) {
		const eqPos = cookie.indexOf("=");
		const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Tue, 31 Oct 2023 00:00:00 GMT";
	}
};

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie(cname) {
	if (!getCookie(cname) === undefined) {
		return true;
	} else {
		return false;
	}
}

//draggable habits
//SOURCE: https://www.w3schools.com/howto/howto_js_draggable.asp


let tasks = document.querySelectorAll(".draggable");

for (let task of tasks) {
	let randomX = Math.floor(Math.random() * window.innerWidth);
	let randomY = Math.floor(Math.random() * window.innerHeight);

	task.style.left = randomX + "px";
	task.style.top = randomY + "px";

	dragElement(task);
}

function dragElement(elmnt) {
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	if (document.getElementById(elmnt.id + "header")) {
		/* if present, the header is where you move the DIV from:*/
		document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
	} else {
		/* otherwise, move the DIV from anywhere inside the DIV:*/
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = elmnt.offsetTop - pos2 + "px";
		elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
	}

	function closeDragElement() {
		/* stop moving when mouse button is released:*/
		document.onmouseup = null;
		document.onmousemove = null;
	}
}


