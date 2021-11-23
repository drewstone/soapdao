import converter from "phonetic-alphabet-converter";
import { Tooltip } from "@geist-ui/react";
import React, { useCallback, useState } from "react";

const MainTitle = ({
  path = "",
  disablePhonetic,
  deemphasize,
}: MainTitleProps): JSX.Element => {
  const title = "Soap DAO";
  const titleClasses = "title" + (deemphasize ? " deemphasize" : "");
  const [copiedTooltip, setCopiedTooltip] = useState(false);

  const linkCopyClick = useCallback(() => {
    setCopiedTooltip(true);
    navigator.clipboard.writeText("https://dissolve.com/" + path);

    setTimeout(() => setCopiedTooltip(false), 1000);
  }, [path]);

  return (
    <div className={titleClasses}>
      <Tooltip
        text={"Copied!"}
        visible={copiedTooltip}
        trigger="click"
        type="dark"
        offset={-4}
      >
        <div>
        <h2 className="party-url" onClick={linkCopyClick}>
          {title}
        </h2>
        </div>
      </Tooltip>

      {path && !disablePhonetic && (
        <div className="phonetic">({converter(path).join(" ")})</div>
      )}

      <style>{`
        .title {
          transition: all 0.1s ease-out;
          margin: 2em 0 0 0;
          display: flex;
          justify-content: center;
          text-align: center;
        }
        .deemphasize {
          margin-top: -0.25em;
          margin-bottom: -2em;
          transform: scale(0.75);
          filter: saturate(50%) opacity(50%) blur(1px);
        }
        .logo {
          margin: 0.5em;
        }
        .party-url {
          cursor: pointer;
          transform: scale(1);
          transition: transform 0.2s ease-out;
          user-select: none;
          font-family: "Inconsolata", monospace;
          align-text: center;
        }
        .party-url:active {
          transform: scale(0.9);
        }
        @media only screen and (min-width: 385px) {
          .party-url {
            font-size: 2.4em;
          }
        }
        .phonetic {
          margin-top: -0.6em;
          margin-bottom: 1.5em;
          font-size: 0.9em;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

type MainTitleProps = {
  path?: string;
  disablePhonetic?: boolean;
  deemphasize?: boolean;
};

export default MainTitle;
