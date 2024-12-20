import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const assessments = await prisma.assessment.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(assessments)
}

