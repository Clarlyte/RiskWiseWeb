import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

async function getAssessments() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assessments`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch assessments')
  }
  return res.json()
}

export default async function AssessmentList() {
  const assessments = await getAssessments()

  if (assessments.length === 0) {
    return <p>No assessments found.</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assessments.map((assessment: any) => (
          <TableRow key={assessment.id}>
            <TableCell>{new Date(assessment.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>{assessment.type}</TableCell>
            <TableCell>{assessment.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

