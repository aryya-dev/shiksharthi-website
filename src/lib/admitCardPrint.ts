import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { SHIKSHARTHI_LOGO_BASE64 } from "./admitCardLogo";
import type { SSATRegistrationRecord } from "./ssatDatabase";

/**
 * Detects if the current user is on a mobile device or small screen.
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || "";
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Silk/i;
  return mobileRegex.test(userAgent) || window.innerWidth <= 768;
}

/**
 * Builds the standalone, pixel-perfect HTML string for the 1-page Admit Card.
 * Used for both the popup print window and the off-screen high-res canvas PDF renderer.
 */
export function buildAdmitCardHTML(record: SSATRegistrationRecord, isStandaloneWindow = false): string {
  const logo = SHIKSHARTHI_LOGO_BASE64;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SSAT_2026_Admit_Card_${record.regId}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 10mm;
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
      font-size: 11px;
      line-height: 1.32;
    }
    .print-controls {
      display: ${isStandaloneWindow ? "flex" : "none"};
      justify-content: center;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: #f1f5f9;
      border-bottom: 1px solid #cbd5e1;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .btn {
      padding: 9px 20px;
      font-size: 13px;
      font-weight: 700;
      border-radius: 8px;
      cursor: pointer;
      border: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }
    .btn-primary {
      background: #142850;
      color: #ffffff;
    }
    .btn-primary:hover {
      background: #0f1f3d;
    }
    .btn-secondary {
      background: #e2e8f0;
      color: #1e293b;
    }
    .btn-secondary:hover {
      background: #cbd5e1;
    }
    @media print {
      .print-controls {
        display: none !important;
      }
    }
    .card-wrap {
      width: 100%;
      max-width: 760px;
      margin: ${isStandaloneWindow ? "14px auto" : "0 auto"};
      background: #ffffff;
    }
    .admit-card {
      border: 2px solid #0f172a;
      border-radius: 6px;
      padding: 12px 16px 10px 16px;
      background: #ffffff;
      position: relative;
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
      letter-spacing: 0.4px;
    }
    .exam-badge {
      background-color: #142850;
      color: #ffffff;
      padding: 4px 14px;
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
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 14px;
      font-weight: 800;
      color: #142850;
      letter-spacing: 1px;
    }
    .details-grid {
      display: grid;
      grid-template-columns: 3.2fr 1fr;
      gap: 12px;
      margin: 8px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #cbd5e1;
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
      font-size: 10.5px;
    }
    .td-val {
      color: #0f172a;
      font-weight: 600;
    }
    .td-val-hl {
      color: #142850;
      font-weight: 800;
      text-transform: uppercase;
      font-size: 12px;
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
      height: 122px;
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
      line-height: 1.3;
    }
    .photo-label {
      font-size: 8px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      margin-top: 4px;
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
      padding: 5px;
    }
    .sign-space {
      height: 36px;
      border-bottom: 1px dashed #cbd5e1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 8.5px;
      color: #94a3b8;
      font-family: monospace;
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
      letter-spacing: 0.4px;
    }
    ol {
      margin: 0;
      padding-left: 14px;
      font-size: 9.5px;
      color: #334155;
      line-height: 1.32;
    }
    li {
      margin-bottom: 2.5px;
    }
    .footer {
      border-top: 1px solid #cbd5e1;
      margin-top: 8px;
      padding-top: 6px;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #64748b;
      flex-wrap: wrap;
      gap: 4px;
    }
  </style>
</head>
<body>
  ${
    isStandaloneWindow
      ? `<div class="print-controls">
           <button class="btn btn-primary" onclick="window.print()">🖨️ Print Admit Card</button>
           <button class="btn btn-secondary" onclick="window.close()">✕ Close</button>
         </div>`
      : ""
  }
  <div class="card-wrap">
    <div class="admit-card" id="print-admit-card-inner">
      <!-- Institute Header -->
      <div class="header">
        <img src="${logo}" class="logo" alt="Shiksharthi Logo" />
        <h1 class="inst-title">Shiksharthi Educational Institute</h1>
        <p class="inst-sub">Premier Institute for IIT-JEE, NEET &amp; Foundation | Kolkata, West Bengal</p>
        <div class="exam-badge">
          <div class="exam-title">SHIKSHARTHI SCHOLARSHIP ADMISSION TEST (SSAT 2026)</div>
          <div class="exam-sub">★ OFFICIAL PROVISIONAL ADMIT CARD &amp; HALL TICKET ★</div>
        </div>
      </div>

      <!-- Hall Ticket Number Bar -->
      <div class="hall-bar">
        <div>
          <span style="font-weight:700;color:#64748b;text-transform:uppercase;font-size:9.5px;">Roll / Admit No: </span>
          <span class="roll-num">${record.regId}</span>
        </div>
        <div>
          <span>Class: <strong>10 (Science)</strong></span> &nbsp;•&nbsp; <span>Exam Mode: <strong>Offline (OMR)</strong></span>
        </div>
      </div>

      <!-- Details & Photo Grid -->
      <div class="details-grid">
        <table>
          <tbody>
            <tr>
              <td class="td-label">Candidate Name</td>
              <td class="td-val-hl">${record.studentName}</td>
            </tr>
            <tr>
              <td class="td-label">School &amp; Board</td>
              <td class="td-val">${record.schoolName} (${record.board})</td>
            </tr>
            <tr>
              <td class="td-label">Student Mobile</td>
              <td class="td-val" style="font-family:monospace;">+91 ${record.studentMobile}</td>
            </tr>
            <tr>
              <td class="td-label">Parent Mobile</td>
              <td class="td-val" style="font-family:monospace;">+91 ${record.parentMobile}</td>
            </tr>
            <tr>
              <td class="td-label">Date of Exam</td>
              <td class="td-val" style="color:#142850;font-weight:800;">${record.examDate}</td>
            </tr>
            <tr>
              <td class="td-label">Reporting Time</td>
              <td class="td-val" style="color:#b45309;font-weight:800;">10:30 AM (Sharp)</td>
            </tr>
            <tr>
              <td class="td-label">Exam Timing</td>
              <td class="td-val">11:00 AM – 1:00 PM (Duration: 2 Hours)</td>
            </tr>
            <tr>
              <td class="td-label">Exam Venue</td>
              <td class="td-val">Shiksharthi Educational Institute, Kolkata</td>
            </tr>
          </tbody>
        </table>

        <!-- Candidate Photo Box -->
        <div class="photo-box">
          <div class="photo-dashed">
            <span>AFFIX RECENT<br>PASSPORT SIZE<br>PHOTOGRAPH</span>
            <span style="font-size:7.5px;color:#94a3b8;margin-top:4px;">(Self-Attested)</span>
          </div>
          <div class="photo-label">Candidate Photo</div>
        </div>
      </div>

      <!-- Signatures Row -->
      <div class="sign-row">
        <div class="sign-box">
          <div class="sign-space">Sign here during exam</div>
          <span style="font-weight:700;color:#334155;">Candidate's Signature</span>
        </div>
        <div class="sign-box">
          <div class="sign-space"></div>
          <span style="font-weight:700;color:#334155;">Invigilator's Signature</span>
        </div>
        <div class="sign-box" style="background:#f8fafc;">
          <div class="sign-space" style="font-weight:800;color:#047857;text-transform:uppercase;font-size:8.5px;">
            ✓ Authorized &amp; Verified
          </div>
          <span style="font-weight:700;color:#334155;">Controller of Examinations</span>
        </div>
      </div>

      <!-- Exam Instructions -->
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

      <!-- Footer Info -->
      <div class="footer">
        <span>Helpline: <strong>+91 9836269291</strong></span>
        <span>Email: <strong>shiksharthi.edu.institute@gmail.com</strong></span>
        <span>Website: <strong>www.shiksharthi.org</strong></span>
        <span style="font-style:italic;">Valid only for SSAT 2026 Examination</span>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Generates and automatically downloads a crisp, 1-page A4 PDF file of the Admit Card.
 * Works seamlessly on mobile devices (Android Chrome, iOS Safari), tablets, and desktops.
 * Triggers native browser download without requiring a printer.
 */
export async function downloadAdmitCardPDF(record: SSATRegistrationRecord): Promise<void> {
  // Create an off-screen container with standard A4 desktop width (794px ~ A4 at 96 DPI)
  // This guarantees uniform, razor-sharp rendering regardless of device screen width
  const container = document.createElement("div");
  container.id = "ssat-admit-card-pdf-render";
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "-9999px";
  container.style.width = "794px";
  container.style.maxWidth = "794px";
  container.style.minWidth = "794px";
  container.style.background = "#ffffff";
  container.style.color = "#0f172a";
  container.style.zIndex = "-9999";
  container.style.boxSizing = "border-box";
  container.style.padding = "16px";
  container.style.opacity = "1";
  container.style.pointerEvents = "none";

  // Build the clean admit card HTML
  container.innerHTML = `
    <div style="width: 100%; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; line-height: 1.32;">
      <div style="border: 2px solid #0f172a; border-radius: 6px; padding: 14px 18px 12px 18px; background: #ffffff;">
        
        <!-- Header -->
        <div style="border-bottom: 2px solid #0f172a; padding-bottom: 8px; text-align: center;">
          <img src="${SHIKSHARTHI_LOGO_BASE64}" style="height: 54px; max-width: 280px; object-fit: contain; display: block; margin: 0 auto 4px auto;" alt="Logo" />
          <h1 style="font-size: 17px; font-weight: 800; color: #142850; text-transform: uppercase; margin: 0; letter-spacing: 0.5px;">Shiksharthi Educational Institute</h1>
          <p style="font-size: 10px; font-weight: 600; color: #475569; margin: 2px 0 6px 0; text-transform: uppercase; letter-spacing: 0.4px;">Premier Institute for IIT-JEE, NEET &amp; Foundation | Kolkata, West Bengal</p>
          <div style="background-color: #142850; color: #ffffff; padding: 5px 16px; border-radius: 4px; display: inline-block; margin-top: 2px;">
            <div style="font-size: 11.5px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">SHIKSHARTHI SCHOLARSHIP ADMISSION TEST (SSAT 2026)</div>
            <div style="font-size: 9.5px; font-weight: 700; color: #fde047; letter-spacing: 1px; text-transform: uppercase;">★ OFFICIAL PROVISIONAL ADMIT CARD &amp; HALL TICKET ★</div>
          </div>
        </div>

        <!-- Hall Bar -->
        <div style="margin: 8px 0; padding: 6px 12px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
          <div>
            <span style="font-weight:700; color:#64748b; text-transform:uppercase; font-size:10px;">Roll / Admit No: </span>
            <span style="font-family: monospace; font-size: 14px; font-weight: 800; color: #142850; letter-spacing: 1px;">${record.regId}</span>
          </div>
          <div>
            <span>Class: <strong>10 (Science)</strong></span> &nbsp;•&nbsp; <span>Exam Mode: <strong>Offline (OMR)</strong></span>
          </div>
        </div>

        <!-- Details Grid -->
        <div style="display: grid; grid-template-columns: 3.2fr 1fr; gap: 12px; margin: 8px 0;">
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 11px;">
            <tbody>
              <tr>
                <td style="width: 35%; font-weight: 700; color: #64748b; background: #f8fafc; padding: 4.5px 8px; border-bottom: 1px solid #e2e8f0;">Candidate Name</td>
                <td style="color: #142850; font-weight: 800; text-transform: uppercase; font-size: 12.5px; padding: 4.5px 8px; border-bottom: 1px solid #e2e8f0;">${record.studentName}</td>
              </tr>
              <tr>
                <td style="font-weight: 700; color: #64748b; background: #f8fafc; padding: 4.5px 8px; border-bottom: 1px solid #e2e8f0;">School &amp; Board</td>
                <td style="color: #0f172a; font-weight: 600; padding: 4.5px 8px; border-bottom: 1px solid #e2e8f0;">${record.schoolName} (${record.board})</td>
              </tr>
              <tr>
                <td style="font-weight: 700; color: #64748b; background: #f8fafc; padding: 4.5px 8px; border-bottom: 1px solid #e2e8f0;">Student Mobile</td>
                <td style="font-family: monospace; color: #0f172a; font-weight: 600; padding: 4.5px 8px; border-bottom: 1px solid #e2e8f0;">+91 ${record.studentMobile}</td>
              </tr>
              <tr>
                <td style="font-weight: 700; color: #64748b; background: #f8fafc; padding: 4.5px 8px; border-bottom: 1px solid #e2e8f0;">Parent Mobile</td>
                <td style="font-family: monospace; color: #0f172a; font-weight: 600; padding: 4.5px 8px; border-bottom: 1px solid #e2e8f0;">+91 ${record.parentMobile}</td>
              </tr>
              <tr>
                <td style="font-weight: 700; color: #64748b; background: #f8fafc; padding: 4.5px 8px; border-bottom: 1px solid #e2e8f0;">Date of Exam</td>
                <td style="color: #142850; font-weight: 800; padding: 4.5px 8px; border-bottom: 1px solid #e2e8f0;">${record.examDate}</td>
              </tr>
              <tr>
                <td style="font-weight: 700; color: #64748b; background: #f8fafc; padding: 4.5px 8px; border-bottom: 1px solid #e2e8f0;">Reporting Time</td>
                <td style="color: #b45309; font-weight: 800; padding: 4.5px 8px; border-bottom: 1px solid #e2e8f0;">10:30 AM (Sharp)</td>
              </tr>
              <tr>
                <td style="font-weight: 700; color: #64748b; background: #f8fafc; padding: 4.5px 8px; border-bottom: 1px solid #e2e8f0;">Exam Timing</td>
                <td style="color: #0f172a; font-weight: 600; padding: 4.5px 8px; border-bottom: 1px solid #e2e8f0;">11:00 AM – 1:00 PM (Duration: 2 Hours)</td>
              </tr>
              <tr>
                <td style="font-weight: 700; color: #64748b; background: #f8fafc; padding: 4.5px 8px;">Exam Venue</td>
                <td style="color: #0f172a; font-weight: 600; padding: 4.5px 8px;">Shiksharthi Educational Institute, Kolkata</td>
              </tr>
            </tbody>
          </table>

          <!-- Photo -->
          <div style="border: 1px solid #cbd5e1; border-radius: 4px; background: #f8fafc; padding: 6px; display: flex; flex-direction: column; justify-content: space-between; align-items: center; text-align: center;">
            <div style="width: 100%; height: 124px; border: 2px dashed #94a3b8; border-radius: 4px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 8.5px; color: #94a3b8; padding: 4px; line-height: 1.3;">
              <span>AFFIX RECENT<br>PASSPORT SIZE<br>PHOTOGRAPH</span>
              <span style="font-size: 7.5px; color: #94a3b8; margin-top: 4px;">(Self-Attested)</span>
            </div>
            <div style="font-size: 8px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-top: 4px;">Candidate Photo</div>
          </div>
        </div>

        <!-- Signatures -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin: 8px 0; padding-top: 6px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 10px;">
          <div style="border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px;">
            <div style="height: 36px; border-bottom: 1px dashed #cbd5e1; display: flex; align-items: center; justify-content: center; font-size: 8.5px; color: #94a3b8; font-family: monospace;">Sign here during exam</div>
            <span style="font-weight: 700; color: #334155;">Candidate's Signature</span>
          </div>
          <div style="border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px;">
            <div style="height: 36px; border-bottom: 1px dashed #cbd5e1; display: flex; align-items: center; justify-content: center;"></div>
            <span style="font-weight: 700; color: #334155;">Invigilator's Signature</span>
          </div>
          <div style="border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px; background: #f8fafc;">
            <div style="height: 36px; border-bottom: 1px dashed #cbd5e1; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #047857; text-transform: uppercase; font-size: 8.5px;">
              ✓ Authorized &amp; Verified
            </div>
            <span style="font-weight: 700; color: #334155;">Controller of Examinations</span>
          </div>
        </div>

        <!-- Instructions -->
        <div style="border-top: 2px solid #0f172a; padding-top: 6px; margin-top: 6px;">
          <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #142850; margin: 0 0 4px 0; letter-spacing: 0.4px;">Important Instructions for Candidates</div>
          <ol style="margin: 0; padding-left: 14px; font-size: 9.5px; color: #334155; line-height: 1.32;">
            <li style="margin-bottom: 2.5px;"><strong>Mandatory Entry Pass:</strong> Candidate must present this printed Admit Card along with original School ID Card or Aadhaar Card at the venue.</li>
            <li style="margin-bottom: 2.5px;"><strong>Reporting Time:</strong> Report to the exam venue by <strong>10:30 AM</strong>. Entry gates close at 10:55 AM. No candidate permitted after 11:15 AM.</li>
            <li style="margin-bottom: 2.5px;"><strong>Permitted Stationery:</strong> Use only <strong>Blue or Black ballpoint pens</strong>. Rough work sheets will be provided in the hall.</li>
            <li style="margin-bottom: 2.5px;"><strong>Prohibited Items:</strong> Mobile phones, calculators, smartwatches, and electronic gadgets are strictly banned inside the hall.</li>
            <li style="margin-bottom: 2.5px;"><strong>Scholarships:</strong> Top 100 students will receive merit scholarships; Top 10 rankers receive <strong>₹1,00,000 scholarship</strong> awards.</li>
          </ol>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #cbd5e1; margin-top: 8px; padding-top: 6px; display: flex; justify-content: space-between; font-size: 9px; color: #64748b; flex-wrap: wrap; gap: 4px;">
          <span>Helpline: <strong>+91 9836269291</strong></span>
          <span>Email: <strong>shiksharthi.edu.institute@gmail.com</strong></span>
          <span>Website: <strong>www.shiksharthi.org</strong></span>
          <span style="font-style: italic;">Valid only for SSAT 2026 Examination</span>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  try {
    // Wait for any images inside to load
    const images = Array.from(container.querySelectorAll("img"));
    await Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve(true);
            } else {
              img.onload = () => resolve(true);
              img.onerror = () => resolve(true);
            }
          })
      )
    );

    // Capture with high DPI scale (2x) for crisp typography
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.98);

    // Create A4 PDF in portrait mode
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm

    // Maintain aspect ratio, leaving a 6mm margin around
    const targetWidth = pdfWidth - 12; // 198mm
    const targetHeight = (canvas.height * targetWidth) / canvas.width;

    // Ensure it strictly fits on 1 page (max height 285mm)
    let renderWidth = targetWidth;
    let renderHeight = targetHeight;
    if (renderHeight > 282) {
      const scale = 282 / renderHeight;
      renderHeight = 282;
      renderWidth = renderWidth * scale;
    }

    const xOffset = (pdfWidth - renderWidth) / 2;
    const yOffset = 7; // 7mm top margin

    pdf.addImage(imgData, "JPEG", xOffset, yOffset, renderWidth, renderHeight);
    
    // Auto download the PDF file to user device
    pdf.save(`SSAT_2026_Admit_Card_${record.regId}.pdf`);
  } catch (error) {
    console.error("PDF generation failed, falling back to window print:", error);
    printAdmitCardDocument(record);
  } finally {
    container.remove();
  }
}

/**
 * Universal print handler for the SSAT Admit Card.
 * On mobile devices: Automatically triggers the PDF download directly (so users get the 1-page PDF saved on their phone).
 * On desktop: Opens a dedicated clean print window and triggers window.print().
 */
export function printAdmitCardDocument(record: SSATRegistrationRecord): void {
  // Mobile browsers (Chrome Android, iOS Safari) don't have printers hooked up
  // and print dialogs are flaky or blocked. Auto-downloading the PDF is the ideal mobile flow.
  if (isMobileDevice()) {
    downloadAdmitCardPDF(record);
    return;
  }

  // On desktop / laptop, open print window
  const html = buildAdmitCardHTML(record, true);
  const printWindow = window.open("", "_blank", "width=850,height=1100,scrollbars=yes,resizable=yes");

  if (!printWindow) {
    // Popup was blocked by browser - fallback to auto-downloading the PDF
    downloadAdmitCardPDF(record);
    return;
  }

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();

  // Print automatically once loaded
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 300);
  };

  // Fallback in case onload does not fire with document.write
  setTimeout(() => {
    if (printWindow && !printWindow.closed) {
      try {
        printWindow.focus();
        printWindow.print();
      } catch {
        // Ignored
      }
    }
  }, 1200);
}
