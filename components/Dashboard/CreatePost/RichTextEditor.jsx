import React, { useState, useEffect } from "react";

import { EditorState, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import produce from "immer";
import styled from "styled-components";
import _ from "lodash";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from "react-redux";

import { useCreatePost } from "../../../context/post-context";
import { useDarkMode } from "../../../utils/useDarkMode";

const EditorContainer = styled.div`
  height: 100%;
  .richtext-wrapper-class {
    background-color: ${({ theme }) => theme.primary};
    height: 100%;
    display: flex;
    flex-direction: column;
    direction: ltr;
  }
  .toolbar-class {
    direction: ltr;
    text-align: left;
  }
  .toolbar-class,
  .editor-class {
    border: 1px solid ${({ theme }) => theme.secondary};
    border-radius: 0.3rem;
  }
  .toolbar-class,
  .rdw-dropdown-optionwrapper,
  .rdw-embedded-modal,
  .rdw-colorpicker-modal,
  .rdw-link-modal,
  .rdw-emoji-modal,
  .rdw-image-modal {
    background-color: ${({ theme }) => theme.primary};
  }
  .rdw-dropdown-wrapper {
    background-color: ${({ theme }) => theme.secondary};
  }
  .rdw-embedded-modal input,
  .rdw-link-modal input,
  .rdw-image-modal-upload-option,
  .rdw-image-modal input {
    background: inherit;
    color: inherit;
    border: 1px solid ${({ theme }) => theme.secondary};
  }
  .rdw-link-modal-btn,
  .rdw-embedded-modal-btn,
  .rdw-image-modal-btn {
    background-color: ${({ theme }) => theme.secondary};
    border: 1px solid ${({ theme }) => theme.secondary};
  }
  .rdw-link-modal-btn:hover,
  .rdw-embedded-modal-btn:hover,
  .rdw-image-modal-btn:hover {
    box-shadow: 1px 1px 0px ${({ theme }) => theme.secondary};
  }
  .rdw-link-modal-btn:disabled,
  .rdw-embedded-modal-btn:disabled,
  .rdw-image-modal-btn:disabled {
    background: rgba(40, 59, 41, 0.5);
  }
  .rdw-link-modal {
    height: 220px;
  }
  .rdw-embedded-modal,
  .rdw-colorpicker-modal,
  .rdw-link-modal,
  .rdw-emoji-modal,
  .rdw-image-modal {
    border: 1px solid ${({ theme }) => theme.secondary};
    box-shadow: 1px 1px 0px ${({ theme }) => theme.secondary};
  }
  .rdw-colorpicker-modal-options {
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .rdw-editor-main pre {
    background: ${({ theme }) => theme.secondary};
    color: inherit;
  }
  .editor-class {
    flex: 1;
    overflow: hidden;
  }
  .DraftEditor-root {
    overflow-y: scroll;
    padding: 0.5rem;
  }
  .rdw-dropdown-wrapper,
  .rdw-dropdown-optionwrapper {
    border: 1px solid ${({ theme }) => theme.secondary};
  }
  .rdw-dropdown-wrapper:hover {
    box-shadow: 1px 1px 0px ${({ theme }) => theme.secondary};
    background-color: ${({ theme }) => theme.secondary};
  }
  .rdw-dropdown-optionwrapper:hover {
    box-shadow: 1px 1px 0px ${({ theme }) => theme.secondary};
    background-color: ${({ theme }) => theme.primary};
  }
  .rdw-dropdownoption-default.rdw-dropdownoption-highlighted,
  .rdw-dropdownoption-active {
    background: ${({ theme }) => theme.secondary};
  }
  .rdw-option-wrapper {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.secondary};
  }
  .rdw-option-wrapper:hover {
    box-shadow: 1px 1px 0px ${({ theme }) => theme.secondary};
  }
  .rdw-option-active {
    box-shadow: 1px 1px 0px ${({ theme }) => theme.text} inset;
  }
  .rdw-dropdown-selectedtext {
    color: initial;
  }
  .rdw-dropdown-selectedtext:hover {
    text-decoration: none;
    color: initial;
  }
`;

const RichTextEditor = ({ intent }) => {
  const { content, setContent, contentImages, setContentImages } =
    useCreatePost();
  const [contentImagesLength, setcontentImagesLength] = useState(0);
  const { post } = useSelector((state) => state);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (!_.isEmpty(post?.entity?.content)) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(post?.entity?.content))
      );
    }
  }, [post?.entity]);

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const uploadImageCallBack = (file) => {
    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    };

    setContentImages((prev) => [...prev, imageObject]);

    return new Promise((resolve, reject) => {
      resolve({ data: { link: imageObject.localSrc } });
    });
  };

  const handleOnChange = (e) => {
    console.log(e);
    if (!_.isEmpty(e.entityMap)) {
      const nextState = produce(e, (draftState) => {
        Object.keys(draftState.entityMap).map(function (key, index) {
          let targetImg = contentImages.find(
            (img) => img.localSrc === draftState.entityMap[key].data.src
          );
          if (targetImg) {
            return (draftState.entityMap[
              key
            ].data.src = `${targetImg?.file?.name}`);
          }
        });
      });
      setContent(nextState);
    } else {
      setContent(e);
    }
    let entityKeys = Object.keys(e.entityMap);
    let imagesLength = entityKeys?.map(
      (key) => e?.entityMap[key]?.type === "IMAGE"
    )?.length;
    setcontentImagesLength(imagesLength);
  };

  useEffect(() => {
    if (content?.entityMap) {
      let entityKeys = Object.keys(content?.entityMap);
      let images = entityKeys?.map(
        (key) =>
          content?.entityMap[key]?.type === "IMAGE" &&
          content?.entityMap[key].data
      );
      images?.forEach((img) => {
        if (contentImagesLength < contentImages.length) {
          let filteredImages = contentImages.filter(
            (cimg) => cimg.file.name === img.src
          );
          setContentImages(filteredImages);
        }
      });
    }
  }, [contentImagesLength]);

  const [theme] = useDarkMode();
  const [previewContent, setPreviewContent] = useState();

  return (
    <EditorContainer>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="richtext-wrapper-class"
        onChange={handleOnChange}
        editorClassName={`editor-class ${intent}`}
        toolbarClassName="toolbar-class"
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "image",
            "remove",
            "history",
          ],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["bold", "italic", "underline", "strikethrough"],
          },
          image: {
            uploadCallback: uploadImageCallBack,
            previewImage: true,
            alt: { present: true, mandatory: true },
            defaultSize: {
              height: "auto",
              width: "100%",
            },
          },
          link: {
            showOpenOptionOnHover: false,
          },
          textAlign: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["right", "center", "left", "justify"],
          },
          fontFamily: {
            options: [
              "BYekan",
              "Arial",
              "Georgia",
              "Impact",
              "Tahoma",
              "Times New Roman",
              "Verdana",
            ],
          },
        }}
      />
    </EditorContainer>
  );
};

export default RichTextEditor;
