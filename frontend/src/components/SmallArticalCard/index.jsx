import { Img, Text } from "../../components";

const SmallArticalCard = () => {
  return (
    <div className="flex w-full flex-row items-start justify-between gap-2.5 sm:ml-[0] sm:flex-col">
      <Img
        className="flex h-[84px] w-[84px] self-center object-cover md:h-auto"
        src="images/img_rectangle1479.png"
        alt="Rectangle1479"
      />
      <div className="flex flex-col items-start justify-start gap-[25px]">
        <Text
          className="w-full text-lg tracking-[-0.50px] text-black-900"
          size="txtInterBold18"
        >
          How to maximize investment with mutual funds
        </Text>
        <div className="flex w-full flex-row items-center justify-start gap-[10px] md:w-full">
          <Text
            className="text-nowrap text-xs tracking-[-0.50px] text-black-900"
            size="txtInterSemiBold12"
          >
            Indonesia, 22 Agust 2022{" "}
          </Text>
          <Text
            className="text-nowrap text-xs tracking-[-0.50px] text-black-900_87"
            size="txtInterRegular12"
          >
            - 15 minutes ago
          </Text>
        </div>
      </div>
    </div>
  );
};

export default SmallArticalCard;
