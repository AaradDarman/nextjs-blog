import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import { WithContext as ReactTags } from "react-tag-input";

const TagsInput = ({ values, onChange, tagStyle, intent }) => {
  const [value, setValue] = useState();
  const [tags, setTags] = useState(values);
  const router = useRouter();
  const { id } = router.query;
  const KeyCodes = {
    enter: [10, 13],
  };

  useEffect(() => {
    if (id) setTags(values);
  }, [values]);

  const delimiters = [...KeyCodes.enter, KeyCodes.comma];

  const handleDelete = (i) => {
    setTags((prev) => prev.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    if (tags) {
      setTags((prev) => [...prev, tag]);
    } else {
      setTags([tag]);
    }
    setValue("");
  };

  const handleDrag = (tag, currPos, newPos) => {
    const cloneTags = [...tags];
    const newTags = cloneTags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  useEffect(() => {
    onChange(tags);
  }, [tags]);

  return (
    <ReactTags
      tags={tags}
      classNames={{
        tagInput: "bp3-form-group",
        tagInputField: `${intent} bp3-input`,
        tag: `${tagStyle}`,
      }}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      delimiters={delimiters}
      inputFieldPosition="top"
      handleInputChange={(e) => setValue(e.replace(/ /g, "-"))}
      inputValue={value}
      placeholder=""
    />
  );
};
export default TagsInput;
