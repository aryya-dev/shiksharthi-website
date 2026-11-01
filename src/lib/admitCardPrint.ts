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
 * Helper to render an HTML canvas to an A4 PDF and auto-download it.
 */
function renderCanvasToPDF(canvas: HTMLCanvasElement, regId: string): void {
  const imgData = canvas.toDataURL("image/jpeg", 0.98);

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = 210; // A4 width in mm
  const targetWidth = pdfWidth - 14; // 196mm width (7mm margins)
  const targetHeight = (canvas.height * targetWidth) / canvas.width;

  // Strict 1-page fit
  let renderWidth = targetWidth;
  let renderHeight = targetHeight;
  if (renderHeight > 282) {
    const scale = 282 / renderHeight;
    renderHeight = 282;
    renderWidth = renderWidth * scale;
  }

  const xOffset = (pdfWidth - renderWidth) / 2;
  const yOffset = 7;

  pdf.addImage(imgData, "JPEG", xOffset, yOffset, renderWidth, renderHeight);
  pdf.save(`SSAT_2026_Admit_Card_${regId}.pdf`);
}

/**
 * Generates and automatically downloads a crisp, 1-page A4 PDF file of the Admit Card.
 * Captures the exact on-screen DOM card directly so the downloaded PDF is 100% identical to the browser view.
 */
export async function downloadAdmitCardPDF(record: SSATRegistrationRecord): Promise<void> {
  const existingCard = document.getElementById("ssat-admit-card");

  // 1. If the card is already in the DOM (e.g. on Registration success screen),
  // capture the exact on-screen DOM element directly!
  if (existingCard) {
    const prevWidth = existingCard.style.width;
    const prevMaxWidth = existingCard.style.maxWidth;
    const prevMinWidth = existingCard.style.minWidth;
    const prevShadow = existingCard.style.boxShadow;
    const prevMargin = existingCard.style.margin;

    // Temporarily standardize width to 760px desktop A4 proportion during capture
    existingCard.style.width = "760px";
    existingCard.style.maxWidth = "760px";
    existingCard.style.minWidth = "760px";
    existingCard.style.boxShadow = "none";
    existingCard.style.margin = "0 auto";

    try {
      const canvas = await html2canvas(existingCard, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      renderCanvasToPDF(canvas, record.regId);
      return;
    } catch (err) {
      console.error("DOM capture failed, falling back to off-screen generator:", err);
    } finally {
      existingCard.style.width = prevWidth;
      existingCard.style.maxWidth = prevMaxWidth;
      existingCard.style.minWidth = prevMinWidth;
      existingCard.style.boxShadow = prevShadow;
      existingCard.style.margin = prevMargin;
    }
  }

  // 2. Fallback: For downloads initiated from Admin Page or when #ssat-admit-card is not in DOM.
  // We build the EXACT identical DOM structure with the watermark, SVG icons, and typography.
  const container = document.createElement("div");
  container.id = "ssat-admit-card-pdf-render";
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "-9999px";
  container.style.width = "760px";
  container.style.maxWidth = "760px";
  container.style.minWidth = "760px";
  container.style.background = "#ffffff";
  container.style.color = "#0f172a";
  container.style.zIndex = "-9999";
  container.style.boxSizing = "border-box";
  container.style.padding = "10px";
  container.style.opacity = "1";
  container.style.visibility = "visible";
  container.style.pointerEvents = "none";

  container.innerHTML = buildAdmitCardCardBodyHTML(record);
  document.body.appendChild(container);

  try {
    const images = Array.from(container.querySelectorAll("img"));
    await Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve(true);
            else {
              img.onload = () => resolve(true);
              img.onerror = () => resolve(true);
            }
          })
      )
    );

    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    renderCanvasToPDF(canvas, record.regId);
  } catch (error) {
    console.error("PDF generation failed:", error);
    printAdmitCardDocument(record);
  } finally {
    container.remove();
  }
}

/**
 * Universal print handler for the SSAT Admit Card.
 * On mobile devices: Automatically triggers the PDF download directly.
 * On desktop: Opens a dedicated clean print window and triggers window.print().
 */
export function printAdmitCardDocument(record: SSATRegistrationRecord): void {
  if (isMobileDevice()) {
    downloadAdmitCardPDF(record);
    return;
  }

  const html = buildAdmitCardHTML(record, true);
  const printWindow = window.open("", "_blank", "width=850,height=1100,scrollbars=yes,resizable=yes");

  if (!printWindow) {
    downloadAdmitCardPDF(record);
    return;
  }

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();

  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 300);
  };

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

/**
 * Generates the EXACT identical HTML for the Admit Card, including the watermark,
 * SVG icons, and exact styling matching the on-screen browser display.
 */
function buildAdmitCardCardBodyHTML(record: SSATRegistrationRecord): string {
  const logo = SHIKSHARTHI_LOGO_BASE64;

  return `
    <div style="position: relative; width: 100%; background: #ffffff; color: #0f172a; border: 2px solid #0f172a; border-radius: 8px; padding: 18px 24px; box-sizing: border-box; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      
      <!-- Watermark in Background -->
      <div style="position: absolute; inset: 0; pointer-events: none; display: flex; align-items: center; justify-content: center; opacity: 0.035; user-select: none;">
        <span style="font-size: 110px; font-weight: 900; letter-spacing: 4px; text-transform: uppercase; color: #0f172a; transform: rotate(-45deg); display: block;">
          SSAT 2026
        </span>
      </div>

      <!-- Header Section -->
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 10px; text-align: center; position: relative; z-index: 2;">
        <div style="display: flex; justify-content: center; margin-bottom: 4px;">
          <img src="${logo}" style="height: 54px; max-width: 280px; object-fit: contain; display: block; margin: 0 auto;" alt="Shiksharthi Logo" />
        </div>
        <h1 style="font-size: 18px; font-weight: 800; letter-spacing: -0.2px; color: #142850; text-transform: uppercase; margin: 0;">
          Shiksharthi Educational Institute
        </h1>
        <p style="font-size: 10.5px; font-weight: 600; color: #475569; letter-spacing: 0.3px; margin: 2px 0 6px 0;">
          Premier Institute for IIT-JEE, NEET &amp; Foundation | Kolkata, West Bengal
        </p>

        <!-- Examination Title Ribbon (Identical to Browser Card) -->
        <div style="margin-top: 6px; background: #f8fafc; border: 1.5px solid #142850; padding: 5px 16px; border-radius: 6px; display: inline-block; text-align: center;">
          <span style="font-size: 11.5px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; display: block; color: #142850; line-height: 1.3;">
            SHIKSHARTHI SCHOLARSHIP ADMISSION TEST (SSAT 2026)
          </span>
          <span style="font-size: 9.5px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; display: block; color: #b45309; margin-top: 2px; line-height: 1.2;">
            ★ OFFICIAL HALL TICKET &amp; ADMIT CARD ★
          </span>
        </div>
      </div>

      <!-- Hall Ticket Bar -->
      <div style="margin: 8px 0; padding: 6px 12px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; position: relative; z-index: 2;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b;">Roll / Admit No:</span>
          <span style="font-family: monospace; font-size: 14px; font-weight: 800; color: #142850; letter-spacing: 1px;">
            ${record.regId}
          </span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-size: 10px; color: #64748b;">
          <span>Class: <strong style="color: #1e293b;">10 (Science)</strong></span>
          <span>•</span>
          <span>Category: <strong style="color: #1e293b;">Scholarship Exam</strong></span>
        </div>
      </div>

      <!-- Candidate & Examination Details Grid -->
      <div style="display: grid; grid-template-columns: 3.2fr 1fr; gap: 12px; margin: 8px 0; font-size: 11px; position: relative; z-index: 2;">
        <!-- Left Table -->
        <div style="border: 1px solid #cbd5e1; border-radius: 4px; overflow: hidden;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 11px;">
            <tbody>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="width: 35%; padding: 4px 10px; font-weight: 700; color: #64748b; background: #f8fafc;">Candidate Name</td>
                <td style="padding: 4px 10px; font-weight: 800; color: #142850; text-transform: uppercase; font-size: 12px;">
                  ${record.studentName}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 4px 10px; font-weight: 700; color: #64748b; background: #f8fafc;">School &amp; Board</td>
                <td style="padding: 4px 10px; font-weight: 600; color: #1e293b;">
                  ${record.schoolName} (${record.board})
                </td>
              </tr>
              ${record.streamPreference
      ? `<tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 4px 10px; font-weight: 700; color: #64748b; background: #f8fafc;">Target Stream</td>
                <td style="padding: 4px 10px; font-weight: 700; color: #142850;">
                  ${record.streamPreference}
                </td>
              </tr>`
      : ""
    }
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 4px 10px; font-weight: 700; color: #64748b; background: #f8fafc;">Student Mobile</td>
                <td style="padding: 4px 10px; font-family: monospace; font-weight: 600; color: #1e293b;">
                  +91 ${record.studentMobile}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 4px 10px; font-weight: 700; color: #64748b; background: #f8fafc;">Parent Mobile</td>
                <td style="padding: 4px 10px; font-family: monospace; font-weight: 600; color: #1e293b;">
                  +91 ${record.parentMobile}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 4px 10px; font-weight: 700; color: #64748b; background: #f8fafc;">Date of Examination</td>
                <td style="padding: 4px 10px; font-weight: 800; color: #142850;">
                  ${record.examDate}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 4px 10px; font-weight: 700; color: #64748b; background: #f8fafc;">Reporting Time</td>
                <td style="padding: 4px 10px; font-weight: 800; color: #b45309;">
                  3:30 PM (Sharp)
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 4px 10px; font-weight: 700; color: #64748b; background: #f8fafc;">Examination Timing</td>
                <td style="padding: 4px 10px; font-weight: 600; color: #1e293b;">
                  3:45 PM - 5:45 PM
                </td>
              </tr>
              <tr>
                <td style="padding: 4px 10px; font-weight: 700; color: #64748b; background: #f8fafc;">Examination Venue</td>
                <td style="padding: 4px 10px; font-weight: 600; color: #1e293b;">
                  Shiksharthi Educational Institute, Kolkata
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Right Photo Box (With User SVG Outline) -->
        <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px; display: flex; flex-direction: column; justify-content: space-between; align-items: center; text-align: center; background: #f8fafc;">
          <div style="width: 100%; height: 122px; border: 2px dashed #94a3b8; border-radius: 4px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4px; box-sizing: border-box;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.35; margin-bottom: 4px;"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span style="font-size: 8.5px; color: #64748b; line-height: 1.25; display: block;">AFFIX RECENT<br>PASSPORT SIZE<br>PHOTOGRAPH</span>
            <span style="font-size: 7.5px; color: #94a3b8; margin-top: 3px; display: block;">(Self-Attested)</span>
          </div>
          <div style="font-size: 8px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-top: 4px;">
            Candidate Photo
          </div>
        </div>
      </div>

      <!-- Signatures Row (With ShieldCheck SVG) -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin: 8px 0; padding-top: 6px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 10px; position: relative; z-index: 2;">
        <div style="border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px;">
          <div style="height: 36px; display: flex; align-items: flex-end; justify-content: center; border-bottom: 1px dashed #cbd5e1; padding-bottom: 2px;">
            <span style="font-family: monospace; font-size: 8.5px; color: #94a3b8;">Sign here during exam</span>
          </div>
          <span style="font-weight: 600; color: #334155; display: block; margin-top: 4px;">Candidate's Signature</span>
        </div>
        <div style="border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px;">
          <div style="height: 36px; display: flex; align-items: flex-end; justify-content: center; border-bottom: 1px dashed #cbd5e1; padding-bottom: 2px;"></div>
          <span style="font-weight: 600; color: #334155; display: block; margin-top: 4px;">Invigilator's Signature</span>
        </div>
        <div style="border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px; background: #f8fafc;">
          <div style="height: 36px; display: flex; align-items: center; justify-content: center; border-bottom: 1px dashed #cbd5e1; padding-bottom: 2px; gap: 4px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#047857" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
            <span style="font-size: 8.5px; font-weight: 800; color: #047857; text-transform: uppercase; letter-spacing: 0.5px;">Verified &amp; Authorized</span>
          </div>
          <span style="font-weight: 600; color: #334155; display: block; margin-top: 4px;">Controller of Examinations</span>
        </div>
      </div>

      <!-- Examination Instructions Section -->
      <div style="border-top: 2px solid #0f172a; padding-top: 6px; margin-top: 6px; position: relative; z-index: 2;">
        <h4 style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.4px; color: #142850; margin: 0 0 4px 0;">
          Important Instructions for Candidates
        </h4>
        <ol style="margin: 0; padding-left: 14px; font-size: 9.5px; color: #334155; line-height: 1.32;">
          <li style="margin-bottom: 2px;">
            <strong>Mandatory Entry Pass:</strong> Candidates must bring this printed Admit Card along with their original School Identity Card or Aadhaar Card.
          </li>
          <li style="margin-bottom: 2px;">
            <strong>Reporting Time:</strong> Report to the examination venue by <strong>3:30 PM</strong>. Entry gates close strictly at 3:45 PM. No late entry permitted.
          </li>
          <li style="margin-bottom: 2px;">
            <strong>Permitted Stationery:</strong> Use only <strong>Blue or Black ballpoint pens</strong>. Rough sheets will be provided in the examination hall.
          </li>
          <li style="margin-bottom: 2px;">
            <strong>Prohibited Items:</strong> Mobile phones, smartwatches, calculators, and electronic gadgets are strictly banned inside the hall.
          </li>
          <li style="margin-bottom: 2px;">
            <strong>Scholarships:</strong> Top 100 students receive scholarship opportunities; top 10 receive <strong>₹1,00,000 scholarship</strong> awards.
          </li>
        </ol>
      </div>

      <!-- Footer Helpline -->
      <div style="margin-top: 8px; padding-top: 5px; border-top: 1px solid #cbd5e1; text-align: center; font-size: 9px; color: #64748b; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 4px; position: relative; z-index: 2;">
        <span>Helpline: <strong style="color: #334155;">+91 9836269291</strong></span>
        <span>Email: <strong style="color: #334155;">shiksharthi.edu.institute@gmail.com</strong></span>
        <span>Website: <strong style="color: #334155;">www.shiksharthi.org</strong></span>
        <span style="font-style: italic; color: #94a3b8;">Valid only for SSAT 2026 Examination</span>
      </div>
    </div>
  `;
}

/**
 * Builds the standalone page for popup printing.
 */
export function buildAdmitCardHTML(record: SSATRegistrationRecord, isStandaloneWindow = false): string {
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
    }
    .btn-primary { background: #142850; color: #ffffff; }
    .btn-secondary { background: #e2e8f0; color: #1e293b; }
    @media print {
      .print-controls { display: none !important; }
    }
    .card-wrap {
      width: 100%;
      max-width: 760px;
      margin: ${isStandaloneWindow ? "14px auto" : "0 auto"};
      background: #ffffff;
    }
  </style>
</head>
<body>
  ${isStandaloneWindow
      ? `<div class="print-controls">
           <button class="btn btn-primary" onclick="window.print()">🖨️ Print Admit Card</button>
           <button class="btn btn-secondary" onclick="window.close()">✕ Close</button>
         </div>`
      : ""
    }
  <div class="card-wrap">
    ${buildAdmitCardCardBodyHTML(record)}
  </div>
</body>
</html>`;
}
