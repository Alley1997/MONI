import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

interface RiskArea {
  id: string;
  name: string;
  riskLevel: 'high' | 'medium' | 'low';
  cases: number;
  population: number;
}

const DistributionMap: React.FC = () => {
  const riskAreas: RiskArea[] = [
    { id: '1', name: 'Northern Region', riskLevel: 'high', cases: 1247, population: 450000 },
    { id: '2', name: 'Eastern Province', riskLevel: 'medium', cases: 856, population: 320000 },
    { id: '3', name: 'Central District', riskLevel: 'low', cases: 234, population: 280000 },
    { id: '4', name: 'Western Coast', riskLevel: 'high', cases: 1089, population: 380000 },
    { id: '5', name: 'Southern Hills', riskLevel: 'medium', cases: 421, population: 190000 },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'medium': return <MapPin className="h-4 w-4 text-yellow-600" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Geographic Distribution</CardTitle>
          <CardDescription>Malaria risk assessment by region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 rounded-lg relative overflow-hidden">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/6864fec4df2d30091e8bd709_1751449300524_8a2f3b7f.png" 
              alt="MOMI Architecture" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-white/80 p-6 rounded-lg backdrop-blur-sm">
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Interactive Map</h3>
                <p className="text-sm text-muted-foreground">Geographic visualization of malaria distribution</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {riskAreas.map((area) => (
          <Card key={area.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  {getRiskIcon(area.riskLevel)}
                  {area.name}
                </CardTitle>
                <Badge className={getRiskColor(area.riskLevel)}>
                  {area.riskLevel} risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Cases:</span>
                  <span className="font-medium">{area.cases.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Population:</span>
                  <span className="font-medium">{area.population.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Incidence Rate:</span>
                  <span className="font-medium">
                    {((area.cases / area.population) * 1000).toFixed(1)}/1000
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DistributionMap;