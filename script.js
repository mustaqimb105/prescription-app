const $ = id => document.getElementById(id);

// Auto date fill
(() => {
  const t = new Date();
  $('prescDate').value = t.toISOString().split('T')[0];
})();

// Logo
$('logoInput').addEventListener('change', e=>{
  const file = e.target.files[0];
  if(!file) return;

  const r = new FileReader();
  r.onload = ev=>{
    $('tplLogo').src = ev.target.result;
    $('tplLogo').style.display = 'inline-block';
  };
  r.readAsDataURL(file);
});

function populateTemplate(){
  $('tplClinicName').textContent = $('clinicName').value;
  $('tplClinicAddress').textContent = $('clinicAddress').value;
  $('tplPatientName').textContent = $('patientName').value;
  $('tplPatientAgeSex').textContent =
    `${$('patientAge').value} / ${$('patientSex').value}`;
  $('tplDate').textContent = $('prescDate').value;
  $('tplDiagnosis').textContent = $('diagnosis').value;
  $('tplChiefComplaint').textContent = $('chiefComplaint').value;
  $('tplInvestigation').textContent = $('investigation').value;
  $('tplDoctorName').textContent = $('doctorName').value;

  // Populate medicine rows
  const tbody = document.querySelector('#tplMedTable tbody');
  tbody.innerHTML = '';
  let n = 1;

  ($('medInput').value || '').split('\n').forEach(line=>{
    if(!line.trim()) return;

    const p = line.split('|').map(x=>x.trim());
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${n}.</td>
      <td>${p[0] || ''}</td>
      <td>${p[1] || ''}</td>
      <td>${p[2] || ''}</td>
      <td>${p[3] || ''}</td>
    `;
    tbody.appendChild(tr);
    n++;
  });
}

// PDF
$('generatePdf').addEventListener('click', ()=>{
  populateTemplate();
  const el = $('prescriptionTemplate');
  el.style.display = 'block';

  html2pdf().set({
    margin:[8,8,8,8],
    filename:`Prescription_${$('patientName').value}.pdf`,
    html2canvas:{scale:2},
    jsPDF:{unit:'mm',format:'a4'}
  }).from(el).save().then(()=>{
    el.style.display='none';
  });
});

// Preview
$('previewPdf').addEventListener('click', async ()=>{
  populateTemplate();
  const el = $('prescriptionTemplate');
  el.style.display = 'block';

  const blob = await html2pdf().from(el).outputPdf('blob');
  window.open(URL.createObjectURL(blob),'_blank');

  el.style.display='none';
});

// Print
$('printBtn').addEventListener('click', ()=>{
  populateTemplate();
  const el = $('prescriptionTemplate');
  el.style.display='block';
  window.print();
  setTimeout(()=> el.style.display='none', 500);
});

// Reset
$('resetBtn').addEventListener('click', ()=>{
  if(!confirm("Reset all fields?")) return;

  [
    'clinicName','clinicAddress','patientName','patientAge','patientSex',
    'diagnosis','chiefComplaint','investigation','medInput','doctorName'
  ].forEach(id => $(id).value = "");

  $('tplLogo').src = "";
  $('tplLogo').style.display = "none";
});
