import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Layout from '@/app/components/layout'   
import { RiskScoreCard } from '@/components/risk-score-card'
import { AssessmentHistory } from '@/components/assessment-history'
import { getAssessments, getLatestAssessment } from '@/lib/supabase'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <Layout>
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <p className="text-xl">Please log in to view your dashboard.</p>
      </Layout>
    )
  }

  const [latestAssessment, assessments] = await Promise.all([
    getLatestAssessment(session.user.id),
    getAssessments(session.user.id)
  ])

  const latestScore = latestAssessment?.score || 0

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Risk Assessment Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <RiskScoreCard
          title="Overall Risk Score"
          score={latestScore}
          description="Your current risk assessment score"
        />
      </div>
      <AssessmentHistory assessments={assessments} />
    </Layout>
  )
}

