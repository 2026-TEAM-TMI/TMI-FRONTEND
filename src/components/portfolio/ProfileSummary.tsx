import type { User } from "../../types/user";
import Avatar from "../common/Avatar";
import Badge from "../common/Badge";
import Button from "../common/Button";

interface ProfileSummaryProps {
  person: User;
  onCoffeeChat: () => void;
}

export default function ProfileSummary({ person, onCoffeeChat }: ProfileSummaryProps) {
  return (
    <div className="bg-white rounded-3xl p-10 border border-surface-container mb-7 relative overflow-hidden shadow-[0_1px_16px_rgba(99,71,209,0.07)]">
      {/* Background orb */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(99,71,209,0.08)_0%,transparent_70%)]" />

      <div className="flex items-start gap-6">
        <Avatar letter={person.avatar} color={person.color} size={80} fontSize={28} />

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-[22px] font-extrabold text-on-surface tracking-tight">{person.name}</h1>
            {person.matchScore && (
              <Badge>✦ {person.matchScore}% 매칭</Badge>
            )}
          </div>

          <p className="text-sm font-semibold mb-2.5" style={{ color: person.color }}>
            {person.role}{person.company ? ` · ${person.company}` : ""}
          </p>

          {person.bio && (
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3.5 max-w-xl">{person.bio}</p>
          )}

          {person.hashtags && (
            <div className="flex gap-2 flex-wrap mb-5">
              {person.hashtags.map((tag) => (
                <span key={tag} className="text-[12px] font-semibold text-secondary font-label">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-5">
            {(person.followers || person.projects) && (
              <div className="flex gap-5">
                {person.followers && (
                  <div className="text-center">
                    <p className="text-[18px] font-extrabold text-on-surface">{person.followers}</p>
                    <p className="text-[11px] text-outline font-label">팔로워</p>
                  </div>
                )}
                {person.projects && (
                  <div className="text-center">
                    <p className="text-[18px] font-extrabold text-on-surface">{person.projects}</p>
                    <p className="text-[11px] text-outline font-label">프로젝트</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2.5 ml-2">
              <Button variant="primary" size="sm" onClick={onCoffeeChat}>
                ☕ Coffee Chat 신청
              </Button>
              <Button variant="secondary" size="sm">
                팔로우
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
