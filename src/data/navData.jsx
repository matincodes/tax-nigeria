import dashicon from "../assets/img/category.svg";
import profile from "../assets/img/profile.svg";
import receipt from "../assets/img/receipt-2.svg";
import settings from "../assets/img/setting.svg";
import logout from "../assets/img/logout.svg";

export const navData = [
    {
        label: "Dashboard",
        icon: dashicon,
        path: "/dashboard"
    },
    {
        label: "Business",
        icon: profile,
        path: "dashboard/business",
        subsection: [
            {
                label: "Sector Management",
                icon: profile,
                path: "/dashboard/business/sector"
            },
            {
                label: "Type Management",
                icon: profile,
                path: "/dashboard/business/type"
            }
        ]
    },
    {
        label:  "Station Management",
        icon: receipt,
        path: "/dashboard/station"
    },
    {
        label: "Consultant",
        icon: receipt,
        path: "/dashboard/consultant"
    },
    {
        label: "Agent",
        icon: receipt,
        path: "/dashboard/agent"
    },
    {

        label: "Tax Payer Management",
        icon: receipt,
        path: "/dashboard/taxpayer"
    },
    {
        label: "Settings",
        icon: settings,
        path: "/dashboard/settings" 
    },
    {
        label: "Logout",
        icon: logout
    }
]