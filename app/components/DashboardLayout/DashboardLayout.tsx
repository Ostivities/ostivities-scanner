"use client";
import { Label } from "@/app/components/typography/Typography";
import FormProvider from "@/app/contexts/form-context/FormContext";
import Button from "@/app/ui/atoms/Button";
import { NAV_LINKS, EVENT_NAV_LINKS } from "@/app/utils/data";
import { ACCOUNT_TYPE } from "@/app/utils/enums";
import { IDashboard, INavLinks } from "@/app/utils/interface";
import Hamburger from "@/public/hamburger.svg";
import OwanbeLogo from "@/public/owanbe.svg";
import { Skeleton } from "antd";
import {
  BellFilled,
  CaretDownFilled,
  CompassOutlined,
  FieldTimeOutlined,
  FileAddOutlined,
  FileSearchOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import CloseIcon from "@/public/close.svg";
import blank from "@/public/blank.svg";
import type { MenuProps } from "antd";
import {
  Avatar,
  Badge,
  Dropdown,
  Drawer,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { isValidElement, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import useLocalStorage from "use-local-storage";
import { useLogout } from "../../hooks/auth/auth.hook";
import useFetch from "../forms/create-events/auth";
import emptyImage from "@/public/empty.svg";

const items1: MenuProps["items"] = [
  {
    label: "Create Event",
    key: "create-event",
  },
  {
    label: "Events created",
    key: "events-created",
  },
];

const items2: MenuProps["items"] = [
  { icon: CompassOutlined, title: "Events", link: "/events" },
].map((item) => {
  const key = item.link;
  return {
    key: key,
    icon: React.createElement(item.icon),
    label: (
      <span style={{ fontFamily: "bricolagegrotesqueRegular" }}>
        <a href={item.link}>{item.title}</a>
      </span>
    ),
  };
});

const items3: MenuProps["items"] = [
  { icon: CompassOutlined, title: "Discovery", link: "/events" },
].map((item) => {
  const key = item.link;

  return {
    key: `${key}`,
    icon: React.createElement(item.icon),
    label: item.title,
  };
});

function DashboardLayout({
  children,
  title,
  steppers,
  event_unique_key,
  extraComponents,
}: IDashboard): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  // const { profile } = useProfile();
  const { logoutUser } = useLogout();
  const [cookies, setCookie, removeCookie] = useCookies([
    "forgot_email",
    "is_registered",
    "event_id",
    "form_stage",
    "stage_one",
    "stage_two",
    "stage_three",
    "user_fullname",
    "profileData",
  ]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const logOut = async () => {
    const res = await logoutUser.mutateAsync();
    if (res.status === 200) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("tokenTimestamp");
      localStorage.removeItem("token");
      localStorage.removeItem("tokenTimestamp");
      localStorage.removeItem("profileData");
      removeCookie("forgot_email");
      removeCookie("event_id");
      removeCookie("form_stage");
      removeCookie("stage_one");
      removeCookie("stage_two");
      removeCookie("stage_three");
      router.push("/login");
    }
  };

  // if(profile?.isFetched === true && cookies?.profileData === undefined){
  //   setCookie("profileData", JSON.stringify(profile?.data?.data?.data));
  // }
  // const accountType = profile?.data?.data?.data?.accountType

  const isRegistered = cookies?.is_registered === "registered";
  const items: MenuProps["items"] = [
    {
      label: (
        <a
          href="https://ostivities.tawk.help"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <Label content="Help" />
        </a>
      ),
      key: "help",
    },
    {
      label: <Label className="cursor-pointer" content="Sign out" />,
      key: "sign-out",
      onClick: async () => {
        const res = await logoutUser.mutateAsync();
        if (res.status === 200) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("tokenTimestamp");
          localStorage.removeItem("token");
          localStorage.removeItem("tokenTimestamp");
          localStorage.removeItem("profileData");
          removeCookie("forgot_email");
          removeCookie("event_id");
          removeCookie("form_stage");
          removeCookie("stage_one");
          removeCookie("stage_two");
          removeCookie("stage_three");
          removeCookie("profileData");
          router.push("/login");
        }
      },
    },
  ];

  const { isLoggedIn, loading } = useFetch();

  const initialProfileData = (() => {
    if (typeof window !== "undefined") {
      const storedProfileData = localStorage.getItem("profileData");
      if (
        storedProfileData &&
        storedProfileData !== "undefined" &&
        storedProfileData !== "null"
      ) {
        try {
          return JSON.parse(storedProfileData); // Return parsed data if valid
        } catch (error) {}
      }
      return null;
    }
  })();

  const [profileData, setProfileData] = useState(initialProfileData);
  const [isProfileReady, setIsProfileReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProfileData = localStorage.getItem("profileData");
      if (
        storedProfileData &&
        storedProfileData !== "undefined" &&
        storedProfileData !== "null" &&
        JSON.stringify(initialProfileData) !== storedProfileData
      ) {
        try {
          setProfileData(JSON.parse(storedProfileData));
        } catch (error) {
          // console.error("Failed to parse profileData:", error);
        }
      }
      setIsProfileReady(true);
    }
  }, [initialProfileData]);

  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useLocalStorage<boolean>("sidebar", true);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const endpoints = [
    "create-events",
    "events-created",
    "coming-soon",
    "settings",
  ];



  

  const [toggleNotifications, setToggleNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);



  return (
    <FormProvider>
      <Layout
        style={{
          height: "100vh",
          fontFamily: "BricolageGrotesqueMedium",
          overflow: "hidden",
        }}
      >
        <div className=" bg-white shadow-sm flex flex-row items-center justify-between px-2 py-3 lg:hidden">
          <Link href="/" shallow>
            <Image
              src={OwanbeLogo}
              alt="Ostivities Logo"
              style={{ width: "130px", height: "50px", cursor: "pointer" }}
            />
          </Link>
          <div
            className="flex items-center justify-center cursor-pointer"
            style={{
              backgroundColor: "#FADEDE", // Faded red background
              borderRadius: "8px", // Rounded corners
              padding: "8px 12px", // Padding inside the rectangle
            }}
            onClick={async () => {
              const res = await logoutUser.mutateAsync();
              if (res.status === 200) {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("tokenTimestamp");
                localStorage.removeItem("token");
                localStorage.removeItem("tokenTimestamp");
                localStorage.removeItem("profileData");
                removeCookie("forgot_email");
                removeCookie("event_id");
                removeCookie("form_stage");
                removeCookie("stage_one");
                removeCookie("stage_two");
                removeCookie("stage_three");
                removeCookie("profileData");
                router.push("/login");
              }
            }}
            title="Sign Out"
          >
            <LogoutOutlined
              style={{ fontSize: "20px", color: "#E20000" }} // Icon size and color
            />
          </div>
        </div>

        <Layout>
          <Layout
            style={
              {
                // paddingBottom: '2rem',
              }
            }
          >
            <Layout
              className="md:px-5"
              style={{
                // padding: "0 20px",
                overflowY: "auto",
              }}
            >
              <Content className="flex flex-col space-y-8 md:py-8">
                {steppers && (
                  <div
                    className={`mx-auto text-center flex flex-row items-center justify-center pb-3 ${
                      !isValidElement(steppers) ? "hidden" : ""
                    }`}
                  >
                    {steppers}
                  </div>
                )}
                {extraComponents && <div className="">{extraComponents}</div>}
                <div
                  style={{
                    // borderRadius: "30px",
                    border: "1px solid #E5E5E5",
                    boxShadow: "0px 8px 24px 0px #00000014",
                    background: "linear-gradient(0deg, #FFFFFF, #FFFFFF)",
                  }}
                  className="px-4 py-10 md:px-12 md:py-16  md:rounded-[30px]"
                >
                  <div>{children}</div>
                </div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Layout>
    </FormProvider>
  );
}

export default DashboardLayout;
