const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const rootDir = path.join(__dirname, "..");
const songsDir = path.join(rootDir, "public", "songs");

app.use(express.json());
app.use("/css", express.static(path.join(rootDir, "css")));
app.use("/img", express.static(path.join(rootDir, "img")));
app.use("/js", express.static(path.join(rootDir, "js")));
app.use("/songs", express.static(songsDir));

// The player reads directory listings to discover playlists and their tracks.
app.get("/songs", (_req, res) => {
  const folders = fs.readdirSync(songsDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
  res.type("html").send(folders.map(folder => `<a href="/songs/${encodeURIComponent(folder)}/">${folder}</a>`).join(""));
});

app.get("/songs/:folder", (req, res, next) => {
  const folder = path.basename(req.params.folder);
  const folderPath = path.join(songsDir, folder);
  if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) return next();
  const tracks = fs.readdirSync(folderPath)
    .filter(file => file.toLowerCase().endsWith(".mp3"))
    .map(file => `<a href="/songs/${encodeURIComponent(folder)}/${encodeURIComponent(file)}">${file}</a>`);
  res.type("html").send(tracks.join(""));
});

app.get("/", (_req, res) => res.sendFile(path.join(rootDir, "index.html")));

// 🔍 SEARCH SONGS & ARTISTS (iTunes API)
app.get("/api/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=20`
    );

    const data = await response.json();

    // Clean response (only useful fields)
    const results = data.results.map(song => ({
      id: song.trackId,
      title: song.trackName,
      artist: song.artistName,
      album: song.collectionName,
      artwork: song.artworkUrl100,
      preview: song.previewUrl
    }));

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});

const favFile = path.join(__dirname, "favorites.json");

// Get favorites
app.get("/api/favorites", (req, res) => {
  const data = JSON.parse(fs.readFileSync(favFile, "utf-8"));
  res.json(data);
});

// Add favorite
app.post("/api/favorites", (req, res) => {
  const song = req.body;

  const data = JSON.parse(fs.readFileSync(favFile, "utf-8"));

  data.push(song);

  fs.writeFileSync(favFile, JSON.stringify(data, null, 2));
  res.json({ success: true });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
