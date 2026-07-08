import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

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
  error?: boolean;
}

export function TextInput({ style, onFocusBorder = true, error = false, ...rest }: InputProps) {
  const idleBorderColor = error ? "#f87171" : "#e6eeff";
  return (
    <input
      style={{ ...baseStyle, borderColor: idleBorderColor, ...style }}
      onFocus={onFocusBorder ? (e) => { e.target.style.borderColor = "#3b82f6"; } : undefined}
      onBlur={onFocusBorder ? (e) => { e.target.style.borderColor = idleBorderColor; } : undefined}
      {...rest}
    />
  );
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onFocusBorder?: boolean;
  error?: boolean;
}

export function Textarea({ style, onFocusBorder = true, error = false, ...rest }: TextAreaProps) {
  const idleBorderColor = error ? "#f87171" : "#e6eeff";
  return (
    <textarea
      style={{ ...baseStyle, resize: "vertical", lineHeight: "1.5", borderColor: idleBorderColor, ...style }}
      onFocus={onFocusBorder ? (e) => { e.target.style.borderColor = "#3b82f6"; } : undefined}
      onBlur={onFocusBorder ? (e) => { e.target.style.borderColor = idleBorderColor; } : undefined}
      {...rest}
    />
  );
}
