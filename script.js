function updatePreview() {
    document.getElementById("prevDocName").innerText =
        document.getElementById("docName").value;

    document.getElementById("prevDocDegree").innerText =
        document.getElementById("docDegree").value;

    document.getElementById("prevDocClinic").innerText =
        document.getElementById("docClinic").value;

    document.getElementById("prevDocPhone").innerText =
        document.getElementById("docPhone").value;

    document.getElementById("prevPtName").innerText =
        document.getElementById("ptName").value;

    document.getElementById("prevPtAge").innerText =
        document.getElementById("ptAge").value;

    document.getElementById("prevDate").innerText =
        document.getElementById("ptDate").value;

    document.getElementById("prevCC").innerText =
        document.getElementById("cc").value;

    document.getElementById("prevOE").innerText =
        document.getElementById("oe").value;

    document.getElementById("prevINV").innerText =
        document.getElementById("inv").value;

    document.getElementById("prevRX").innerText =
        document.getElementById("rx").value;
}

document.querySelectorAll("input, textarea")
    .forEach(el => el.addEventListener("input", updatePreview));

function clearAll() {
    document.querySelectorAll("input, textarea").forEach(el => el.value = "");
    updatePreview();
}
