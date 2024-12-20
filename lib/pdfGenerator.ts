import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Assessment } from '@/lib/supabase'

interface HazardEffect {
  id: string
  description: string
}

interface ExistingControl {
  id: string
  description: string
}

interface Hazard {
  id: string
  images: string[]
  dueDate: string
  effects: HazardEffect[]
  severity: number
  riskScore: number
  likelihood: number
  description: string
  pointPerson: string
  finalSeverity: number
  finalRiskScore: number
  finalLikelihood: number
  existingControls: ExistingControl[]
  additionalControls: {
    ac: string[]
    ec: string[]
    ppe: string[]
  }
}

interface AssessmentData {
  id: string
  date: string
  name: string
  activity: string
  hazards: Hazard[]
  folderId: string
  htmlPath: string
}

export function generateAssessmentsPDF(assessments: Assessment[]) {
  const doc = new jsPDF()
  let currentY = 15

  assessments.forEach((assessment, index) => {
    if (index > 0) {
      doc.addPage()
      currentY = 15
    }

    const assessmentData: AssessmentData = assessment.assessment_data

    // Header
    doc.setFontSize(20)
    doc.text('Risk Assessment Report', 14, currentY)
    currentY += 10

    // Assessment Details
    doc.setFontSize(12)
    doc.text([
      `Assessment ID: ${assessmentData.id}`,
      `Name: ${assessmentData.name}`,
      `Activity: ${assessmentData.activity}`,
      `Date: ${new Date(assessmentData.date).toLocaleString()}`,
    ], 14, currentY)
    currentY += 30

    // Hazards Section
    assessmentData.hazards.forEach((hazard, hazardIndex) => {
      doc.setFontSize(14)
      doc.text(`Hazard ${hazardIndex + 1}: ${hazard.description}`, 14, currentY)
      currentY += 10

      // Risk Scores Table
      autoTable(doc, {
        head: [['', 'Initial', 'Final']],
        body: [
          ['Severity', hazard.severity.toString(), hazard.finalSeverity.toString()],
          ['Likelihood', hazard.likelihood.toString(), hazard.finalLikelihood.toString()],
          ['Risk Score', hazard.riskScore.toString(), hazard.finalRiskScore.toString()],
        ],
        startY: currentY,
        margin: { left: 14 },
        theme: 'grid',
      })
      currentY = (doc as any).lastAutoTable.finalY + 10

      // Effects
      doc.setFontSize(12)
      doc.text('Effects:', 14, currentY)
      currentY += 5
      hazard.effects.forEach(effect => {
        doc.text(`• ${effect.description}`, 20, currentY)
        currentY += 5
      })
      currentY += 5

      // Existing Controls
      doc.text('Existing Controls:', 14, currentY)
      currentY += 5
      hazard.existingControls.forEach(control => {
        doc.text(`• ${control.description}`, 20, currentY)
        currentY += 5
      })
      currentY += 5

      // Additional Controls
      doc.text('Additional Controls:', 14, currentY)
      currentY += 5
      
      if (hazard.additionalControls.ac.length > 0) {
        doc.text('Administrative Controls:', 20, currentY)
        currentY += 5
        hazard.additionalControls.ac.forEach(ac => {
          doc.text(`• ${ac}`, 26, currentY)
          currentY += 5
        })
      }

      if (hazard.additionalControls.ec.length > 0) {
        doc.text('Engineering Controls:', 20, currentY)
        currentY += 5
        hazard.additionalControls.ec.forEach(ec => {
          doc.text(`• ${ec}`, 26, currentY)
          currentY += 5
        })
      }

      if (hazard.additionalControls.ppe.length > 0) {
        doc.text('PPE Required:', 20, currentY)
        currentY += 5
        hazard.additionalControls.ppe.forEach(ppe => {
          doc.text(`• ${ppe}`, 26, currentY)
          currentY += 5
        })
      }

      doc.text(`Point Person: ${hazard.pointPerson}`, 14, currentY)
      currentY += 5
      doc.text(`Due Date: ${hazard.dueDate}`, 14, currentY)
      currentY += 15

      // Check if we need a new page
      if (currentY > doc.internal.pageSize.height - 20) {
        doc.addPage()
        currentY = 15
      }
    })
  })

  return doc
} 