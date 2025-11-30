let medicines = [], generics = [], manufacturers = [], indications = [], drugClasses = [], dosageForms = [];

// Load all CSVs dynamically
const files = [
    {name: "generic", target: generics},
    {name: "manufacturer", target: manufacturers},
    {name: "indication", target: indications},
    {name: "drug class", target: drugClasses},
    {name: "dosage form", target: dosageForms},
    {name: "medicine", target: medicines}
];

let loadCount = 0;

files.forEach(file => {
    Papa.parse(`data/${file.name}.csv`, {
        download: true,
        header: true,
        complete: function(results){
            file.target.push(...results.data);
            loadCount++;
            if(loadCount === files.length) initApp();
        }
    });
});

// Initialize after all CSVs loaded
function initApp(){
    populateFilters();
    displayResults(medicines);
}

// Mapping helpers
function mapField(list, idField, nameField, value){
    const item = list.find(x => x.ID === value);
    return item ? item[nameField] : "N/A";
}

// Populate dropdown filters
function populateFilters(){
    populateSelect("filterGeneric", generics);
    populateSelect("filterManufacturer", manufacturers);
    populateSelect("filterDrugClass", drugClasses);
    populateSelect("filterDosageForm", dosageForms);
}

function populateSelect(selectId, data){
    const select = document.getElementById(selectId);
    const sorted = [...new Set(data.map(d => d.Name).filter(Boolean))].sort();
    sorted.forEach(v => select.innerHTML += `<option value="${v}">${v}</option>`);
}

// Search & filter events
document.getElementById("searchBox").addEventListener("input", filterData);
["filterGeneric","filterManufacturer","filterDrugClass","filterDosageForm"].forEach(id=>{
    document.getElementById(id).addEventListener("change", filterData);
});

function filterData(){
    const q = document.getElementById("searchBox").value.toLowerCase();
    const gen = document.getElementById("filterGeneric").value;
    const man = document.getElementById("filterManufacturer").value;
    const cls = document.getElementById("filterDrugClass").value;
    const form = document.getElementById("filterDosageForm").value;

    const filtered = medicines.filter(m=>{
        const medicineName = m.Name?.toLowerCase() || "";
        const genericName = mapField(generics,"ID","Name",m.GenericID).toLowerCase();
        const manufacturerName = mapField(manufacturers,"ID","Name",m.ManufacturerID).toLowerCase();
        const drugClassName = mapField(drugClasses,"ID","Name",m.DrugClassID).toLowerCase();
        const dosageFormName = mapField(dosageForms,"ID","Name",m.DosageFormID).toLowerCase();

        return (medicineName.includes(q) || genericName.includes(q) || manufacturerName.includes(q))
            && (gen === "" || genericName === gen.toLowerCase())
            && (man === "" || manufacturerName === man.toLowerCase())
            && (cls === "" || drugClassName === cls.toLowerCase())
            && (form === "" || dosageFormName === form.toLowerCase());
    });

    displayResults(filtered);
}

// Display cards
function displayResults(data){
    const div = document.getElementById("results");
    if(!data.length){ div.innerHTML="<p>No results found.</p>"; return; }

    div.innerHTML = data.map(m=>{
        const genericName = mapField(generics,"ID","Name",m.GenericID);
        const manufacturerName = mapField(manufacturers,"ID","Name",m.ManufacturerID);
        const drugClassName = mapField(drugClasses,"ID","Name",m.DrugClassID);
        const dosageFormName = mapField(dosageForms,"ID","Name",m.DosageFormID);
        const indicationName = mapField(indications,"ID","Name",m.IndicationID);

        return `
            <div class="card">
                <b>${m.Name || "Unknown"}</b><br>
                Generic: ${genericName}<br>
                Manufacturer: ${manufacturerName}<br>
                Drug Class: ${drugClassName}<br>
                Dosage Form: ${dosageFormName}<br>
                Indication: ${indicationName}<br>
                Price: ${m.Price || "N/A"}
            </div>
        `;
    }).join('');
}

// Dark mode toggle
document.getElementById("themeSwitch").addEventListener("change",()=>{
    document.body.classList.toggle("dark");
});

