export const UploadSVG = ({
  fillColor = "#000000",
  className = "",
  ...restProps
}) => {
  return (
    <svg
      fill={fillColor}
      width="18px"
      height="18px"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...restProps}
    >
      <path
        d="M6 4.5H13.5V12M13.5 4.5L4.5 13.5L13.5 4.5Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
