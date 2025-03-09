import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import { useEffect, useState } from "react";
import "./Content.css";
import Editor from "react-simple-code-editor";
import { highlight } from "prismjs";
import Markdown from "react-markdown";
import "prismjs/components/prism-javascript";
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from "axios";

const Content = () => {
  const [code, setCode] = useState(
    `const hello = "world";\nconsole.log(hello);`
  );
  const [data, setData] = useState("");
  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function fetchData() {
    let response = await axios.post("https://ai-review.onrender.com/ai/get-review", {
      code,
    });
    setData(response.data);
    console.log(response.data);
  }
  return (
    <main className="flex h-screen w-screen overflow-hidden gap-4 p-4">
      <div className="w-1/2 h-full rounded-md relative">
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, prism.languages.javascript)}
          padding={10}
          style={{
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            fontSize: 16,
            height: "100%",
            width: "100%",
            borderRadius: "5px",
            backgroundColor: "black",
            color: "#ffffff",
          }}
        />
        <button
          onClick={fetchData}
          className="text-white absolute bottom-4 cursor-pointer select-none right-4 bg-blue-600 px-3 py-1 rounded-md"
        >
          Review
        </button>
      </div>
      <div className="w-1/2 h-full bg-neutral-800 text-white rounded-md overflow-auto">
      <h1 className="font-bold text-2xl text-center py-4 text-white">Ai Review</h1>
      <div className="px-4 pb-4">
        <Markdown rehypePlugins={[rehypeHighlight]}>
      {data}
      </Markdown>
      </div>
      </div>


    </main>
  );
};

export default Content;
