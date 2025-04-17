// src/utils/domToJSON.ts
export interface ElementNode {
  tag: string;
  id?: string;
  class?: string;
  attributes?: Record<string, string>;
  children?: ElementNode[];
}

const getAttributes = (el: HTMLElement) => {
  const attrs: Record<string, string> = {};
  Array.from(el.attributes).forEach((attr) => {
    if (attr.name !== "id" && attr.name !== "class") {
      attrs[attr.name] = attr.value;
    }
  });
  return attrs;
};

export const domToJSON = (element: HTMLElement): ElementNode => {
  return {
    tag: element.tagName.toLowerCase(),
    id: element.id || undefined,
    class: element.className || undefined,
    attributes: getAttributes(element),
    children: Array.from(element.children).map((child) =>
      domToJSON(child as HTMLElement)
    ),
  };
};
