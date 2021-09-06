import React from 'react'
/* MATERIAL UI - ICONS */
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ReceiptRoundedIcon from '@material-ui/icons/ReceiptRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
/*=====================*/  

export const SidebarData = [
    {
        title: "Homepage",
        icon: <HomeRoundedIcon />,
        link: "/home"
    },
    {
        title: "Mechanics",
        icon: <ReceiptRoundedIcon />,
        link: "/mechanics"
    },
    {
        title: "Transfer Credit",
        icon: <SendRoundedIcon />,
        link: "/transfer"
    },
    {
        title: "Logout",
        icon: <ExitToAppRoundedIcon />,
        link: "/logout"
    },
]