import type MonacoTypes from "monaco-editor";

const monacoCtx: MonacoContext = {
  deps: [],
  loader: null,
  tsWorker: null,
};

export const getMonaco = async (): Promise<Monaco> => {
  if (!monacoCtx.loader) {
    // lazy-load the monaco AMD script ol' school
    monacoCtx.loader = new Promise<Monaco>((resolve, reject) => {
      const script = document.createElement("script");
      script.addEventListener("error", reject);
      script.addEventListener("load", () => {
        require.config({ paths: { vs: MONACO_VS_URL } });

        // https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs/editor/editor.main.js
        require(["vs/editor/editor.main"], () => {
          resolve((globalThis as any).monaco);
        });
      });
      script.async = true;
      script.src = MONACO_LOADER_URL;
      document.head.appendChild(script);
    });
  }

  return monacoCtx.loader;
};

const getCdnUrl = (pkgName: string, pkgVersion: string, pkgPath: string) => {
  return `https://cdn.jsdelivr.net/npm/${pkgName}@${pkgVersion}${pkgPath}`;
};

const MONACO_VERSION = "0.45.0";
const MONACO_VS_URL = getCdnUrl("monaco-editor", MONACO_VERSION, "/min/vs");
const MONACO_LOADER_URL = `${MONACO_VS_URL}/loader.js`;

export type Monaco = typeof MonacoTypes;
export type IStandaloneCodeEditor = MonacoTypes.editor.IStandaloneCodeEditor;
export type ICodeEditorViewState = MonacoTypes.editor.ICodeEditorViewState;
export type IStandaloneEditorConstructionOptions =
  MonacoTypes.editor.IStandaloneEditorConstructionOptions;
export type IModelContentChangedEvent =
  MonacoTypes.editor.IModelContentChangedEvent;
export type TypeScriptWorker =
  MonacoTypes.languages.typescript.TypeScriptWorker;
export type TypeScriptDiagnostic = MonacoTypes.languages.typescript.Diagnostic;
export type DiagnosticMessageChain =
  MonacoTypes.languages.typescript.DiagnosticMessageChain;

interface MonacoContext {
  deps: NodeModuleDep[];
  loader: Promise<Monaco> | null;
  tsWorker: null | TypeScriptWorker;
}

interface NodeModuleDep {
  pkgName: string;
  pkgPath: string;
  pkgVersion: string;
  path: string;
  code?: string;
  promise?: Promise<void>;
}

declare const require: any;
