"use client";
import { useState } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";

const ContextMenuDemo = ({ children }) => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const translate = async (textSelection, lang) => {
    const prompt = `Translate the following English text to ${lang}: ${textSelection}`;
    setPrompt(prompt);
    setResult("...");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    try {
      const json = await res.json();
      setResult(json.result);
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  };

  return (
    <div className="flex flex-row gap-3">
      <section className="flex-1 rounded p-3 border border-solid border-black">
        <ContextMenu.Root>
          <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
          <ContextMenu.Portal>
            <ContextMenu.Content
              className="min-w-[220px] bg-white rounded-md p-1 shadow-md"
              sideOffset={5}
              align="end"
            >
              <ContextMenu.Label
                // className="ContextMenuLabel"
                className="pl-6 text-[12px] leading-6"
              >
                Translate To:
              </ContextMenu.Label>

              <ContextMenu.Item
                // className="ContextMenuRadioItem"
                className={[
                  "text-[13px] text-violet-800 rounded-sm flex items-center h-6 px-1 relative pl-6 select-none outline-none",
                  "data-[highlighted]:bg-violet-400",
                ].join(" ")}
                onClick={() => {
                  translate(window.getSelection().toString(), "French");
                }}
              >
                🇫🇷 French
              </ContextMenu.Item>
              <ContextMenu.Item
                // className="ContextMenuRadioItem"
                className={[
                  "text-[13px] text-violet-800 rounded-sm flex items-center h-6 px-1 relative pl-6 select-none outline-none",
                  "data-[highlighted]:bg-violet-400",
                ].join(" ")}
                onClick={() => {
                  translate(window.getSelection().toString(), "Chinese");
                }}
              >
                🇨🇳 Chinese
              </ContextMenu.Item>
              <ContextMenu.Item
                // className="ContextMenuRadioItem"
                className={[
                  "text-[13px] text-violet-800 rounded-sm flex items-center h-6 px-1 relative pl-6 select-none outline-none",
                  "data-[highlighted]:bg-violet-400",
                ].join(" ")}
                onClick={() => {
                  translate(window.getSelection().toString(), "German");
                }}
              >
                🇩🇪 German
              </ContextMenu.Item>
              <ContextMenu.Item
                // className="ContextMenuRadioItem"
                className={[
                  "text-[13px] text-violet-800 rounded-sm flex items-center h-6 px-1 relative pl-6 select-none outline-none",
                  "data-[highlighted]:bg-violet-400",
                ].join(" ")}
                onClick={() => {
                  translate(window.getSelection().toString(), "Japanese");
                }}
              >
                🇯🇵 Japanese
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Portal>
        </ContextMenu.Root>
      </section>

      <section className="flex-1 flex flex-col rounded p-3 border border-solid border-black gap-6">
        <div>
          <h3 className="">Prompt:</h3>
          {prompt}
        </div>
        <div>
          <h3 className="">Result:</h3>
          {result}
        </div>
      </section>
    </div>
  );
};

export default ContextMenuDemo;
