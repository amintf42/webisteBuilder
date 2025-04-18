"use client";
import { Button } from "@/components/ui/button";
import { getFunnelPageDetails } from "@/lib/queries";
import { useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { EyeOff } from "lucide-react";
import React, { useEffect, useRef } from "react";
import Recursive from "./funnel-editor-components/recursive";
import { useEditorRef } from "../../editor-ref-context";

type Props = { funnelPageId: string; liveMode?: boolean };

const FunnelEditor = ({ funnelPageId, liveMode }: Props) => {
  const { dispatch, state } = useEditor();
  // const editorRef = useRef<HTMLDivElement>(null);

  const editorRef = useEditorRef();

  // useEffect(() => {
  //   if (editorRef.current) {
  //     console.log("Editor is mounted!", editorRef.current);
  //   }
  // }, []);

  // useEffect(() => {
  //   const saved = localStorage.getItem("my-template");
  //   if (saved) {
  //     const parsed = JSON.parse(saved);
  //     dispatch({
  //       type: "LOAD_DATA",
  //       payload: {
  //         elements: parsed,
  //         withLive: !!liveMode,
  //       },
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (liveMode) {
      dispatch({
        type: "TOGGLE_LIVE_MODE",
        payload: { value: true },
      });
    }
  }, [liveMode]);

  //CHALLENGE: make this more performant
  useEffect(() => {
    const fetchData = async () => {
      // const response = await getFunnelPageDetails(funnelPageId);
      const response = localStorage.getItem("new-my-template");
      // console.log("response111", response[0].);

      if (!response) return;
      dispatch({
        type: "LOAD_DATA",
        payload: {
          elements: response ? JSON.parse(response) : "",
          withLive: !!liveMode,
        },
      });
    };
    fetchData();
  }, [funnelPageId]);

  const handleClick = () => {
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {},
    });
  };

  const handleUnpreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };
  return (
    <div
      ref={editorRef}
      id="editor"
      className={clsx(
        "use-automation-zoom-in h-full overflow-scroll mr-[385px] bg-background transition-all rounded-md",
        {
          "!p-0 !mr-0":
            state.editor.previewMode === true || state.editor.liveMode === true,
          "!w-[850px]": state.editor.device === "Tablet",
          "!w-[420px]": state.editor.device === "Mobile",
          "w-full": state.editor.device === "Desktop",
        }
      )}
      onClick={handleClick}
    >
      {state.editor.previewMode && state.editor.liveMode && (
        <Button
          variant={"ghost"}
          size={"icon"}
          className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]"
          onClick={handleUnpreview}
        >
          <EyeOff />
        </Button>
      )}
      {Array.isArray(state.editor.elements) &&
        state.editor.elements.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </div>
  );
};

export default FunnelEditor;
