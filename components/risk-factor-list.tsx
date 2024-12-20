import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface RiskFactor {
  name: string
  value: number
}

interface RiskFactorListProps {
  factors: RiskFactor[]
}

export function RiskFactorList({ factors }: RiskFactorListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Factors</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {factors.map((factor, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{factor.name}</span>
              <span className="font-semibold">{factor.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

