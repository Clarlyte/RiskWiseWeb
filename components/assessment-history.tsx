'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Assessment } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { generateAssessmentsPDF } from '@/lib/pdfGenerator'

export function AssessmentHistory({ assessments }: { assessments: Assessment[] }) {
  const handleDownloadPDF = (assessment: Assessment) => {
    const doc = generateAssessmentsPDF([assessment])
    doc.save(`risk-assessment-${assessment.id}-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessment History ({assessments.length} total)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>ID</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.map((assessment) => (
              <TableRow key={assessment.id}>
                <TableCell>
                  {new Date(assessment.created_at).toLocaleString()}
                </TableCell>
                <TableCell>{assessment.id}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDownloadPDF(assessment)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

