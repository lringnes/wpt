log.push("Evaluate");
queueMicrotask(() => {log.push("Microtask queued at Evaluate"); });
