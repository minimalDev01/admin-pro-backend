const getMenuFrontEnd = (role = "USER_ROLE") => {
  const menu = [
    {
      title: "Dashboard",
      icon: "mdi mdi-gauge",
      submenu: [
        { title: "Main", url: "/" },
        { title: "ProgressBar", url: "progress" },
        { title: "Graphics", url: "grafica1" },
        { title: "Promises", url: "promises" },
        { title: "Rxjs", url: "rxjs" },
      ],
    },
    {
      title: "Maintenance",
      icon: "mdi mdi-folder-lock-open",
      submenu: [
        // { title: "Users", url: "users" },
        { title: "Hospitals", url: "hospitals" },
        { title: "Medics", url: "medics" },
      ],
    },
  ];

  if (role === "ADMIN_ROLE") {
    menu[1].submenu.unshift({ title: "Users", url: "users" });
  }

  return menu;
};

module.exports = {
  getMenuFrontEnd,
};
