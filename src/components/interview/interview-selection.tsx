import { component$, useSignal, $ } from "@builder.io/qwik";
import { LEET_CODE_QUESTIONS } from "~/constants/leet-code-questions";

export const InterviewSelection = component$<any>((props: any) => {
  const selectedMode = useSignal("");

  const hideModes = $(() => {
    selectedMode.value = "";
  });

  function InterviewMode() {
    switch (selectedMode.value) {
      case "problem-time-trial":
        return <ProblemTimeTrial {...props} hideModes={hideModes}></ProblemTimeTrial>;
      case "algo-kata":
        return <AlgoKata {...props} hideModes={hideModes}></AlgoKata>;
      default:
        return <div></div>;
    }
  }

  return (
    <div class="absolute w-full h-full bg-black/40 backdrop-blur-sm z-50 top-0 flex items-center align-middle justify-center">
      {selectedMode.value === "" ? (
        <div class="w-[450px] h-fit bg-white rounded-lg p-4 drop-shadow-lg">
          <h2 class="text-2xl font-sans">Select Interview Mode</h2>
          <hr></hr>
          <div class="flex gap-1 flex-col">
            <div class="flex justify-between">
              <div>
                <h1 class="text-xl font-sans">Problem Time Trial</h1>
                <p class="text-md">Solve Algo Problems</p>
              </div>
              <button
                onClick$={() => {
                  selectedMode.value = "problem-time-trial";
                }}
                class="bg-black text-white p-1 m-1 rounded-md text-md font-sans drop-shadow-md"
              >
                select
              </button>
            </div>
            <hr></hr>
            <div class="flex justify-between">
              <div>
                <h1 class="text-xl font-sans">Algo Kata</h1>
                <p class="text-md">Implement Fundamental Algo & Data Structures</p>
              </div>
              <button
                onClick$={() => {
                  selectedMode.value = "algo-kata";
                }}
                class="bg-black text-white p-1 m-1 rounded-md text-md font-sans drop-shadow-md"
              >
                select
              </button>
            </div>
            <hr></hr>
            <div class="flex justify-between">
              <div>
                <h1 class="text-xl font-sans">Big Ohhh</h1>
                <p class="text-md">Test Your Time And Space Complexity Knowledge</p>
              </div>
              <button disabled class="bg-black text-gray-400 p-1 m-1 rounded-md text-md font-sans drop-shadow-md">
                select
              </button>
            </div>
          </div>
        </div>
      ) : (
        InterviewMode()
      )}
    </div>
  );
});

const AlgoKata = component$<any>((props: any) => {
  return (
    <div class="w-[450px] h-fit bg-white rounded-lg p-4 drop-shadow-lg">
      <div class="flex">
        <button
          class="text-2xl text-center"
          onClick$={() => {
            props.hideModes();
          }}
        >
          {"◀"}
        </button>
        <h2 class="text-2xl font-sans">Algo Kata</h2>
      </div>
      <hr></hr>
      <p class="text-xl">You will be asked to implement a randomly selected fundamental data structure or algorithm.</p>
      <div class="w-full flex items-center justify-center">
        <button
          class="bg-black text-white p-2 rounded-md text-xl drop-shadow-md"
          onClick$={() => {
            props.startTimeTrial();
            props.generateKata();
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
});

const ProblemTimeTrial = component$<any>((props: any) => {
  return (
    <div class="w-[450px] h-fit bg-white rounded-lg p-4 drop-shadow-lg">
      <div class="flex">
        <button
          class="text-2xl"
          onClick$={() => {
            props.hideModes();
          }}
        >
          {"◀"}
        </button>
        <h2 class="text-2xl font-sans">Problem Time Trial</h2>
      </div>
      <hr></hr>
      <p class="text-xl">You will be given a random algorithmic problem to solve, varying from easy - hard. You have 15 minutes to solve the problem to the best of your ability before the time runs up! If you get stuck, make sure to ask your AI interviewer questions :^)</p>
      <div class="flex flex-col justify-center items-center p-1">
        <p class="font-sans m-2">Problem Frequency: 10 - {props.rangeValue}</p>
        <div class="flex gap-1">
          <p class="font-sans">Most Frequent</p>
          <input
            ref={props.rangeRef}
            type="range"
            min="10"
            max={LEET_CODE_QUESTIONS.length - 1}
            value={props.rangeValue.value}
            class="w-[300px]"
            onInput$={(e: any) => {
              props.rangeValue.value = parseInt(e?.target?.value ?? "150");
              props.updateProblemFrequency(props.rangeValue.value);
              console.log(e);
            }}
          ></input>
          <p class="font-sans">Least Frequent</p>
        </div>
      </div>
      <div class="w-full flex items-center justify-center">
        <button
          class="bg-black text-white p-2 rounded-md text-xl drop-shadow-md"
          onClick$={() => {
            props.startTimeTrial();
            props.generateProblem();
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
});
