let medicines = [];

// Load CSV from GitHub repo folder
Papa.parse("data/medicines.csv", {
    download: true,
    header: true,
    complete: function(results) {
        medicines = results.data;
        populateFilters();
        displayResults(medicines);
    }
});

// Search
document.getElementById("searchBox").addEventListener("input", () => {
    filterData();
});

// Filters
document.getElementById("filterGeneric").addEventListener("change", filterData);
document.getElementById("filterCompany").addEventListener("change", filterData);

// Filtering function
function filterData() {
    const q = document.getElementById("searchBox").value.toLowerCase();
    const gen = document.getElementById("filterGeneric").value;
    const comp = document.getElementById("filterCompany").value;

    let filtered = medicines.filter(m =>
        (m.Name?.toLowerCase().includes(q) ||
         m.Generic?.toLowerCase().includes(q) ||
         m.Company?.toLowerCase().includes(q)) &&
        (gen === "" || m.Generic === gen) &&
        (comp === "" || m.Company === comp)
    );

    displayResults(filtered);
}

// Populate dropdowns
function populateFilters() {
    const genericSet = [...new Set(medicines.map(m => m.Generic).filter(Boolean))];
    const companySet = [...new Set(medicines.map(m => m.Company).filter(Boolean))];

    const genSelect = document.getElementById("filterGeneric");
    const compSelect = document.getElementById("filterCompany");

    genericSet.sort().forEach(g => {
        genSelect.innerHTML += `<option value="${g}">${g}</option>`;
    });

    companySet.sort().forEach(c => {
        compSelect.innerHTML += `<option value="${c}">${c}</option>`;
    });
}

// Show data
function displayResults(data) {
    const div = document.getElementById("results");

    if (!data.length) {
        div.innerHTML = "<p>No results found.</p>";
        return;
    }

    div.innerHTML = data.map(d => `
        <div class="card">
            <b>${d.Name || "Unknown Name"}</b><br>
            Generic: ${d.Generic || "N/A"}<br>
            Company: ${d.Company || "N/A"}<br>
            Price: ${d.Price || "N/A"}
        </div>
    `).join('');
}

/* Dark Mode Toggle */
const themeSwitch = document.getElementById("themeSwitch");

themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});

