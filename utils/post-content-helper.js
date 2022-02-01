import DOMPurify from "dompurify";
import draftToHtml from "draftjs-to-html";

export const createMarkup = (html) => {
  return {
    __html: DOMPurify.sanitize(html),
  };
};

export const convertContentToHTML = (content) => {
  return draftToHtml(content);
};
