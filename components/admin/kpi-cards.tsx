import { Card, CardContent } from "@/components/ui/card"
import { Users, UserPlus, TrendingUp, TrendingDown, Activity } from "lucide-react"
import type { KpiData } from "@/lib/types/admin"

interface KpiCardsProps {
  data: KpiData
}

export function KpiCards({ data }: KpiCardsProps) {
  const trend =
    data.newUsersLastMonth > 0
      ? ((data.newUsersThisMonth - data.newUsersLastMonth) / data.newUsersLastMonth) * 100
      : data.newUsersThisMonth > 0
        ? 100
        : 0

  const isPositiveTrend = trend >= 0

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{data.totalUsers}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">New This Month</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{data.newUsersThisMonth}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-2/10">
              <UserPlus className="h-6 w-6 text-chart-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">New Last Month</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{data.newUsersLastMonth}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-4/10">
              <Activity className="h-6 w-6 text-chart-4" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Month Trend</p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-3xl font-semibold tracking-tight">{Math.abs(trend).toFixed(0)}%</p>
                {isPositiveTrend ? (
                  <span className="flex items-center text-sm font-medium text-chart-2">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    up
                  </span>
                ) : (
                  <span className="flex items-center text-sm font-medium text-destructive">
                    <TrendingDown className="mr-1 h-4 w-4" />
                    down
                  </span>
                )}
              </div>
            </div>
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${isPositiveTrend ? "bg-chart-2/10" : "bg-destructive/10"}`}
            >
              {isPositiveTrend ? (
                <TrendingUp className="h-6 w-6 text-chart-2" />
              ) : (
                <TrendingDown className="h-6 w-6 text-destructive" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
