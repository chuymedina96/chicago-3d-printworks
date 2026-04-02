# Chicago 3D Print Works — Quote Frontend

React application for chicago3dprintworks.com. Lets customers upload a 3D mesh file and get an instant price quote — including material selection, live price recalculation, a multi-part workspace, and PDF export.

Deployed separately to Heroku. Backend lives in `../quote_backend`.

---

## Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Routing | React Router 7 |
| HTTP | Axios |
| File Upload | react-dropzone |
| Animations | Framer Motion |
| PDF Export | jsPDF + html2canvas |
| Production Server | Express (server.js) |

---

## Local Development

```bash
cd quote-frontend
npm install
REACT_APP_API_BASE=http://localhost:8000 npm start
```

App runs at `http://localhost:3000`. The Django backend must be running at `localhost:8000`.

---

## Docker

```bash
# From repo root
docker compose up frontend

# Or build directly, passing the backend URL at build time
docker build \
  --build-arg REACT_APP_API_BASE=https://your-backend.herokuapp.com \
  -t c3dpw-frontend \
  ./quote-frontend

docker run -p 3000:3000 c3dpw-frontend
```

> **Note:** `REACT_APP_API_BASE` is baked into the React bundle at build time. You must pass it as a build argument, not a runtime environment variable.

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `REACT_APP_API_BASE` | `http://localhost:8000` | Backend base URL (build-time) |
| `REACT_APP_DATA_UPLOAD_MAX_MB` | `200` | Max upload size shown in UI (build-time) |
| `PORT` | `3000` | Express server port (runtime) |

---

## Routes

| Path | Page | Description |
|---|---|---|
| `/` | Home | Landing page with hero video |
| `/quote` | Quote | Instant quote tool (main feature) |
| `/technologies` | Technologies | Materials & printer info |
| `/support` | Support | Contact & FAQ |
| `/terms` | Terms | Terms of Service |
| `/about` | About | Team & company info |

---

## Key Components

### `src/components/QuoteForm.js`
The primary user-facing feature. Handles the full quote flow from upload to cart.

**Capabilities:**
- Drag-and-drop or click-to-upload for STL / OBJ files (react-dropzone)
- Material selector with an info modal showing per-material properties:

  | Material | Tagline | Typical Use |
  |---|---|---|
  | PLA | Crisp, affordable, low warp | Prototypes, visual models |
  | PLA+ | Stronger PLA | Functional parts |
  | PETG | Chemical resistance + flexibility | Enclosures, brackets |
  | Nylon | High strength, fatigue-resistant | Mechanical assemblies |
  | CFNylon | Stiffest, lightest | Structural / load-bearing |

- Layer height and infill controls
- Submits file to `POST /api/quote` on the backend
- On success, hands the API response to `EstimateResult` for display
- Client-side price recalculation mirrors backend math — instant material switching without a new upload
- Captures a PNG thumbnail via html2canvas for the workspace cart
- Adds completed quotes to the workspace (localStorage key: `c3dpw_workspaces_v1`)

---

### `src/components/EstimateResult.js`
Displays the full breakdown for a single quote and handles live recalculation.

**Shows:**
- Mesh geometry — volume (cm³), surface area (cm²), bounding box (mm), triangle count
- Material dropdown — switching material instantly recalculates via `React.useMemo`
- Estimated weight (g), print time (hr), and **total price (USD)**

**Recalculation logic** (mirrors `quote_engine.py`):
```
layer_factor  = clamp(0.20 / layer_height_mm, 0.6, 1.5)
infill_factor = 1.0 + (infill_pct / 100) × 0.3
time_hr       = (volume_cm3 × layer_factor × infill_factor) / (cm3_per_hr × speed_factor)
price         = $5 + (weight_g × rate_$/g) + (time_hr × $8/hr)
```

The backend sends all material parameters in the initial response so no second network call is needed when the user switches materials.

---

### `src/components/QuotesWorkspace.js`
Multi-part quote cart with PDF batch export.

**Capabilities:**
- Renders all parts added during the session
- Each card shows: PNG thumbnail, filename, material, infill %, layer height, unit price
- Remove individual parts or clear all
- Export to a multi-page PDF using jsPDF + html2canvas

**Persistence:** Cart state survives page reloads via `localStorage` key `c3dpw_quote_cart_v1`.

---

### `src/components/Navbar.js` / `src/components/Footer.js`
Site-wide navigation and footer. Navbar links to all routes; Footer includes contact info and social links.

---

### `src/components/Hero.js`
Landing page hero section. Renders a looping background video from `public/assets/`.

---

## Production Server — `server.js`

A minimal Express server that serves the React build and handles SPA routing:

```js
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(process.env.PORT || 3000);
```

The `Procfile` starts this server on Heroku:
```
web: npm start
```

---

## Heroku Deployment

1. Set `REACT_APP_API_BASE` to your backend Heroku app URL **before building** (set it as a Heroku config var so the slug build picks it up).
2. Push — Heroku runs `npm run build` then `npm start`.
3. The frontend and backend are two separate Heroku apps that communicate over HTTPS.
