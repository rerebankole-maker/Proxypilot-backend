ProxyPilot Backend — Deploy Instructions
This is your own private proxy relay server (a real Node.js Wisp server).
Unlike the Cloudflare Worker, a real server can connect to any website —
including Cloudflare-hosted ones — so the whole class of "relay can't reach
that site" failures goes away.

Tested locally before packaging: example.org 2.7s, xbox.com 2.7s through it.

What you need
A free GitHub account (to hold these 3 files)
A free Render account (no credit card, no phone verification)
Step 1 — Put the code on GitHub
Go to github.com → sign up / sign in.
Top-right + → New repository.
Name: proxypilot-backend
Set it to Public → Create repository.
On the repo page, click uploading an existing file.
Upload these 3 files from this folder: 
server.js
, 
package.json
, 
render.yaml

(download them from the workspace first).
Commit changes.
Step 2 — Deploy on Render
Go to render.com → Get Started → sign up (choose GitHub — it
connects your account in one click).

Dashboard → New + → Web Service.

Choose Build and deploy from a Git repository → pick
proxypilot-backend (click Connect next to it; approve access if asked).

Render reads 
render.yaml
 automatically. Confirm:

Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
Create Web Service. First build takes ~2–4 minutes.

When it says Live, your relay address is:

wss://<your-service-name>.onrender.com/wisp/

(Your service URL is shown at the top of the Render page — it's
https://...onrender.com; just change https→wss and add /wisp/.)

Step 3 — Send me the address
Paste the wss://...onrender.com/wisp/ address in chat. I'll make it the
primary relay in ProxyPilot + PilotVPN (Cloudflare/public relays stay as
automatic fallbacks), redeploy, and run the full test suite.

Notes
Free tier sleeps: after ~15 minutes idle, the first connection takes
30–50s to wake the server. ProxyPilot will use a fallback relay for that
first load rather than hang; after it's awake everything is fast.
The relay address will be visible in ProxyPilot's public code. If strangers
ever abuse it, tell me — we can add rate limits or move it to a secret path.
