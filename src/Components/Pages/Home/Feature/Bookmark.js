import React from "react";
import Toggle from "@mui/material/ToggleButton";

const Bookmark = () => {
  const [bookmark, setBookmark] = React.useState(false);
  return (
    <div>
      <span className="BookmarkUnBookmark">
        <Toggle
          value="check"
          selected={bookmark}
          onChange={() => {
            setBookmark(!bookmark);
          }}
        >
          {bookmark && (
            <div className="QBdPU rrUvL action">
              <svg
                aria-label="Remove"
                className="_ab6-"
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M20 22a.999.999 0 01-.687-.273L12 14.815l-7.313 6.912A1 1 0 013 21V3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1z"></path>
              </svg>
            </div>
          )}
          {!bookmark && (
            <div className="QBdPU rrUvL action">
              <svg
                aria-label="Save"
                className="_ab6-"
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <polygon
                  fill="none"
                  points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></polygon>
              </svg>
            </div>
          )}
        </Toggle>
      </span>
    </div>
  );
};

export default Bookmark;
