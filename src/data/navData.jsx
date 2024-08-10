import dashicon from "../assets/img/category.svg";
import profile from "../assets/img/profile.svg";
import receipt from "../assets/img/receipt-2.svg";
import settings from "../assets/img/setting.svg";
import logout from "../assets/img/logout.svg";

export const navData = [
  {
    label: "Dashboard",
    icon: dashicon,
    path: "/dashboard",
    visible: ["admin", "consultant", "agent"],
  },
  {
    label: "Business",
    icon: profile,
    path: "/dashboard/business/sector",
    subsection: [
      {
        label: "Sector Management",
        icon: profile,
        path: "/dashboard/business/sector",
      },
      {
        label: "Type Management",
        icon: profile,
        path: "/dashboard/business/type",
      },
    ],
    visible: ["admin"],
  },
  {
    label: "Station Management",
    icon: receipt,
    path: "/dashboard/station",
    visible: ["admin"],
  },
  {
    label: "Consultant",
    icon: receipt,
    path: "/dashboard/consultant",
    visible: ["admin"],
  },
  {
    label: "Agent",
    icon: receipt,
    path: "/dashboard/agent",
    visible: ["admin", "consultant"],
  },
  {
    label: "Tax Payer Management",
    icon: receipt,
    path: "/dashboard/taxpayer",
    visible: ["admin", "consultant", "agent"],
  },
  // {
  //   label: "Tax Card Management",
  //   icon: receipt,
  //   path: "/dashboard/taxcard",
  //   visible: ["admin", "consultant"],
  // },
  {
    label: "Onbarding",
    icon: receipt,
    path: "/dashboard/onboarding",
    visible: ["agent"],
  },
  {
    label: "Assessment",
    icon: receipt,
    path: "/dashboard/assessment",
    visible: ["agent"],
  },
  {
    label: "Billing",
    icon: receipt,
    path: "/dashboard/billing",
    visible: ["agent"],
  },
  {
    label: "Payment",
    icon: receipt,
    path: "/dashboard/payment",
    visible: ["agent"],
  },
  {
    label: "Settings",
    icon: settings,
    path: "/dashboard/settings",
    visible: ["admin", "consultant", "agent"],
  },
  {
    label: "Logout",
    icon: logout,
    path: "/login",
    visible: ["admin", "consultant", "agent"],
  },
];
