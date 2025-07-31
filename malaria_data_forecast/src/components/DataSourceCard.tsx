import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DataSourceCardProps {
  title: string;
  description: string;
  status: 'active' | 'inactive';
  icon: React.ReactNode;
  lastUpdate?: string;
}

const DataSourceCard: React.FC<DataSourceCardProps> = ({
  title,
  description,
  status,
  icon,
  lastUpdate
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <Badge variant={status === 'active' ? 'default' : 'secondary'}>
          {status}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
        {lastUpdate && (
          <p className="text-xs text-muted-foreground">
            Last updated: {lastUpdate}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DataSourceCard;