"use client";

import { Button } from "@/components/ui/button";
import {
  ChainedCommands,
  Editor,
  EditorContent,
  useEditor,
} from "@tiptap/react";
import { type Level } from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";

export function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  function onHeaderClicked(level: Level) {
    editor?.chain().focus().toggleHeading({ level }).run();
  }

  function onBoldClicked() {
    editor?.chain().toggleBold().run();
  }
  function onItalicClicked() {
    editor?.chain().focus().toggleItalic().run();
  }
  function onStrikeClicked() {
    editor?.chain().focus().toggleStrike().run();
  }

  function getEditorClass(
    attr: string,
    level?: Level
  ): "default" | "secondary" {
    let isActive = false;
    if (level) {
      isActive = editor?.isActive(attr, { level }) as boolean;
    } else {
      isActive = editor?.isActive(attr) as boolean;
    }

    return isActive ? "default" : "secondary";
  }

  const buttons = [
    {
      label: "H1",
      onClick: () => onHeaderClicked(1),
      variant: getEditorClass("heading", 1),
    },
    {
      label: "H2",
      onClick: () => onHeaderClicked(2),
      variant: getEditorClass("heading", 2),
    },
    {
      label: "H3",
      onClick: () => onHeaderClicked(3),
      variant: getEditorClass("heading", 3),
    },
    {
      label: "Bold",
      onClick: () => onBoldClicked(),
      variant: getEditorClass("bold"),
    },
    {
      label: "Italic",
      onClick: () => onItalicClicked(),
      variant: getEditorClass("italic"),
    },
    {
      label: "Strike",
      onClick: () => onStrikeClicked(),
      variant: getEditorClass("strike"),
    },
  ];

  return (
    <div className="flex flex-wrap gap-5">
      {buttons.map((button) => (
        <Button
          key={button.label}
          type="button"
          onClick={button.onClick}
          variant={button.variant}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
}

export function TitapEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <h1>Welcome to Tiptap!</h1>
      <p>This is a WYSIWYG editor.</p>
    `,
    editorProps: {
      attributes: {
        class:
          "focus:outline-none focus:ring-0 min-h-[150px] prose prose-sm sm:prose-base",
      },
    },
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="rounded-lg border p-2 min-h-[150px] mt-2"
      />
    </div>
  );
}
