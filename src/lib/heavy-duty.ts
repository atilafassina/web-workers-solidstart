function task() {
  let sum = new Array(90000000)
    .fill(0)
    .map((el, idx) => el + idx)
    .reduce((sum, el) => sum + el, 0);

  console.warn("sum is:: ", sum);
  sum = null;
}

export function heavyDuty(origin: string) {
  const start = performance.now();
  console.info(`${origin}::: running`);
  task();
  console.info(
    `${origin}::: done: ${(performance.now() - start) / 1000} seconds`
  );
}

export async function heavyDutyAsync(origin: string) {
  const start = performance.now();
  console.info(`${origin}::: running`);
  // This will block the main thread for 5 seconds
  await new Promise((resolve) => resolve(task()));
  console.info(
    `${origin}::: done: ${(performance.now() - start) / 1000} seconds`
  );
}
