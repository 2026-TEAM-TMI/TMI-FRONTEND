import Button from "../common/Button";

interface CreatePortfolioCardProps {
  count: number;
  onCreate: () => void;
}

export default function CreatePortfolioCard({ count, onCreate }: CreatePortfolioCardProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-[22px] font-extrabold tracking-tight mb-1 text-on-surface">My Portfolios</h2>
        <p className="text-sm text-outline">{count}개의 포트폴리오가 활성화되어 있습니다</p>
      </div>
      <Button variant="primary" size="md" onClick={onCreate}>
        <span className="text-base leading-none">+</span>
        New Portfolio
      </Button>
    </div>
  );
}
