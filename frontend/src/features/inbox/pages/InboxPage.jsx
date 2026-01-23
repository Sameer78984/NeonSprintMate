import { useState } from "react";
import { CheckIcon, XMarkIcon, EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../components/Button";

// Fake invites data since backend is not being updated
const mockInvites = [
  { id: 1, teamName: "Beta Squad", inviter: "Alex Chen", role: "Developer", sentAt: "2 hours ago" },
  { id: 2, teamName: "Neon Core", inviter: "Sarah Connor", role: "Admin", sentAt: "1 day ago" },
];

export const InboxPage = () => {
  const [invites, setInvites] = useState(mockInvites);

  const handleAccept = (id) => {
    // In a real app, this would call an API
    setInvites(invites.filter((invite) => invite.id !== id));
  };

  const handleDecline = (id) => {
    setInvites(invites.filter((invite) => invite.id !== id));
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-orange mb-2">
          Inbox
        </h1>
        <p className="text-zinc-500 font-light">
          Manage your pending team invitations and notifications.
        </p>
      </header>

      <div className="space-y-4">
        {invites.length > 0 ? (
          invites.map((invite) => (
            <div key={invite.id} className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 border-l-4 border-l-neon-purple">
              <div className="flex items-center gap-4 w-full">
                <div className="h-12 w-12 rounded-full bg-neon-purple/10 flex items-center justify-center">
                    <EnvelopeOpenIcon className="h-6 w-6 text-neon-purple" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">
                        Invitation to join <span className="text-neon-cyan">{invite.teamName}</span>
                    </h3>
                    <p className="text-xs text-zinc-500 font-mono">
                        Invited by <span className="text-white">{invite.inviter}</span> • role: {invite.role} • {invite.sentAt}
                    </p>
                </div>
              </div>
              
              <div className="flex gap-4 w-full md:w-auto">
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 md:flex-none border-red-500/50 text-red-500 hover:bg-red-500/10"
                    onClick={() => handleDecline(invite.id)}
                >
                    <XMarkIcon className="h-4 w-4 mr-2" /> Decline
                </Button>
                <Button 
                    variant="purple" 
                    size="sm" 
                    className="flex-1 md:flex-none"
                    onClick={() => handleAccept(invite.id)}
                >
                    <CheckIcon className="h-4 w-4 mr-2" /> Accept
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-600 border border-dashed border-white/5 rounded-3xl">
            <EnvelopeOpenIcon className="h-12 w-12 mb-4 opacity-20" />
            <p className="text-sm font-mono uppercase tracking-widest">No pending invitations</p>
          </div>
        )}
      </div>
    </div>
  );
};
