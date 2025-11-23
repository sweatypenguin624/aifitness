import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GeneratedPlan } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import jsPDF from "jspdf";

export async function exportToPDF(plan: GeneratedPlan, fileName: string) {
  try {
    console.log("Starting detailed PDF export...");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    let yPosition = 20;
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - (2 * margin);

    // Helper function to check if we need a new page
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - 20) {
        pdf.addPage();
        yPosition = 20;
        return true;
      }
      return false;
    };

    // Title
    pdf.setFontSize(24);
    pdf.setFont("helvetica", "bold");
    pdf.text("AI Fitness Coach", margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text("Personalized Workout & Diet Plan", margin, yPosition);
    yPosition += 15;

    // Workout Plan Section
    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");
    pdf.text("Workout Plan", margin, yPosition);
    yPosition += 10;

    plan.workoutPlan.forEach((day, index) => {
      checkPageBreak(50);

      // Day header
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text(`${day.day}: ${day.focus}`, margin, yPosition);
      yPosition += 8;

      // Exercises
      day.exercises.forEach((exercise, exIndex) => {
        checkPageBreak(20);

        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text(`${exIndex + 1}. ${exercise.name}`, margin + 5, yPosition);
        yPosition += 6;

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        const details = `Sets: ${exercise.sets} | Reps: ${exercise.reps} | Rest: ${exercise.rest}`;
        pdf.text(details, margin + 10, yPosition);
        yPosition += 5;

        if (exercise.notes) {
          const lines = pdf.splitTextToSize(`Note: ${exercise.notes}`, contentWidth - 15);
          pdf.setTextColor(100, 100, 100);
          lines.forEach((line: string) => {
            pdf.text(line, margin + 10, yPosition);
            yPosition += 4;
          });
          pdf.setTextColor(0, 0, 0);
        }
        yPosition += 3;
      });

      yPosition += 5;
    });

    // Diet Plan Section
    checkPageBreak(20);
    yPosition += 10;
    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");
    pdf.text("Diet Plan", margin, yPosition);
    yPosition += 10;

    plan.dietPlan.forEach((day, index) => {
      checkPageBreak(60);

      // Day header
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text(day.day, margin, yPosition);
      yPosition += 8;

      // Breakfast
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.text("Breakfast:", margin + 5, yPosition);
      yPosition += 6;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(day.breakfast.name, margin + 10, yPosition);
      yPosition += 5;
      const breakfastDesc = pdf.splitTextToSize(day.breakfast.description, contentWidth - 15);
      pdf.setTextColor(80, 80, 80);
      breakfastDesc.forEach((line: string) => {
        pdf.text(line, margin + 10, yPosition);
        yPosition += 4;
      });
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${day.breakfast.calories} | P: ${day.breakfast.protein} | C: ${day.breakfast.carbs} | F: ${day.breakfast.fats}`, margin + 10, yPosition);
      yPosition += 7;

      // Lunch
      checkPageBreak(20);
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.text("Lunch:", margin + 5, yPosition);
      yPosition += 6;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(day.lunch.name, margin + 10, yPosition);
      yPosition += 5;
      const lunchDesc = pdf.splitTextToSize(day.lunch.description, contentWidth - 15);
      pdf.setTextColor(80, 80, 80);
      lunchDesc.forEach((line: string) => {
        pdf.text(line, margin + 10, yPosition);
        yPosition += 4;
      });
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${day.lunch.calories} | P: ${day.lunch.protein} | C: ${day.lunch.carbs} | F: ${day.lunch.fats}`, margin + 10, yPosition);
      yPosition += 7;

      // Dinner
      checkPageBreak(20);
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.text("Dinner:", margin + 5, yPosition);
      yPosition += 6;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(day.dinner.name, margin + 10, yPosition);
      yPosition += 5;
      const dinnerDesc = pdf.splitTextToSize(day.dinner.description, contentWidth - 15);
      pdf.setTextColor(80, 80, 80);
      dinnerDesc.forEach((line: string) => {
        pdf.text(line, margin + 10, yPosition);
        yPosition += 4;
      });
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${day.dinner.calories} | P: ${day.dinner.protein} | C: ${day.dinner.carbs} | F: ${day.dinner.fats}`, margin + 10, yPosition);
      yPosition += 7;

      // Snacks
      if (day.snacks && day.snacks.length > 0) {
        checkPageBreak(15);
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text("Snacks:", margin + 5, yPosition);
        yPosition += 6;

        day.snacks.forEach((snack) => {
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(10);
          pdf.text(`• ${snack.name} - ${snack.description}`, margin + 10, yPosition);
          yPosition += 5;
          pdf.text(`${snack.calories} | P: ${snack.protein} | C: ${snack.carbs} | F: ${snack.fats}`, margin + 15, yPosition);
          yPosition += 5;
        });
      }

      yPosition += 8;
    });

    // Tips Section
    if (plan.tips && plan.tips.length > 0) {
      checkPageBreak(30);
      yPosition += 5;
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text("Tips for Success", margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      plan.tips.forEach((tip) => {
        checkPageBreak(8);
        const lines = pdf.splitTextToSize(`• ${tip}`, contentWidth - 5);
        lines.forEach((line: string) => {
          pdf.text(line, margin + 5, yPosition);
          yPosition += 5;
        });
      });
    }

    // Motivation
    if (plan.motivation) {
      checkPageBreak(20);
      yPosition += 10;
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "italic");
      const motivationLines = pdf.splitTextToSize(`"${plan.motivation}"`, contentWidth - 20);
      pdf.setTextColor(100, 100, 100);
      motivationLines.forEach((line: string) => {
        pdf.text(line, pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 6;
      });
      pdf.setTextColor(0, 0, 0);
    }

    // Footer on each page
    const totalPages = (pdf as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(150, 150, 150);
      pdf.text(`AI Fitness Coach - Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      pdf.setTextColor(0, 0, 0);
    }

    console.log("Saving PDF...");
    pdf.save(`${fileName}.pdf`);
    console.log("PDF saved successfully!");

  } catch (error) {
    console.error("Error generating PDF:", error);
    alert(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}. Please check the console for details.`);
  }
}
