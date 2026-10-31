# 📸 Photo Gallery Web App — Celebrare Frontend Internship

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](#)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](#)
[![License](https://img.shields.io/badge/Status-Completed-success)](#)

> A clean, responsive, and high-performance Photo Gallery built for the **Celebrare Frontend Intern Pre-Screening Assignment**. Fetches curated photos from the Picsum API, offers real-time client-side search by author name, and manages persisted favourites across page refreshes using `useReducer` and `localStorage`.

---

## 📌 Submission Information
* **Applicant**: Frontend React Intern Candidate
* **GitHub Repository**: [Repository Link]
* **5-Minute Video Recording**: [Google Drive / YouTube Unlisted Link]
* **Google Form - Hardest Part Summary**:
  > *"Handling high-resolution 5000px Picsum image payloads efficiently using dynamic thumbnail dimensions, combined with coordinating clean useReducer state persistence with localStorage."*

---

## 📋 Pre-Screening Requirements Matrix

Every single requirement outlined in the Celebrare Pre-Screening document has been satisfied without external UI component libraries:

| # | Requirement | Implementation Details | Verified |
|:---:|---|---|:---:|
| **1** | **Project Setup** | Built with **React + Vite + Tailwind CSS**. Zero third-party UI libraries (No Material UI, Ant Design, or Bootstrap). | ✅ Pass |
| **2** | **Fetch Photos from API** | Fetches 30 photos on load from `https://picsum.photos/v2/list?limit=30`. Features a custom loading spinner and error feedback. | ✅ Pass |
| **3** | **Responsive Grid** | Strictly responsive: **Desktop (4 columns)**, **Tablet (2 columns)**, **Mobile (1 column)**. Displays photo, author name, and heart toggle. | ✅ Pass |
| **4** | **Real-Time Search Filter** | Search input at top filtering in real-time by author name. **Zero page reloads and zero extra API calls** (filters already-fetched data). | ✅ Pass |
| **5** | **Favourites via `useReducer`** | Managed strictly with `useReducer` (not `useState`). Persisted to `localStorage` with lazy initialization. | ✅ Pass |
| **6** | **Custom Hook (`useFetchPhotos`)** | All data-fetching logic extracted into `useFetchPhotos` returning `{ photos, loading, error }`. | ✅ Pass |
| **7** | **`useCallback` + `useMemo`** | `useCallback` preserves search handler reference; `useMemo` memoizes filtered photos computation. | ✅ Pass |

---

## 🏗️ Architecture & Component Hierarchy

```text
celebrare-photo-gallery/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Header with title & live favourites count
│   │   ├── SearchBar.jsx       # Input field + clear button (wrapped in React.memo)
│   │   ├── PhotoGrid.jsx       # Responsive grid layout (1 / 2 / 4 columns)
│   │   ├── PhotoCard.jsx       # Individual card with image, author, and heart button
│   │   ├── LoadingSpinner.jsx  # Pulse + spin loading state
│   │   └── ErrorMessage.jsx    # User-friendly error alert on fetch failure
│   ├── hooks/
│   │   └── useFetchPhotos.js   # Custom hook returning { photos, loading, error }
│   ├── reducers/
│   │   └── favouritesReducer.js# Pure reducer & lazy localStorage initializer
│   ├── App.jsx                 # Central app component coordinating state & hooks
│   ├── index.css               # Tailwind directives & base styling
│   └── main.jsx                # React root entry point
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 💡 Key Architectural & Engineering Decisions

### 1. Pure State Management with `useReducer`
* **Why `useReducer` over `useState`?**
  * **Centralized Logic**: Separates array mutation logic (`includes`, `filter`, and array spreading) into a pure reducer function instead of cluttering UI components.
  * **Predictability & Scalability**: Centralized action dispatching (`TOGGLE_FAVOURITE`) simplifies unit testing and makes extending functionality (e.g. `CLEAR_ALL`) effortless.
* **Lazy Initialization (`initFavourites`)**:
  * Passed as the 3rd argument to `useReducer`. It reads from `localStorage` **only once on initial mount**, preventing redundant and expensive `JSON.parse` operations during subsequent re-render cycles.

### 2. Performance Optimization with `useCallback` & `useMemo`
* **`useCallback` on `handleSearchChange`**:
  * Prevents recreating the handler function on every render cycle. Because `SearchBar` is wrapped in `React.memo`, passing this memoized callback prevents the search bar from re-rendering when users toggle favorites.
* **`useMemo` on `filteredPhotos`**:
  * Caches the computed search results based on `[photos, searchTerm]`. If unrelated state changes (like clicking the heart button on a card), `useMemo` skips re-filtering the entire array.

### 3. Smart Network & Image Optimization
* The raw Picsum API provides full-size photography links exceeding 5000×3300px (~3MB to 5MB each). Fetching 30 raw images would require ~120MB of bandwidth on load.
* **Solution**: Request dynamically sized 600×450 thumbnails (`https://picsum.photos/id/{id}/600/450`) with native `loading="lazy"`. This reduces network payload by **95%**, eliminates layout shifts, and ensures lightning-fast grid rendering.

---

## 🎙️ 5-Minute Video Walkthrough Script (For Candidate)

Use this quick cheat-sheet to confidently answer all 5 prompts required by Celebrare:

| Section & Duration | What to Show on Screen | What to Say / Explain |
|---|---|---|
| **1. App Working**<br>*(~60 sec)* | Browser at `localhost:5173` | • Reload the page to highlight the **Loading Spinner**.<br>• Type an author name in the search bar to demonstrate **instant filtering** without page reloads.<br>• Click the heart button on 2–3 cards to mark them as favorites.<br>• Reload the browser (`F5`) to prove favorites **persist via `localStorage`**.<br>• Resize the browser window to showcase the **1-col (mobile) $\rightarrow$ 2-col (tablet) $\rightarrow$ 4-col (desktop)** responsive grid. |
| **2. `useFetchPhotos`**<br>*(~45 sec)* | `src/hooks/useFetchPhotos.js` | *"This custom hook abstracts API operations away from the UI. It returns `{ photos, loading, error }`. Inside `useEffect`, it sets `loading` to true, fetches the 30 photos from Picsum, and sets `photos`. If an error occurs, the `catch` block populates `error`. In both outcomes, `finally` sets `loading` to false."* |
| **3. `useReducer`**<br>*(~45 sec)* | `src/reducers/favouritesReducer.js` | *"Our reducer handles `TOGGLE_FAVOURITE`. If the ID exists in the array, it filters it out; otherwise, it appends it immutably. I chose `useReducer` because it centralizes state transitions in a pure function away from UI buttons and scales cleanly for collection operations. We use lazy initialization to safely parse `localStorage` only once on mount."* |
| **4. `useCallback` & `useMemo`**<br>*(~45 sec)* | `src/App.jsx`<br>*(Lines 30–50)* | *"• **`useCallback`**: Memoizes `handleSearchChange`. Because `SearchBar` is wrapped in `React.memo`, this stable reference prevents SearchBar from re-rendering when a user clicks a favorite heart.<br>• **`useMemo`**: Caches `filteredPhotos`. The filter calculation only runs when `searchTerm` or `photos` changes, avoiding expensive array iterations on unrelated renders."* |
| **5. Hardest Part**<br>*(~45 sec)* | `src/components/PhotoCard.jsx` | *"The most challenging part was optimizing raw Picsum image downloads. Default links were 5000px high-res photos (~120MB total). I resolved this by requesting optimized 600px dynamic thumbnails with `loading="lazy"` and skeleton placeholders, reducing load time and data consumption dramatically."* |

---

## 💻 Local Development Setup

### 1. Prerequisites
* Node.js (v18.x or v20.x+)
* npm (v9.x or v10.x+)

### 2. Installation & Start
```bash
# 1. Navigate into project folder
cd celebrare-photo-gallery

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 📤 Git Submission Steps

```bash
cd celebrare-photo-gallery

# Initialize and stage files
git init
git add .
git commit -m "feat: complete celebrare frontend intern pre-screening assignment"

# Push to your GitHub profile
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
git push -u origin main
```
