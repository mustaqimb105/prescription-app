function makePrescription() {

    let html = `
    <div class='prescription'>

        <div class='top-grid'>
            <div>${document.getElementById("header").value.replace(/\n/g,"<br>")}</div>

            <div style="text-align:right;">
                <strong>Name:</strong> ${pname.value}<br>
                <strong>Age/Sex:</strong> ${agesex.value}<br>
                <strong>Date:</strong> ${date.value}<br>
                <strong>Address:</strong> ${address.value}
            </div>
        </div>

        <hr style="margin:15px 0;">

        <div class="two-col">

            <div>
                <div class='section-title'>C/C</div>
                ${cc.value.replace(/\n/g,"<br>")}

                <div class='section-title'>O/E</div>
                ${oe.value.replace(/\n/g,"<br>")}

                <div class='section-title'>Advice</div>
                ${advice.value.replace(/\n/g,"<br>")}

                <div class='section-title'>Δ Diagnosis</div>
                ${dx.value}
            </div>

            <div>
                <div class='section-title'>Rx.</div>
                ${med.value.replace(/\n/g,"<br>")}
            </div>

        </div>

        <div class='signature'>Signature</div>

        <div class='footer'>
            Developed by Battery-_-Low
        </div>

    </div>
    `;

    document.getElementById("output").innerHTML = html;
}
