// server.js
// Basit bir Express.js API sunucusu

import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();
const { Pool } = pkg;
const app = express();

// Güvenlik ve hız ayarları
app.use(helmet());
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 60,
  })
);

// Veritabanı bağlantısı
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Ana endpoint (örnek)
app.get("/", (req, res) => {
  res.send("API çalışıyor 🚀");
});

// Basit sorgu örneği
app.get("/api/search", async (req, res) => {
  const q = (req.query.q || "").trim();
  if (!q) return res.json([]);
  try {
    const { rows } = await pool.query(
      "SELECT id, fullname, info FROM persons WHERE fullname ILIKE $1 LIMIT 20",
      [`%${q}%`]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`));

const axios = require('axios');
const cheerio = require('cheerio');

const url = 'http://forspanel.pro'; // veri çekeceğimiz sayfa

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Örnek: Sayfadaki tüm başlıkları çekelim
    $('h1, h2, h3').each((i, el) => {
      console.log($(el).text());
    });
  })
  .catch(err => {
    console.error('Sayfa yüklenirken hata:', err);
  });

