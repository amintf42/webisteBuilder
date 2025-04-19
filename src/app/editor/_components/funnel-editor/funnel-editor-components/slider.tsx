// "use client";
// import { Badge } from "@/components/ui/badge";
// import { EditorBtns, defaultStyles } from "@/lib/constants";
// import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
// import clsx from "clsx";
// import React from "react";
// import { v4 } from "uuid";
// import Recursive from "./recursive";
// import { Trash } from "lucide-react";

// type Props = { element: EditorElement };

// const Slider = ({ element }: Props) => {
//   const { id, content, name, styles, type } = element;
//   const { dispatch, state } = useEditor();

//   const handleOnDrop = (e: React.DragEvent, type: string) => {
//     e.stopPropagation();

//     const componentType = e.dataTransfer.getData("componentType") as EditorBtns;
//     console.log("component type", componentType);

//     switch (componentType) {
//       case "text":
//         dispatch({
//           type: "ADD_ELEMENT",
//           payload: {
//             containerId: id,
//             elementDetails: {
//               content: { innerText: "Text Element" },
//               id: v4(),
//               name: "Text",
//               styles: {
//                 color: "black",
//                 ...defaultStyles,
//               },
//               type: "text",
//             },
//           },
//         });
//         break;
//       case "link":
//         dispatch({
//           type: "ADD_ELEMENT",
//           payload: {
//             containerId: id,
//             elementDetails: {
//               content: {
//                 innerText: "Link Element",
//                 href: "#",
//               },
//               id: v4(),
//               name: "Link",
//               styles: {
//                 color: "black",
//                 ...defaultStyles,
//               },
//               type: "link",
//             },
//           },
//         });
//         break;
//       case "video":
//         dispatch({
//           type: "ADD_ELEMENT",
//           payload: {
//             containerId: id,
//             elementDetails: {
//               content: {
//                 href: "",
//               },
//               id: v4(),
//               name: "Video",
//               styles: {},
//               type: "video",
//             },
//           },
//         });
//         break;
//       case "container":
//         dispatch({
//           type: "ADD_ELEMENT",
//           payload: {
//             containerId: id,
//             elementDetails: {
//               content: [],
//               id: v4(),
//               name: "Container",
//               styles: { ...defaultStyles },
//               type: "container",
//             },
//           },
//         });
//         break;
//       case "contactForm":
//         dispatch({
//           type: "ADD_ELEMENT",
//           payload: {
//             containerId: id,
//             elementDetails: {
//               content: [],
//               id: v4(),
//               name: "Contact Form",
//               styles: {},
//               type: "contactForm",
//             },
//           },
//         });
//         break;
//       case "paymentForm":
//         dispatch({
//           type: "ADD_ELEMENT",
//           payload: {
//             containerId: id,
//             elementDetails: {
//               content: [],
//               id: v4(),
//               name: "Contact Form",
//               styles: {},
//               type: "paymentForm",
//             },
//           },
//         });
//         break;
//       case "2Col":
//         dispatch({
//           type: "ADD_ELEMENT",
//           payload: {
//             containerId: id,
//             elementDetails: {
//               content: [
//                 {
//                   content: [],
//                   id: v4(),
//                   name: "Container",
//                   styles: { ...defaultStyles, width: "100%" },
//                   type: "container",
//                 },
//                 {
//                   content: [],
//                   id: v4(),
//                   name: "Container",
//                   styles: { ...defaultStyles, width: "100%" },
//                   type: "container",
//                 },
//               ],
//               id: v4(),
//               name: "Two Columns",
//               styles: { ...defaultStyles, display: "flex" },
//               type: "2Col",
//             },
//           },
//         });
//         break;
//     }
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//   };

//   const handleDragStart = (e: React.DragEvent, type: string) => {
//     if (type === "__body") return;
//     e.dataTransfer.setData("componentType", type);
//   };

//   const handleOnClickBody = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     dispatch({
//       type: "CHANGE_CLICKED_ELEMENT",
//       payload: {
//         elementDetails: element,
//       },
//     });
//   };

//   const handleDeleteElement = () => {
//     dispatch({
//       type: "DELETE_ELEMENT",
//       payload: {
//         elementDetails: element,
//       },
//     });
//   };

//   return (
//     <div
//       style={styles}
//       className={clsx("relative p-4 transition-all group", {
//         "max-w-full w-full": type === "container" || type === "2Col",
//         "h-fit": type === "container",
//         "h-full": type === "__body",
//         "overflow-scroll ": type === "__body",
//         "flex flex-col md:!flex-row": type === "2Col",
//         "!border-blue-500":
//           state.editor.selectedElement.id === id &&
//           !state.editor.liveMode &&
//           state.editor.selectedElement.type !== "__body",
//         "!border-yellow-400 !border-4":
//           state.editor.selectedElement.id === id &&
//           !state.editor.liveMode &&
//           state.editor.selectedElement.type === "__body",
//         "!border-solid":
//           state.editor.selectedElement.id === id && !state.editor.liveMode,
//         "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
//       })}
//       onDrop={(e) => handleOnDrop(e, id)}
//       onDragOver={handleDragOver}
//       draggable={type !== "__body"}
//       onClick={handleOnClickBody}
//       onDragStart={(e) => handleDragStart(e, "slider")}
//     >
//       <Badge
//         className={clsx(
//           "absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg hidden",
//           {
//             block:
//               state.editor.selectedElement.id === element.id &&
//               !state.editor.liveMode,
//           }
//         )}
//       >
//         {element.name}
//       </Badge>

//       {Array.isArray(content) &&
//         content.map((childElement) => (
//           <Recursive key={childElement.id} element={childElement} />
//         ))}

//       {state.editor.selectedElement.id === element.id &&
//         !state.editor.liveMode &&
//         state.editor.selectedElement.type !== "__body" && (
//           <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg ">
//             <Trash size={16} onClick={handleDeleteElement} />
//           </div>
//         )}
//     </div>
//   );
// };

// export default Slider;

"use client";
import { Badge } from "@/components/ui/badge";
import { Splide, SplideSlide } from "@splidejs/react-splide";

// import { EditorBtns, defaultStyles } from "@/lib/constants";

// Default theme
import "@splidejs/react-splide/css";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";

import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { Trash } from "lucide-react";
import React from "react";
// import { v4 } from "uuid";

type Props = {
  element: EditorElement;
};

const Slider = (props: Props) => {
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
      <div
        className="text-red-200 w-full"
        // contentEditable={!state.editor.liveMode}
        // onBlur={(e) => {
        //   const spanElement = e.target as HTMLSpanElement;
        //   dispatch({
        //     type: "UPDATE_ELEMENT",
        //     payload: {
        //       elementDetails: {
        //         ...props.element,
        //         content: {
        //           innerText: spanElement.innerText,
        //         },
        //       },
        //     },
        //   });
        // }}
      >
        {/* {!Array.isArray(props.element.content) &&
          props.element.content.innerText} */}
        <Splide
          aria-label="My Favorite Images"
          options={{
            perPage: 4,
            perMove: 1,
            gap: "1.5rem",
            pagination: true,
            type: "loop",
          }}
        >
          <SplideSlide>
            <img src="image1.jpg" alt="Image 5" />
            <h1
              className="text-blue-600"
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
            </h1>
          </SplideSlide>
          <SplideSlide>
            <img src="image1.jpg" alt="Image 5" />
            <h1
              className="text-blue-600"
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
            </h1>
          </SplideSlide>{" "}
          <SplideSlide>
            <img src="image1.jpg" alt="Image 5" />
            <h1
              className="text-blue-600"
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
            </h1>
          </SplideSlide>{" "}
          <SplideSlide>
            <img src="image1.jpg" alt="Image 5" />
            <h1
              className="text-blue-600"
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
            </h1>
          </SplideSlide>{" "}
          <SplideSlide>
            <img src="image1.jpg" alt="Image 5" />
            <h1
              className="text-blue-600"
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
            </h1>
          </SplideSlide>
        </Splide>
      </div>

      {!state.editor.liveMode && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            const newSlide = {
              image: "",
              title: "عنوان جدید",
            };
            dispatch({
              type: "UPDATE_ELEMENT",
              payload: {
                elementDetails: {
                  ...props.element,
                  content: [...(props.element.content as any[]), newSlide],
                },
              },
            });
          }}
        >
          + افزودن اسلاید
        </button>
      )}
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

export default Slider;
