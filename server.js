// ProxyPilot backend — a real Wisp relay server.
// This is the piece the frontend can't be: a persistent Node process that
// opens real TCP connections to any website (including Cloudflare-hosted
// ones, which Cloudflare Workers refuse to touch) and tunnels them to the
// browser over one WebSocket using the Wisp protocol — the same protocol
// ProxyPilot/PilotVPN already speak via Scramjet + BareMux transports.
import http from "node:http";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

const PORT = process.env.PORT || 8080;

const httpServer = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: true, service: "proxypilot-wisp" }));
    return;
  }
  res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
  res.end("ProxyPilot Wisp relay is running.\nPoint a Wisp client at wss://<this-host>/wisp/\n");
});

httpServer.on("upgrade", (req, socket, head) => {
  if (req.url && (req.url === "/wisp" || req.url.startsWith("/wisp/"))) {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.destroy();
  }
});

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`ProxyPilot Wisp relay listening on :${PORT} (ws path /wisp/)`);
});
