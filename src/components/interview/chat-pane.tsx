import type { QwikIntrinsicElements, QwikKeyboardEvent } from "@builder.io/qwik";
import { $, component$ } from "@builder.io/qwik";
import { TextChunking } from "../debug/text-chunking";
import { CodeEditor } from "./code";

export function RefreshIcon(props: QwikIntrinsicElements["svg"], key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" class="animate-spin" width="1.5em" height="1.5em" viewBox="0 0 24 24" {...props} key={key}>
      <path fill="currentColor" fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53a7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035a.75.75 0 0 0-.53-.918Z" clipRule="evenodd"></path>
    </svg>
  );
}

export function HeroiconsPlay20Solid(props: QwikIntrinsicElements["svg"], key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 20 20" {...props} key={key}>
      <path fill="currentColor" d="M6.3 2.841A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.269l9.344-5.89a1.5 1.5 0 0 0 0-2.538L6.3 2.84Z"></path>
    </svg>
  );
}

export const ChatPane = component$<any>((props: any) => {
  interface TutorProps {
    messageText: string;
    retrieveAudio: any;
    isAwaitingAudioResponse: any;
  }
  const Tutor = component$<TutorProps>((props: any) => {
    return props.isAwaitingAudioResponse?.value ? (
      <div class="text-white animate-spin flex items-center mx-3">
        <RefreshIcon></RefreshIcon>
      </div>
    ) : (
      <button
        class="mx-2 text-white h-fit w-fit"
        onClick$={() => {
          props.retrieveAudio(props.messageText);
        }}
      >
        <HeroiconsPlay20Solid></HeroiconsPlay20Solid>
      </button>
    );
  });

  const messageInputEventHandler = $((keyboard: QwikKeyboardEvent) => {
    if (keyboard.key === "Enter") {
      const input = document.getElementById("input") as HTMLInputElement;
      props.sendMessage(input.value);
      input.value = "";
    }
  });

  return (
    <div class="w-[700px] h-[700px] bg-[#77A1DA] rounded-lg overflow-y-scroll overflow-x-hidden flex flex-col items-center " style={{ "--tw-bg-opacity": props.tataKaiMode ? "0.4" : "1" }}>
      <audio id="audio" style={{ display: "none" }}></audio>
      <div class="w-full flex p-4">
        <input id="input" disabled={props?.isAwaitingMessageResponse?.value} class="w-full h-8 m-2 rounded-full px-2 font-sans" onKeyDown$={(e) => messageInputEventHandler(e)}></input>
        {props?.isAwaitingMessageResponse?.value ? (
          <div class="text-white flex items-center">
            <RefreshIcon></RefreshIcon>
          </div>
        ) : (
          <button
            id="sendMessageButton"
            class=" text-white font-sans text-2xl"
            onClick$={() => {
              const input = document.getElementById("input") as HTMLInputElement;
              props.sendMessage(input.value);
            }}
          >
            Send
          </button>
        )}
      </div>
      {import.meta.env.VITE_ENVIRONMENT === "development" ? <TextChunking></TextChunking> : <div></div>}

      <div class="flex flex-col-reverse ">
        {props?.messages?.value.map((message: { messageText: string; isUser: boolean; renderHtml: boolean }) => (
          <div class="w-full flex p-4 flex-col" key={message.messageText}>
            {message.isUser ? <p class="text-2xl font-sans text-white">You</p> : <p class="text-2xl font-sans text-white w-full text-right">Tutor</p>}
            <div class="flex flex-row items-center">
              <div class="rounded-lg flex justify-start items-center p-4 text-black bg-white">{message.renderHtml ? <div class="w-[590px] overflow-y-hidden overflow-x-scroll" dangerouslySetInnerHTML={message.messageText}></div> : <p class="text-lg font-sans ">{message.messageText}</p>}</div>
              {message.isUser ? <div></div> : <Tutor retrieveAudio={props.retrieveAudio} isAwaitingAudioResponse={props.isAwaitingAudioResponse} messageText={message.messageText}></Tutor>}
            </div>
          </div>
        ))}
        {props.isCoding.value ? (
          <div>
            <div class="w-full h-[350px] px-10 drop-shadow-md rounded-lg">
              <CodeEditor setMonacoEditor={props.setMonacoEditor} updateCode={props.updateCode} code={props.code}></CodeEditor>
            </div>
            <div class="w-full flex items-center justify-center">
              <button
                onClick$={() => {
                  console.log(props.code);
                }}
                class="bg-black rounded-lg text-white font-sans2 p-1 m-2"
              >
                Submit
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
});
