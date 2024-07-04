import { Text, Line, Img } from "../../components";

const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-center md:px-5">
      <div className="flex w-full flex-col items-center justify-center bg-black-900 py-[60px] md:px-10 sm:px-5">
        <div className="flex w-[98%] flex-col items-center justify-center gap-[53px] md:w-full">
          <div className="flex w-full flex-row items-start justify-between md:flex-col md:gap-10">
            <div className="flex flex-col items-start justify-start gap-[22px]">
              <Text
                className="text-2xl tracking-[-0.50px] text-white-A700 md:text-[22px] sm:text-xl"
                size="txtInterSemiBold24WhiteA700"
              >
                Neuzy
              </Text>
              <Text
                className="w-full text-sm leading-[35.00px] tracking-[-0.50px] text-white-A700"
                size="txtInterRegular14"
              >
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
              </Text>
            </div>
            <div className="flex w-[57%] flex-row items-start justify-between pt-2.5 md:w-full md:flex-1">
              <div className="flex w-[10%] flex-col items-start justify-start gap-[25px]">
                <Text
                  className="text-sm tracking-[-0.50px] text-white-A700"
                  size="txtInterBold14"
                >
                  World
                </Text>
                <div className="flex w-full flex-col items-start justify-start gap-[18px]">
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Politcts
                  </Text>
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Health
                  </Text>
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Business
                  </Text>
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Tech
                  </Text>
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Entertaiment
                  </Text>
                </div>
              </div>
              <div className="flex w-[8%] flex-col items-start justify-start gap-[25px]">
                <Text
                  className="text-sm tracking-[-0.50px] text-white-A700"
                  size="txtInterBold14"
                >
                  Tech
                </Text>
                <div className="flex w-full flex-col items-start justify-start gap-[18px]">
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Siance
                  </Text>
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Magazine
                  </Text>
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Start up
                  </Text>
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Crypto
                  </Text>
                </div>
              </div>
              <div className="flex w-[5%] flex-col items-start justify-start gap-[25px]">
                <Text
                  className="text-sm tracking-[-0.50px] text-white-A700"
                  size="txtInterBold14"
                >
                  Life
                </Text>
                <div className="flex w-full flex-col items-start justify-start gap-[18px]">
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Food
                  </Text>
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Style
                  </Text>
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Sport
                  </Text>
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Movie
                  </Text>
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Music
                  </Text>
                </div>
              </div>
              <div className="flex w-[9%] flex-col items-start justify-start gap-[23px]">
                <Text
                  className="text-sm tracking-[-0.50px] text-white-A700"
                  size="txtInterBold14"
                >
                  Magezine
                </Text>
                <div className="flex flex-col items-start justify-start gap-[18px]">
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Fasion
                  </Text>
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Blogger
                  </Text>
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    People
                  </Text>
                </div>
              </div>
              <div className="flex w-[14%] flex-col items-start justify-start gap-[25px]">
                <Text
                  className="text-sm tracking-[-0.50px] text-white-A700"
                  size="txtInterBold14"
                >
                  Other
                </Text>
                <div className="flex w-full flex-col items-start justify-start gap-[18px]">
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    About
                  </Text>
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Contact us
                  </Text>
                  <Text
                    className="text-xs tracking-[-0.50px] text-white-A700"
                    size="txtInterRegular12WhiteA700"
                  >
                    Terms & Conditions
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-start gap-[29px]">
            <Line className="h-px w-full bg-white-A700" />
            <div className="flex w-full flex-row items-start justify-between md:gap-10">
              <Text
                className="mt-1 text-sm tracking-[-0.50px] text-white-A700"
                size="txtInterRegular14"
              >
                Copyright © Neuzy | All Rights Reserved
              </Text>
              <Img
                className="h-6"
                src="images/img_group20875.svg"
                alt="Group20875"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
