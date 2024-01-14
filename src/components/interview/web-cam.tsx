import { component$ } from "@builder.io/qwik";

export const WebCam = component$<any>((props: any) => {
  return (
    <div class="w-[700px] h-[350px] bg-[#FFFA96] overflow-hidden flex items-center justify-center" style={{ "--tw-bg-opacity": props.tataKaiMode ? "0.4" : "1" }}>
      <video autoPlay={true} style={{ display: "none" }} id="video"></video>
      {props.isCameraOn.value ? null : (
        <div class="w-[100px] h-[100px] rounded-full bg-[#77A1DA] flex justify-center items-center drop-shadow-md">
          <p class="text-5xl font-sans text-white">You</p>
        </div>
      )}
    </div>
  );
});
