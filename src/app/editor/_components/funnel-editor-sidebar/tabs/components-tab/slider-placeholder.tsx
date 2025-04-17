import { EditorBtns } from "@/lib/constants";
import { Slider } from "@radix-ui/react-slider";
import { Link2Icon, TypeIcon } from "lucide-react";
import React from "react";

type Props = {};

const SliderPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "slider")}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Link2Icon size={40} className="text-muted-foreground" />
    </div>
  );
};

export default SliderPlaceholder;
