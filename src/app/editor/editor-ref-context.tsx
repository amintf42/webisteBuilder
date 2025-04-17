"use client";
// import { createContext, useContext, useRef } from "react";

// const EditorRefContext = createContext<any>(null);

// export const EditorRefProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const editorRef = useRef<HTMLDivElement>(null);
//   return (
//     <EditorRefContext.Provider value={editorRef}>
//       {children}
//     </EditorRefContext.Provider>
//   );
// };

// export const useEditorRef = () => useContext(EditorRefContext);

// "use client";
import React, { createContext, useContext, useRef } from "react";

// ۱. کانتکست درست می‌کنیم
const EditorRefContext = createContext<React.RefObject<HTMLDivElement> | null>(
  null
);

// ۲. Provider تعریف می‌کنیم
export const EditorRefProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  return (
    <EditorRefContext.Provider value={editorRef}>
      {children}
    </EditorRefContext.Provider>
  );
};

// ۳. هوک برای استفاده از ref در فایل‌های دیگه
export const useEditorRef = () => {
  const context = useContext(EditorRefContext);
  if (!context) {
    throw new Error("useEditorRef must be used within an EditorRefProvider");
  }
  return context;
};
