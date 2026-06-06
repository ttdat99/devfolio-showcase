import { useAdminAuth } from "@/contexts/admin-auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, ShoppingCart } from "lucide-react";

const STAT_CARDS = [
  { title: "Total Users", value: 0, icon: Users },
  { title: "Total Products", value: 0, icon: Package },
  { title: "Total Orders", value: 0, icon: ShoppingCart },
];

export default function DashboardPage() {
  const { adminUser } = useAdminAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back, {adminUser?.name ?? adminUser?.email}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STAT_CARDS.map(({ title, value, icon: Icon }) => (
          <Card key={title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
