import { useEffect, useState } from "react";
import { useTeamStore } from "../../../stores/useTeamStore";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useToastStore } from "../../../stores/useToastStore";
import { TeamInviteSection } from "./TeamInviteSection";
import { MemberCard } from "./MemberCard";

/**
 * TeamSettings Component
 * 
 * Main component for managing team settings, including member invitations and roster display.
 * 
 * @returns {JSX.Element} Team settings component
 */
export const TeamSettings = () => {
  const { currentTeam, members, fetchMembers, addMember, loading } =
    useTeamStore();
  const { user: currentUser } = useAuthStore();
  const { addToast } = useToastStore();

  const [inviteEmail, setInviteEmail] = useState("");

  // Sync members when the component loads or team changes
  useEffect(() => {
    fetchMembers();
  }, [currentTeam, fetchMembers]);

  /**
   * Handles member invitation form submission
   * @param {Event} e - Form submit event
   */
  const handleInvite = async (e) => {
    e.preventDefault();
    const res = await addMember(inviteEmail);

    if (res.success) {
      addToast("Operative recruited successfully.", "purple");
      setInviteEmail("");
    } else {
      addToast(res.error, "error");
    }
  };

  if (!currentTeam) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-zinc-500 font-mono text-sm uppercase tracking-widest">
        <p>No Active Unit Selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-base-content/60">
          Team_Nexus
        </h2>
        <p className="text-zinc-500 text-[10px] font-mono uppercase mt-2 tracking-[0.3em]">
          Unit Configuration // {currentTeam.name}
        </p>
      </div>

      <TeamInviteSection
        inviteEmail={inviteEmail}
        setInviteEmail={setInviteEmail}
        onInvite={handleInvite}
        loading={loading}
      />

      {/* Member List */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-4">
          Active Roster ({members.length})
        </h3>

        <div className="grid gap-4">
          {members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
