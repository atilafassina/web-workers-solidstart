import { wrap } from "comlink";
import { type Accessor, Show, createSignal } from "solid-js";
import Counter from "~/components/Counter";
import { ComlinkWorker } from "~/lib/comlink-worker";
import { heavyDuty, heavyDutyAsync } from "~/lib/heavy-duty";

function ActionState(props: { state: Accessor<"running" | "idle"> }) {
  return (
    <Show when={props.state() === "running"} fallback="Trigger">
      <span>Running...</span>
    </Show>
  );
}

export default function Home() {
  const [justHandlerAction, setJustHandlerState] = createSignal<
    "running" | "idle"
  >("idle");
  const [promisedAction, setPromisedState] = createSignal<"running" | "idle">(
    "idle"
  );
  const [workerAction, setWorkerState] = createSignal<"running" | "idle">(
    "idle"
  );
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl dark:text-sky-300 font-bold my-16">
        Web-Workers
      </h1>
      <div class="grid grid-cols-3 grid-rows-2 gap-10 place-items-center">
        <button
          class="w-[200px] rounded-full bg-rose-400 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem] disabled:opacity-55"
          onClick={() => {
            setJustHandlerState("running");

            heavyDuty("Sync");
            setJustHandlerState("idle");
          }}
          disabled={justHandlerAction() === "running"}
        >
          Sync::
          <ActionState state={justHandlerAction} />
        </button>
        <button
          class="w-[200px] rounded-full bg-rose-400 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem] disabled:opacity-55"
          onClick={async () => {
            setPromisedState("running");

            await heavyDutyAsync("Promise");
            setPromisedState("idle");
          }}
          disabled={promisedAction() === "running"}
        >
          Promise::
          <ActionState state={promisedAction} />
        </button>
        <button
          class={`w-[200px] rounded-full bg-rose-400 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem] ${
            workerAction() === "running" ? "animate-pulse bg-neutral-300" : ""
          }`}
          onClick={async () => {
            setWorkerState("running");

            const worker = new Worker(
              new URL("../lib/comlink-worker.ts", import.meta.url),
              { type: "module", name: "comlink-worker" }
            );

            const { runHeavyDuty } = wrap<ComlinkWorker>(worker);

            await runHeavyDuty();
            setWorkerState("idle");
          }}
          disabled={workerAction() === "running"}
        >
          Worker::
          <ActionState state={workerAction} />
        </button>
        <div class="col-span-3">
          <Counter />
        </div>
      </div>
    </main>
  );
}
