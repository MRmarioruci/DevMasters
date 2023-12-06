import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';

interface ICodeHighlighterProps {
  code: string;
  language: string;
  theme: string;
}

const CodeHighlighter = ({ code, language, theme }: ICodeHighlighterProps) => {
  const codeRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
	  hljs.highlightAll();
  }, [])

  /* useEffect(() => {
	if (codeRef.current && codeRef.current.dataset.highlighted) {
		delete codeRef.current.dataset.highlighted
	}
    const highlightCode = async () => {
      try {
        const themeModule = await import(`highlight.js/styles/${theme}.css`) as any;
		console.log(themeModule);
        themeModule.default && themeModule.default();
      } catch (error) {
        console.error(`Failed to import theme: ${theme}`);
      }

      let hljs = await import('highlight.js') as any;
	  hljs = hljs.HighlightJS
      // Explicitly initialize only the code block
      if (codeRef.current) {
        hljs.highlightAll();
      }
    };

    highlightCode();
  }, [code, language, theme]); */

  return (
    <pre>
      <code className={`language-${language}`} ref={codeRef}>
        {code}
      </code>
    </pre>
  );
};

export default CodeHighlighter;
