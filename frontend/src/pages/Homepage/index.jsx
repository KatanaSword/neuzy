import { useNavigate } from "react-router-dom";

import { Button, Img, Input, Line, List, Text } from "../../components";
import Header from "../../components/Header";
import { CircleSVG, UploadSVG } from "../../assets/images";
import Footer from "../../components/Footer";
import SmallArticalCard from "../../components/SmallArticalCard";
import LatestArticalCard from "../../components/LatestArticalCard";

const HomepagePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className=" mx-auto flex w-full flex-col items-center justify-start gap-[50px] bg-alabaster-200 font-inter">
        <Header />
        <div className="flex w-full flex-col items-center justify-start gap-[120px] px-[26px] md:gap-10">
          <div className="mx-auto flex w-full max-w-[1292px] flex-col items-center justify-start md:px-5">
            <div className="flex w-full flex-col items-center justify-start gap-[50px]">
              <div className="flex w-full flex-row items-center justify-between gap-4 md:flex-col md:gap-[50px]">
                <Img
                  className="h-[255px] object-cover md:h-auto"
                  src="images/img_rectangle5.png"
                  alt="RectangleFive"
                />
                <div className="flex flex-col items-start justify-start gap-[45px]">
                  <div className="flex w-full flex-col items-start justify-start gap-4">
                    <div className="flex w-auto flex-row items-center justify-center gap-2.5 md:w-full">
                      <CircleSVG className="h-[15px] w-[15px]" fill="red" />
                      <Text
                        className="text-nowrap text-lg tracking-[-0.50px] text-bluegray-900"
                        size="txtInterRegular18"
                      >
                        Hot Topic
                      </Text>
                    </div>
                    <Text
                      className="w-full text-4xl tracking-[-0.50px] text-black-900 md:text-[34px] sm:text-[32px]"
                      size="txtInterBold36"
                    >
                      Miami Dolphins won the match and officially qualified for
                      the final
                    </Text>
                    <div className="flex w-auto flex-col items-start justify-start md:w-full">
                      <Text
                        className="text-nowrap text-lg tracking-[-0.50px] text-black-900"
                        size="txtInterSemiBold18Black900"
                      >
                        New York, 22 Agust 2022
                      </Text>
                      <Text
                        className="text-left font-inter text-sm font-semibold tracking-[-0.50px] text-black-900_87"
                        size="txtInterSemiBold18WhiteA70087"
                      >
                        - 10 minutes ago
                      </Text>
                    </div>
                  </div>
                  <div className="flex w-[17%] flex-row items-end justify-start gap-[13px] md:w-full">
                    <Text
                      className="text-nowrap text-sm tracking-[-0.50px] text-bluegray-900"
                      size="txtInterRegular14Bluegray900"
                    >
                      Read More
                    </Text>
                    <Img
                      className="mb-[5px] mt-[11px] h-px w-1/4"
                      src="images/img_arrow1.svg"
                      alt="ArrowOne"
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-row items-center justify-between md:flex-col md:gap-[55px]">
                <List
                  className="grid w-full grid-cols-3 flex-row gap-[50px] md:w-full md:flex-1 md:grid-cols-1 sm:flex-col"
                  orientation="horizontal"
                >
                  <SmallArticalCard />
                  <SmallArticalCard />
                  <SmallArticalCard />
                </List>
              </div>
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-[1292px] flex-col items-center justify-start gap-[50px] md:px-5">
            <div className="flex w-full flex-row items-start justify-between rounded-lg md:gap-10 sm:flex-col">
              <Text
                className="text-4xl tracking-[-0.50px] text-black-900 md:text-[34px] sm:text-[32px]"
                size="txtInterSemiBold36Black900"
              >
                Latest Release
              </Text>
              <Button
                className="common-pointer min-w-[122px] cursor-pointer text-center text-sm font-semibold leading-[normal] tracking-[-0.50px]"
                onClick={() => navigate("/allblog")}
                shape="round"
                color="bluegray_900"
                size="lg"
              >
                View All
              </Button>
            </div>
            <div className="flex w-full flex-row items-center justify-between md:flex-col md:gap-[50px]">
              <div className="flex w-[43%] flex-col items-start justify-start gap-[24px] md:w-full md:flex-1">
                <div className="relative flex h-[283px] w-full flex-col items-center justify-start">
                  <Img
                    className="h-[283px] w-full bg-cover bg-no-repeat"
                    alt="image"
                    src="images/img_group38.png"
                  ></Img>
                  <div className="absolute flex w-full flex-col justify-end gap-[189px] p-[15px] md:gap-10">
                    <Button
                      className="flex w-[75px] cursor-pointer items-center justify-center self-end text-center text-xs font-bold leading-[normal] tracking-[0.12px] md:ml-[0]"
                      shape="square"
                      color="deep_orange_A400"
                      size="xs"
                    >
                      Hot Topic
                    </Button>
                    <Text
                      className="ml-2 mr-[376px] text-sm tracking-[-0.50px] text-white-A700 md:ml-[0]"
                      size="txtInterRegular14"
                    >
                      Ukraine, 24 april 2022
                    </Text>
                  </div>
                </div>
                <div className="flex w-full flex-col items-center justify-start gap-4">
                  <Text
                    className="w-full text-2xl tracking-[-0.50px] text-black-900 md:text-[22px] sm:text-xl"
                    size="txtInterSemiBold24"
                  >
                    Zelensky accuses Russia of worst crimes since WW2{" "}
                  </Text>
                  <Text
                    className="w-full text-sm leading-[35.00px] tracking-[-0.50px] text-black-900_87"
                    size="txtInterRegular14Black90087"
                  >
                    The Ukrainian leader says Russia must face an international
                    trial as he calls for the country to be thrown off the UN
                    Security Council.
                  </Text>
                </div>
                <Button
                  className="common-pointer flex min-w-[177px] cursor-pointer items-center justify-center gap-[5px]"
                  onClick={() => navigate("/sigleblog")}
                  rightIcon={<UploadSVG className="h-[20px] w-[20px]" />}
                  shape="round"
                  size="2xl"
                >
                  <div className="text-left text-lg leading-[normal] tracking-[-0.50px]">
                    Read More
                  </div>
                </Button>
              </div>
              <List
                className="flex w-[54%] flex-col gap-[50px]"
                orientation="vertical"
              >
                <LatestArticalCard />
                <LatestArticalCard />
              </List>
            </div>
          </div>
          <List
            className="mx-auto flex w-full max-w-[1294px] flex-col items-center gap-[120px] md:px-5"
            orientation="vertical"
          >
            <div className="flex w-full flex-1 flex-col items-center justify-start gap-[49px]">
              <div className="flex w-full flex-col items-center justify-start gap-7 rounded-lg">
                <div className="flex w-full flex-row items-start justify-between rounded-lg md:gap-10">
                  <Text
                    id="entertainment"
                    className="mb-0.5 text-4xl tracking-[-0.50px] text-black-900 md:text-[34px] sm:text-[32px]"
                    size="txtInterSemiBold36Black900"
                  >
                    Entertainment{" "}
                  </Text>
                  <Button
                    className="common-pointer mt-[5px] min-w-[122px] cursor-pointer text-center text-sm font-semibold leading-[normal] tracking-[-0.50px]"
                    onClick={() => navigate("/allblog")}
                    shape="round"
                    color="bluegray_900"
                    size="lg"
                  >
                    View All
                  </Button>
                </div>
                <Line className="h-px w-full bg-black-900_7f" />
              </div>
              <div className="grid w-full grid-cols-3 items-start justify-between gap-5 pb-[33px] md:grid-cols-2 sm:grid-cols-1">
                <div className="flex w-full flex-1 flex-col items-center justify-start">
                  <div className="flex w-full flex-col items-start justify-start gap-[22px]">
                    <div
                      className="flex h-[246px] w-full flex-col items-center justify-start bg-cover bg-no-repeat"
                      style={{
                        backgroundImage:
                          "url('images/img_group38_246X418.png')",
                      }}
                    >
                      <div className="flex  w-full flex-col justify-end gap-[162px] bg-gradient p-[17px] md:gap-10">
                        <Input
                          name="language One"
                          placeholder="Entertaiment "
                          className="w-full p-0 text-left text-xs font-bold leading-[normal] tracking-[0.12px] placeholder:text-white-A700"
                          wrapClassName="md:ml-[0] ml-[267px] mr-1.5 mt-1.5 w-[29%]"
                        ></Input>
                        <Text
                          className="mr-[267px] text-xs tracking-[-0.50px] text-white-A700"
                          size="txtInterRegular12WhiteA700"
                        >
                          Ukraine, 24 april 2022
                        </Text>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                      <Text
                        className="w-full text-lg tracking-[-0.50px] text-black-900"
                        size="txtInterSemiBold18Black900"
                      >
                        Zelensky accuses Russia of worst crimes since WW2{" "}
                      </Text>
                      <Text
                        className="w-full text-xs leading-[25.00px] tracking-[-0.50px] text-black-900_87"
                        size="txtPoppinsRegular12"
                      >
                        The Ukrainian leader says Russia must face an
                        international trial as he calls for the country to be
                        thrown off the UN Security Council.
                      </Text>
                    </div>
                    <Button
                      className="common-pointer ml-[11px] flex min-w-[153px] cursor-pointer items-center justify-center md:ml-[0]"
                      onClick={() => navigate("/sigleblog")}
                      rightIcon={
                        <Img
                          className="my-2.5 ml-[5px] mr-[30px] h-5"
                          src="images/img_upload.svg"
                          alt="upload"
                        />
                      }
                      shape="round"
                    >
                      <div className="text-left text-sm leading-[normal] tracking-[-0.50px]">
                        Read More
                      </div>
                    </Button>
                  </div>
                </div>
                <div className="flex w-full flex-1 flex-col items-center justify-start">
                  <div className="flex w-full flex-col items-start justify-start gap-[22px]">
                    <div
                      className="flex h-[246px] w-full flex-col items-center justify-start bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: "url('images/img_group38_1.png')",
                      }}
                    >
                      <div className="flex  w-full flex-col justify-end gap-[162px] bg-gradient p-[17px] md:gap-10">
                        <Input
                          name="language Three"
                          placeholder="Entertaiment "
                          className="w-full p-0 text-left text-xs font-bold leading-[normal] tracking-[0.12px] placeholder:text-white-A700"
                          wrapClassName="md:ml-[0] ml-[267px] mr-1.5 mt-1.5 w-[29%]"
                        ></Input>
                        <Text
                          className="mr-[267px] text-xs tracking-[-0.50px] text-white-A700"
                          size="txtInterRegular12WhiteA700"
                        >
                          Ukraine, 24 april 2022
                        </Text>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                      <Text
                        className="w-full text-lg tracking-[-0.50px] text-black-900"
                        size="txtInterSemiBold18Black900"
                      >
                        Zelensky accuses Russia of worst crimes since WW2{" "}
                      </Text>
                      <Text
                        className="w-full text-xs leading-[25.00px] tracking-[-0.50px] text-black-900_87"
                        size="txtPoppinsRegular12"
                      >
                        The Ukrainian leader says Russia must face an
                        international trial as he calls for the country to be
                        thrown off the UN Security Council.
                      </Text>
                    </div>
                    <Button
                      className="common-pointer ml-[11px] flex min-w-[153px] cursor-pointer items-center justify-center md:ml-[0]"
                      onClick={() => navigate("/sigleblog")}
                      rightIcon={
                        <Img
                          className="my-2.5 ml-[5px] mr-[30px] h-5"
                          src="images/img_upload.svg"
                          alt="upload"
                        />
                      }
                      shape="round"
                    >
                      <div className="text-left text-sm leading-[normal] tracking-[-0.50px]">
                        Read More
                      </div>
                    </Button>
                  </div>
                </div>
                <div className="flex w-full flex-1 flex-col items-center justify-start">
                  <div className="flex w-full flex-col items-start justify-start gap-[22px]">
                    <div
                      className="flex h-[246px] w-full flex-col items-center justify-start bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: "url('images/img_group38_2.png')",
                      }}
                    >
                      <div className="flex  w-full flex-col justify-end gap-[162px] bg-gradient p-[17px] md:gap-10">
                        <Input
                          name="language Five"
                          placeholder="Entertaiment "
                          className="w-full p-0 text-left text-xs font-bold leading-[normal] tracking-[0.12px] placeholder:text-white-A700"
                          wrapClassName="md:ml-[0] ml-[267px] mr-1.5 mt-1.5 w-[29%]"
                        ></Input>
                        <Text
                          className="mr-[267px] text-xs tracking-[-0.50px] text-white-A700"
                          size="txtInterRegular12WhiteA700"
                        >
                          Ukraine, 24 april 2022
                        </Text>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                      <Text
                        className="w-full text-lg tracking-[-0.50px] text-black-900"
                        size="txtInterSemiBold18Black900"
                      >
                        Zelensky accuses Russia of worst crimes since WW2{" "}
                      </Text>
                      <Text
                        className="w-full text-xs leading-[25.00px] tracking-[-0.50px] text-black-900_87"
                        size="txtPoppinsRegular12"
                      >
                        The Ukrainian leader says Russia must face an
                        international trial as he calls for the country to be
                        thrown off the UN Security Council.
                      </Text>
                    </div>
                    <Button
                      className="common-pointer ml-[11px] flex min-w-[153px] cursor-pointer items-center justify-center md:ml-[0]"
                      onClick={() => navigate("/sigleblog")}
                      rightIcon={
                        <Img
                          className="my-2.5 ml-[5px] mr-[30px] h-5"
                          src="images/img_upload.svg"
                          alt="upload"
                        />
                      }
                      shape="round"
                    >
                      <div className="text-left text-sm leading-[normal] tracking-[-0.50px]">
                        Read More
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col items-center justify-start gap-[49px]">
              <div className="flex w-full flex-col items-center justify-start gap-7 rounded-lg">
                <div className="flex w-full flex-row items-start justify-between rounded-lg md:gap-10">
                  <Text
                    id="political"
                    className="mb-0.5 text-4xl tracking-[-0.50px] text-black-900 md:text-[34px] sm:text-[32px]"
                    size="txtInterSemiBold36Black900"
                  >
                    Political{" "}
                  </Text>
                  <Button
                    className="common-pointer mt-[5px] min-w-[122px] cursor-pointer text-center text-sm font-semibold leading-[normal] tracking-[-0.50px]"
                    onClick={() => navigate("/allblog")}
                    shape="round"
                    color="bluegray_900"
                    size="lg"
                  >
                    View All
                  </Button>
                </div>
                <Line className="h-px w-full bg-black-900_7f" />
              </div>
              <div className="grid w-full grid-cols-3 items-start justify-between gap-[19px] pb-[33px] md:grid-cols-2 sm:grid-cols-1">
                <div className="flex w-full flex-1 flex-col items-center justify-start">
                  <div className="flex w-full flex-col items-start justify-start gap-[21px]">
                    <div
                      className="flex h-[247px] w-full flex-col items-center justify-start bg-cover bg-no-repeat"
                      style={{
                        backgroundImage:
                          "url('images/img_group38_247X418.png')",
                      }}
                    >
                      <div className="flex  w-full flex-col justify-end gap-[167px] bg-gradient p-4 md:gap-10">
                        <Button
                          className="ml-[300px] mr-2 mt-2 min-w-[78px] cursor-pointer text-center text-xs font-bold leading-[normal] tracking-[0.12px] md:ml-[0]"
                          shape="square"
                          color="red_900"
                          size="xs"
                        >
                          Political
                        </Button>
                        <Text
                          className="mr-[269px] text-xs tracking-[-0.50px] text-white-A700"
                          size="txtInterRegular12WhiteA700"
                        >
                          Ukraine, 24 april 2022
                        </Text>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                      <Text
                        className="w-full text-lg tracking-[-0.50px] text-black-900"
                        size="txtInterSemiBold18Black900"
                      >
                        Zelensky accuses Russia of worst crimes since WW2{" "}
                      </Text>
                      <Text
                        className="w-full text-xs leading-[25.00px] tracking-[-0.50px] text-black-900_87"
                        size="txtPoppinsRegular12"
                      >
                        The Ukrainian leader says Russia must face an
                        international trial as he calls for the country to be
                        thrown off the UN Security Council.
                      </Text>
                    </div>
                    <Button
                      className="common-pointer flex min-w-[153px] cursor-pointer items-center justify-center"
                      onClick={() => navigate("/sigleblog")}
                      rightIcon={
                        <Img
                          className="my-2.5 ml-[5px] mr-[30px] h-5"
                          src="images/img_upload.svg"
                          alt="upload"
                        />
                      }
                      shape="round"
                    >
                      <div className="text-left text-sm leading-[normal] tracking-[-0.50px]">
                        Read More
                      </div>
                    </Button>
                  </div>
                </div>
                <div className="flex w-full flex-1 flex-col items-center justify-start">
                  <div className="flex w-full flex-col items-start justify-start gap-[21px]">
                    <div
                      className="flex h-[247px] w-full flex-col items-center justify-start bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: "url('images/img_group38_3.png')",
                      }}
                    >
                      <div className="flex  w-full flex-col justify-end gap-[167px] bg-gradient p-4 md:gap-10">
                        <Button
                          className="ml-[300px] mr-2 mt-2 min-w-[78px] cursor-pointer text-center text-xs font-bold leading-[normal] tracking-[0.12px] md:ml-[0]"
                          shape="square"
                          color="red_900"
                          size="xs"
                        >
                          Political
                        </Button>
                        <Text
                          className="mr-[269px] text-xs tracking-[-0.50px] text-white-A700"
                          size="txtInterRegular12WhiteA700"
                        >
                          Ukraine, 24 april 2022
                        </Text>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                      <Text
                        className="w-full text-lg tracking-[-0.50px] text-black-900"
                        size="txtInterSemiBold18Black900"
                      >
                        Zelensky accuses Russia of worst crimes since WW2{" "}
                      </Text>
                      <Text
                        className="w-full text-xs leading-[25.00px] tracking-[-0.50px] text-black-900_87"
                        size="txtPoppinsRegular12"
                      >
                        The Ukrainian leader says Russia must face an
                        international trial as he calls for the country to be
                        thrown off the UN Security Council.
                      </Text>
                    </div>
                    <Button
                      className="common-pointer flex min-w-[153px] cursor-pointer items-center justify-center"
                      onClick={() => navigate("/sigleblog")}
                      rightIcon={
                        <Img
                          className="my-2.5 ml-[5px] mr-[30px] h-5"
                          src="images/img_upload.svg"
                          alt="upload"
                        />
                      }
                      shape="round"
                    >
                      <div className="text-left text-sm leading-[normal] tracking-[-0.50px]">
                        Read More
                      </div>
                    </Button>
                  </div>
                </div>
                <div className="flex w-full flex-1 flex-col items-center justify-start">
                  <div className="flex w-full flex-col items-start justify-start gap-[21px]">
                    <div
                      className="flex h-[247px] w-full flex-col items-center justify-start bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: "url('images/img_group38_4.png')",
                      }}
                    >
                      <div className="flex  w-full flex-col justify-end gap-[167px] bg-gradient p-4 md:gap-10">
                        <Button
                          className="ml-[300px] mr-2 mt-2 min-w-[78px] cursor-pointer text-center text-xs font-bold leading-[normal] tracking-[0.12px] md:ml-[0]"
                          shape="square"
                          color="red_900"
                          size="xs"
                        >
                          Political
                        </Button>
                        <Text
                          className="mr-[269px] text-xs tracking-[-0.50px] text-white-A700"
                          size="txtInterRegular12WhiteA700"
                        >
                          Ukraine, 24 april 2022
                        </Text>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                      <Text
                        className="w-full text-lg tracking-[-0.50px] text-black-900"
                        size="txtInterSemiBold18Black900"
                      >
                        Zelensky accuses Russia of worst crimes since WW2{" "}
                      </Text>
                      <Text
                        className="w-full text-xs leading-[25.00px] tracking-[-0.50px] text-black-900_87"
                        size="txtPoppinsRegular12"
                      >
                        The Ukrainian leader says Russia must face an
                        international trial as he calls for the country to be
                        thrown off the UN Security Council.
                      </Text>
                    </div>
                    <Button
                      className="common-pointer flex min-w-[153px] cursor-pointer items-center justify-center"
                      onClick={() => navigate("/sigleblog")}
                      rightIcon={
                        <Img
                          className="my-2.5 ml-[5px] mr-[30px] h-5"
                          src="images/img_upload.svg"
                          alt="upload"
                        />
                      }
                      shape="round"
                    >
                      <div className="text-left text-sm leading-[normal] tracking-[-0.50px]">
                        Read More
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col items-center justify-start gap-[49px]">
              <div className="flex w-full flex-col items-center justify-start gap-7 rounded-lg">
                <div className="flex w-full flex-row items-start justify-between rounded-lg md:gap-10">
                  <Text
                    id="sport"
                    className="mb-0.5 text-4xl tracking-[-0.50px] text-black-900 md:text-[34px] sm:text-[32px]"
                    size="txtInterSemiBold36Black900"
                  >
                    Sport{" "}
                  </Text>
                  <Button
                    className="common-pointer mt-[5px] min-w-[122px] cursor-pointer text-center text-sm font-semibold leading-[normal] tracking-[-0.50px]"
                    onClick={() => navigate("/allblog")}
                    shape="round"
                    color="bluegray_900"
                    size="lg"
                  >
                    View All
                  </Button>
                </div>
                <Line className="h-px w-full bg-black-900_7f" />
              </div>
              <div className="grid w-full grid-cols-3 items-start justify-between gap-5 pb-[33px] md:grid-cols-2 sm:grid-cols-1">
                <div className="flex w-full flex-1 flex-col items-center justify-start">
                  <div className="flex w-full flex-col items-start justify-start gap-[22px]">
                    <div
                      className="flex h-[246px] w-full flex-col items-center justify-start bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: "url('images/img_group38_5.png')",
                      }}
                    >
                      <div className="flex  w-full flex-col justify-end gap-[162px] bg-gradient p-[17px] md:gap-10">
                        <Button
                          className="ml-[312px] mr-1.5 mt-1.5 min-w-[64px] cursor-pointer text-center text-xs font-bold leading-[normal] tracking-[0.12px] md:ml-[0]"
                          shape="square"
                          color="green_700"
                          size="xs"
                        >
                          Sport
                        </Button>
                        <Text
                          className="mr-[267px] text-xs tracking-[-0.50px] text-white-A700"
                          size="txtInterRegular12WhiteA700"
                        >
                          Ukraine, 24 april 2022
                        </Text>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                      <Text
                        className="w-full text-lg tracking-[-0.50px] text-black-900"
                        size="txtInterSemiBold18Black900"
                      >
                        Zelensky accuses Russia of worst crimes since WW2{" "}
                      </Text>
                      <Text
                        className="w-full text-xs leading-[25.00px] tracking-[-0.50px] text-black-900_87"
                        size="txtPoppinsRegular12"
                      >
                        The Ukrainian leader says Russia must face an
                        international trial as he calls for the country to be
                        thrown off the UN Security Council.
                      </Text>
                    </div>
                    <Button
                      className="common-pointer ml-[11px] flex min-w-[153px] cursor-pointer items-center justify-center md:ml-[0]"
                      onClick={() => navigate("/sigleblog")}
                      rightIcon={
                        <Img
                          className="my-2.5 ml-[5px] mr-[30px] h-5"
                          src="images/img_upload.svg"
                          alt="upload"
                        />
                      }
                      shape="round"
                    >
                      <div className="text-left text-sm leading-[normal] tracking-[-0.50px]">
                        Read More
                      </div>
                    </Button>
                  </div>
                </div>
                <div className="flex w-full flex-1 flex-col items-center justify-start">
                  <div className="flex w-full flex-col items-start justify-start gap-[22px]">
                    <div
                      className="flex h-[246px] w-full flex-col items-center justify-start bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: "url('images/img_group38_6.png')",
                      }}
                    >
                      <div className="flex  w-full flex-col justify-end gap-[162px] bg-gradient p-[17px] md:gap-10">
                        <Button
                          className="ml-[312px] mr-1.5 mt-1.5 min-w-[64px] cursor-pointer text-center text-xs font-bold leading-[normal] tracking-[0.12px] md:ml-[0]"
                          shape="square"
                          color="green_700"
                          size="xs"
                        >
                          Sport
                        </Button>
                        <Text
                          className="mr-[267px] text-xs tracking-[-0.50px] text-white-A700"
                          size="txtInterRegular12WhiteA700"
                        >
                          Ukraine, 24 april 2022
                        </Text>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                      <Text
                        className="w-full text-lg tracking-[-0.50px] text-black-900"
                        size="txtInterSemiBold18Black900"
                      >
                        Zelensky accuses Russia of worst crimes since WW2{" "}
                      </Text>
                      <Text
                        className="w-full text-xs leading-[25.00px] tracking-[-0.50px] text-black-900_87"
                        size="txtPoppinsRegular12"
                      >
                        The Ukrainian leader says Russia must face an
                        international trial as he calls for the country to be
                        thrown off the UN Security Council.
                      </Text>
                    </div>
                    <Button
                      className="common-pointer ml-[11px] flex min-w-[153px] cursor-pointer items-center justify-center md:ml-[0]"
                      onClick={() => navigate("/sigleblog")}
                      rightIcon={
                        <Img
                          className="my-2.5 ml-[5px] mr-[30px] h-5"
                          src="images/img_upload.svg"
                          alt="upload"
                        />
                      }
                      shape="round"
                    >
                      <div className="text-left text-sm leading-[normal] tracking-[-0.50px]">
                        Read More
                      </div>
                    </Button>
                  </div>
                </div>
                <div className="flex w-full flex-1 flex-col items-center justify-start">
                  <div className="flex w-full flex-col items-start justify-start gap-[22px]">
                    <div
                      className="flex h-[246px] w-full flex-col items-center justify-start bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: "url('images/img_group38_7.png')",
                      }}
                    >
                      <div className="flex  w-full flex-col justify-end gap-[162px] bg-gradient p-[17px] md:gap-10">
                        <Button
                          className="ml-[312px] mr-1.5 mt-1.5 min-w-[64px] cursor-pointer text-center text-xs font-bold leading-[normal] tracking-[0.12px] md:ml-[0]"
                          shape="square"
                          color="green_700"
                          size="xs"
                        >
                          Sport
                        </Button>
                        <Text
                          className="mr-[267px] text-xs tracking-[-0.50px] text-white-A700"
                          size="txtInterRegular12WhiteA700"
                        >
                          Ukraine, 24 april 2022
                        </Text>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                      <Text
                        className="w-full text-lg tracking-[-0.50px] text-black-900"
                        size="txtInterSemiBold18Black900"
                      >
                        Zelensky accuses Russia of worst crimes since WW2{" "}
                      </Text>
                      <Text
                        className="w-full text-xs leading-[25.00px] tracking-[-0.50px] text-black-900_87"
                        size="txtPoppinsRegular12"
                      >
                        The Ukrainian leader says Russia must face an
                        international trial as he calls for the country to be
                        thrown off the UN Security Council.
                      </Text>
                    </div>
                    <Button
                      className="common-pointer ml-[11px] flex min-w-[153px] cursor-pointer items-center justify-center md:ml-[0]"
                      onClick={() => navigate("/sigleblog")}
                      rightIcon={
                        <Img
                          className="my-2.5 ml-[5px] mr-[30px] h-5"
                          src="images/img_upload.svg"
                          alt="upload"
                        />
                      }
                      shape="round"
                    >
                      <div className="text-left text-sm leading-[normal] tracking-[-0.50px]">
                        Read More
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col items-center justify-start gap-[49px]">
              <div className="flex w-full flex-col items-center justify-start gap-7 rounded-lg">
                <div className="flex w-full flex-row items-start justify-between rounded-lg md:gap-10">
                  <Text
                    id="health"
                    className="mb-0.5 text-4xl tracking-[-0.50px] text-black-900 md:text-[34px] sm:text-[32px]"
                    size="txtInterSemiBold36Black900"
                  >
                    Health{" "}
                  </Text>
                  <Button
                    className="common-pointer mt-[5px] min-w-[122px] cursor-pointer text-center text-sm font-semibold leading-[normal] tracking-[-0.50px]"
                    onClick={() => navigate("/allblog")}
                    shape="round"
                    color="bluegray_900"
                    size="lg"
                  >
                    View All
                  </Button>
                </div>
                <Line className="h-px w-full bg-black-900_7f" />
              </div>
              <div className="grid w-full grid-cols-3 items-start justify-between gap-[19px] pb-[33px] md:grid-cols-2 sm:grid-cols-1">
                <div className="flex w-full flex-1 flex-col items-center justify-start">
                  <div className="flex w-full flex-col items-start justify-start gap-[21px]">
                    <div
                      className="flex h-[247px] w-full flex-col items-center justify-start bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: "url('images/img_group38_8.png')",
                      }}
                    >
                      <div className="flex  w-full flex-col justify-end gap-[167px] bg-gradient p-4 md:gap-10">
                        <Button
                          className="ml-[308px] mr-2 mt-2 min-w-[70px] cursor-pointer text-center text-xs font-bold leading-[normal] tracking-[0.12px] md:ml-[0]"
                          shape="square"
                          color="purple_500"
                          size="xs"
                        >
                          Health
                        </Button>
                        <Text
                          className="mr-[269px] text-xs tracking-[-0.50px] text-white-A700"
                          size="txtInterRegular12WhiteA700"
                        >
                          Ukraine, 24 april 2022
                        </Text>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                      <Text
                        className="w-full text-lg tracking-[-0.50px] text-black-900"
                        size="txtInterSemiBold18Black900"
                      >
                        Zelensky accuses Russia of worst crimes since WW2{" "}
                      </Text>
                      <Text
                        className="w-full text-xs leading-[25.00px] tracking-[-0.50px] text-black-900_87"
                        size="txtPoppinsRegular12"
                      >
                        The Ukrainian leader says Russia must face an
                        international trial as he calls for the country to be
                        thrown off the UN Security Council.
                      </Text>
                    </div>
                    <Button
                      className="common-pointer flex min-w-[153px] cursor-pointer items-center justify-center"
                      onClick={() => navigate("/sigleblog")}
                      rightIcon={
                        <Img
                          className="my-2.5 ml-[5px] mr-[30px] h-5"
                          src="images/img_upload.svg"
                          alt="upload"
                        />
                      }
                      shape="round"
                    >
                      <div className="text-left text-sm leading-[normal] tracking-[-0.50px]">
                        Read More
                      </div>
                    </Button>
                  </div>
                </div>
                <div className="flex w-full flex-1 flex-col items-center justify-start">
                  <div className="flex w-full flex-col items-start justify-start gap-[21px]">
                    <div
                      className="flex h-[247px] w-full flex-col items-center justify-start bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: "url('images/img_group38_9.png')",
                      }}
                    >
                      <div className="flex  w-full flex-col justify-end gap-[167px] bg-gradient p-4 md:gap-10">
                        <Button
                          className="ml-[308px] mr-2 mt-2 min-w-[70px] cursor-pointer text-center text-xs font-bold leading-[normal] tracking-[0.12px] md:ml-[0]"
                          shape="square"
                          color="purple_500"
                          size="xs"
                        >
                          Health
                        </Button>
                        <Text
                          className="mr-[269px] text-xs tracking-[-0.50px] text-white-A700"
                          size="txtInterRegular12WhiteA700"
                        >
                          Ukraine, 24 april 2022
                        </Text>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                      <Text
                        className="w-full text-lg tracking-[-0.50px] text-black-900"
                        size="txtInterSemiBold18Black900"
                      >
                        Zelensky accuses Russia of worst crimes since WW2{" "}
                      </Text>
                      <Text
                        className="w-full text-xs leading-[25.00px] tracking-[-0.50px] text-black-900_87"
                        size="txtPoppinsRegular12"
                      >
                        The Ukrainian leader says Russia must face an
                        international trial as he calls for the country to be
                        thrown off the UN Security Council.
                      </Text>
                    </div>
                    <Button
                      className="common-pointer flex min-w-[153px] cursor-pointer items-center justify-center"
                      onClick={() => navigate("/sigleblog")}
                      rightIcon={
                        <Img
                          className="my-2.5 ml-[5px] mr-[30px] h-5"
                          src="images/img_upload.svg"
                          alt="upload"
                        />
                      }
                      shape="round"
                    >
                      <div className="text-left text-sm leading-[normal] tracking-[-0.50px]">
                        Read More
                      </div>
                    </Button>
                  </div>
                </div>
                <div className="flex w-full flex-1 flex-col items-center justify-start">
                  <div className="flex w-full flex-col items-start justify-start gap-[21px]">
                    <div
                      className="flex h-[247px] w-full flex-col items-center justify-start bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: "url('images/img_group38_10.png')",
                      }}
                    >
                      <div className="flex  w-full flex-col justify-end gap-[167px] bg-gradient p-4 md:gap-10">
                        <Button
                          className="ml-[308px] mr-2 mt-2 min-w-[70px] cursor-pointer text-center text-xs font-bold leading-[normal] tracking-[0.12px] md:ml-[0]"
                          shape="square"
                          color="purple_500"
                          size="xs"
                        >
                          Health
                        </Button>
                        <Text
                          className="mr-[269px] text-xs tracking-[-0.50px] text-white-A700"
                          size="txtInterRegular12WhiteA700"
                        >
                          Ukraine, 24 april 2022
                        </Text>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-start">
                      <Text
                        className="w-full text-lg tracking-[-0.50px] text-black-900"
                        size="txtInterSemiBold18Black900"
                      >
                        Zelensky accuses Russia of worst crimes since WW2{" "}
                      </Text>
                      <Text
                        className="w-full text-xs leading-[25.00px] tracking-[-0.50px] text-black-900_87"
                        size="txtPoppinsRegular12"
                      >
                        The Ukrainian leader says Russia must face an
                        international trial as he calls for the country to be
                        thrown off the UN Security Council.
                      </Text>
                    </div>
                    <Button
                      className="common-pointer flex min-w-[153px] cursor-pointer items-center justify-center"
                      onClick={() => navigate("/sigleblog")}
                      rightIcon={
                        <Img
                          className="my-2.5 ml-[5px] mr-[30px] h-5"
                          src="images/img_upload.svg"
                          alt="upload"
                        />
                      }
                      shape="round"
                    >
                      <div className="text-left text-sm leading-[normal] tracking-[-0.50px]">
                        Read More
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </List>
          <div className="mx-auto flex w-full max-w-[1294px] flex-col items-start justify-start gap-[49px] md:px-5">
            <div className="flex w-full flex-col items-center justify-start gap-7 rounded-lg">
              <div className="flex w-full flex-row items-start justify-between rounded-lg md:gap-10">
                <Text
                  id="finance"
                  className="mb-0.5 text-4xl tracking-[-0.50px] text-black-900 md:text-[34px] sm:text-[32px]"
                  size="txtInterSemiBold36Black900"
                >
                  Finance{" "}
                </Text>
                <Button
                  className="common-pointer mt-[5px] min-w-[122px] cursor-pointer text-center text-sm font-semibold leading-[normal] tracking-[-0.50px]"
                  onClick={() => navigate("/allblog")}
                  shape="round"
                  color="bluegray_900"
                  size="lg"
                >
                  View All
                </Button>
              </div>
              <Line className="h-px w-full bg-black-900_7f" />
            </div>
            <List
              className="grid w-[67%] grid-cols-2 flex-row gap-[19px] pb-[33px] md:grid-cols-1 sm:flex-col"
              orientation="horizontal"
            >
              <div className="flex w-full flex-col items-center justify-start">
                <div className="flex w-full flex-col items-start justify-start gap-[21px]">
                  <div
                    className="flex h-[247px] w-full flex-col items-center justify-start bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: "url('images/img_group38_11.png')",
                    }}
                  >
                    <div className="flex  w-full flex-col justify-end gap-[167px] bg-gradient p-4 md:gap-10">
                      <Button
                        className="ml-[300px] mr-2 mt-2 min-w-[78px] cursor-pointer text-center text-xs font-bold leading-[normal] tracking-[0.12px] md:ml-[0]"
                        shape="square"
                        color="orange_A700"
                        size="xs"
                      >
                        Finance
                      </Button>
                      <Text
                        className="mr-[269px] text-xs tracking-[-0.50px] text-white-A700"
                        size="txtInterRegular12WhiteA700"
                      >
                        Ukraine, 24 april 2022
                      </Text>
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-center justify-start">
                    <Text
                      className="w-full text-lg tracking-[-0.50px] text-black-900"
                      size="txtInterSemiBold18Black900"
                    >
                      Zelensky accuses Russia of worst crimes since WW2{" "}
                    </Text>
                    <Text
                      className="w-full text-xs leading-[25.00px] tracking-[-0.50px] text-black-900_87"
                      size="txtPoppinsRegular12"
                    >
                      The Ukrainian leader says Russia must face an
                      international trial as he calls for the country to be
                      thrown off the UN Security Council.
                    </Text>
                  </div>
                  <Button
                    className="common-pointer flex min-w-[153px] cursor-pointer items-center justify-center"
                    onClick={() => navigate("/sigleblog")}
                    rightIcon={
                      <Img
                        className="my-2.5 ml-[5px] mr-[30px] h-5"
                        src="images/img_upload.svg"
                        alt="upload"
                      />
                    }
                    shape="round"
                  >
                    <div className="text-left text-sm leading-[normal] tracking-[-0.50px]">
                      Read More
                    </div>
                  </Button>
                </div>
              </div>
              <div className="flex w-full flex-col items-center justify-start">
                <div className="flex w-full flex-col items-start justify-start gap-[21px]">
                  <div
                    className="flex h-[247px] w-full flex-col items-center justify-start bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: "url('images/img_group38_12.png')",
                    }}
                  >
                    <div className="flex  w-full flex-col justify-end gap-[167px] bg-gradient p-4 md:gap-10">
                      <Button
                        className="ml-[300px] mr-2 mt-2 min-w-[78px] cursor-pointer text-center text-xs font-bold leading-[normal] tracking-[0.12px] md:ml-[0]"
                        shape="square"
                        color="orange_A700"
                        size="xs"
                      >
                        Finance
                      </Button>
                      <Text
                        className="mr-[269px] text-xs tracking-[-0.50px] text-white-A700"
                        size="txtInterRegular12WhiteA700"
                      >
                        Ukraine, 24 april 2022
                      </Text>
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-center justify-start">
                    <Text
                      className="w-full text-lg tracking-[-0.50px] text-black-900"
                      size="txtInterSemiBold18Black900"
                    >
                      Zelensky accuses Russia of worst crimes since WW2{" "}
                    </Text>
                    <Text
                      className="w-full text-xs leading-[25.00px] tracking-[-0.50px] text-black-900_87"
                      size="txtPoppinsRegular12"
                    >
                      The Ukrainian leader says Russia must face an
                      international trial as he calls for the country to be
                      thrown off the UN Security Council.
                    </Text>
                  </div>
                  <Button
                    className="common-pointer flex min-w-[153px] cursor-pointer items-center justify-center"
                    onClick={() => navigate("/sigleblog")}
                    rightIcon={
                      <Img
                        className="my-2.5 ml-[5px] mr-[30px] h-5"
                        src="images/img_upload.svg"
                        alt="upload"
                      />
                    }
                    shape="round"
                  >
                    <div className="text-left text-sm leading-[normal] tracking-[-0.50px]">
                      Read More
                    </div>
                  </Button>
                </div>
              </div>
            </List>
          </div>
          <div className="mx-auto flex w-full max-w-[1290px] flex-col items-center justify-start rounded-[20px] bg-gray-900 p-[37px] md:px-5">
            <div className="mb-[5px] flex w-[54%] flex-col items-center justify-start gap-[30px] rounded-[50px] md:w-full">
              <div className="flex w-full flex-col items-center justify-start gap-[38px]">
                <Text
                  className="w-full text-center text-5xl tracking-[-0.50px] text-white-A700 md:text-[44px] sm:text-[38px]"
                  size="txtInterSemiBold48"
                >
                  Get the Latest Notifications and Info from Us
                </Text>
                <Text
                  className="w-full text-center text-base leading-[35.00px] tracking-[-0.50px] text-white-A700_b2"
                  size="txtInterRegular16"
                >
                  <>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&#39;s standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled.
                  </>
                </Text>
              </div>
              <Button
                className="min-w-[196px] cursor-pointer rounded-[26px] border border-solid border-bluegray-900 text-center text-lg font-semibold leading-[normal] tracking-[-0.50px] !text-bluegray-900"
                color="white_A700"
                size="xl"
              >
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomepagePage;
