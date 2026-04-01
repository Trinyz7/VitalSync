const express = require("express");
const app = express();
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date() });
});
app.get("/api/activities", (req, res) => {
res.json([{ id: 1, name: "Running", duration: 30 }]);
});
app.listen(3000, () => console.log("VitalSync API on :3000"));