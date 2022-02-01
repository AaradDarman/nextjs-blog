import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import Select from "react-select";
import { useTheme } from "styled-components";

const CategoriesInput = ({ values, onValuesChange, intent }) => {
  const theme = useTheme();
  const { categories } = useSelector((state) => state);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(
      categories.map((cat) => {
        return { value: cat._id, label: cat.title };
      })
    );
  }, [categories]);

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      direction: "ltr",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: theme.primary,
      color: "inherit",
      "&:not(:last-child)": {
        borderBottom: `1px solid ${theme.secondary}`,
      },
      "&:hover": {
        backgroundColor: theme.secondary,
      },
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: theme.secondary,
      color: theme.text,
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: theme.text,
    }),
    menuList: (provided, state) => ({
      ...provided,
      backgroundColor: theme.primary,
      border: `1px solid ${theme.secondary}`,
      padding: "0 5px",
    }),
    input: (provided, state) => ({
      ...provided,
      direction: "rtl",
      color: theme.text,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#5c7080",
      fontSize: "0.8rem",
    }),
    control: (provided, state) => ({
      ...provided,
      color: theme.text,
      border: `1px solid ${theme.secondary}`,
      borderRadius: "2px",
      backgroundColor: "transparent",
      boxShadow:
        (intent === "danger" &&
          "0 0 0 0 rgb(219 55 55 / 0%), 0 0 0 0 rgb(219 55 55 / 0%),inset 0 0 0 1px #db3737, inset 0 0 0 1px rgb(16 22 26 / 15%),inset 0 1px 1px rgb(16 22 26 / 20%)") ||
        (intent === "success" &&
          `0 0 0 1px #0f9960, 0 0 0 3px rgb(15 153 96 / 30%),inset 0 1px 1px rgb(16 22 26 / 20%)`),
      "&:hover": {
        borderColor: theme.secondary,
      },
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      padding: "2px",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      backgroundColor: theme.accent,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      flexDirection: "row-reverse",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  return (
    <Select
      options={options}
      isMulti
      placeholder="یک یا چند دسته بندی را انتخاب کنید"
      styles={customStyles}
      isRtl
      noOptionsMessage={() => "آیتمی یافت نشد"}
      onChange={(val) => onValuesChange(val)}
      value={values}
    />
  );
};

export default CategoriesInput;
