import React from "react";

import { Dialog } from "@blueprintjs/core";
import styled from "styled-components";
import { darken } from "polished";

const MDialog = styled(Dialog)`
  background: ${({ theme }) => theme.primary};
  width: 300px;
  box-shadow: 0 0 2px 0.5px #1d3040;
  padding-bottom: 0;
  direction: rtl;
  text-align: right;
  .bp3-dialog-header {
    background-color: ${({ theme }) => darken(0.01, theme.primary)};
    color: ${({ theme }) => theme.text};
  }
  .bp3-heading {
    color: ${({ theme }) => theme.text};
  }
  .bp3-dialog-header .bp3-icon {
    margin-right: 0;
    margin-left: 10px;
  }
`;

const StyledDialog = ({ isOpen, onClose, children, icon, title }) => {
  return (
    <MDialog
      icon={icon}
      title={title}
      canOutsideClickClose={false}
      onClose={onClose}
      isOpen={isOpen}
    >
      {children}
    </MDialog>
  );
};

export default StyledDialog;
