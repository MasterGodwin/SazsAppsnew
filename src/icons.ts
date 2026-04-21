
export const icons = {
  car:      "M5 17H3v-5l2-5h14l2 5v5h-2m-1 0a2 2 0 01-4 0m-6 0a2 2 0 01-4 0",
  gps:      "M12 2a7 7 0 017 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 017-7z M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  users:    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  history:  "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  owners:   "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  bell:     "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  search:   "M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z",
  grid:     "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  inbox:    "M22 12h-6l-2 3h-4l-2-3H2 M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z",
  profile:  "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  chat:     "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  dash:     "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  list:     "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
};

export const sideItems = [
  { id: "profile",  icon: icons.profile,  label: "Profile"       },
  { id: "settings", icon: icons.settings, label: "Settings"      },
  { id: "users",    icon: icons.users,    label: "Members"       },
  { id: "owners",   icon: icons.owners,   label: "Contacts"      },
  { id: "chat",     icon: icons.chat,     label: "Chat"          },
  { id: "list",     icon: icons.list,     label: "Teams"         },
  { id: "history",  icon: icons.history,  label: "Activity"      },
  { id: "inbox",    icon: icons.inbox,    label: "Orders"        },
  { id: "dash",     icon: icons.dash,     label: "Configuration" },
];

export const headerTabs = [
  { id: "dashboard", label: "Dashboard"       },
  { id: "arrival",   label: "Vehicle Arrival" },
  { id: "gps",       label: "GPS Tracking"    },
  { id: "drivers",   label: "Drivers"         },
  { id: "owners",    label: "Vehicle Owners"  },
  { id: "history",   label: "History"         },
];