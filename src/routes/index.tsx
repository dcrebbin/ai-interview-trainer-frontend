import { $, component$, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { server$, type DocumentHead } from "@builder.io/qwik-city";
import { AppBar } from "~/components/app-bar";
import { Interview } from "~/components/interview";
import { Promotional } from "~/components/promotional";
import { useAuthSession } from "./plugin@auth";
import { SettingsDialog } from "~/components/settings";

export default component$(() => {
  const session = useAuthSession();
  const settingsOpen = useSignal(false);

  const tataKaiMode = useSignal(false);

  const store: any = useStore({
    user: {
      credits: 1,
      userSettings: {
        llmModel: "",
        sttModel: "",
        ttsModel: "",
        autoPlayAudio: false,
      },
    },
  });

  const getUserSettings = server$(async () => {
    console.log("Getting user settings");
    try {
      const response = await fetch(`${process.env.VITE_API_URL}/api/users?email=${session.value?.user?.email}`, {
        headers: {
          "x-api-key": process.env.API_KEY ?? "",
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  });

  useVisibleTask$(async () => {
    if (session.value?.user !== undefined) {
      try {
        const data = await getUserSettings();
        console.log(data);
        store.user = data;
      } catch (e) {
        console.log(e);
      }
    }
  });

  const updateTatakaiMode = $(() => {
    video.value?.click();
    tataKaiMode.value = !tataKaiMode.value;
  });

  const video = useSignal<HTMLIFrameElement>();

  return (
    <div class="w-full h-full flex flex-col justify-start items-start ">
      <div class="bg-[url(/images/up-it-quest-background.svg)] bg-no-repeat bg-cover w-full h-full absolute z-0"></div>
      <AppBar updateTatakaiMode={updateTatakaiMode} tataKaiMode={tataKaiMode.value} settingsOpen={settingsOpen}></AppBar>
      {tataKaiMode.value ? <iframe ref={video} width="100%" height="100%" class="z-10 absolute" src="https://www.youtube.com/embed/vTfCN3AwHOc?autoplay=1&start=40" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay;time; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe> : null}
      <div class="w-full h-full bottom-0 items-end z-10">
        {session.value?.user === undefined ? (
          <Promotional></Promotional>
        ) : (
          <div>
            <Interview tataKaiMode={tataKaiMode.value} store={store}></Interview>
            {settingsOpen.value ? <SettingsDialog getUserSettings={getUserSettings} store={store} email={session.value.user.email} settingsOpen={settingsOpen}></SettingsDialog> : <div></div>}
          </div>
        )}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Up It Quest!",
  meta: [
    {
      name: "description",
      content: "Open Source AI powered learning platform for technical interviews",
    },
  ],
};
