import { SHIKSHARTHI_LOGO_BASE64 } from "./admitCardLogo";
import type { SSATRegistrationRecord } from "./ssatDatabase";

/**
 * Print ONLY the official SSAT Admit Card on exactly one A4 page.
 * Uses an isolated iframe to prevent any extra pages, ghost elements, or broken styles.
 */
export function printAdmitCardDocument(record: SSATRegistrationRecord): void {
  // Remove any previously appended print iframe
  const existing = document.getElementById("ssat-print-iframe");
  if (existing) {
    existing.remove();
  }

  const iframe = document.createElement("iframe");
  iframe.id = "ssat-print-iframe";
  // Off-screen with real A4 dimensions so Chromium/WebKit properly renders and prints it
  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.left = "-9999px";
  iframe.style.width = "210mm";
  iframe.style.height = "297mm";
  iframe.style.border = "none";
  iframe.style.zIndex = "-9999";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    window.print();
    return;
  }

  doc.open();
  doc.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>SSAT_2026_Admit_Card_${record.regId}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 12mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 10.5px;
      line-height: 1.3;
    }
    .admit-card {
      width: 100%;
      max-width: 185mm;
      margin: 0 auto;
      border: 2px solid #0f172a;
      border-radius: 6px;
      padding: 10px 14px;
      background: #ffffff;
      page-break-inside: avoid;
      break-inside: avoid;
      page-break-after: avoid;
      max-height: 275mm;
      overflow: hidden;
    }
    .header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 8px;
      text-align: center;
    }
    .logo {
      height: 52px;
      max-width: 280px;
      object-fit: contain;
      display: block;
      margin: 0 auto 4px auto;
    }
    .inst-title {
      font-size: 16px;
      font-weight: 800;
      color: #142850;
      text-transform: uppercase;
      margin: 0;
      letter-spacing: 0.5px;
    }
    .inst-sub {
      font-size: 9.5px;
      font-weight: 600;
      color: #475569;
      margin: 2px 0 6px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .exam-badge {
      background-color: #142850;
      color: #ffffff;
      padding: 4px 10px;
      border-radius: 4px;
      display: inline-block;
      margin-top: 2px;
    }
    .exam-title {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .exam-sub {
      font-size: 9px;
      font-weight: 700;
      color: #fde047;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .hall-bar {
      margin: 8px 0;
      padding: 6px 12px;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
    }
    .roll-num {
      font-family: monospace;
      font-size: 14px;
      font-weight: 800;
      color: #142850;
      letter-spacing: 1px;
    }
    .details-grid {
      display: grid;
      grid-template-columns: 3fr 1fr;
      gap: 12px;
      margin: 8px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      overflow: hidden;
      font-size: 11px;
    }
    td {
      padding: 4px 8px;
      border-bottom: 1px solid #e2e8f0;
      vertical-align: middle;
    }
    tr:last-child td {
      border-bottom: none;
    }
    .td-label {
      width: 35%;
      font-weight: 700;
      color: #64748b;
      background: #f8fafc;
    }
    .td-val {
      color: #0f172a;
      font-weight: 600;
    }
    .td-val-hl {
      color: #142850;
      font-weight: 800;
      text-transform: uppercase;
    }
    .photo-box {
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      background: #f8fafc;
      padding: 6px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
    }
    .photo-dashed {
      width: 100%;
      height: 120px;
      border: 2px dashed #94a3b8;
      border-radius: 4px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 8.5px;
      color: #94a3b8;
      padding: 4px;
      text-align: center;
    }
    .sign-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      margin: 8px 0;
      padding-top: 6px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      font-size: 10px;
    }
    .sign-box {
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 4px;
    }
    .sign-space {
      height: 36px;
      border-bottom: 1px dashed #cbd5e1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 8.5px;
      color: #94a3b8;
    }
    .rules-sec {
      border-top: 2px solid #0f172a;
      padding-top: 6px;
      margin-top: 6px;
    }
    .rules-title {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      color: #142850;
      margin: 0 0 4px 0;
      letter-spacing: 0.5px;
    }
    ol {
      margin: 0;
      padding-left: 14px;
      font-size: 9.5px;
      color: #334155;
      line-height: 1.35;
    }
    li {
      margin-bottom: 2px;
    }
    .footer {
      border-top: 1px solid #cbd5e1;
      margin-top: 8px;
      padding-top: 6px;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="admit-card">
    <div class="header">
      <img src="${SHIKSHARTHI_LOGO_BASE64}" class="logo" alt="Shiksharthi Logo" width="220" height="50" />
      <h1 class="inst-title">Shiksharthi Educational Institute</h1>
      <p class="inst-sub">Premier Institute for IIT-JEE, NEET & Foundation | Kolkata, West Bengal</p>
      <div class="exam-badge">
        <div class="exam-title">SHIKSHARTHI SCHOLARSHIP ADMISSION TEST (SSAT 2026)</div>
        <div class="exam-sub">★ OFFICIAL PROVISIONAL ADMIT CARD & HALL TICKET ★</div>
      </div>
    </div>

    <div class="hall-bar">
      <div>
        <span style="font-weight: 700; color: #64748b; text-transform: uppercase; font-size: 9.5px;">Roll / Admit No: </span>
        <span class="roll-num">${record.regId}</span>
      </div>
      <div>
        <span>Class: <strong>10 (Science)</strong></span> • 
        <span>Exam Mode: <strong>Offline (OMR)</strong></span>
      </div>
    </div>

    <div class="details-grid">
      <table>
        <tr>
          <td class="td-label">Candidate Name</td>
          <td class="td-val-hl">${record.studentName}</td>
        </tr>
        <tr>
          <td class="td-label">School & Board</td>
          <td class="td-val">${record.schoolName} (${record.board})</td>
        </tr>
        <tr>
          <td class="td-label">Student Mobile</td>
          <td class="td-val" style="font-family: monospace;">+91 ${record.studentMobile}</td>
        </tr>
        <tr>
          <td class="td-label">Parent Mobile</td>
          <td class="td-val" style="font-family: monospace;">+91 ${record.parentMobile}</td>
        </tr>
        <tr>
          <td class="td-label">Date of Exam</td>
          <td class="td-val" style="color: #142850; font-weight: 800;">${record.examDate}</td>
        </tr>
        <tr>
          <td class="td-label">Reporting Time</td>
          <td class="td-val" style="color: #b45309; font-weight: 800;">10:30 AM (Sharp)</td>
        </tr>
        <tr>
          <td class="td-label">Exam Timing</td>
          <td class="td-val">11:00 AM – 1:00 PM (Duration: 2 Hours)</td>
        </tr>
        <tr>
          <td class="td-label">Exam Venue</td>
          <td class="td-val">Shiksharthi Educational Institute, Kolkata</td>
        </tr>
      </table>

      <div class="photo-box">
        <div class="photo-dashed">
          <span>AFFIX RECENT<br>PASSPORT SIZE<br>PHOTOGRAPH</span>
          <span style="font-size: 7px; color: #cbd5e1; margin-top: 4px;">(Self-Attested)</span>
        </div>
        <div style="font-size: 8px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-top: 4px;">Candidate Photo</div>
      </div>
    </div>

    <div class="sign-row">
      <div class="sign-box">
        <div class="sign-space">Sign here during exam</div>
        <span style="font-weight: 700; color: #334155;">Candidate's Signature</span>
      </div>
      <div class="sign-box">
        <div class="sign-space"></div>
        <span style="font-weight: 700; color: #334155;">Invigilator's Signature</span>
      </div>
      <div class="sign-box" style="background: #f8fafc;">
        <div class="sign-space" style="font-weight: 800; color: #047857; text-transform: uppercase; font-size: 8.5px;">
          ✓ Authorized & Verified
        </div>
        <span style="font-weight: 700; color: #334155;">Controller of Examinations</span>
      </div>
    </div>

    <div class="rules-sec">
      <div class="rules-title">Important Instructions for Candidates</div>
      <ol>
        <li><strong>Mandatory Entry Pass:</strong> Candidate must present this printed Admit Card along with original School ID Card or Aadhaar Card at the venue.</li>
        <li><strong>Reporting Time:</strong> Report to the exam venue by <strong>10:30 AM</strong>. Entry gates close at 10:55 AM. No candidate permitted after 11:15 AM.</li>
        <li><strong>Permitted Stationery:</strong> Use only <strong>Blue or Black ballpoint pens</strong>. Rough work sheets will be provided in the hall.</li>
        <li><strong>Prohibited Items:</strong> Mobile phones, calculators, smartwatches, and electronic gadgets are strictly banned inside the hall.</li>
        <li><strong>Scholarships:</strong> Top 100 students will receive merit scholarships; Top 10 rankers receive <strong>₹1,00,000 scholarship</strong> awards.</li>
      </ol>
    </div>

    <div class="footer">
      <span>Helpline: <strong>+91 9836269291</strong></span>
      <span>Email: <strong>shiksharthi.edu.institute@gmail.com</strong></span>
      <span>Website: <strong>www.shiksharthi.org</strong></span>
      <span style="font-style: italic;">Valid only for SSAT 2026 Examination</span>
    </div>
  </div>
</body>
</html>`);
  doc.close();

  const executePrint = () => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch (err) {
      console.error("Iframe print error:", err);
      window.print();
    }
  };

  const img = doc.querySelector("img");
  if (img && !img.complete) {
    img.onload = () => {
      setTimeout(executePrint, 150);
    };
    img.onerror = () => {
      setTimeout(executePrint, 150);
    };
  } else {
    setTimeout(executePrint, 250);
  }
}
