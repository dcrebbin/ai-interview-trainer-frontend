import { component$, Slot } from "@builder.io/qwik";

// Caching to address at a later date due to Auth caching issue
// There's some sort of weird bug going on when I tried using it 
// import type { RequestHandler } from "@builder.io/qwik-city";
// export const onGet: RequestHandler = async ({ cacheControl }) => {
//   // Control caching for this request for best performance and to reduce hosting costs:
//   // https://qwik.builder.io/docs/caching/
//   cacheControl({
//     // Always serve a cached response by default, up to a week stale
//     staleWhileRevalidate: 60 * 60 * 24 * 7,
//     // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
//     maxAge: 5,
//   });
// };

export default component$(() => {
  return (
    <main class="h-full">
        <Slot />
      </main>
  );
});
