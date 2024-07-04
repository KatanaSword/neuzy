import React from "react";
import { ErrorMessage } from "../../components/ErrorMessage";

const variants = {
  fill: {
    gray_50: "bg-gray-50 text-black-900",
    deep_purple_A700: "bg-deep_purple-A700 text-white-A700",
  },
  outline: {
    black_900: "border border-black-900 border-solid text-bluegray-400",
  },
};
const shapes = { round: "rounded-[10px]", square: "rounded-none" };
const sizes = {
  xs: "p-1.5",
  sm: "pb-[19px] pt-[13px] px-[13px]",
  md: "pb-[18px] pl-4 pr-[18px] pt-[23px]",
};

const Input = React.forwardRef(
  (
    {
      wrapClassName = "",
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      children,
      errors = [],
      label = "",
      prefix,
      suffix,
      onChange,
      shape = "square",
      size = "xs",
      variant = "fill",
      color = "deep_purple_A700",
      ...restProps
    },
    ref
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e?.target?.value);
    };

    return (
      <>
        <div
          className={`${wrapClassName} 
              ${shapes[shape] || ""} 
              ${variants[variant]?.[color] || ""} 
              ${sizes[size] || ""}`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input
            ref={ref}
            className={`${className} bg-transparent border-0`}
            type={type}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            {...restProps}
          />
          {!!suffix && suffix}
        </div>
        {!!errors && <ErrorMessage errors={errors} />}
      </>
    );
  }
);

export { Input };
