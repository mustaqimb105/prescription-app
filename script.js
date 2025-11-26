// Safe binding helper
function $(id) {
  return document.getElementById(id);
}

/* ------------------------------
   MEDICINES
------------------------------ */
function addMed() {
  let txt = $("medtext").value.trim();
  if (!txt) return;

  let box = document.createElement("div");
  box.className = "med-item";
  box.innerHTML = `${txt} <button onclick="this.parentNode.remove()">X</button>`;

  $("medlist").appendChild(box);
  $("medtext").value = "";
}

/* ------------------------------
   LOAD SAMPLE
------------------------------ */
function loadSample() {
  $("docname").value = "Dr. A B C, MBBS, FCPS";
  $("clinic").value = "City Clinic";
  $("address").value = "12 Main Rd, Dhaka";
  $("phone").value = "+8801712345678";

  $("pname").value = "Mr. Rahim";
  $("page").value = "32";
  $("psex").value = "M";
  $("pmobile").value = "+8801xxxxxxxxx";
  $("pdate").value = "2025-11-26";

  $("cc").value = "Fever and cough for 3 days";
  $("oe").value = "Temp 38.2°C, HR 88/min, clear chest";
  $("invest").value = "CBC, Chest X-ray if no improvement";

  $("medlist").innerHTML = "";
  createMed("Tab Paracetamol 500mg — 1 tab TDS after food");
  createMed("Syrup Cough 5ml — 5ml TDS");

  $("advice").value = "Rest, fluids, follow up in 3 days";
}

function createMed(text) {
  let box = document.createElement("div");
  box.className = "med-item";
  box.innerHTML = `${text} <button onclick="this.parentNode.remove()">X</button>`;
  $("medlist").appendChild(box);
}

/* ------------------------------
   SAVE TO BROWSER
------------------------------ */
function saveData() {
  const data = {
    docname: $("docname").value,
    clinic: $("clinic").value,
    address: $("address").value,
    phone: $("phone").value,
    pname: $("pname").value,
    page: $("page").value,
    psex: $("psex").value,
    pmobile: $("pmobile").value,
    pdate: $("pdate").value,
    cc: $("cc").value,
    oe: $("oe").value,
    invest: $("invest").value,
    advice: $("advice").value,
    meds: Array.from(document.querySelectorAll(".med-item")).map(m => m.innerText.replace(" X",""))
  };

  localStorage.setItem("prescription", JSON.stringify(data));
  alert("Saved!");
}

/* ------------------------------
   EXPORT JSON
------------------------------ */
function exportJSON() {
  saveData();
  const blob = new Blob([localStorage.getItem("prescription")], {type: "application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "prescription.json";
  a.click();
}

/* ------------------------------
   IMPORT JSON
------------------------------ */
$("fileinput").addEventListener("change", function() {
  const reader = new FileReader();
  reader.onload = function() {
    const obj = JSON.parse(reader.result);

    for (let key in obj) {
      if ($(key) && typeof obj[key] === "string") $(key).value = obj[key];
    }

    $("medlist").innerHTML = "";
    obj.meds.forEach(m => createMed(m));
  };
  reader.readAsText(this.files[0]);
});

/* ------------------------------
   AUTOLOAD
------------------------------ */
window.onload = function() {
  let saved = localStorage.getItem("prescription");
  if (!saved) return;

  let obj = JSON.parse(saved);
  for (let key in obj) {
    if ($(key) && typeof obj[key] === "string") $(key).value = obj[key];
  }

  $("medlist").innerHTML = "";
  obj.meds.forEach(m => createMed(m));
};
