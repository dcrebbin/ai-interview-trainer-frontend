import { component$, useSignal, $, noSerialize, useVisibleTask$, useStore } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { useAuthSession } from "~/routes/plugin@auth";
import { RefreshIcon } from "./chat-pane";
import { HeroiconsMicrophone20Solid } from "./user-interview-pane";

interface AudioRecorderProps {
  setIsAwaitingMessageResponse: any;
  sendMessage: any;
  user: any;
}

const requestMicrophonePermission = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    console.error(err);
  }
};

export const AudioRecorder = component$<AudioRecorderProps>((props) => {
  useVisibleTask$(() => {
    requestMicrophonePermission();
    console.log("Audio Recorder is visible");
  });
  const isAwaitingSpeechConversion = useSignal(false);
  const isRecording = useSignal(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const store = useStore({
    user: props.user,
  });
  const mediaRecorder: any = useSignal(null);
  const user = useAuthSession().value?.user;

  const serverSideConvertSpeechToText = server$(async (json: any) => {
    console.log(store.user);
    if (store.user.credits <= 0) {
      return { status: "error", message: "More credits required" };
    }
    const parsedJson = JSON.parse(json);
    const convertedArray: Uint8Array = new Uint8Array(parsedJson);
    const response = await fetch(`${API_URL}/api/ai/speech-to-text?email=` + (user?.email ?? ""), {
      method: "POST",
      body: JSON.stringify({ audioData: [...convertedArray] }),
      headers: {
        Accept: "application/json",
        "x-api-key": process.env.API_KEY ?? "",
        "Content-Type": "application/json",
      },
    });
    const whisperResponse: any = await response.json();
    console.log(whisperResponse);
    const serverResponse = {
      text: whisperResponse.text,
      status: "success",
    };
    return serverResponse;
  });

  const playAudio = $(async (audioBlob: Blob) => {
    if (props.user.credits <= 0) {
      alert("You need more credits to use this feature");
      return;
    }

    isAwaitingSpeechConversion.value = false;
    const uint8Array = new Uint8Array(await audioBlob.arrayBuffer());
    const serverResponse: any = await serverSideConvertSpeechToText(JSON.stringify(Array.from(uint8Array)));
    console.log("Server says: " + serverResponse.text);
    props.sendMessage(serverResponse.text);
  });

  const startRecording = $(async () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const newMediaRecorder = new MediaRecorder(stream);
      mediaRecorder.value = noSerialize(newMediaRecorder);
      newMediaRecorder.start();
      isRecording.value = true;
      const audioChunks: any = [];
      newMediaRecorder.ondataavailable = (audioChunk) => {
        audioChunks.push(audioChunk.data);
      };
      newMediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        playAudio(audioBlob);
      };
    });
  });

  const stopRecording = $(() => {
    if (mediaRecorder.value.state !== "inactive") {
      mediaRecorder.value.stop();
      isRecording.value = false;
    }
  });

  return (
    <button
      disabled={isAwaitingSpeechConversion.value}
      class="flex items-center"
      style={{ color: isRecording.value ? "red" : "white" }}
      onMouseDown$={() => {
        isRecording.value = true;
        startRecording();
      }}
      onMouseUp$={() => {
        isRecording.value = false;
        isAwaitingSpeechConversion.value = true;
        stopRecording();
      }}
    >
      {isAwaitingSpeechConversion.value ? <RefreshIcon></RefreshIcon> : <HeroiconsMicrophone20Solid></HeroiconsMicrophone20Solid>}
    </button>
  );
});
