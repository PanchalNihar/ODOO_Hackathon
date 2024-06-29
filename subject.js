var lk = require("./admin.js")
var sub = require("./examiner.html")

const he = lk.find(u => u.sub === sub);
document.getElementById("exname").textContent = `<strong>subject name :</strong>${he.sub}`
document.getElementById("link").textContent = `<a href="he.fi" download>download</a>`