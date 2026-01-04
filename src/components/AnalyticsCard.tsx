import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ReactNode } from 'react';

interface AnalyticsCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function AnalyticsCard({
  title,
  subtitle,
  children,
  className = '',
}: AnalyticsCardProps) {
  return (
    <Card className={`transition-shadow duration-300 hover:shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

