const calculateBtn = document.getElementById("calculateBtn");
const birthMonth = document.getElementById("birthMonth");
const birthDate = document.getElementById("birthDate");
const birthYear = document.getElementById("birthYear");
const currMonth = document.getElementById("currMonth");
const currDate = document.getElementById("currDate");
const currYear = document.getElementById("currYear");
const p1 = document.getElementById("p1");

// set current date in to age at the day input
const date = new Date();
currDate.value = date.getDate();
currMonth.value = date.getMonth() + 1;
currYear.value = date.getFullYear();

// calculate age
calculateBtn.addEventListener("click", () => {
  let changedMonth = "";
  let changedYear = "";
  let ageIndays = "";
  let ageInMonths = "";
  let ageInYears = "";

  // for difference in date
  if (Number(currDate.value) < Number(birthDate.value)) {
    changedMonth = Number(currMonth.value) - 1;
    let changedDate = Number(currDate.value) + 31;
    ageIndays = changedDate - Number(birthDate.value);
  } else {
    changedMonth = Number(currMonth.value);
    ageIndays = Number(currDate.value) - Number(birthDate.value);
  }

  //for difference in month
  if (changedMonth < Number(birthMonth.value)) {
    changedYear = Number(currYear.value) - 1;
    changedMonth = Number(changedMonth) + 12;
    ageInMonths = changedMonth - Number(birthMonth.value);
  } else {
    changedYear = Number(currYear.value);
    ageInMonths = changedMonth - Number(birthMonth.value);
  }

  //for difference in years
  ageInYears = changedYear - Number(birthYear.value);

  // getting output
  p1.innerHTML = `${ageInYears} years, ${ageInMonths} month and ${ageIndays} days`;
  if (isNaN(ageInYears)) {
    p1.innerHTML = "Enter valid year to calculate age";
  }
  if (birthYear.value.length < 4) {
    p1.innerHTML = "Enter valid year to calculate age";
  }
});

// removig extra dates in different months
function hideExtraDates(allDates, allMonts) {
  let allBirthDates = Array.from(allDates.children);
  if (/^(1|3|5|7|8|10|12)$/.test(Number(allMonts.value))) {
    allBirthDates[allBirthDates.length - 1].style.display = "block";
    allBirthDates[allBirthDates.length - 2].style.display = "block";
    allBirthDates[allBirthDates.length - 3].style.display = "block";
  }
  if (/^(4|6|9|11)$/.test(Number(allMonts.value))) {
    allBirthDates[allBirthDates.length - 1].style.display = "none";
  }
  if (/2/.test(Number(allMonts.value))) {
    allBirthDates[allBirthDates.length - 1].style.display = "none";
    allBirthDates[allBirthDates.length - 2].style.display = "none";
    allBirthDates[allBirthDates.length - 3].style.display = "none";
  }
}

function OnLeapYear(enteredYear, allDates) {
  let allBirthDates = Array.from(allDates.children);
  if (enteredYear.value % 4 === 0) {
    allBirthDates[allBirthDates.length - 3].style.display = "block";
  } else {
    allBirthDates[allBirthDates.length - 3].style.display = "none";
  }
}

birthMonth.addEventListener("input", () => hideExtraDates(birthDate, birthMonth));
currMonth.addEventListener("input", () => hideExtraDates(currDate, currMonth));

birthYear.addEventListener("input", () => OnLeapYear(birthYear, birthDate));
currYear.addEventListener("input", () => OnLeapYear(currYear, currDate));
