const display = document.getElementById("display");

const keys = document.querySelector(".keys");



let first = null;

let op = null;

let waitingSecond = false;



function setDisplay(v) {

  display.value = String(v);

}



function inputDigit(d) {

  if (waitingSecond) {

    setDisplay(d);

    waitingSecond = false;

    return;

  }

  const cur = display.value;

  setDisplay(cur === "0" ? d : cur + d);

}



function clearAll() {

  first = null;

  op = null;

  waitingSecond = false;

  setDisplay("0");

}



function compute(a, operator, b) {

  if (operator === "+") return a + b;

  if (operator === "-") return a - b;

  if (operator === "×") return a * b;

  if (operator === "÷") return b === 0 ? "Error" : a / b;

  return b;

}



function handleOperator(nextOp) {

  const cur = Number(display.value);



  if (first === null) {

    first = cur;

  } else if (op && !waitingSecond) {

    const result = compute(first, op, cur);

    if (result === "Error") {

      setDisplay("Error");

      first = null;

      op = null;

      waitingSecond = true;

      return;

    }

    first = result;

    setDisplay(result);

  }



  op = nextOp;

  waitingSecond = true;

}



function doEqual() {

  if (op === null || first === null) return;

  const cur = Number(display.value);



  const result = compute(first, op, cur);

  if (result === "Error") {

    setDisplay("Error");

    first = null;

    op = null;

    waitingSecond = true;

    return;

  }



  setDisplay(result);

  first = result;

  waitingSecond = true;

}



keys.addEventListener("click", (e) => {

  const btn = e.target.closest("button");

  if (!btn) return;



  const key = btn.dataset.key;



  if (key >= "0" && key <= "9") inputDigit(key);

  else if (key === "C") clearAll();

  else if (key === "=") doEqual();

  else if (key === "+" || key === "-" || key === "×" || key === "÷") handleOperator(key);

});



clearAll();