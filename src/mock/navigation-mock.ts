import { Home, School, Person, Notifications } from "@mui/icons-material";

export const navigationItems = [
  {
    path: "/",
    label: "홈",
    Icon: Home,
  },
  {
    path: "/study",
    label: "학습",
    Icon: School,
  },
  {
    path: "/news",
    label: "새소식",
    Icon: Notifications,
    hasNotification: true,
    notificationCount: 3,
  },
  {
    path: "/profile",
    label: "프로필",
    Icon: Person,
  },
];