"use client";
import EditorProvider from "@/providers/editor/editor-provider";
import React from "react";
import FunnelEditorNavigation from "../_components/funnel-editor-navigation";
import FunnelEditorSidebar from "../_components/funnel-editor-sidebar";
import FunnelEditor from "../_components/funnel-editor";

import { EditorRefProvider } from "../editor-ref-context";

type Props = {
  params: {
    subaccountId: string;
    funnelId: string;
    funnelPageId: string;
  };
};

const Page = ({ params }: Props) => {
  const pageDetails = {
    id: params.funnelPageId,
    name: "Sample Page",
    pathName: "/sample",
    content: "[]",
  };

  console.log("page details", pageDetails);

  return (
    <EditorRefProvider>
      <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
        <EditorProvider
          subaccountId={params.subaccountId}
          funnelId={params.funnelId}
          pageDetails={pageDetails}
        >
          <FunnelEditorNavigation
            funnelId={params.funnelId}
            subaccountId={params.subaccountId}
          />
          <div className="h-full flex justify-center">
            <FunnelEditor funnelPageId={params.funnelPageId} />
          </div>
          <FunnelEditorSidebar subaccountId={params.subaccountId} />
        </EditorProvider>
      </div>
    </EditorRefProvider>
  );
};

export default Page;
