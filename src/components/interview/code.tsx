import type { NoSerialize } from "@builder.io/qwik";
import {
  component$,
  useSignal,
  noSerialize,
  useVisibleTask$,
  useStore,
} from "@builder.io/qwik";
import { getMonaco } from "./monaco";

interface CodeEditorProps {
  code: string;
  updateCode: any;
  setMonacoEditor: any;
}

//Monaco editor is quite inefficient and should be updated to be a pure qwik component
export const CodeEditor = component$<CodeEditorProps>((props) => {
  const editorRef = useSignal<HTMLElement>();
  const store = useStore<{ monacoInstance: NoSerialize<any> }>({
    monacoInstance: undefined,
  });

  useVisibleTask$(async () => {
    const monaco: any = await getMonaco();

    console.log("monaco", monaco);
    const monacoEditor = monaco.editor.create(editorRef.value!, {
      value: props.code,
      language: "cpp",
      theme: "vs-dark",
    });
    console.log("monacoEditor", monacoEditor);
    props.setMonacoEditor(monacoEditor);
    monacoEditor.onDidChangeModelContent(() => {
      props.updateCode(monacoEditor.getValue());
    });

    store.monacoInstance = noSerialize(monacoEditor);
  });
  return <div class="w-full h-full rounded-lg resize-y" ref={editorRef}></div>;
});
