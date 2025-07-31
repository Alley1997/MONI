import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MetricCard from './MetricCard';
import DataSourceCard from './DataSourceCard';
import DistributionMap from './DistributionMap';
import PredictionDashboard from './PredictionDashboard';
import { Activity, MapPin, TrendingUp, Users, Bug, Cloud, Heart, Map } from 'lucide-react';
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Malaria One Health Observatory
          </h1>
          <p className="text-muted-foreground">Integrated surveillance and prediction platform</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Active Cases"
              value="2,847"
              change={12}
              changeType="increase"
              icon={<Activity className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricCard
              title="Risk Areas"
              value="23"
              change={-5}
              changeType="decrease"
              icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricCard
              title="Prediction Accuracy"
              value="94.2%"
              change={2.1}
              changeType="increase"
              icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricCard
              title="Population at Risk"
              value="1.2M"
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-700">Recent Activity</CardTitle>
                <CardDescription>Latest updates from the surveillance system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm">New outbreak detected in Northern Region</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-sm">Prediction model updated with 94.2% accuracy</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <span className="text-sm">Climate data integration completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100">
              <CardHeader>
                <CardTitle className="text-green-700">System Health</CardTitle>
                <CardDescription>Data sources and system status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Sources Active</span>
                    <span className="text-sm font-medium text-green-600">4/4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Data Sync</span>
                    <span className="text-sm font-medium">2 min ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Uptime</span>
                    <span className="text-sm font-medium text-green-600">99.9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <DistributionMap />
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <PredictionDashboard />
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DataSourceCard
              title="Mosquito Monitoring"
              description="Real-time mosquito population and breeding site data"
              status="active"
              icon={<Bug className="h-4 w-4" />}
              lastUpdate="2 hours ago"
            />
            <DataSourceCard
              title="Health Data"
              description="Clinical case reports and health facility data"
              status="active"
              icon={<Heart className="h-4 w-4" />}
              lastUpdate="1 hour ago"
            />
            <Link to="/climate-data">
              <DataSourceCard
                title="Climate Data"
                description="Weather patterns, temperature, and rainfall data"
                status="active"
                icon={<Cloud className="h-4 w-4" />}
                lastUpdate="30 minutes ago"
              />
            </Link>
            <DataSourceCard
              title="GIS Data"
              description="Geographic and spatial analysis data"
              status="active"
              icon={<Map className="h-4 w-4" />}
              lastUpdate="4 hours ago"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;