// Generates the "Nokulunga's Village" keepsake PDF from submitted content.
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { PROGRAMME, SITE } from "@/lib/site";
import type { KeepsakeData } from "@/lib/types";

// Palette (RGB)
const SAGE: [number, number, number] = [107, 135, 87];
const GOLD: [number, number, number] = [184, 154, 94];
const BARK: [number, number, number] = [74, 63, 48];
const IVORY: [number, number, number] = [251, 248, 241];
const COCOA: [number, number, number] = [122, 102, 80];

const MARGIN = 18;

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

async function fetchImageData(
  url: string
): Promise<{ data: string; format: string } | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    if (!blob.type.startsWith("image/")) return null;
    const format = blob.type.includes("png") ? "PNG" : "JPEG";
    const data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return { data, format };
  } catch {
    return null;
  }
}

export async function generateKeepsakePDF(data: KeepsakeData): Promise<void> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const contentW = pageW - MARGIN * 2;

  // ── Cover page ──────────────────────────────────────────────
  doc.setFillColor(...IVORY);
  doc.rect(0, 0, pageW, pageH, "F");
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.8);
  doc.rect(12, 12, pageW - 24, pageH - 24);

  doc.setTextColor(...GOLD);
  doc.setFont("times", "italic");
  doc.setFontSize(14);
  doc.text("A KEEPSAKE FROM", pageW / 2, 70, { align: "center" });

  doc.setTextColor(...BARK);
  doc.setFont("times", "bold");
  doc.setFontSize(34);
  doc.text("Nokulunga's", pageW / 2, 100, { align: "center" });
  doc.setTextColor(...SAGE);
  doc.text("Village", pageW / 2, 116, { align: "center" });

  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.line(pageW / 2 - 25, 126, pageW / 2 + 25, 126);

  doc.setTextColor(...COCOA);
  doc.setFont("times", "normal");
  doc.setFontSize(13);
  doc.text(SITE.subtitle, pageW / 2, 140, { align: "center" });

  doc.setFontSize(11);
  doc.text(
    `${SITE.date}  ·  ${SITE.venue}  ·  ${SITE.city}`,
    pageW / 2,
    150,
    { align: "center" }
  );

  doc.setFont("times", "italic");
  doc.setFontSize(12);
  doc.setTextColor(...BARK);
  const welcome = doc.splitTextToSize(`"${SITE.welcome}"`, contentW - 30);
  doc.text(welcome, pageW / 2, 180, { align: "center" });

  // ── Section helper ──────────────────────────────────────────
  let y = 0;
  const sectionHeader = (title: string, subtitle?: string) => {
    doc.addPage();
    doc.setFillColor(...IVORY);
    doc.rect(0, 0, pageW, pageH, "F");
    doc.setFillColor(...SAGE);
    doc.rect(0, 0, pageW, 30, "F");
    doc.setTextColor(...IVORY);
    doc.setFont("times", "bold");
    doc.setFontSize(20);
    doc.text(title, MARGIN, 19);
    if (subtitle) {
      doc.setFont("times", "italic");
      doc.setFontSize(10);
      doc.text(subtitle, MARGIN, 25);
    }
    y = 42;
  };

  const ensureSpace = (needed: number) => {
    if (y + needed > pageH - MARGIN) {
      doc.addPage();
      doc.setFillColor(...IVORY);
      doc.rect(0, 0, pageW, pageH, "F");
      y = MARGIN + 4;
    }
  };

  // ── Event Details ───────────────────────────────────────────
  sectionHeader("Event Details", "The celebration at a glance");
  doc.setTextColor(...BARK);
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  const details = [
    ["Celebration", SITE.title],
    ["Theme", SITE.subtitle],
    ["Date", SITE.date],
    ["Venue", SITE.venue],
    ["City", SITE.city],
  ];
  autoTable(doc, {
    startY: y,
    body: details,
    theme: "plain",
    styles: { font: "times", fontSize: 12, textColor: BARK, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: "bold", textColor: SAGE, cellWidth: 45 },
    },
    margin: { left: MARGIN, right: MARGIN },
  });

  // ── Programme ───────────────────────────────────────────────
  sectionHeader("Programme", "The order of the day");
  autoTable(doc, {
    startY: y,
    head: [["Time", "Moment", "Details"]],
    body: PROGRAMME.map((p) => [
      p.time,
      p.title,
      p.details?.join("\n") ?? "",
    ]),
    theme: "striped",
    headStyles: { fillColor: GOLD, textColor: IVORY, font: "times", fontStyle: "bold" },
    styles: { font: "times", fontSize: 10, textColor: BARK, cellPadding: 2.5 },
    alternateRowStyles: { fillColor: [244, 247, 242] },
    columnStyles: { 0: { cellWidth: 18, fontStyle: "bold", textColor: SAGE } },
    margin: { left: MARGIN, right: MARGIN },
  });

  // ── Guestbook ───────────────────────────────────────────────
  sectionHeader("Guestbook Messages", `${data.guestbook.length} signatures`);
  doc.setFontSize(12);
  if (data.guestbook.length === 0) {
    doc.setTextColor(...COCOA);
    doc.setFont("times", "italic");
    doc.text("No entries yet.", MARGIN, y);
  } else {
    for (const entry of data.guestbook) {
      doc.setFont("times", "italic");
      doc.setTextColor(...BARK);
      const lines = doc.splitTextToSize(`"${entry.message}"`, contentW);
      ensureSpace(lines.length * 6 + 12);
      doc.text(lines, MARGIN, y);
      y += lines.length * 6 + 2;
      doc.setFont("times", "bold");
      doc.setTextColor(...GOLD);
      doc.setFontSize(11);
      doc.text(`— ${entry.name}`, MARGIN, y);
      doc.setFontSize(12);
      y += 10;
    }
  }

  // ── Letters To Baby ─────────────────────────────────────────
  sectionHeader("Letters To Baby", `${data.letters.length} letters`);
  if (data.letters.length === 0) {
    doc.setTextColor(...COCOA);
    doc.setFont("times", "italic");
    doc.text("No letters yet.", MARGIN, y);
  } else {
    for (const letter of data.letters) {
      doc.setFont("times", "bold");
      doc.setTextColor(...SAGE);
      doc.setFontSize(13);
      ensureSpace(20);
      doc.text("Dear Little Explorer,", MARGIN, y);
      y += 8;
      doc.setFont("times", "normal");
      doc.setTextColor(...BARK);
      doc.setFontSize(11);
      const body = doc.splitTextToSize(letter.letter, contentW);
      for (const line of body) {
        ensureSpace(7);
        doc.text(line, MARGIN, y);
        y += 6;
      }
      y += 2;
      doc.setFont("times", "italic");
      doc.setTextColor(...GOLD);
      doc.setFontSize(11);
      ensureSpace(10);
      doc.text(`With love, ${letter.name}`, MARGIN, y);
      y += 12;
    }
  }

  // ── Messages To Mommy ───────────────────────────────────────
  sectionHeader("Messages To Mommy", `${data.messages.length} messages`);
  if (data.messages.length === 0) {
    doc.setTextColor(...COCOA);
    doc.setFont("times", "italic");
    doc.text("No messages yet.", MARGIN, y);
  } else {
    for (const msg of data.messages) {
      doc.setFont("times", "italic");
      doc.setTextColor(...BARK);
      doc.setFontSize(12);
      const lines = doc.splitTextToSize(`"${msg.message}"`, contentW);
      ensureSpace(lines.length * 6 + 12);
      doc.text(lines, MARGIN, y);
      y += lines.length * 6 + 2;
      doc.setFont("times", "bold");
      doc.setTextColor(...GOLD);
      doc.setFontSize(11);
      const who = msg.relationship ? `${msg.name} (${msg.relationship})` : msg.name;
      doc.text(`— ${who}`, MARGIN, y);
      y += 10;
    }
  }

  // ── Baby Predictions ────────────────────────────────────────
  sectionHeader("Baby Predictions", `${data.predictions.length} guesses`);
  autoTable(doc, {
    startY: y,
    head: [["Guest", "Arrival", "Weight", "Looks Like", "First Word", "Career"]],
    body: data.predictions.map((p) => [
      p.guest_name,
      formatDate(p.arrival_date),
      p.weight ?? "—",
      p.looks_like ?? "—",
      p.first_word ?? "—",
      p.future_career ?? "—",
    ]),
    theme: "striped",
    headStyles: { fillColor: SAGE, textColor: IVORY, font: "times", fontStyle: "bold", fontSize: 9 },
    styles: { font: "times", fontSize: 9, textColor: BARK, cellPadding: 2 },
    alternateRowStyles: { fillColor: [244, 247, 242] },
    margin: { left: MARGIN, right: MARGIN },
  });

  // ── Event Photos ────────────────────────────────────────────
  if (data.photos.length > 0) {
    sectionHeader("Event Photos", "Captured moments");
    const images = data.photos.filter((p) => p.media_type === "image").slice(0, 12);
    const cols = 2;
    const gap = 6;
    const imgW = (contentW - gap) / cols;
    const imgH = imgW * 0.72;
    let col = 0;

    for (const photo of images) {
      const img = await fetchImageData(photo.public_url);
      if (!img) continue;
      const x = MARGIN + col * (imgW + gap);
      ensureSpace(imgH + 14);
      try {
        doc.addImage(img.data, img.format, x, y, imgW, imgH, undefined, "FAST");
      } catch {
        continue;
      }
      if (photo.caption) {
        doc.setFont("times", "italic");
        doc.setFontSize(8);
        doc.setTextColor(...COCOA);
        doc.text(
          doc.splitTextToSize(photo.caption, imgW),
          x,
          y + imgH + 4
        );
      }
      col++;
      if (col >= cols) {
        col = 0;
        y += imgH + 14;
      }
    }

    const videoCount = data.photos.filter((p) => p.media_type === "video").length;
    if (videoCount > 0) {
      if (col > 0) y += imgH + 14;
      ensureSpace(10);
      doc.setFont("times", "italic");
      doc.setFontSize(10);
      doc.setTextColor(...COCOA);
      doc.text(
        `+ ${videoCount} video memor${videoCount === 1 ? "y" : "ies"} available in the admin panel.`,
        MARGIN,
        y
      );
    }
  }

  // ── Footer page numbers ─────────────────────────────────────
  const pages = doc.getNumberOfPages();
  for (let i = 2; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont("times", "italic");
    doc.setFontSize(8);
    doc.setTextColor(...COCOA);
    doc.text("Nokulunga's Village", MARGIN, pageH - 8);
    doc.text(`${i - 1}`, pageW - MARGIN, pageH - 8, { align: "right" });
  }

  doc.save("Nokulungas-Village.pdf");
}
