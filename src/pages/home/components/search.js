import React from "react";

export default function Search({ searchKey, setSearchKey }) {
  return (
    <div className="user-search-area">
      <input
        type="text"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        className="user-search-text"
      />
      <i className="fa fa-search user-search-btn" aria-hidden="true"></i>
    </div>
  );
}
