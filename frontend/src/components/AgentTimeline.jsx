import React from 'react';
import { CheckCircle2, Circle, Clock, Loader2, AlertCircle } from 'lucide-react';

const AgentTimeline = ({ steps }) => {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isCompleted = step.status === 'completed';
        const isRunning = step.status === 'running';
        const isFailed = step.status === 'failed';
        const isPending = step.status === 'pending';

        return (
          <div key={step.name} className="relative flex gap-4">
            {!isLast && (
              <div className={`absolute left-[15px] top-[30px] bottom-[-10px] w-0.5 ${
                isCompleted ? 'bg-indigo-500/50' : 'bg-slate-800'
              }`} />
            )}

            <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
              isCompleted ? 'bg-indigo-500 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]' :
              isRunning ? 'bg-slate-900 border-indigo-500 animate-pulse' :
              isFailed ? 'bg-rose-500 border-rose-400' :
              'bg-slate-900 border-slate-800'
            }`}>
              {isCompleted && <CheckCircle2 className="w-5 h-5 text-white" />}
              {isRunning && <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />}
              {isFailed && <AlertCircle className="w-5 h-5 text-white" />}
              {isPending && <Circle className="w-4 h-4 text-slate-700" />}
            </div>

            <div className={`flex-1 glass-card p-4 transition-all duration-500 ${
              isRunning ? 'border-indigo-500/50 bg-indigo-500/5' : 'bg-slate-900/40'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-bold font-outfit uppercase tracking-wider text-xs ${
                    isRunning ? 'text-indigo-400' : isFailed ? 'text-rose-400' : 'text-slate-400'
                  }`}>
                    {step.name} Agent
                  </h4>
                  <p className={`text-sm mt-1 font-medium ${isRunning ? 'text-white' : 'text-slate-300'}`}>
                    {isCompleted ? 'Task completed successfully' : 
                     isRunning ? 'Analyzing data and generating insights...' : 
                     isFailed ? 'Task failed due to an internal error' :
                     'Waiting for previous agent...'}
                  </p>
                </div>
                {step.duration && step.duration !== '-' && (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 py-1 bg-slate-800/50 rounded-lg">
                    <Clock className="w-3 h-3" /> {step.duration}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AgentTimeline;
