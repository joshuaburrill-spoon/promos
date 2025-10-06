import React, { useEffect, useRef, useState } from "react";

export default function GenerateBtn({
  onSuccess,
}: {
  onSuccess: (data: any) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const abortRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      // cleanup on unmount: abort any inflight fetch and clear timeout
      abortRef.current?.abort();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);

    const triggerUrl =
      "https://hook.relay.app/api/v1/playbook/cmgf75eoc00so0pkn79zp7ato/trigger/jKNK1uXVdfIJr-egc-7O_g";
    const webhookBase =
      "https://hook.relay.app/api/v1/playbook/cmgf75eoc00so0pkn79zp7ato/webhook/cmgfh4ey8003p3b6z2kd2tylf";

    // create a fresh AbortController for these requests
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res1 = await fetch(triggerUrl, {
        method: "GET",
        signal: controller.signal,
      });
      if (!res1.ok) {
        throw new Error(
          `Trigger request failed: ${res1.status} ${res1.statusText}`
        );
      }
      const json1 = await res1.json();

      // The payload should contain `runId`.
      const runId = json1?.runId ?? json1?.runID ?? json1?.id;
      if (!runId) {
        throw new Error("No runId returned from trigger endpoint");
      }
      // Use a 2 minutes 30 seconds timeout (150000 ms)
      const DURATION = 105_000; // 1m 45s in ms

      // Start an interval to update progress so the bar fills incrementally
      const start = Date.now();
      // update every 250ms for a smoother fill
      intervalRef.current = window.setInterval(() => {
        const elapsed = Date.now() - start;
        const pct = Math.min(100, (elapsed / DURATION) * 100);
        setProgress(pct);
        if (pct >= 100 && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, 250);

      // Schedule the webhook fetch after the duration
      timeoutRef.current = window.setTimeout(async () => {
        try {
          const url = `${webhookBase}?runId=${encodeURIComponent(
            String(runId)
          )}`;
          const res2 = await fetch(url, { signal: controller.signal });
          if (!res2.ok) {
            throw new Error(
              `Webhook fetch failed: ${res2.status} ${res2.statusText}`
            );
          }
          const json2 = await res2.json();
          onSuccess(json2);
        } catch (err) {
          // network/error handling — surface to console for now
          console.error("Error fetching webhook result:", err);
        } finally {
          setLoading(false);
          setProgress(0);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, DURATION);
    } catch (err) {
      console.error("Error triggering run:", err);
      setLoading(false);
      setProgress(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {!loading ? (
        <button type="button" onClick={handleClick} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      ) : (
        <div
          style={{ marginTop: 16, display: "flex", justifyContent: "center" }}
        >
          <div style={{ width: "75%", maxWidth: 960 }}>
            <div
              style={{
                position: "relative",
                height: 6,
                background: "#efefef",
                borderRadius: 9999,
                overflow: "hidden",
              }}
              aria-hidden
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  background: "#111113",
                  borderRadius: 9999,
                  width: `${loading ? Math.max(6, progress) : progress}%`,
                  transition: "width 200ms linear",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
