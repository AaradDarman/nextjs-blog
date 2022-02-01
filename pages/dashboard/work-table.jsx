import React, { useRef, useEffect } from "react";

import styled from "styled-components";
import { FormGroup, InputGroup } from "@blueprintjs/core";
import { darken } from "polished";
import { Formik } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

import BannerInput from "../../components/Dashboard/CreatePost/BannerInput";
import RichTextEditor from "../../components/Dashboard/CreatePost/RichTextEditor";
import TagsInput from "../../components/Dashboard/CreatePost/TagsInput";
import { useCreatePost } from "../../context/post-context";
import Icon from "../../components/shared/Icon";
import { clearPost, getPost } from "../../redux/slices/post";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import CategoriesInput from "../../components/Dashboard/CreatePost/CategoriesInput";
import { useRouter } from "next/router";
import Head from "next/head";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import PostContext from "../../context/PostContext";

const Wraper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  padding: 1rem;
  .content-editor-wraper {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
  }
  .cp-container {
    background-color: ${({ theme }) => theme.primary};
    border-radius: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 1px 2px 2px 2px ${({ theme }) => darken(0.01, theme.primary)};
  }
  .editor-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;
  }
  @media (min-width: 500px) {
    .editor-container::-webkit-scrollbar {
      width: 10px;
    }
    .editor-container::-webkit-scrollbar-track {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
    .editor-container::-webkit-scrollbar-thumb {
      border-radius: 0.5rem;
    }
  }
  .publish-btn {
    background-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    border: none;
    padding: 0.5rem;
    border-radius: 0.3rem;
    transition: all 0.3s ease;
    box-shadow: 1px 2px 2px 2px ${({ theme }) => darken(0.06, theme.accent)};
  }
  .publish-btn:hover {
    background-color: ${({ theme }) => darken(0.06, theme.accent)};
  }
  .preview-btn {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    border: none;
    padding: 0.5rem;
    border-radius: 0.3rem;
    transition: all 0.3s ease;
    box-shadow: 1px 2px 2px 2px ${({ theme }) => darken(0.01, theme.primary)};
  }
  .preview-btn:hover {
    background-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.primary};
  }
  .publish-btn,
  .preview-btn {
    background-image: none;
    transition: all 0.3s ease-in-out;
  }
  .category-tag {
    background-color: ${({ theme }) => theme.button};
    border: 1px solid ${({ theme }) => darken(0.2, theme.button)};
    border-radius: 0.3rem;
    padding-right: 5px;
    padding: 3px 5px;
    padding-left: 0;
    margin: 0 2px;
  }
  .ReactTags__remove {
    background-color: transparent;
    border: none;
    color: inherit;
  }
  .tags-tag {
    background-color: transparent;
    padding-right: 5px;
    padding: 3px 5px;
    margin: 2px;
    border-radius: 1rem;
    border: 1px solid ${({ theme }) => theme.text};
  }
  .tags-tag::before {
    content: "#";
    margin-left: 2px;
  }
  .ReactTags__selected {
    display: flex;
    flex-wrap: wrap;
  }
  .rich-text-form-group {
    flex: 1;
    display: flex;
    overflow: hidden;
    min-height: 85vh;
  }
  .rich-text-form-group .bp3-form-content {
    height: calc(100% - 20px);
  }
  @media (max-width: 500px) {
    flex-wrap: wrap;
    overflow-y: scroll;
    padding: 1rem 0;
    .content-editor-wraper {
      overflow-y: scroll;
    }
  }
`;

const WorkTable = () => {
  const {
    handleCreatePost,
    handleEditPost,
    postTitle,
    setPostTitle,
    postSubtitle,
    setPostSubtitle,
    bannerImage,
    setBannerImage,
    content,
    setContent,
    categories,
    setCategories,
    tags,
    setTags,
    setShowPostPreviewDialog,
  } = useCreatePost();

  const { post, posts } = useSelector((state) => state);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  console.log(router.query);

  useEffect(() => {
    titleElem.current.focus();
    if (id) {
      dispatch(clearPost());
      dispatch(getPost(id));
    }
    return () => {
      dispatch(clearPost());
      setPostTitle("");
      setPostSubtitle("");
      setBannerImage("");
      setContent({});
      setCategories([]);
      setTags([]);
    };
  }, []);

  useEffect(() => {
    if (!_.isEmpty(post?.entity)) {
      setPostTitle(post?.entity?.title);
      formikRef.current.setFieldValue("postTitle", post?.entity?.title);
      setPostSubtitle(post?.entity?.subtitle);
      formikRef.current.setFieldValue("postSubtitle", post?.entity?.subtitle);
      setBannerImage(post?.entity?.bannerImage);
      formikRef.current.setFieldValue("bannerImage", post?.entity?.bannerImage);
      setContent(post?.entity?.content);
      formikRef.current.setFieldValue(
        "categories",
        post?.entity?.categories?.map((cat) => {
          return { value: cat._id, label: cat.title };
        })
      );
      setCategories(
        post?.entity?.categories?.map((cat) => {
          return { value: cat._id, label: cat.title };
        })
      );

      if (post?.entity?.tags) {
        setTags(
          post?.entity?.tags?.map((tag) => {
            return { id: tag, text: tag };
          })
        );
      }
    }
  }, [post]);

  const CreatePostSchema = Yup.object().shape({
    postTitle: Yup.string()
      .min(3, "عنوان وارد شده باید بیشتر از 3 حرف باشد")
      .max(90, "عنوان وارد شده نباید بیشتر از 90 حرف باشد")
      .required("پر کردن این فیلد الزامی می باشد"),
    postSubtitle: Yup.string()
      .min(3, "زیر عنوان وارد شده باید بیشتر از 3 حرف باشد")
      .max(90, "زیر عنوان وارد شده نباید بیشتر از 90 حرف باشد")
      .required("پر کردن این فیلد الزامی می باشد"),
    categories: Yup.array()
      .min(1, "وارد کردن حداقل یک دسته بندی الزامی می باشد")
      .required("پر کردن این فیلد الزامی می باشد"),
    bannerImage: Yup.mixed()
      .required("پر کردن این فیلد الزامی می باشد")
      .test(
        "fileSize",
        "تصویری با حجم کمتر از 2 مگابایت انتخاب کنید",
        (value) => {
          if (typeof value === "string") return true;
          return value?.size <= 2000000;
        }
      ),
    content: Yup.object().test(
      "objectSize",
      "پر کردن این فیلد الزامی می باشد",
      (value) => {
        return (
          !_.isEmpty(value) &&
          value.blocks.some((b) => b.text !== undefined && b.text !== "")
        );
      }
    ),
  });

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.setFieldValue("content", content);
    }
  }, [content]);

  const formikRef = useRef();
  const titleElem = useRef(null);
  const subTitleElem = useRef(null);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        postTitle,
        postSubtitle,
        categories,
        bannerImage,
        content,
      }}
      enableReinitialize={false}
      validationSchema={CreatePostSchema}
      onSubmit={() => (id ? handleEditPost(id) : handleCreatePost())}
    >
      {({
        values,
        handleBlur,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
      }) => (
        <Wraper>
          <Head>
            <title>داشبورد | میز کار</title>
          </Head>
          <LoadingSpinner
            show={posts?.status === "loading" || post?.status === "loading"}
          />
          <div className="actions-wraper pb-3 rtl">
            <div className="col-12">
              <button className="publish-btn mr-1" onClick={handleSubmit}>
                {id ? "ذخیره" : "پابلیش"}
                <Icon
                  className="icon ml-1"
                  icon={id ? "save" : "send"}
                  size={15}
                />
              </button>
              <button
                className="preview-btn ml-1"
                onClick={() => setShowPostPreviewDialog(true)}
              >
                پیش نمایش
                <Icon className="icon ml-1" icon="view" size={15} />
              </button>
            </div>
          </div>
          <div className="content-editor-wraper">
            <div className="col-12 col-sm-3 h-100 mb-1 mb-sm-0">
              <div className="cp-container h-100 p-3">
                <FormGroup
                  helperText={
                    errors.postTitle && touched.postTitle
                      ? errors.postTitle
                      : ""
                  }
                  labelInfo="*"
                  label="عنوان پست"
                >
                  <InputGroup
                    placeholder="عنوان"
                    intent={
                      errors.postTitle && touched.postTitle
                        ? "danger"
                        : touched.postTitle && "success"
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        subTitleElem.current.focus();
                        console.log(subTitleElem);
                      }
                    }}
                    onChange={(e) => {
                      setPostTitle(e.target.value);
                      setFieldValue("postTitle", e.target.value);
                    }}
                    value={values.postTitle}
                    onBlur={handleBlur("postTitle")}
                    type="text"
                    inputRef={titleElem}
                  />
                </FormGroup>
                <FormGroup
                  helperText={
                    errors.postSubtitle && touched.postSubtitle
                      ? errors.postSubtitle
                      : ""
                  }
                  labelInfo="*"
                  label="عنوان فرعی پست"
                >
                  <InputGroup
                    placeholder="عنوان فرعی"
                    intent={
                      errors.postSubtitle && touched.postSubtitle
                        ? "danger"
                        : touched.postSubtitle && "success"
                    }
                    onChange={(e) => {
                      setPostSubtitle(e.target.value);
                      setFieldValue("postSubtitle", e.target.value);
                    }}
                    value={values.postSubtitle}
                    onBlur={handleBlur("postSubtitle")}
                    type="text"
                    inputRef={subTitleElem}
                  />
                </FormGroup>
                <FormGroup
                  helperText={
                    errors.categories && touched.categories
                      ? errors.categories
                      : ""
                  }
                  labelInfo="*"
                  label="دسته بندی"
                >
                  <CategoriesInput
                    values={values.categories}
                    onValuesChange={(value) => {
                      setCategories(value);
                      setFieldValue("categories", value);
                    }}
                    intent={
                      errors.categories && touched.categories
                        ? "danger"
                        : touched.categories && "success"
                    }
                  />
                </FormGroup>
                <FormGroup label="تگ">
                  <TagsInput
                    values={tags}
                    onChange={setTags}
                    tagStyle="tags-tag"
                  />
                </FormGroup>
              </div>
            </div>
            <div className="col-12 col-sm-9 h-100">
              <div className="cp-container editor-container ltr">
                <FormGroup
                  helperText={
                    errors.bannerImage && touched.bannerImage
                      ? errors.bannerImage
                      : ""
                  }
                  className="pt-3 px-3"
                >
                  <BannerInput
                    value={values.bannerImage}
                    onChange={(value) => {
                      setBannerImage(value);
                      setFieldValue("bannerImage", value);
                    }}
                    intent={
                      errors.bannerImage && touched.bannerImage
                        ? "danger"
                        : touched.bannerImage && "success"
                    }
                  />
                </FormGroup>
                <FormGroup
                  helperText={
                    errors.content && touched.content ? errors.content : ""
                  }
                  className="rich-text-form-group px-3"
                >
                  <RichTextEditor
                    intent={
                      errors.content && touched.content
                        ? "danger"
                        : touched.content && "success"
                    }
                  />
                </FormGroup>
              </div>
            </div>
          </div>
        </Wraper>
      )}
    </Formik>
  );
};

WorkTable.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <PostContext>{page}</PostContext>
    </DashboardLayout>
  );
};

export default WorkTable;
