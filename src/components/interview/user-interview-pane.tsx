import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { $, component$, useSignal } from "@builder.io/qwik";
import { AudioRecorder } from "./audio-recorder";
import { WebCam } from "./web-cam";

export function HeroiconsVideoCamera20Solid(props: QwikIntrinsicElements["svg"], key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 20 20" {...props} key={key}>
      <path fill="currentColor" d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5ZM19 4.75a.75.75 0 0 0-1.28-.53l-3 3a.75.75 0 0 0-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 0 0 1.28-.53V4.75Z"></path>
    </svg>
  );
}

export function HeroiconsVideoCameraSlashSolid(props: QwikIntrinsicElements["svg"], key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" {...props} key={key}>
      <path fill="currentColor" d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.5 17.69c0 .471-.202.86-.504 1.124l-4.746-4.746V7.939l2.69-2.689c.944-.945 2.56-.276 2.56 1.06v11.38ZM15.75 7.5v5.068L7.682 4.5h5.068a3 3 0 0 1 3 3ZM1.5 7.5c0-.782.3-1.494.79-2.028l12.846 12.846A2.995 2.995 0 0 1 12.75 19.5H4.5a3 3 0 0 1-3-3v-9Z"></path>
    </svg>
  );
}

export function HeroiconsPhoneXMark16Solid(props: QwikIntrinsicElements["svg"], key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...props} key={key}>
      <path fill="currentColor" d="m3.855 7.286l1.067-.534a1 1 0 0 0 .542-1.046l-.44-2.858A1 1 0 0 0 4.036 2H3a1 1 0 0 0-1 1v2c0 .709.082 1.4.238 2.062a9.012 9.012 0 0 0 6.7 6.7A9.024 9.024 0 0 0 11 14h2a1 1 0 0 0 1-1v-1.036a1 1 0 0 0-.848-.988l-2.858-.44a1 1 0 0 0-1.046.542l-.534 1.067a7.52 7.52 0 0 1-4.86-4.859"></path>
      <path fill="currentColor" d="M13.78 2.22a.75.75 0 0 1 0 1.06L12.56 4.5l1.22 1.22a.75.75 0 0 1-1.06 1.06L11.5 5.56l-1.22 1.22a.75.75 0 1 1-1.06-1.06l1.22-1.22l-1.22-1.22a.75.75 0 0 1 1.06-1.06l1.22 1.22l1.22-1.22a.75.75 0 0 1 1.06 0"></path>
    </svg>
  );
}

export function HeroiconsMicrophone20Solid(props: QwikIntrinsicElements["svg"], key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 20 20" {...props} key={key}>
      <g fill="currentColor">
        <path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z"></path>
        <path d="M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6.001 6.001 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0v-.357Z"></path>
      </g>
    </svg>
  );
}

export const UserInterviewPane = component$<any>((props: any) => {
  const isCameraOn = useSignal(false);

  const activateWebCam = $(() => {
    const constraints = { audio: false, video: true };
    const width = 700;
    const height = 600;
    const video = document.getElementById("video") as HTMLVideoElement;
    video.style.width = width + "px";
    video.style.display = "block";
    video.style.height = height + "px";
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
    });
  });

  const deactivateWebCam = $(() => {
    const video = document.getElementById("video") as HTMLVideoElement;
    video.style.display = "none";
    video.srcObject = null;
  });

  return (
    <div class="w-[700px] h-[350px] relative flex justify-center">
      <div class="absolute z-20 justify-center flex bg-black/30 rounded-2xl p-3 m-3 w-fit h-10 bottom-0">
        <button
          onClick$={() => {
            isCameraOn.value = !isCameraOn.value;
            if (isCameraOn.value) activateWebCam();
            else deactivateWebCam();
          }}
          class="font-bold text-white flex items-center"
        >
          {isCameraOn.value ? <HeroiconsVideoCameraSlashSolid></HeroiconsVideoCameraSlashSolid> : <HeroiconsVideoCamera20Solid></HeroiconsVideoCamera20Solid>}
        </button>
        <AudioRecorder user={props.user} sendMessage={props.sendMessage} setIsAwaitingMessageResponse={props.setIsAwaitingMessageResponse}></AudioRecorder>
        <button
          class="text-3xl font-bold text-white hover:text-red-600 items-center flex justify-center"
          onClick$={() => {
            props.restartInterview();
          }}
        >
          <HeroiconsPhoneXMark16Solid></HeroiconsPhoneXMark16Solid>
        </button>
      </div>
      <WebCam isCameraOn={isCameraOn} tataKaiMode={props.tataKaiMode}></WebCam>
    </div>
  );
});
