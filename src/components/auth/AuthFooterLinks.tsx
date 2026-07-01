interface AuthFooterLinksProps {
  onFindAccount?: () => void;
  onResetPassword?: () => void;
  onSignUp?: () => void;
}

export default function AuthFooterLinks({ onFindAccount, onResetPassword, onSignUp }: AuthFooterLinksProps) {
  return (
    <div className="flex justify-center gap-6 mt-6">
      {[
        { label: "Find Account", handler: onFindAccount },
        { label: "Reset Password", handler: onResetPassword },
        { label: "Sign Up", handler: onSignUp },
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
