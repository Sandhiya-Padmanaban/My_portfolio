import { jsPDF } from 'jspdf';
import { 
  PERSONAL_INFO, 
  EDUCATION_LIST, 
  INTERNSHIPS_LIST, 
  SKILL_CATEGORIES, 
  PROJECTS_LIST, 
  ACHIEVEMENTS_LIST, 
  CERTIFICATIONS_LIST 
} from '../data';

export type ResumeTheme = 'navy' | 'classic' | 'emerald' | 'burgundy';
export type ResumeLayout = 'executive' | 'classic' | 'tech-split';

interface ThemeColorPalette {
  primary: [number, number, number];
  secondary: [number, number, number];
  darkText: [number, number, number];
  bodyText: [number, number, number];
  mutedText: [number, number, number];
  lineRule: [number, number, number];
  badgeBg: [number, number, number];
  badgeText: [number, number, number];
  badgeBorder: [number, number, number];
  lightSidebarBg: [number, number, number];
}

function getThemePalette(theme: ResumeTheme): ThemeColorPalette {
  switch (theme) {
    case 'classic':
      return {
        primary: [24, 24, 27], // Zinc 900
        secondary: [63, 63, 70], // Zinc 700
        darkText: [24, 24, 27],
        bodyText: [51, 51, 51],
        mutedText: [113, 113, 122],
        lineRule: [212, 212, 216],
        badgeBg: [244, 244, 245],
        badgeText: [39, 39, 42],
        badgeBorder: [212, 212, 216],
        lightSidebarBg: [248, 249, 250],
      };
    case 'emerald':
      return {
        primary: [6, 78, 59], // Emerald 900 #064e3b
        secondary: [16, 185, 129], // Emerald 500 #10b981
        darkText: [15, 23, 42], // Slate 900
        bodyText: [51, 65, 85], // Slate 700
        mutedText: [100, 116, 139], // Slate 500
        lineRule: [167, 243, 208], // Emerald 200
        badgeBg: [236, 253, 245], // Emerald 50
        badgeText: [6, 95, 70], // Emerald 800
        badgeBorder: [167, 243, 208],
        lightSidebarBg: [240, 253, 244],
      };
    case 'burgundy':
      return {
        primary: [136, 19, 55], // Rose 900
        secondary: [190, 18, 60], // Rose 700
        darkText: [15, 23, 42],
        bodyText: [51, 65, 85],
        mutedText: [100, 116, 139],
        lineRule: [254, 205, 211],
        badgeBg: [255, 241, 242],
        badgeText: [159, 18, 57],
        badgeBorder: [254, 205, 211],
        lightSidebarBg: [255, 245, 245],
      };
    case 'navy':
    default:
      return {
        primary: [4, 40, 50], // Deep Ocean Teal #042832
        secondary: [13, 148, 136], // Teal 600 #0d9488
        darkText: [15, 23, 42], // Slate 900
        bodyText: [51, 65, 85], // Slate 700
        mutedText: [100, 116, 139], // Slate 500
        lineRule: [153, 246, 228], // Teal 200 #99f6e4
        badgeBg: [240, 253, 250], // Teal 50 #f0fdfa
        badgeText: [17, 94, 89], // Teal 800 #115e59
        badgeBorder: [153, 246, 228], // Teal 200
        lightSidebarBg: [240, 253, 250], // Teal 50 light tint
      };
  }
}

/**
 * Generates an executive, single-page vector PDF that comprehensively covers
 * the FULL A4 page (210mm x 297mm) with balanced typography, full details,
 * and high typographic clarity.
 */
export function generateStructuredResumePdf(
  theme: ResumeTheme = 'navy',
  layout: ResumeLayout = 'executive'
): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const palette = getThemePalette(theme);

  if (layout === 'classic') {
    renderClassicIvyLayout(doc, pageWidth, pageHeight, palette);
  } else if (layout === 'tech-split') {
    renderTechSplitLayout(doc, pageWidth, pageHeight, palette);
  } else {
    renderExecutiveLayout(doc, pageWidth, pageHeight, palette, theme);
  }

  return doc;
}

// ============================================================================
// LAYOUT 1: EXECUTIVE MODERN (Top Banner + 2-Column Balanced Modular Sections)
// ============================================================================
function renderExecutiveLayout(
  doc: jsPDF, 
  pageWidth: number, 
  pageHeight: number, 
  p: ThemeColorPalette,
  theme: ResumeTheme
) {
  const margin = 11;
  const contentWidth = pageWidth - margin * 2; // 188mm
  let y = margin;

  // Header Banner
  const bannerHeight = 28;
  doc.setFillColor(p.primary[0], p.primary[1], p.primary[2]);
  doc.roundedRect(margin, y, contentWidth, bannerHeight, 1.5, 1.5, 'F');

  // Candidate Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(PERSONAL_INFO.name.toUpperCase(), margin + 6, y + 8.5);

  // Subtitle / Degree
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(191, 219, 254);
  if (theme === 'classic') doc.setTextColor(228, 228, 231);
  if (theme === 'emerald') doc.setTextColor(167, 243, 208);
  if (theme === 'burgundy') doc.setTextColor(254, 205, 211);
  doc.text('MASTER OF COMPUTER APPLICATIONS (MCA) • FULL-STACK & ANALYTICS', margin + 6, y + 14.5);

  // Subtitle tagline
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(226, 232, 240);
  doc.text('Bridging Software Engineering, Relational Database Architecture & IoT Computing', margin + 6, y + 19.5);

  // Contact Info on Right Side
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text(`${PERSONAL_INFO.location}`, pageWidth - margin - 6, y + 7.5, { align: 'right' });
  doc.text(`Phone: +91 ${PERSONAL_INFO.phone}`, pageWidth - margin - 6, y + 12.5, { align: 'right' });
  doc.setFont('helvetica', 'bold');
  doc.text(`${PERSONAL_INFO.email}`, pageWidth - margin - 6, y + 17.5, { align: 'right' });

  // Divider Line inside Banner
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.2);
  doc.line(margin + 6, y + 22, pageWidth - margin - 6, y + 22);

  // Links row inside banner
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(241, 245, 249);
  doc.text('LinkedIn: linkedin.com/in/sandhiya-padmanaban', margin + 6, y + 26);
  doc.text('GitHub: github.com/Sandhiya-Padmanaban', pageWidth - margin - 6, y + 26, { align: 'right' });

  y += bannerHeight + 5;

  const drawSectionHeader = (title: string, startX: number, width: number) => {
    doc.setFillColor(p.secondary[0], p.secondary[1], p.secondary[2]);
    doc.rect(startX, y, 3, 5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(p.primary[0], p.primary[1], p.primary[2]);
    doc.text(title.toUpperCase(), startX + 5, y + 4);

    const textW = doc.getTextWidth(title.toUpperCase());
    doc.setDrawColor(p.lineRule[0], p.lineRule[1], p.lineRule[2]);
    doc.setLineWidth(0.4);
    doc.line(startX + 5 + textW + 3, y + 3.6, startX + width, y + 3.6);

    y += 7.5;
  };

  // Professional Summary
  drawSectionHeader('Professional Summary', margin, contentWidth);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.4);
  doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);

  const summaryText = 
    "Master of Computer Applications (MCA) postgraduate with exceptional academic distinction (8.50 MCA CGPA / 8.78 BCA CGPA) and comprehensive industry experience spanning four internships across Data Analytics, Sensor Technology & IoT Systems, UI/UX Engineering, and Python Backend Development. Recipient of the prestigious Best Paper Award at the International AI Conference for computing research. Proven capability in relational database schema design, end-to-end web architectures, and analytical reporting. Seeking software engineering and analytics roles to build scalable, high-performance systems.";
  
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 3.8 + 4;

  // Education & Skills
  const colGap = 6;
  const colWidth = (contentWidth - colGap) / 2;
  const twoColTopY = y;

  drawSectionHeader('Education & Credentials', margin, colWidth);
  EDUCATION_LIST.forEach((edu) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
    doc.text(edu.degree, margin, y);

    doc.setFillColor(p.badgeBg[0], p.badgeBg[1], p.badgeBg[2]);
    doc.setDrawColor(p.badgeBorder[0], p.badgeBorder[1], p.badgeBorder[2]);
    doc.setLineWidth(0.25);
    const scoreText = edu.score;
    const scoreWidth = doc.getTextWidth(scoreText) + 5;
    const badgeX = margin + colWidth - scoreWidth;
    doc.roundedRect(badgeX, y - 3, scoreWidth, 4.2, 1, 1, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(p.badgeText[0], p.badgeText[1], p.badgeText[2]);
    doc.text(scoreText, badgeX + 2.5, y - 0.2);

    y += 4.2;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);
    doc.text(edu.institution, margin, y);
    y += 3.8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
    doc.text(`${edu.location}  •  ${edu.duration}`, margin, y);
    y += 4.8;
  });

  const eduColBottomY = y;

  y = twoColTopY;
  const rightColX = margin + colWidth + colGap;
  drawSectionHeader('Core Technical Skills', rightColX, colWidth);

  SKILL_CATEGORIES.forEach((cat) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(p.primary[0], p.primary[1], p.primary[2]);
    const catLabel = `${cat.category}: `;
    doc.text(catLabel, rightColX, y);

    const labelW = doc.getTextWidth(catLabel);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);

    const skillList = cat.skills.map(s => s.name).join(', ');
    const skillLines = doc.splitTextToSize(skillList, colWidth - labelW);
    doc.text(skillLines[0], rightColX + labelW, y);
    if (skillLines.length > 1) {
      for (let i = 1; i < skillLines.length; i++) {
        y += 3.4;
        doc.text(skillLines[i], rightColX + labelW, y);
      }
    }
    y += 4.2;
  });

  y = Math.max(eduColBottomY, y) + 3;

  // Internships
  drawSectionHeader('Industry Internship Experience', margin, contentWidth);
  INTERNSHIPS_LIST.forEach((intern) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
    const roleText = `${intern.domain} Intern`;
    doc.text(roleText, margin, y);

    const roleW = doc.getTextWidth(roleText);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
    doc.text(` — ${intern.company}`, margin + roleW, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(p.secondary[0], p.secondary[1], p.secondary[2]);
    doc.text(`${intern.duration}  |  ${intern.location}`, pageWidth - margin, y, { align: 'right' });
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);
    const descLines = doc.splitTextToSize(`• ${intern.description}`, contentWidth);
    doc.text(descLines, margin, y);
    y += descLines.length * 3.4 + 0.5;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.4);
    doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
    doc.text(`  Key Stack & Tools: ${intern.techStack.join('  •  ')}`, margin, y);
    y += 4.6;
  });

  y += 1.5;

  // Projects & Honors
  const bottomTwoColY = y;
  drawSectionHeader('Key Software Projects', margin, colWidth);
  PROJECTS_LIST.forEach((proj) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
    doc.text(proj.title, margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(p.secondary[0], p.secondary[1], p.secondary[2]);
    doc.text(proj.techTags.slice(0, 3).join(', '), margin + colWidth, y, { align: 'right' });
    y += 3.8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);
    const projDesc = doc.splitTextToSize(`• ${proj.description}`, colWidth);
    doc.text(projDesc, margin, y);
    y += projDesc.length * 3.2 + 0.8;

    if (proj.details && proj.details.length > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.4);
      doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
      const detLine = doc.splitTextToSize(`- ${proj.details[0]}`, colWidth - 2);
      doc.text(detLine, margin + 2, y);
      y += detLine.length * 3.0;
    }
    y += 3;
  });

  const projColBottomY = y;

  y = bottomTwoColY;
  drawSectionHeader('Research Honors & Certifications', rightColX, colWidth);

  ACHIEVEMENTS_LIST.slice(0, 3).forEach((ach) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
    doc.text(`★ ${ach.title}`, rightColX, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.4);
    doc.setTextColor(p.secondary[0], p.secondary[1], p.secondary[2]);
    doc.text(ach.date, pageWidth - margin, y, { align: 'right' });
    y += 3.6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.4);
    doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
    const orgLines = doc.splitTextToSize(`  ${ach.organization}`, colWidth - 4);
    doc.text(orgLines, rightColX, y);
    y += orgLines.length * 3.0 + 1.2;
  });

  CERTIFICATIONS_LIST.slice(0, 2).forEach((cert) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
    doc.text(`✓ ${cert.title}`, rightColX, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.4);
    doc.setTextColor(p.secondary[0], p.secondary[1], p.secondary[2]);
    doc.text(cert.date, pageWidth - margin, y, { align: 'right' });
    y += 3.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.4);
    doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
    doc.text(`  ${cert.organization}`, rightColX, y);
    y += 4;
  });

  const honorsColBottomY = y;
  y = Math.max(projColBottomY, honorsColBottomY) + 2;

  // Leadership & Strengths
  if (y < pageHeight - 22) {
    drawSectionHeader('Leadership & Key Attributes', margin, contentWidth);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);

    const attribText = 
      "• Student Council Member (Seethalakshmi Ramaswami College)  •  Awarded Certificate of Appreciation for Student Leadership  •  Strong Competencies in Algorithm Design, Agile Teamwork, Technical Research Writing & Public Speaking";
    const attribLines = doc.splitTextToSize(attribText, contentWidth);
    doc.text(attribLines, margin, y);
    y += attribLines.length * 3.2;
  }

  // Bottom Footer Bar
  doc.setDrawColor(p.lineRule[0], p.lineRule[1], p.lineRule[2]);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 9, pageWidth - margin, pageHeight - 9);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(p.primary[0], p.primary[1], p.primary[2]);
  doc.text(`SANDHIYA P  •  MCA CANDIDATE`, margin, pageHeight - 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
  doc.text(
    `Trichy, Tamil Nadu  •  +91 ${PERSONAL_INFO.phone}  •  ${PERSONAL_INFO.email}`,
    pageWidth / 2,
    pageHeight - 5,
    { align: 'center' }
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(p.secondary[0], p.secondary[1], p.secondary[2]);
  doc.text(`Page 1 of 1 (Executive Format)`, pageWidth - margin, pageHeight - 5, { align: 'right' });
}

// ============================================================================
// LAYOUT 2: CLASSIC IVY / ATS MINIMALIST (Clean White, Refined Lines, Academic)
// ============================================================================
function renderClassicIvyLayout(
  doc: jsPDF, 
  pageWidth: number, 
  pageHeight: number, 
  p: ThemeColorPalette
) {
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm
  let y = margin;

  // Centered Header
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
  doc.text(PERSONAL_INFO.name.toUpperCase(), pageWidth / 2, y + 6, { align: 'center' });
  y += 11;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.8);
  doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);
  doc.text(
    `Trichy, Tamil Nadu  •  +91 ${PERSONAL_INFO.phone}  •  ${PERSONAL_INFO.email}  •  linkedin.com/in/sandhiya-padmanaban`,
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 4.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.4);
  doc.setTextColor(p.secondary[0], p.secondary[1], p.secondary[2]);
  doc.text('Master of Computer Applications (MCA)  •  Software Engineering & Data Analytics', pageWidth / 2, y, { align: 'center' });
  y += 4;

  // Top Rule
  doc.setDrawColor(p.primary[0], p.primary[1], p.primary[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5.5;

  const drawClassicHeader = (title: string) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(p.primary[0], p.primary[1], p.primary[2]);
    doc.text(title.toUpperCase(), margin, y);

    y += 1.8;
    doc.setDrawColor(p.lineRule[0], p.lineRule[1], p.lineRule[2]);
    doc.setLineWidth(0.35);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4.2;
  };

  // 1. Education
  drawClassicHeader('Education');
  EDUCATION_LIST.forEach((edu) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(9.2);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
    doc.text(edu.institution, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
    doc.text(`${edu.location} | ${edu.duration}`, pageWidth - margin, y, { align: 'right' });
    y += 3.8;

    doc.setFont('times', 'italic');
    doc.setFontSize(8.6);
    doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);
    doc.text(edu.degree, margin + 2, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(p.primary[0], p.primary[1], p.primary[2]);
    doc.text(`CGPA: ${edu.score}`, pageWidth - margin, y, { align: 'right' });
    y += 4.5;
  });
  y += 1;

  // 2. Technical Skills
  drawClassicHeader('Technical Skills');
  SKILL_CATEGORIES.forEach((cat) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
    const label = `•  ${cat.category}: `;
    doc.text(label, margin, y);

    const labelW = doc.getTextWidth(label);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);
    const list = cat.skills.map(s => s.name).join(', ');
    doc.text(list, margin + labelW, y);
    y += 3.8;
  });
  y += 1.5;

  // 3. Experience / Internships
  drawClassicHeader('Professional Internship Experience');
  INTERNSHIPS_LIST.forEach((intern) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(9.2);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
    doc.text(`${intern.company} — ${intern.domain} Intern`, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
    doc.text(`${intern.duration} | ${intern.location}`, pageWidth - margin, y, { align: 'right' });
    y += 3.8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);
    const descLines = doc.splitTextToSize(`• ${intern.description}`, contentWidth - 4);
    doc.text(descLines, margin + 3, y);
    y += descLines.length * 3.4;

    doc.setFont('times', 'italic');
    doc.setFontSize(7.8);
    doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
    doc.text(`  Tools: ${intern.techStack.join(', ')}`, margin + 3, y);
    y += 4.5;
  });
  y += 1;

  // 4. Projects
  drawClassicHeader('Software Engineering Projects');
  PROJECTS_LIST.forEach((proj) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
    doc.text(proj.title, margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(p.secondary[0], p.secondary[1], p.secondary[2]);
    doc.text(`[ ${proj.techTags.join(', ')} ]`, pageWidth - margin, y, { align: 'right' });
    y += 3.6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);
    const pLines = doc.splitTextToSize(`• ${proj.description}`, contentWidth - 4);
    doc.text(pLines, margin + 3, y);
    y += pLines.length * 3.3 + 0.5;

    if (proj.details.length > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
      const det = doc.splitTextToSize(`- ${proj.details[0]}`, contentWidth - 8);
      doc.text(det, margin + 6, y);
      y += det.length * 3.0;
    }
    y += 2.5;
  });
  y += 1;

  // 5. Honors & Certifications
  drawClassicHeader('Honors, Research & Certifications');
  ACHIEVEMENTS_LIST.slice(0, 2).forEach((ach) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
    doc.text(`• ${ach.title}`, margin + 2, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
    doc.text(ach.date, pageWidth - margin, y, { align: 'right' });
    y += 3.2;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.6);
    doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);
    doc.text(`  ${ach.organization}`, margin + 5, y);
    y += 3.6;
  });

  CERTIFICATIONS_LIST.slice(0, 2).forEach((cert) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
    doc.text(`• ${cert.title}`, margin + 2, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
    doc.text(cert.date, pageWidth - margin, y, { align: 'right' });
    y += 3.2;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.6);
    doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);
    doc.text(`  ${cert.organization}`, margin + 5, y);
    y += 3.6;
  });
}

// ============================================================================
// LAYOUT 3: TECH SPLIT (Left Sidebar 32% + Right Main 68%)
// ============================================================================
function renderTechSplitLayout(
  doc: jsPDF, 
  pageWidth: number, 
  pageHeight: number, 
  p: ThemeColorPalette
) {
  const sidebarWidth = 62; // mm
  const margin = 10;
  const mainX = sidebarWidth + margin;
  const mainWidth = pageWidth - mainX - margin; // ~128mm

  // Fill Left Sidebar Background
  doc.setFillColor(p.lightSidebarBg[0], p.lightSidebarBg[1], p.lightSidebarBg[2]);
  doc.rect(0, 0, sidebarWidth, pageHeight, 'F');

  // Sidebar Vertical Divider
  doc.setDrawColor(p.lineRule[0], p.lineRule[1], p.lineRule[2]);
  doc.setLineWidth(0.3);
  doc.line(sidebarWidth, 0, sidebarWidth, pageHeight);

  // --- LEFT SIDEBAR CONTENT ---
  let sy = 12;

  // Sidebar Name & Degree
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(p.primary[0], p.primary[1], p.primary[2]);
  doc.text(PERSONAL_INFO.name.toUpperCase(), margin, sy);
  sy += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(p.secondary[0], p.secondary[1], p.secondary[2]);
  doc.text('MCA POSTGRADUATE', margin, sy);
  sy += 7;

  const drawSidebarHeader = (title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(p.primary[0], p.primary[1], p.primary[2]);
    doc.text(title.toUpperCase(), margin, sy);

    sy += 1.6;
    doc.setDrawColor(p.secondary[0], p.secondary[1], p.secondary[2]);
    doc.setLineWidth(0.4);
    doc.line(margin, sy, sidebarWidth - margin, sy);
    sy += 4.2;
  };

  // Contact Info
  drawSidebarHeader('Contact');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.4);
  doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);

  doc.text(`Location:`, margin, sy); sy += 3.2;
  doc.setFont('helvetica', 'bold');
  doc.text(PERSONAL_INFO.location, margin, sy); sy += 4;

  doc.setFont('helvetica', 'normal');
  doc.text(`Phone:`, margin, sy); sy += 3.2;
  doc.setFont('helvetica', 'bold');
  doc.text(`+91 ${PERSONAL_INFO.phone}`, margin, sy); sy += 4;

  doc.setFont('helvetica', 'normal');
  doc.text(`Email:`, margin, sy); sy += 3.2;
  doc.setFont('helvetica', 'bold');
  const emailLines = doc.splitTextToSize(PERSONAL_INFO.email, sidebarWidth - margin * 2);
  doc.text(emailLines, margin, sy); sy += emailLines.length * 3.2 + 2;

  doc.setFont('helvetica', 'normal');
  doc.text(`GitHub:`, margin, sy); sy += 3.2;
  doc.setFont('helvetica', 'bold');
  doc.text('Sandhiya-Padmanaban', margin, sy); sy += 4;

  doc.setFont('helvetica', 'normal');
  doc.text(`LinkedIn:`, margin, sy); sy += 3.2;
  doc.setFont('helvetica', 'bold');
  doc.text('sandhiya-padmanaban', margin, sy); sy += 6;

  // Education
  drawSidebarHeader('Education');
  EDUCATION_LIST.forEach((edu) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
    const degLines = doc.splitTextToSize(edu.degree, sidebarWidth - margin * 2);
    doc.text(degLines, margin, sy);
    sy += degLines.length * 3.2;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.6);
    doc.setTextColor(p.secondary[0], p.secondary[1], p.secondary[2]);
    doc.text(`Score: ${edu.score}`, margin, sy);
    sy += 3.4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);
    const instLines = doc.splitTextToSize(edu.institution, sidebarWidth - margin * 2);
    doc.text(instLines, margin, sy);
    sy += instLines.length * 3.0;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
    doc.text(edu.duration, margin, sy);
    sy += 4.5;
  });

  // Skills
  drawSidebarHeader('Technical Skills');
  SKILL_CATEGORIES.forEach((cat) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.6);
    doc.setTextColor(p.primary[0], p.primary[1], p.primary[2]);
    doc.text(cat.category, margin, sy);
    sy += 3.2;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
    const sList = cat.skills.map(s => s.name).join(', ');
    const sLines = doc.splitTextToSize(sList, sidebarWidth - margin * 2);
    doc.text(sLines, margin, sy);
    sy += sLines.length * 3.0 + 1.5;
  });

  // Certifications
  drawSidebarHeader('Certifications');
  CERTIFICATIONS_LIST.slice(0, 3).forEach((cert) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
    const cLines = doc.splitTextToSize(`• ${cert.title}`, sidebarWidth - margin * 2);
    doc.text(cLines, margin, sy);
    sy += cLines.length * 3.0;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
    doc.text(`  ${cert.organization}`, margin, sy);
    sy += 3.4;
  });

  // --- RIGHT MAIN CONTENT ---
  let my = 12;

  const drawMainHeader = (title: string) => {
    doc.setFillColor(p.primary[0], p.primary[1], p.primary[2]);
    doc.rect(mainX, my, 2.5, 4.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(p.primary[0], p.primary[1], p.primary[2]);
    doc.text(title.toUpperCase(), mainX + 4.5, my + 3.6);

    const textW = doc.getTextWidth(title.toUpperCase());
    doc.setDrawColor(p.lineRule[0], p.lineRule[1], p.lineRule[2]);
    doc.setLineWidth(0.4);
    doc.line(mainX + 4.5 + textW + 3, my + 3.2, pageWidth - margin, my + 3.2);

    my += 7.2;
  };

  // Professional Summary
  drawMainHeader('Executive Profile');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);
  const sumText = 
    "Master of Computer Applications (MCA) postgraduate with exceptional academic distinction (8.50 MCA CGPA / 8.78 BCA CGPA) and comprehensive industry experience across four internships spanning Data Analytics, Sensor Technology & IoT Systems, UI/UX Engineering, and Python Backend Development. Recipient of the prestigious Best Paper Award at the International AI Conference for computing research. Proven capability in relational database schema design, end-to-end web architectures, and analytical reporting.";
  const sumLines = doc.splitTextToSize(sumText, mainWidth);
  doc.text(sumLines, mainX, my);
  my += sumLines.length * 3.6 + 3.5;

  // Internship Experience
  drawMainHeader('Industry Internship Experience');
  INTERNSHIPS_LIST.forEach((intern) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
    doc.text(`${intern.domain} Intern`, mainX, my);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.6);
    doc.setTextColor(p.secondary[0], p.secondary[1], p.secondary[2]);
    doc.text(`${intern.duration}`, pageWidth - margin, my, { align: 'right' });
    my += 3.8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
    doc.text(`${intern.company} • ${intern.location}`, mainX, my);
    my += 3.6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);
    const dLines = doc.splitTextToSize(`• ${intern.description}`, mainWidth);
    doc.text(dLines, mainX, my);
    my += dLines.length * 3.2;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.2);
    doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
    doc.text(`  Stack: ${intern.techStack.join(' • ')}`, mainX, my);
    my += 4.5;
  });
  my += 1;

  // Projects
  drawMainHeader('Key Software Projects');
  PROJECTS_LIST.forEach((proj) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
    doc.text(proj.title, mainX, my);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(p.secondary[0], p.secondary[1], p.secondary[2]);
    doc.text(proj.techTags.slice(0, 3).join(', '), pageWidth - margin, my, { align: 'right' });
    my += 3.6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);
    const pLines = doc.splitTextToSize(`• ${proj.description}`, mainWidth);
    doc.text(pLines, mainX, my);
    my += pLines.length * 3.2 + 0.5;

    if (proj.details.length > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.4);
      doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
      const det = doc.splitTextToSize(`- ${proj.details[0]}`, mainWidth - 4);
      doc.text(det, mainX + 2, my);
      my += det.length * 3.0;
    }
    my += 3.2;
  });
  my += 1;

  // Honors
  drawMainHeader('Honors & Research Publications');
  ACHIEVEMENTS_LIST.slice(0, 3).forEach((ach) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(p.darkText[0], p.darkText[1], p.darkText[2]);
    doc.text(`★ ${ach.title}`, mainX, my);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.4);
    doc.setTextColor(p.mutedText[0], p.mutedText[1], p.mutedText[2]);
    doc.text(ach.date, pageWidth - margin, my, { align: 'right' });
    my += 3.4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.4);
    doc.setTextColor(p.bodyText[0], p.bodyText[1], p.bodyText[2]);
    const org = doc.splitTextToSize(`  ${ach.organization}`, mainWidth - 4);
    doc.text(org, mainX, my);
    my += org.length * 3.0 + 1.2;
  });
}

/**
 * Triggers direct instant download of the vector PDF.
 */
export function downloadResumePdf(
  theme: ResumeTheme = 'navy', 
  layout: ResumeLayout = 'executive',
  fileName = 'Sandhiya_P_Resume.pdf'
): void {
  const doc = generateStructuredResumePdf(theme, layout);
  doc.save(fileName);
}
