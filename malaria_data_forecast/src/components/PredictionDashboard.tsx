import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Brain, Calendar, Target } from 'lucide-react';
import MetricCard from './MetricCard';

interface Prediction {
  id: string;
  region: string;
  predictedCases: number;
  confidence: number;
  timeframe: string;
  factors: string[];
}

const PredictionDashboard: React.FC = () => {
  const predictions: Prediction[] = [
    {
      id: '1',
      region: 'Northern Region',
      predictedCases: 1450,
      confidence: 92,
      timeframe: 'Next 30 days',
      factors: ['High rainfall', 'Temperature rise', 'Breeding sites']
    },
    {
      id: '2',
      region: 'Eastern Province', 
      predictedCases: 780,
      confidence: 87,
      timeframe: 'Next 30 days',
      factors: ['Seasonal patterns', 'Population density']
    },
    {
      id: '3',
      region: 'Western Coast',
      predictedCases: 1200,
      confidence: 89,
      timeframe: 'Next 30 days',
      factors: ['Climate data', 'Vector activity', 'Migration patterns']
    }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100';
    if (confidence >= 80) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Model Accuracy"
          value="94.2%"
          change={2.1}
          changeType="increase"
          icon={<Target className="h-4 w-4 text-muted-foreground" />}
          description="Last 30 days"
        />
        <MetricCard
          title="Predictions Made"
          value="156"
          change={8}
          changeType="increase"
          icon={<Brain className="h-4 w-4 text-muted-foreground" />}
          description="This month"
        />
        <MetricCard
          title="Early Warnings"
          value="23"
          change={-12}
          changeType="decrease"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          description="Active alerts"
        />
        <MetricCard
          title="Forecast Range"
          value="30 days"
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          description="Prediction horizon"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI-Powered Predictions
          </CardTitle>
          <CardDescription>
            Machine learning models analyzing multiple data sources for malaria outbreak prediction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.map((prediction) => (
              <div key={prediction.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{prediction.region}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{prediction.timeframe}</Badge>
                    <Badge className={getConfidenceBg(prediction.confidence)}>
                      {prediction.confidence}% confidence
                    </Badge>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Predicted Cases</span>
                      <span className="font-bold text-lg">{prediction.predictedCases.toLocaleString()}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Confidence Level</span>
                        <span className={getConfidenceColor(prediction.confidence)}>
                          {prediction.confidence}%
                        </span>
                      </div>
                      <Progress value={prediction.confidence} className="h-2" />
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm text-muted-foreground mb-2 block">Key Factors</span>
                    <div className="flex flex-wrap gap-1">
                      {prediction.factors.map((factor, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Model Performance</CardTitle>
          <CardDescription>Historical accuracy and validation metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Performance Analytics</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Model accuracy trends, validation results, and performance metrics would be visualized here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionDashboard;