import React from "react";

import styled from "styled-components";

const Wraper = styled.div`
  background-color: ${({ theme }) => theme.primary};
  .banner-upload-wraper {
    width: 100%;
    background: inherit;
    color: inherit;
    cursor: pointer;
    display: flex;
    border: 1px solid ${({ theme }) => theme.secondary};
    border-radius: 0.3rem;
    overflow: hidden;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    outline: 2px dashed gray;
    outline-offset: -10px;
    min-height: 120px;
  }
  .banner-upload-label {
    cursor: pointer;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    z-index: 1;
  }
  .banner-upload-input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  .banner-preview {
    width: 100%;
    max-height: 60vh;
  }
`;

const BannerInput = ({ value, onChange, intent }) => {
  const handleImageUpload = (event) => {
    if (event.target.files[0]) {
      onChange(event.target.files[0]);
    }
  };

  return (
    <Wraper className="rtl">
      <form encType="multipart/form-data">
        <div className={`banner-upload-wraper ${intent}`}>
          <label htmlFor="post-banner" className="banner-upload-label">
            {value ? (
              typeof value === "string" ? (
                <img src={value} alt="banner" className="banner-preview" />
              ) : (
                <img
                  src={URL.createObjectURL(value)}
                  alt="banner"
                  className="banner-preview"
                />
              )
            ) : (
              "تصویر بنر پست"
            )}
          </label>
        </div>
        <input
          type="file"
          id="post-banner"
          name="postBanner"
          aria-describedby="postBanner"
          accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
          className="banner-upload-input"
          onChange={handleImageUpload}
        />
      </form>
    </Wraper>
  );
};

export default BannerInput;
