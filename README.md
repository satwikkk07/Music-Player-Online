# Music Player Online

A responsive, Spotify-inspired music player built with HTML, CSS, JavaScript, and Node.js. Browse playlists, play the bundled tracks, and search for song previews.

**[Open the live player](https://music-player-online-satwikkk07.onrender.com)**

## Preview

[![Music Player Online home page](previewimg/Home.png)](https://music-player-online-satwikkk07.onrender.com)

## Features

- Play, pause, skip, seek, and adjust the volume of bundled tracks
- Browse playlists with artwork and descriptions
- Search songs and artists using the iTunes Search API, then play available previews
- Add searched songs to the favorites API
- Responsive layout for desktop and mobile screens

## Tech stack

- **Frontend:** HTML, CSS, vanilla JavaScript
- **Server:** Node.js and Express
- **Music library:** Audio files and playlist metadata in `public/songs/`
- **Search:** Apple iTunes Search API
- **Hosting:** Render

## Run locally

Requires Node.js 18 or newer.

```bash
git clone https://github.com/satwikkk07/Music-Player-Online.git
cd Music-Player-Online
npm ci
npm start
```

Open [http://localhost:5000](http://localhost:5000) in your browser.

## Project structure

```text
.
├── css/                 # Stylesheets
├── img/                 # Player and interface icons
├── js/                  # Player and search behavior
├── previewimg/          # Project screenshots
├── public/songs/        # Playlist artwork, metadata, and audio
├── server/              # Express API and server
├── index.html
└── render.yaml          # Render deployment configuration
```

## API routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/search?q=...` | Search songs and artists through iTunes |
| `GET` | `/api/favorites` | Read saved favorites |
| `POST` | `/api/favorites` | Add a song to favorites |

## Deployment

The live app is hosted on Render: **[music-player-online-satwikkk07.onrender.com](https://music-player-online-satwikkk07.onrender.com)**.

The free Render service may sleep when idle and take a little longer to respond on its first request. Favorites are stored in a local JSON file, so they are intended for demonstration and may reset when the service restarts.

## Notes

This repository currently provides a music player and a small search/favorites API. It does not include user authentication or a MongoDB database.
