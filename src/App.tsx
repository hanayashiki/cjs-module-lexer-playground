import { useDeferredValue, useEffect, useMemo, useState } from "react";

import { init, parse } from "cjs-module-lexer";

import packageJson from "../node_modules/cjs-module-lexer/package.json";

const EXAMPLE_CODE = `
module.exports.asdf = 'asdf';
exports = 'asdf';
module.exports = require('./asdf');
if (maybe)
  module.exports = require("./another");
`.trim();

const GithubIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
};

const urlCode = new URLSearchParams(location.search).get("code");

function App() {
  const [code, setCode] = useState(
    urlCode ? atob(urlCode) : localStorage.getItem("code") ?? EXAMPLE_CODE
  );

  const deferredCode = useDeferredValue(code);

  const [lexerLoading, setLexerLoading] = useState(true);

  useEffect(() => {
    init().then(() => setLexerLoading(false));
  }, []);

  const result = useMemo(() => {
    localStorage.setItem("code", deferredCode);
    if (lexerLoading) {
      return {};
    }
    try {
      return parse(deferredCode ?? ";");
    } catch (e) {
      return String(e);
    }
  }, [deferredCode, lexerLoading]);

  return (
    <div className="h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 bg-gray-900 text-lg flex gap-x-4">
        <div>CJS Module Lexer Playground</div>{" "}
        <button className="text-gray-400" onClick={() => setCode(EXAMPLE_CODE)}>
          Reset
        </button>
        <button
          className="text-gray-400"
          onClick={() => {
            navigator.clipboard.writeText(
              location.origin + `?code=${btoa(code)}`
            );
          }}
        >
          Share
        </button>
        <div className="flex-1" />
        <div className="text-gray-400">
          <a
            href={`https://www.npmjs.com/package/${packageJson.name}/v/${packageJson.version}`}
            target="_blank"
          >
            {packageJson.name}@{packageJson.version}
          </a>
        </div>
        <a
          href={`https://github.com/hanayashiki/cjs-module-lexer-playground`}
          target="_blank"
        >
          <GithubIcon />
        </a>
      </div>
      <div className="flex flex-1">
        <textarea
          className="flex-1 font-mono bg-transparent p-4"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Copy or input some CommonJS here..."
        />
        <div className="flex-1 font-mono whitespace-pre p-4">
          {lexerLoading ? "Loading..." : JSON.stringify(result, null, 2)}
        </div>
      </div>
    </div>
  );
}

export default App;
