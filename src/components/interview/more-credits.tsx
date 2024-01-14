import { component$ } from "@builder.io/qwik";

export const MoreCredits = component$<any>((props: any) => {
  return (
    <div class="absolute backdrop-blur-sm w-[1400px] h-[700px] z-30 pointer-events-auto flex justify-center p-4">
      <div class="bg-black/80 w-[400px] h-[400px] flex items-center p-4 text-white rounded-lg flex-col">
        <h1 class="font-sans text-2xl">More Credits Required</h1>
        <p>Credits: {props?.credits}</p>
      </div>
    </div>
  );
});
