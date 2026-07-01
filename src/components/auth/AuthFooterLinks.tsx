interface AuthFooterLinksProps {
  onFindAccount?: () => void;
  onResetPassword?: () => void;
  onSignUp?: () => void;
}

const linkStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#797585",
  fontSize: "13px",
  cursor: "pointer",
  fontFamily: "inherit",
};

export default function AuthFooterLinks({
  onFindAccount,
  onResetPassword,
  onSignUp,
}: AuthFooterLinksProps) {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "24px",
        display: "flex",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <button style={linkStyle} onClick={onFindAccount}>Find Account</button>
      <button style={linkStyle} onClick={onResetPassword}>Reset Password</button>
      <button style={linkStyle} onClick={onSignUp}>Sign Up</button>
    </div>
  );
}
