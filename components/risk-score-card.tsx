import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface RiskScoreCardProps {
  title: string
  score: number
  description: string
}

export function RiskScoreCard({ title, score, description }: RiskScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score < 30) return 'text-green-500'
    if (score < 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</p>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  )
}

