import React from "react";

import HashLoader from "react-spinners/HashLoader";
import { css as Loadercss } from "@emotion/react";
import ReactModal from "react-modal";
import { useTheme } from "styled-components";
ReactModal.setAppElement("#__next");

const LoadingSpinner = ({ show }) => {
  const theme = useTheme();
  const override = Loadercss`
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 9999;
    transform: translate(-50%, -50%);
  `;

  return (
    <ReactModal
      isOpen={show}
      className="loading-spinner-modal"
      overlayClassName="loading-spinner-overlay"
    >
      <HashLoader
        css={override}
        size={50}
        color={theme.accent}
        loading={true}
      />
    </ReactModal>
  );
};

export default LoadingSpinner;
