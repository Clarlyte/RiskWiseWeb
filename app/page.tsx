import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Layout from '@/app/components/layout'
import { RiskScoreCard } from '@/components/risk-score-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getAssessments, getLatestAssessment } from '@/lib/supabase'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <Layout>
        <h1 className="text-4xl font-bold mb-8">Welcome to Risk Assessment Dashboard</h1>
        <p className="text-xl mb-4">Please log in to view your personalized dashboard and risk assessments.</p>
        <Button asChild>
          <Link href="/login">Log In</Link>
        </Button>
      </Layout>
    )
  }

  const [latestAssessment, assessments] = await Promise.all([
    getLatestAssessment(session.user.id),
    getAssessments(session.user.id)
  ])

  const latestScore = latestAssessment?.score || 0
  const assessmentCount = assessments.length

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Welcome to Your Risk Assessment Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <RiskScoreCard
          title="Latest Risk Score"
          score={latestScore}
          description="Your most recent risk assessment score"
        />
        <Card>
          <CardHeader>
            <CardTitle>Total Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{assessmentCount}</p>
            <p className="text-sm text-muted-foreground mt-2">Completed risk assessments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/dashboard">View Full Dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/records">View Assessment History</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

