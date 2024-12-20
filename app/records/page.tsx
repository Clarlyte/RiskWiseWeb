import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import Layout from '../components/layout'
import { AssessmentHistory } from '@/components/assessment-history'
import { getAssessments } from '@/lib/supabase'

export default async function Records() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <Layout>
        <h1 className="text-4xl font-bold mb-8">Records</h1>
        <p className="text-xl">Please log in to view your records.</p>
      </Layout>
    )
  }

  const assessments = await getAssessments(session.user.id)

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Your Records</h1>
      <div className="space-y-4">
        <p className="text-gray-600">
          Total assessments: {assessments.length}
        </p>
        <AssessmentHistory assessments={assessments} />
      </div>
    </Layout>
  )
}

