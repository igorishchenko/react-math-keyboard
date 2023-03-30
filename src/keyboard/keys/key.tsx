import React, { ReactNode, useContext, useEffect, useRef, useState } from "react";
import $ from "jquery";

import { isMobile } from "react-device-detect";
import { MathField, MathfieldInstructions } from "../../types/types";
import { MathFieldContext } from "../../mathInput/mathfieldContext";

export enum KeyCategory {
  "number",
  "constant",
  "utility",
  "operator",
  "function",
  "text",
  "letter",
}

export type KeyProps = {
  id: string;
  label: string | ReactNode;
  labelType: "raw" | "tex" | "svg";
  keyCategory: KeyCategory;
  mathfieldInstructions?: MathfieldInstructions;
  onClick?: () => void;
  fullWidth?: boolean;
};

export const Key = ({
  id,
  label,
  labelType = "tex",
  keyCategory,
  onClick,
  mathfieldInstructions,
  fullWidth = true,
}: KeyProps) => {
  const mathfield = useContext(MathFieldContext);
  useEffect(() => {
    const MQ = window.MathQuill.getInterface(2);
    MQ.StaticMath($(`#mq-keyboard-key-${id}`)[0]) as MathField;
  }, [id]);

  const handleClick = () => {
    if (mathfieldInstructions) {
      mathfield[mathfieldInstructions.method](mathfieldInstructions.content);
    } else {
      onClick?.();
    }
  };

  const renderLabel = (): ReactNode => {
    switch (labelType) {
      case "raw":
        return <p id={`mq-keyboard-rawkey-${id}`}>{label as string}</p>;
      case "tex":
        return (
          <span id={`mq-keyboard-key-${id}`} onClick={(e) => e.stopPropagation()} className='!cursor-pointer'>
            {label as string}
          </span>
        );
      case "svg":
        return label;
    }
  };

  //Styles
  const bgColor = keyCategory === KeyCategory.utility ? "bg-slate-400" : "bg-slate-50";
  const bgHoverColor = keyCategory === KeyCategory.utility ? "hover:bg-slate-500" : "hover:bg-slate-300";
  const innerShadow = "shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]";

  //Event states
  const [isTouchDown, setIsTouchDown] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const onMouseDown = (e: any) => {
    e.preventDefault();
    // e.stopPropagation();
    setIsClicked(true);
    handleClick();
  };

  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (ref.current) {
      for (const child of Array.from(ref.current.children)) {
        for (const grandChild of Array.from(child.children)) {
          grandChild.addEventListener("mousedown", (e: any) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            setIsClicked(true);
            handleClick();
          });
        }
      }
    }
  }, []);
  return (
    <button
      className={`h-12 flex ${
        fullWidth ? "w-full" : "px-2.5"
      } justify-center items-center text-lg font-normal rounded ${bgColor} ${
        !isMobile && bgHoverColor
      } transition-all relative ${isClicked && innerShadow} ${isTouchDown && bgHoverColor} 
      ${labelType === "raw" || labelType === "svg" ? "pt-0" : "pt-1 "}

      `}
      ref={ref}
      id={`mq-keyboard-button-key-${id}`}
      onMouseDown={onMouseDown}
      onMouseUp={() => setIsClicked(false)}
      onMouseLeave={() => {
        if (!isClicked) return;
        setIsClicked(false);
      }}
      onTouchStart={() => setIsTouchDown(true)}
      onTouchEnd={() => setIsTouchDown(false)}
    >
      {renderLabel()}
    </button>
  );
};