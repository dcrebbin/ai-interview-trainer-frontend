import { component$, useSignal, useVisibleTask$, $, type QwikIntrinsicElements, useStore } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { useAuthSignin } from "~/routes/plugin@auth";

export function HeroiconsChatBubbleLeftSolid(props: QwikIntrinsicElements["svg"], key: string) {
  return (
    <svg class="drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" width="24em" height="24em" viewBox="0 0 24 24" {...props} key={key}>
      <path fill="currentColor" fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52c1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a49.36 49.36 0 0 1-5.922.505a.39.39 0 0 0-.266.112L8.78 21.53A.75.75 0 0 1 7.5 21v-3.955a48.842 48.842 0 0 1-2.652-.316c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z" clipRule="evenodd"></path>
    </svg>
  );
}

export function HeroiconsStop20Solid(props: QwikIntrinsicElements["svg"], key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" {...props} key={key}>
      <path fill="currentColor" d="M5.25 3A2.25 2.25 0 0 0 3 5.25v9.5A2.25 2.25 0 0 0 5.25 17h9.5A2.25 2.25 0 0 0 17 14.75v-9.5A2.25 2.25 0 0 0 14.75 3h-9.5Z"></path>
    </svg>
  );
}

export function HeroiconsPlaySolid(props: QwikIntrinsicElements["svg"], key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1em" viewBox="0 0 24 24" {...props} key={key}>
      <path fill="currentColor" fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd"></path>
    </svg>
  );
}
export const Promotional = component$(() => {
  const signIn = useAuthSignin();
  const emojiTalkingSpeed = 200;
  const isEmojiTalking = useSignal(false);
  const isAudioPlaying = useSignal(false);
  const store: any = useStore({ audio: null });
  useVisibleTask$(async ({ track }) => {
    track(() => isAudioPlaying.value);

    if (isServer) {
      return;
    }
    if (!isAudioPlaying.value) {
      return;
    }
    const interval = setInterval(() => {
      isEmojiTalking.value = !isEmojiTalking.value;
    }, emojiTalkingSpeed);

    return () => clearInterval(interval);
  });

  const playAudioFromUrl = $((url: string) => {
    const audio = new Audio(url);
    store.audio = audio;
    audio.onended = () => {
      isAudioPlaying.value = false;
      isEmojiTalking.value = false;
    };
    audio.play();
  });

  const stopAudio = $(() => {
    store.audio.pause();
    store.audio.currentTime = 0;
    isAudioPlaying.value = false;
    isEmojiTalking.value = false;
  });

  return (
    <div class="p-10 w-full h-full flex flex-row gap-14 items-start font-sans text-white justify-evenly cursor-default">
      <div class="w-[700px] h-fit bg-[#77A1DA] rounded-xl p-8 drop-shadow-lg ">
        <h2 class="text-5xl">Hey! 👋</h2>
        <br></br>
        <div class="text-3xl">Up It Quest! is a platform dedicated to helping decrease the stress associated with the ✨dreaded✨ technical interview</div>
        <br></br>
        <p class="w-full text-center text-3xl">Created by people who feel your <i>pain</i></p>
        <br></br>
        <p class="text-3xl">Applications, Interviews, yadyada...</p>
        <br></br>
        <p class="text-3xl">It's all a unique skill that you don't practice, until the last moment when it matters so much!</p>
        <br></br>
        <div class="w-full flex flex-col">
          <p class="text-3xl underline">Features</p>
          <ul class="text-2xl">
            <li>AI powered Mock Interviews ✅</li>
            <li>Add your own custom problems ✅</li>
            <li>FREE (using your personal API keys) ✅</li>
          </ul>
        </div>
        <div class="w-full flex flex-col items-center mt-3">
        </div>
      </div>
      <div class="w-[700px] h-[700px] flex justify-center flex-col">
        <iframe width="700px" height="400px" class="z-10 absolute" src="https://www.youtube.com/embed/ef2ivitjiBU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay;time; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
      </div>
    </div>
  );
});
