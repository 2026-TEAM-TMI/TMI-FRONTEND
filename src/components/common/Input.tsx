import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const baseStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  background: "#f8f9ff",
  border: "1.5px solid #e6eeff",
  borderRadius: "10px",
  fontSize: "14px",
  color: "#121c2a",
  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  outline: "none",
  boxSizing: "border-box",
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onFocusBorder?: boolean;
}

export function TextInput({ style, onFocusBorder = true, ...rest }: InputProps) {
  return (
    <input
      style={{ ...baseStyle, ...style }}
      onFocus={onFocusBorder ? (e) => { e.target.style.borderColor = "#6347d1"; } : undefined}
      onBlur={onFocusBorder ? (e) => { e.target.style.borderColor = "#e6eeff"; } : undefined}
      {...rest}
    />
  );
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onFocusBorder?: boolean;
}

export function Textarea({ style, onFocusBorder = true, ...rest }: TextAreaProps) {
  return (
    <textarea
      style={{ ...baseStyle, resize: "vertical", lineHeight: "1.5", ...style }}
      onFocus={onFocusBorder ? (e) => { e.target.style.borderColor = "#6347d1"; } : undefined}
      onBlur={onFocusBorder ? (e) => { e.target.style.borderColor = "#e6eeff"; } : undefined}
      {...rest}
    />
  );
}
