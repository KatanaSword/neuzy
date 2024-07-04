import { Link } from "react-router-dom";
import { handleSectionNavigation } from "../../utils";

import { Text, Line } from "../../components";
import { SearchSVG } from "../../assets/images";

const Header = () => {
  const scrollingToScection = (id) => {
    handleSectionNavigation(id);
  };
  return (
    <header className="flex items-center justify-center md:px-5 w-full">
      <div className="bg-bluegray-900 flex flex-row items-center justify-center p-[26px] sm:px-5 w-full">
        <div className="flex md:flex-col flex-row md:gap-5 items-center justify-between w-full">
          <Link to="/">
            <Text
              className="text-4xl sm:text-[32px] md:text-[34px] text-white-A700 tracking-[-0.50px]"
              size="txtInterSemiBold36"
            >
              Neuzy
            </Text>
          </Link>
          <div className="flex md:flex-col flex-row gap-5 items-center justify-center">
            <Text
              onClick={() => scrollingToScection("sport")}
              className="text-lg text-white-A700 tracking-[-0.50px]"
              size="txtInterSemiBold18"
            >
              Sport
            </Text>
            <Text
              onClick={() => scrollingToScection("health")}
              className="text-lg text-white-A700 tracking-[-0.50px]"
              size="txtInterSemiBold18"
            >
              Health
            </Text>
            <Text
              onClick={() => scrollingToScection("political")}
              className="text-lg text-white-A700 tracking-[-0.50px]"
              size="txtInterSemiBold18"
            >
              Political
            </Text>
            <Text
              onClick={() => scrollingToScection("business")}
              className="text-lg text-white-A700 tracking-[-0.50px]"
              size="txtInterSemiBold18"
            >
              Business
            </Text>
            <Text
              onClick={() => scrollingToScection("finance")}
              className="text-lg text-white-A700 tracking-[-0.50px]"
              size="txtInterSemiBold18"
            >
              Finance
            </Text>
            <Text
              onClick={() => scrollingToScection("life")}
              className="text-lg text-white-A700 tracking-[-0.50px]"
              size="txtInterSemiBold18"
            >
              Life
            </Text>
            <Text
              onClick={() => scrollingToScection("entertainment")}
              className="text-lg text-white-A700 tracking-[-0.50px]"
              size="txtInterSemiBold18"
            >
              Entertainment
            </Text>
          </div>
          <div className="flex flex-row items-center gap-5 justify-center">
            <SearchSVG
              className="h-[24px] w-[24px] cursor-pointer"
              fill="#ffff"
            />
            <Line className="bg-white-A700 h-[26px] w-px" />
            <div className="flex flex-row items-center gap-5 justify-center">
              <Link to="/login">
                <Text
                  className="common-pointer text-sm text-white-A700 tracking-[-0.50px]"
                  size="txtInterRegular14"
                >
                  Login
                </Text>
              </Link>
              <Link to="/register">
                <Text
                  className="common-pointer text-sm text-white-A700 tracking-[-0.50px]"
                  size="txtInterRegular14"
                >
                  Register
                </Text>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
