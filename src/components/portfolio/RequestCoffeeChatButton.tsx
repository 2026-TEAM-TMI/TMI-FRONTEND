import Button from "../common/Button";

interface RequestCoffeeChatButtonProps {
  onClick: () => void;
  size?: "sm" | "md" | "lg";
}

export default function RequestCoffeeChatButton({ onClick, size = "sm" }: RequestCoffeeChatButtonProps) {
  return (
    <Button variant="primary" size={size} onClick={onClick}>
      ☕ Coffee Chat 신청
    </Button>
  );
}
