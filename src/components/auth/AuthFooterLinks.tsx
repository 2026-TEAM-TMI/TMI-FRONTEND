interface AuthFooterLinksProps {
  onFindAccount?: () => void;
  onResetPassword?: () => void;
  onSignUp?: () => void;
}

export default function AuthFooterLinks({ onFindAccount, onResetPassword, onSignUp }: AuthFooterLinksProps) {
  return (
    <div className="flex justify-center gap-6 mt-6">
      {[
        { label: "계정 찾기", handler: onFindAccount },
        { label: "비밀번호 재설정", handler: onResetPassword },
        { label: "회원가입", handler: onSignUp },
      ].map(({ label, handler }) => (
        <button
          key={label}
          onClick={handler}
          className="text-[13px] font-medium text-outline bg-transparent border-0 cursor-pointer font-[inherit] hover:text-primary-container transition-colors duration-150 underline-offset-2 hover:underline"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
