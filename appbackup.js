//REFERENCE: https://www.youtube.com/watch?v=6x6d4L_Z-Ds

const addhabits = document.querySelector(".addhabit");
const show = document.querySelector(".habits");
// const habits = [];
const habits = JSON.parse(localStorage.getItem("habits")) || [];

//add habit
function addhabit(e) {
	e.preventDefault(); //keeps submit from refreshing page

	const text = this.querySelector("[name=habit]").value;
	const totals = +this.querySelector("[name=reps]").value;
	const timeframe = this.querySelector("[name=timeframe]").value;

	//store data in object
	const habit = {
		text: text,
		reps: 0,
		totals: totals,
		timeframe: timeframe,
		completed: false, //needs to be a boolean
	};

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
		<li>
		<input type="checkbox" data-index=${i} id="habit${i}" ${
				habit.completed ? "checked" : ""
			} />
		<label for="habit${i}">
            ${habit.text}<br>
            <span>${habit.reps}/${habit.totals} ${habit.timeframe}</span>
		    </label>
            <button class="delete" data-index=${i} id="delete${i}">x</button>
		</li>
		`;
		})
		.join(""); //removes comma out of the array and just lists items
}

//toggle if compconste
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
function delete(e) {
	if (!e.target.matches("button")) return;
	const element = e.target;
	const index = element.dataset.index; //gets index passed into display function

	habits.splice(index, 1); //gets index + how many # to cut out of array

	display(habits, show); //shows updated count
	localStorage.setItem("habits", JSON.stringify(habits));
}

//event listeners
addhabits.addEventListener("submit", addhabit); //creates new habit
show.addEventListener("click", toggle); //ups counter
show.addEventListener("click", delete); //deletes habit

display(habits, show);
