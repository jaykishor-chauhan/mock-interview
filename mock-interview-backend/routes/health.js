const express = require("express");
const router = express.Router();
const { transporter } = require("../middleware/resetMailer");

// Simple health endpoint to check SMTP connectivity
router.get("/smtp", async (req, res) => {
  try {
    // transporter.verify uses a callback; wrap in a promise for async/await
    await new Promise((resolve, reject) => {
      transporter.verify((err, success) => {
        if (err) return reject(err);
        return resolve(success);
      });
    });

    return res.status(200).json({ ok: true, message: "SMTP verified" });
  } catch (error) {
    console.error("[health] SMTP verify failed:", error && error.message ? error.message : error);
    return res.status(500).json({ ok: false, message: "SMTP verify failed", error: error && error.message ? error.message : String(error) });
  }
});

module.exports = router;
