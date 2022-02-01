import React from "react";

import { Button } from "@blueprintjs/core";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import StyledDialog from "../../shared/StyledDialog";
import { deletePost } from "../../../redux/slices/posts";

const Wraper = styled.div`
  font-size: 0.8rem;
  position: relative;
  padding: 15px 25px 25px 25px;
  overflow-x: hidden;
  h5.title {
    font-size: 1.2rem;
    text-align: center;
    color: ${({ theme }) => theme.text};
    margin-bottom: 1rem;
  }
  .delete-btn {
    background-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.text};
    padding: 0.6rem 0;
    box-shadow: 0 0 0 1px rgb(16 22 26 / 40%);
    background-image: none;
    transition: all 0.3s ease;
  }
  .cancel-btn {
    background-color: transparent;
    border: 1px solid #606262;
    color: #606262;
    padding: 0.6rem 0;
    box-shadow: 0 0 0 1px rgb(16 22 26 / 40%);
    background-image: none;
    transition: all 0.3s ease;
  }
  .delete-btn,
  .cancel-btn {
    flex: 1;
  }
  .delete-btn:hover {
    background-color: ${({ theme }) => theme.darkAccent};
  }
  .cancel-btn:hover {
    background-color: transparent;
  }
`;

const DeletePostDialog = ({ isOpen, onClose, postId }) => {
  const dispatch = useDispatch();

  const handleDeletePost = () => {
    dispatch(deletePost(postId));
    onClose();
  };

  return (
    <StyledDialog
      icon="info-sign"
      onClose={onClose}
      title="حذف پست"
      isOpen={isOpen}
    >
      <Wraper noValidate className="verify rtl">
        <h5 className="title">از حذف پست مطمئن هستید؟</h5>
        <div className="d-flex mt-4">
          <button type="button"  className="m-btn mr-1" onClick={handleDeletePost}>
            حذف
          </button>
          <button type="button" className="m-btn-cancel ml-1" onClick={onClose}>
            انصراف
          </button>
        </div>
      </Wraper>
    </StyledDialog>
  );
};

export default DeletePostDialog;
