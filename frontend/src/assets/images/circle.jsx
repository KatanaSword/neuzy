export const CircleSVG = ({
  fillColor = "#000000",
  className = "",
  ...restProps
}) => {
  return (
    <svg
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      height="24px"
      width="24px"
      className={className}
      {...restProps}
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};
