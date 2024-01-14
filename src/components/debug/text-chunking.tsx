import { component$, useStore } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
export const TextChunking = component$(() => {
  const store = useStore({
    receivedMessages: new Array<string>(),
  });
  const API_URL = `${import.meta.env.VITE_API_URL}`;

  const textChunking = server$(async () => {
    const query = "Hello, I'm your tutor! We're here to learn how to interview for the Australian Public Service!";
    const response = await fetch(`${API_URL}/api/ai/chunk?text=${query}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "x-api-key": process.env.API_KEY ?? "",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    if (!response.body) {
      throw new Error("Response body was null");
    }
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    for (let index = 0; index < 100; index++) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      store.receivedMessages.push(value);
      console.log(value);
    }
  });

  return (
    <div class="w-[400px] h-[300px] bg-white/40 absolute left-0 drop-shadow-md mx-8 p-2">
      <button
        class="bg-black text-white p-3 mx-2 font-bold"
        onClick$={async () => {
          await textChunking();
        }}
      >
        Text chunking test
      </button>
      <div class="flex flex-col">
        {store.receivedMessages.map((message: any) => (
          <p key={message}>{message}</p>
        ))}
      </div>
    </div>
  );
});
