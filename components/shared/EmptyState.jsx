import React from "react";
import styled from "styled-components";

const Wraper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("/images/empty-box.svg") no-repeat 50%;
  background-size: contain;
  width: 100%;
  height: 100vh;
`;

const EmptyState = ({ children, className }) => {
  return <Wraper className={className}>{children}</Wraper>;
};

export default EmptyState;
