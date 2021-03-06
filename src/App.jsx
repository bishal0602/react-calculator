import React, { useEffect, useState } from "react";

const App = () => {
  const [previousValue, setPreviousValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [operator, setOperator] = useState("");
  const [disableButtons, setDisableButtons] = useState(false);

  const reset = () => {
    setCurrentValue("");
    setPreviousValue("");
    setOperator("");
  };

  const inputDigit = (event) => {
    if (event.target.innerText === "0" && currentValue === "0") return;
    if (event.target.innerText === "." && currentValue.includes(".")) return;
    if (
      event.target.innerText === "." &&
      currentValue === "" &&
      previousValue === ""
    ) {
      return;
    }
    currentValue
      ? setCurrentValue((preVal) => preVal + event.target.innerText)
      : setCurrentValue(event.target.innerText);
  };

  const equals = (event) => {
    if (currentValue === "") {
      setOperator("");
      setCurrentValue(previousValue);
      setPreviousValue("");
      return;
    }
    if (currentValue !== "" && previousValue === "" && operator === "") {
      return;
    }
    evaluate();
    setPreviousValue("");
    setCurrentValue(result);
    setOperator("");
  };

  const percentage = () => {
    if (currentValue === "" && previousValue === "") {
      return;
    }
    if (previousValue === "") {
      setCurrentValue(String(parseFloat(currentValue) / 100));
    } else {
      setCurrentValue(String((parseFloat(currentValue) / 100) * previousValue));
    }
  };

  const plusminus = () => {
    if (currentValue > 0) {
      setCurrentValue((preVal) => -preVal);
      return;
    }
    if (currentValue < 0) {
      setCurrentValue((preVal) => -preVal);
    }
  };

  const operation = (event) => {
    if (previousValue === "" && currentValue === "") return;

    if (currentValue === "") {
      setOperator(event.target.innerText);
      return;
    }

    if (previousValue === "") {
      setOperator(event.target.innerText);
      setPreviousValue(currentValue);
      setCurrentValue("");
      return;
    }
    if (previousValue !== "") {
      setOperator(event.target.innerText);
      evaluate();
    }
  };

  // Calculation
  let result;
  const evaluate = () => {
    let prev = parseFloat(previousValue);
    let curr = parseFloat(currentValue);
    switch (operator) {
      case "+":
        result = String(prev + curr);
        break;
      case "-":
        result = String(prev - curr);
        break;
      case "*":
        result = String(prev * curr);
        break;
      case "??":
        result = String(prev / curr);
        break;
      default:
        return;
    }
    setCurrentValue("");
    setPreviousValue(result);
  };

  // Number Formatter
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Number Limiter
  function numberLimiter() {
    if (currentValue > 9007199254740991) {
      setCurrentValue("Number too Big!");
      setDisableButtons(true);
      setTimeout(() => {
        reset();
        setDisableButtons(false);
      }, 1500);
    } else {
      return false;
    }
  }

  // unclickable buttons
  useEffect(() => {
    const buttons = document.querySelectorAll(".buttons");
    const currentVal = document.querySelector(".currentVal");
    if (disableButtons) {
      buttons.forEach((button) => {
        button.setAttribute("id", "disabled-interaction");
      });
      currentVal.setAttribute("id", "error");
    } else {
      buttons.forEach((button) => {
        button.removeAttribute("id", "disabled-interaction");
        currentVal.removeAttribute("id", "error");
      });
    }
  }, [disableButtons]);

  return (
    <div className="font-sans bg-gray-100 min-h-[500px] h-[80vh] max-w-[90vw] w-[50vh] p-4 rounded-[2rem] sm:shadow-2xl shadow-[0_3px_60px_-12px_rgb(0,0,0,0.3)] text-3xl">
      <div className="h-[100%] w-[100%] grid grid-cols-4 grid-rows-6 gap-2 place-items-center">
        <div className="col-span-full justify-self-end grid grid-rows-3 text-right">
          <div className="text-lime-600 text-2xl font-bold">{operator}</div>
          <div className="currentVal text-[1.6rem]">
            {currentValue === ""
              ? ""
              : numberLimiter() || numberWithCommas(currentValue)}
          </div>
          <div className="text-gray-600 text-2xl">{previousValue}</div>
        </div>
        <div
          className="grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-red-600 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={reset}
        >
          C
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-lime-700 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={percentage}
        >
          %
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-lime-700 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={plusminus}
        >
          +/-
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-lime-700 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={operation}
        >
          ??
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-zinc-700 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={inputDigit}
        >
          7
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-zinc-700 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={inputDigit}
        >
          8
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-zinc-700 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={inputDigit}
        >
          9
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-lime-700 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={operation}
        >
          *
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-zinc-700 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={inputDigit}
        >
          4
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-zinc-700 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={inputDigit}
        >
          5
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-zinc-700 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={inputDigit}
        >
          6
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-lime-700 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={operation}
        >
          -
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-zinc-700 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={inputDigit}
        >
          1
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-zinc-700 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={inputDigit}
        >
          2
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-zinc-700 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={inputDigit}
        >
          3
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-lime-700 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={operation}
        >
          +
        </div>
        <div className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-black rounded-[50%] drop-shadow-md text-2xl hover:bg-lime-700">
          <a
            href="https://github.com/bishal0602/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex align-center justify-center"
          >
            <img
              src="/GithubLogoWhite.png"
              alt="Github"
              className="w-[80%] hover:scale-105 ease-in-out duration-300"
            />
          </a>
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-zinc-700 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={inputDigit}
        >
          0
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-gray-200 text-zinc-700 rounded-[50%] drop-shadow-md text-2xl hover:bg-gray-300"
          onClick={inputDigit}
        >
          .
        </div>
        <div
          className="buttons grid place-content-center sm:h-[10vh] sm:w-[10vh] h-[9vh] w-[9vh] bg-lime-600 text-gray-200 rounded-[50%] drop-shadow-md text-2xl hover:bg-lime-700"
          onClick={equals}
        >
          =
        </div>
      </div>
    </div>
  );
};

export default App;
