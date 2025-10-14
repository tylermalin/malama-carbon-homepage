import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import { getUserTasks, updateTaskStatus, getOnboardingProgress, UserTask, TaskStatus } from '../../lib/onboardingV2';
import { motion, AnimatePresence } from 'motion/react';

interface NextStepsCardProps {
  userId: string;
}

export function NextStepsCard({ userId }: NextStepsCardProps) {
  const [tasks, setTasks] = useState<UserTask[]>([]);
  const [progress, setProgress] = useState({ percentComplete: 0, completedTasks: 0, totalTasks: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, [userId]);

  async function loadTasks() {
    setIsLoading(true);
    
    const [tasksResult, progressResult] = await Promise.all([
      getUserTasks(userId),
      getOnboardingProgress(userId)
    ]);

    if (tasksResult.success && tasksResult.data) {
      setTasks(tasksResult.data);
    }

    if (progressResult.success) {
      setProgress(progressResult);
    }

    setIsLoading(false);
  }

  async function toggleTaskStatus(taskId: number, currentStatus: TaskStatus) {
    const newStatus: TaskStatus = currentStatus === 'DONE' ? 'PENDING' : 'DONE';
    
    const result = await updateTaskStatus(taskId, newStatus);
    
    if (result.success) {
      // Update local state
      setTasks(tasks.map(t => 
        t.id === taskId ? { ...t, status: newStatus } : t
      ));
      
      // Refresh progress
      const progressResult = await getOnboardingProgress(userId);
      if (progressResult.success) {
        setProgress(progressResult);
      }
    }
  }

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'DONE':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'IN_PROGRESS':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'BLOCKED':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (tasks.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Next Steps</CardTitle>
          <div className="text-sm text-gray-600">
            {progress.completedTasks} of {progress.totalTasks} complete
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress.percentComplete} className="h-2" />
          <p className="text-xs text-gray-600 text-right">
            {progress.percentComplete}% Complete
          </p>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          <AnimatePresence>
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  task.status === 'DONE' 
                    ? 'bg-emerald-50 border-emerald-200' 
                    : 'bg-white border-gray-200'
                } hover:shadow-sm transition-all`}
              >
                {/* Checkbox */}
                <Checkbox
                  checked={task.status === 'DONE'}
                  onCheckedChange={() => toggleTaskStatus(task.id, task.status)}
                  className="mt-1"
                />

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(task.status)}
                    <h4 className={`font-medium ${
                      task.status === 'DONE' ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h4>
                  </div>
                  {task.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {task.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Completion Message */}
        {progress.percentComplete === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center"
          >
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <h4 className="font-semibold text-emerald-900 mb-1">
              Onboarding Complete! 🎉
            </h4>
            <p className="text-sm text-emerald-700">
              You're all set to start using Mālama Labs
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

