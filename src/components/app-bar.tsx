import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import {
  useAuthSession,
} from "~/routes/plugin@auth";
import { ServerStatusButton } from "./debug/server-status-button";

export function HeroiconsArrowRightOnRectangleSolid(
  props: QwikIntrinsicElements["svg"],
  key: string
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export const AppBar = component$((props: any) => {
  const session = useAuthSession();

  const isLoggedIn = session.value?.user !== undefined;
  const retrieveFirstName = () => {
    return session.value?.user?.name?.split(" ")[0];
  };

  return (
    <div
      class="p-4 flex flex-row left-0 top-0 h-20 w-full items-center bg-white drop-shadow-md z-20 bg-op"
      style={{ "--tw-bg-opacity": props.tataKaiMode ? "0.4" : "1" }}
    >
      <Image
        src="/images/up-it-quest-logo.svg"
        width={80}
        height={80}
        class="m-4 p-2"
        alt="A lovely bath"
      />
      {isLoggedIn ? (
        <div class="w-full flex  items-center font-bold text-2xl">
          戦い
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              onChange$={() => {
                props.updateTatakaiMode(!props.tataKaiMode);
              }}
              checked={props.tataKaiMode}
              type="checkbox"
              value=""
              class="sr-only peer"
            ></input>
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
          </label>
        </div>
      ) : null}
      <div class="mx-8 font-sans items-center flex justify-between w-full">
        <div class="flex w-[250px] justify-between"></div>
        <div class="flex flex-row gap-10">
          {import.meta.env.VITE_ENVIRONMENT === "development" ? (
            <ServerStatusButton></ServerStatusButton>
          ) : (
            <div></div>
          )}
          {isLoggedIn ? (
            <div class="flex gap-4">
              <h3 class="items-center flex text-2xl">
                Hey {retrieveFirstName()}! 👋
              </h3>
              <button
                class="text-2xl px-4 hover:drop-shadow-md bg-black text-white rounded-xl"
                onClick$={() => {
                  props.settingsOpen.value = true;
                }}
              >
                settings
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
});
