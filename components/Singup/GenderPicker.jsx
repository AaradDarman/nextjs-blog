import React, { useState } from "react";

import styled from "styled-components";

const Wraper = styled.div`
  display: flex;
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.secondary};
  overflow: hidden;
  border-radius: 3px;
  .button {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
    padding: 5px 10px;
    cursor: pointer;
  }

  .button.active {
    background-color: ${({ theme }) => theme.accent};
    transition: background-color 0.3s ease;
  }
`;

const GenderPicker = ({ onChange, value }) => {
  const [selectedGender, setSelectedGender] = useState(value);

  const handleChange = (value) => {
    setSelectedGender(value);
    onChange(value);
  };

  return (
    <Wraper>
      <div className="d-flex">
        <burron
          onClick={() => handleChange("مرد")}
          className={`${selectedGender === "مرد" && "active"} button`}
        >
          مرد
        </burron>
        <burron
          onClick={() => handleChange("زن")}
          className={`${selectedGender === "زن" && "active"} button`}
        >
          زن
        </burron>
      </div>
    </Wraper>
  );
};

export default GenderPicker;
