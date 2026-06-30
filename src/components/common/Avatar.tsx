interface AvatarProps {
  letter: string;
  color: string;
  size?: number;
  fontSize?: number;
}

export default function Avatar({ letter, color, size = 40, fontSize = 14 }: AvatarProps) {
  return (
    <div
      className="flex items-center justify-center shrink-0 rounded-full font-extrabold text-white"
      style={{
        width: size,
        height: size,
        fontSize,
        background: `linear-gradient(135deg, ${color}, ${color}bb)`,
        boxShadow: `0 2px 8px ${color}44`,
      }}
    >
      {letter}
    </div>
  );
}
