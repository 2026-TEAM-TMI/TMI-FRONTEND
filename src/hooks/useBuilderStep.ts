import { KeyboardEvent } from "react";
import { useBuilderStore } from "../store/builderStore";

export function useBuilderStep3() {
  const {
    direction, setDirection,
    tags, setTags,
    selectedStyle, setSelectedStyle,
    customStyleDesc, setCustomStyleDesc,
    visibility, setVisibility,
  } = useBuilderStore();

  const tagInput = useBuilderStore((s) => s.direction); // re-use store, or keep local

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>, currentInput: string, setCurrentInput: (v: string) => void) => {
    if ((e.key === "Enter" || e.key === ",") && currentInput.trim()) {
      e.preventDefault();
      const newTag = currentInput.trim().replace(/,$/, "");
      if (newTag && !tags.includes(newTag)) setTags([...tags, newTag]);
      setCurrentInput("");
    } else if (e.key === "Backspace" && !currentInput && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  return {
    direction, setDirection,
    tags, setTags,
    selectedStyle, setSelectedStyle,
    customStyleDesc, setCustomStyleDesc,
    visibility, setVisibility,
    handleTagKeyDown,
  };
}
