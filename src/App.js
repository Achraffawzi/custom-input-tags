import { useRef, useState } from "react";
import "./app.css";
import { FaTags } from "react-icons/fa";

function App() {
  const tagsWrapper = useRef();
  const inputRef = useRef();

  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && tags.length < 6 && tag.length > 0) {
      setTags((tags) => [...tags, tag]);
      setTag("");
    }
  };

  const handleRemoveTag = (e) => {
    if (e.key === "Backspace" && tag === "") {
      setTags((oldTags) => oldTags.slice(0, oldTags.length - 1));
    }
  };

  const handleRemove = (singleTag) => {
    setTags((oldTags) => oldTags.filter((tag) => tag !== singleTag));
  };

  const handleRemoveAll = () => {
    setTags([]);
  };

  return (
    <div className="app">
      <h3 className="app-title">
        <FaTags />
        <span>Tags</span>
      </h3>
      <div
        className="tags-wrapper"
        ref={tagsWrapper}
        onClick={() => inputRef.current.focus()}
      >
        <div className="tags-selected">
          {tags.map((singleTag, index) => (
            <span className="single-tag" key={index}>
              {singleTag}{" "}
              <span className="close" onClick={() => handleRemove(singleTag)}>
                &times;
              </span>
            </span>
          ))}
        </div>
        <input
          type="text"
          className="tags-input"
          ref={inputRef}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
          onKeyDown={(e) => handleRemoveTag(e)}
          placeholder="Add a tag"
        />
      </div>
      <div className="bottom">
        <p>{6 - tags.length} tags remaining</p>
        <button
          onClick={() => handleRemoveAll()}
          type="button"
          className="delete-button"
        >
          remove all tags
        </button>
      </div>
    </div>
  );
}

export default App;
