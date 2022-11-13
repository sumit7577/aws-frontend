/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable global-require */
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import { useState, useEffect } from "react";
import { getAllUsers } from "networking/adminApi";
import { useMaterialUIController, setLoading, setLogin, setError } from "context";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


const getRandomImage= {
  team1:require("assets/images/team-1.jpg"),
  team2:require("assets/images/team-2.jpg"),
  team3:require("assets/images/team-3.jpg"),
  team4:require("assets/images/team-4.jpg"),
  team5:require("assets/images/team-5.jpg"),
}


export default function data() {
  
  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const [controller, dispatch] = useMaterialUIController();
  const [allUsers, setAllUsers] = useState(null);
  useEffect(async () => {
    const responseData = await getAllUsers(dispatch);
    setAllUsers(() => responseData);
  }, []);
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Edit</MenuItem>
      <MenuItem onClick={closeMenu}>Show</MenuItem>
      <MenuItem onClick={closeMenu}>Delete</MenuItem>
    </Menu>
  )

  return {
    columns: [
      { Header: "user", accessor: "user", width: "25%", align: "left" },
      { Header: "user type", accessor: "type", align: "left" },
      { Header: "total instance", accessor: "instance", align: "center" },
      { Header: "password", accessor: "password", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: allUsers?.message.map((item, index) => {
      const randomImage = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
      const imageName = `team${randomImage}`;
      return (
        {
          user: <Author image={getRandomImage[imageName]} name={item?.name} email={item?.email} />,
          type: <Job title={item?.isAdmin ? "Admin" : "User"} />,
          instance: (
            <MDBox ml={-1}>
              <MDBadge badgeContent={item?.instance?.length > 0 ? item.instance.length : "0"} color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          password: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {item?.password?.substring(0, 30)}...
            </MDTypography>
          ),
          action: (
            <>
              <MDBox color="text" px={2}>
                <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
                  more_vert
                </Icon>
              </MDBox>
              {renderMenu}
            </>
          ),
        }
      )
    }) ?? []
  };
}
