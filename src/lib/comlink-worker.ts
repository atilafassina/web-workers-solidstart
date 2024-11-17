import { expose } from "comlink";
import { heavyDutyAsync } from "./heavy-duty";

const worker = {
  runHeavyDuty: async () => {
    await heavyDutyAsync("Worker");
  },
};

export type ComlinkWorker = typeof worker;

expose(worker);
