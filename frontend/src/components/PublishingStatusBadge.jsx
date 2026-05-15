import React from 'react';
import { Send, CheckCircle2, XCircle, RefreshCcw, MessageSquare, Share2 } from 'lucide-react';

const PublishingStatusBadge = ({ platform, status }) => {
  const platforms = {
    Telegram: { icon: Send, color: 'text-sky-400' },
    Discord: { icon: MessageSquare, color: 'text-indigo-400' },
    Reddit: { icon: Share2, color: 'text-orange-400' },
  };

  const statuses = {
    published: { icon: CheckCircle2, label: 'Published', class: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' },
    pending: { icon: RefreshCcw, label: 'Pending', class: 'text-amber-400 border-amber-400/20 bg-amber-400/5 animate-pulse' },
    failed: { icon: XCircle, label: 'Failed', class: 'text-rose-400 border-rose-400/20 bg-rose-400/5' },
  };

  const PlatformIcon = platforms[platform]?.icon || Send;
  const statusConfig = statuses[status] || statuses.pending;
  const StatusIcon = statusConfig.icon;

  return (
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg bg-slate-800/50 border border-slate-700 ${platforms[platform]?.color}`}>
        <PlatformIcon className="w-4 h-4" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-slate-300">{platform}</span>
        <div className={`status-badge inline-flex items-center gap-1 mt-1 ${statusConfig.class}`}>
          <StatusIcon className={`w-3 h-3 ${status === 'pending' ? 'animate-spin' : ''}`} />
          {statusConfig.label}
        </div>
      </div>
    </div>
  );
};

export default PublishingStatusBadge;
