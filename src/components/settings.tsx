import { component$, useStore, useTask$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { useAuthSession } from "~/routes/plugin@auth";

export const SettingsDialog = component$((props: any) => {
  const session = useAuthSession();
  const store = useStore({
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

  const updateUserSettings = server$(async () => {
    console.log("Updating user settings");
    try {
      const response = await fetch(
        `${process.env.VITE_API_URL}/api/users/settings?email=${session.value?.user?.email}`,
        {
          method: "POST",
          body: JSON.stringify({
            llm_model: store.user.userSettings.llmModel,
            stt_model: store.user.userSettings.sttModel,
            tts_model: store.user.userSettings.ttsModel,
            auto_play_audio: store.user.userSettings.autoPlayAudio,
          }),
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.API_KEY ?? "",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  });

  useTask$(async () => {
    try {
      const data = await props.getUserSettings();

      store.user = {
        credits: data.credits,
        userSettings: {
          autoPlayAudio: data.UserSettings.auto_play_audio,
          llmModel: data.UserSettings.llm_model,
          sttModel: data.UserSettings.stt_model,
          ttsModel: data.UserSettings.tts_model,
        },
      };
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <div
      class="relative z-50"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick$={() => {
          props.settingsOpen.value = false;
          props.store.user.value = store.user;
        }}
      ></div>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto pointer-events-none">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="bottom-32 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg pointer-events-auto">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3
                    class="text-xl font-bold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Settings
                  </h3>
                  <br></br>
                  <hr></hr>
                  <div class="mt-2 w-full flex flex-col">
                    <h4 class="font-bold">Account</h4>
                    <table class="w-full flex flex-col ">
                      <tbody>
                        <tr class="w-full flex justify-between">
                          <td>Name:</td>
                          <td class="font-bold">{session.value?.user?.name}</td>
                        </tr>
                        <tr class="w-full flex justify-between">
                          <td>Email:</td>
                          <td class="font-bold">
                            {session.value?.user?.email}
                          </td>
                        </tr>
                        <tr class="w-full flex justify-between">
                          <td>Credits:</td>
                          <td class="font-bold">{store.user.credits}</td>
                        </tr>
                      </tbody>
                    </table>
                    <br></br>
                    <h4 class="font-bold">Advanced Configuration</h4>
                    <div class="w-full flex justify-between items-center">
                      LLM Model:
                      <select
                        onChange$={(e: any) => {
                          store.user.userSettings.llmModel = e.target.value;
                          updateUserSettings();
                        }}
                        class="bg-white text-black rounded-lg font-bold cursor-pointer text-end"
                        value={store.user.userSettings.llmModel}
                      >
                        <option value="gpt-3.5-turbo">
                          GPT 3.5 Turbo (OpenAi - ChatGPT)
                        </option>
                        <option value="googler">Googler (Custom GPT)</option>
                        <option value="meta-mate">
                          Meta Mate (Custom GPT)
                        </option>
                        <option value="gpt-4-1106-preview">
                          GPT 4 Turbo (OpenAi)
                        </option>
                        <option value="gpt-4">
                          GPT 4 (OpenAi - ChatGPT Plus)
                        </option>
                        <option value="chat-bison" disabled>
                          PaLM2 (Google - Bard [Outdated])
                        </option>
                        <option value="gemini-pro" disabled>
                          Gemini Pro (Google - Bard)
                        </option>
                        <option value="claude" disabled>
                          Claude 2.1 (Anthropic - Claude)
                        </option>
                        {/* <option value="claude">Anthropic - Claude</option> */}
                      </select>
                    </div>
                    <div class="w-full flex justify-between items-center">
                      Speech to Text:
                      <select
                        class="bg-white text-black rounded-lg font-bold cursor-pointer"
                        value={store.user.userSettings.sttModel}
                        onChange$={(e: any) => {
                          store.user.userSettings.sttModel = e.target.value;
                          updateUserSettings();
                        }}
                      >
                        <option value="whisper-1">Whisper (OpenAi)</option>
                        <option value="vertex" disabled>
                          VertexAi (Google)
                        </option>
                      </select>
                    </div>
                    <div class="w-full flex justify-between items-center">
                      Text to Speech:
                      <select
                        class="bg-white text-black rounded-lg font-bold cursor-pointer"
                        value={store.user.userSettings.ttsModel}
                        onChange$={(e: any) => {
                          store.user.userSettings.ttsModel = e.target.value;
                          updateUserSettings();
                        }}
                      >
                        <option value="tts-1">TTS-1 (OpenAi)</option>
                        <option value="elevenlabs-multilingual-v1">
                          ElevenLabs
                        </option>
                        <option value="vertex" disabled>
                          VertexAi (Google)
                        </option>
                        <option value="unreal-speech">Unreal Speech</option>
                      </select>
                    </div>
                    <div class="w-full flex justify-between items-center">
                      Auto Play Audio:
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input
                          onChange$={() => {
                            store.user.userSettings.autoPlayAudio =
                              !store.user.userSettings.autoPlayAudio;
                            updateUserSettings();
                          }}
                          checked={store.user.userSettings.autoPlayAudio}
                          type="checkbox"
                          value=""
                          class="sr-only peer"
                        ></input>
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick$={() => {
                  props.settingsOpen.value = false;
                }}
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
