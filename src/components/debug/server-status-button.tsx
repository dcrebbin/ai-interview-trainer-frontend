import { component$, useStore } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

const serverGreeter = server$(async () => {
  let serverResponse = "";
  try {
    await fetch(`${process.env.VITE_API_URL}/`, {
      credentials: "include",
      headers: {
        "x-api-key": process.env.API_KEY ?? "",
      },
    })
      .then(async (res: Response) => {
        const responseText = await res.text();
        console.log(responseText);
        serverResponse = responseText;
      })
      .catch((err: Error) => {
        serverResponse = "Error";
        console.log(err);
      });
  } catch (err) {
    serverResponse = "Error";
    alert("Error: " + err);
  }
  return serverResponse;
});

const clientGreeter = async () => {
  const element = document.getElementById("textInput") as HTMLInputElement;
  const url = element.value;
  console.log(url);
  let serverResponse = "";
  try {
    await fetch(`${url}/`)
      .then(async (res: Response) => {
        const responseText = await res.text();
        console.log(responseText);
        serverResponse = responseText;
      })
      .catch((err: Error) => {
        serverResponse = "Error";
        console.log(err);
      });
  } catch (err) {
    serverResponse = "Error";
    alert("Error: " + err);
  }
  return serverResponse;
};

export const ServerStatusButton = component$(() => {
  const store = useStore({ serverResponse: "No Response" });

  return (
    <div class="text-center">
      <input id="textInput"></input>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        onClick$={async () => {
          store.serverResponse = "Loading...";
          const message = await clientGreeter();
          store.serverResponse = message;
        }}
      >
        Test Client
      </button>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        onClick$={async () => {
          store.serverResponse = "Loading...";
          const message = await serverGreeter();
          store.serverResponse = message;
        }}
      >
        Test Server
      </button>
      <h3 class="text-lg" id="response">
        {store.serverResponse}
      </h3>
    </div>
  );
});
