"use client";
import { Editor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Props = {
  content: JSONContent;
};

export default function ProductDescription({ content }: Props) {
  const editor = new Editor({
    content,
    editable: false,
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base",
      },
    },
  });

  if (!editor) {
    return null;
  }
  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
}
