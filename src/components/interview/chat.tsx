import { $, component$, useSignal } from "@builder.io/qwik";
import { HiPaperAirplaneOutline } from "@qwikest/icons/heroicons";

export const Chat = component$(() => {
  const text = useSignal("");
  const response = useSignal("...");
  const isLoading = useSignal(false);

  const test = $(() => {
    response.value = "Loading...";
    isLoading.value = true;
  });
  return (
    <div class="flex flex-col w-full h-full">
      <div class="h-full w-full flex flex-col justify-center items-center">
        <p class="text-5xl text-center">{response}</p>
      </div>
      <div class="w-full flex items-center justify-end drop-shadow-sm">
        <input onChange$={(e) => (text.value = (e.target as HTMLInputElement).value)} value={text.value} class="text-black w-full rounded-md p-2 text-xl border-black border-2" placeholder="Ask a question about the Integrated Learning System (ILS)" maxLength={60}></input>
        <button onClick$={() => test()} class="text-black absolute flex items-center h-[60px]">
          <HiPaperAirplaneOutline class="h-8 w-8 m-2" />
        </button>
      </div>
    </div>
  );
});
