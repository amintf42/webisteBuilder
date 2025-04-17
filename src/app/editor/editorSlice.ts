// features/editor/editorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ElementNode {
  tag: string;
  id?: string;
  class?: string;
  attributes?: Record<string, string>;
  children?: ElementNode[];
}

interface EditorState {
  structure: ElementNode | null;
}

const initialState: EditorState = {
  structure: null,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setStructure: (state, action: PayloadAction<ElementNode>) => {
      state.structure = action.payload;
    },
  },
});

export const { setStructure } = editorSlice.actions;
export default editorSlice.reducer;
