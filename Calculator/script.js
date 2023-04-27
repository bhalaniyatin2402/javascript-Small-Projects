const input = document.getElementById("input");
const buttons = document.getElementsByTagName("button");
let calc = "";

const Btn = Array.from(buttons);
Btn.forEach((currButton) => {
  currButton.addEventListener("click", (clickBtn) => {
    if (clickBtn.target.innerHTML === "=") {
      try {
        calc = eval(input.value);
        input.value = calc;
      } catch (error) {
        alert("invalid operator");
        calc = "";
        input.value = calc;
      }
    } else if (clickBtn.target.innerHTML === "AC") {
      calc = "";
      input.value = calc;
    } else if(clickBtn.target.innerHTML === "DEL") {
      try {
        calc = calc.substring(0, calc.length-1);
        input.value = calc
      } catch (error) {}
    } else {
      calc += clickBtn.target.innerHTML;
      input.value = calc;
    }
  });
});
