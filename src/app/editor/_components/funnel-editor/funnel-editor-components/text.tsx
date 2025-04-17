"use client";
import { Badge } from "@/components/ui/badge";
// import { EditorBtns, defaultStyles } from "@/lib/constants";

import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { Trash } from "lucide-react";
import React from "react";
// import { v4 } from "uuid";

type Props = {
  element: EditorElement;
};

const TextComponent = (props: Props) => {
  // const { id, content, name, styles, type } = element;

  const { dispatch, state } = useEditor();

  // const handleOnDrop = (e: React.DragEvent, type: string) => {
  //   e.stopPropagation();
  //   const componentType = e.dataTransfer.getData("componentType") as EditorBtns;

  //   switch (componentType) {
  //     case "text":
  //       dispatch({
  //         type: "ADD_ELEMENT",
  //         payload: {
  //           containerId: id,
  //           elementDetails: {
  //             content: { innerText: "Text Element" },
  //             id: v4(),
  //             name: "Text",
  //             styles: {
  //               color: "black",
  //               ...defaultStyles,
  //             },
  //             type: "text",
  //           },
  //         },
  //       });
  //       break;
  //     case "link":
  //       dispatch({
  //         type: "ADD_ELEMENT",
  //         payload: {
  //           containerId: id,
  //           elementDetails: {
  //             content: {
  //               innerText: "Link Element",
  //               href: "#",
  //             },
  //             id: v4(),
  //             name: "Link",
  //             styles: {
  //               color: "black",
  //               ...defaultStyles,
  //             },
  //             type: "link",
  //           },
  //         },
  //       });
  //       break;
  //     case "video":
  //       dispatch({
  //         type: "ADD_ELEMENT",
  //         payload: {
  //           containerId: id,
  //           elementDetails: {
  //             content: {
  //               href: "",
  //             },
  //             id: v4(),
  //             name: "Video",
  //             styles: {},
  //             type: "video",
  //           },
  //         },
  //       });
  //       break;
  //     case "container":
  //       dispatch({
  //         type: "ADD_ELEMENT",
  //         payload: {
  //           containerId: id,
  //           elementDetails: {
  //             content: [],
  //             id: v4(),
  //             name: "Container",
  //             styles: { ...defaultStyles },
  //             type: "container",
  //           },
  //         },
  //       });
  //       break;
  //     case "contactForm":
  //       dispatch({
  //         type: "ADD_ELEMENT",
  //         payload: {
  //           containerId: id,
  //           elementDetails: {
  //             content: [],
  //             id: v4(),
  //             name: "Contact Form",
  //             styles: {},
  //             type: "contactForm",
  //           },
  //         },
  //       });
  //       break;
  //     case "paymentForm":
  //       dispatch({
  //         type: "ADD_ELEMENT",
  //         payload: {
  //           containerId: id,
  //           elementDetails: {
  //             content: [],
  //             id: v4(),
  //             name: "Contact Form",
  //             styles: {},
  //             type: "paymentForm",
  //           },
  //         },
  //       });
  //       break;
  //     case "2Col":
  //       dispatch({
  //         type: "ADD_ELEMENT",
  //         payload: {
  //           containerId: id,
  //           elementDetails: {
  //             content: [
  //               {
  //                 content: [],
  //                 id: v4(),
  //                 name: "Container",
  //                 styles: { ...defaultStyles, width: "100%" },
  //                 type: "container",
  //               },
  //               {
  //                 content: [],
  //                 id: v4(),
  //                 name: "Container",
  //                 styles: { ...defaultStyles, width: "100%" },
  //                 type: "container",
  //               },
  //             ],
  //             id: v4(),
  //             name: "Two Columns",
  //             styles: { ...defaultStyles, display: "flex" },
  //             type: "2Col",
  //           },
  //         },
  //       });
  //       break;
  //   }
  // };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };
  const styles = props.element.styles;

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: props.element,
      },
    });
  };

  //WE ARE NOT ADDING DRAG DROP
  return (
    <div
      style={styles}
      className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all",
        {
          "!border-blue-500":
            state.editor.selectedElement.id === props.element.id,

          "!border-solid": state.editor.selectedElement.id === props.element.id,
          "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      <p
        className="text-red-400 w-full"
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => {
          const spanElement = e.target as HTMLSpanElement;
          dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
              elementDetails: {
                ...props.element,
                content: {
                  innerText: spanElement.innerText,
                },
              },
            },
          });
        }}
      >
        {!Array.isArray(props.element.content) &&
          props.element.content.innerText}
      </p>
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};

export default TextComponent;
