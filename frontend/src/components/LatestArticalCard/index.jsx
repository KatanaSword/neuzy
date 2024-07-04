import { useNavigate } from "react-router-dom";
import { Button, Text, Img } from "../../components";
import { UploadSVG } from "../../assets/images";

const LatestArticalCard = () => {
  const navigate = useNavigate();
  return (
    <div className="my-0 flex h-[229px] w-full flex-row items-center justify-between gap-[22px] md:flex-col">
      <Img
        className="h-[229px] object-cover md:h-auto"
        src="images/img_unsplashj5keq1.png"
        alt="unsplashj5kEQOne"
      />
      <div className="flex flex-col items-start justify-start gap-[20px] rounded-lg">
        <div className="flex w-full flex-col items-start justify-start gap-3.5">
          <Text
            className="text-sm tracking-[-0.50px] text-black-900"
            size="txtInterRegular14Black900"
          >
            New York, 19 april 2022
          </Text>
          <div className="flex w-full flex-col items-center justify-start gap-2.5 font-poppins">
            <Text
              className="w-full text-xl tracking-[-0.50px] text-black-900"
              size="txtPoppinsSemiBold20"
            >
              Jhon Lorni has won 1st place in international match
            </Text>
            <Text
              className="w-full text-xs leading-[25.00px] tracking-[-0.50px] text-black-900_87"
              size="txtPoppinsRegular12"
            >
              this is his first victory in the international olympics, so his
              name is quite explosive on the international scene
            </Text>
          </div>
        </div>
        <Button
          className="common-pointer flex min-w-[153px] cursor-pointer items-center justify-center gap-[5px]"
          onClick={() => navigate("/sigleblog")}
          rightIcon={<UploadSVG />}
          shape="round"
          size="2xl"
        >
          <div className="text-left text-sm leading-[normal] tracking-[-0.50px]">
            Read More
          </div>
        </Button>
      </div>
    </div>
  );
};

export default LatestArticalCard;
