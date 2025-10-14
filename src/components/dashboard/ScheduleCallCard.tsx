import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, Video, ExternalLink } from 'lucide-react';

const CAL_LINK = import.meta.env.VITE_CAL_LINK || 'https://cal.com/malamalabs';

export function ScheduleCallCard() {
  const handleScheduleClick = () => {
    window.open(CAL_LINK, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-emerald-50 border-blue-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-lg">Schedule a Call</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700">
          Have questions or ready to get started? Book a 15-minute intro call with our team to discuss your goals and how Mālama Labs can help.
        </p>

        <div className="space-y-2">
          <Button 
            onClick={handleScheduleClick}
            variant="outline"
            className="w-full border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Your Call
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Choose a time that works for you
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

