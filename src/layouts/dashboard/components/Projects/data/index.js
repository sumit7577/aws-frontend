/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import React, { useState } from "react";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { getAllInstance } from "networking/adminApi";
import { useMaterialUIController, setLoading, setLogin, setError } from "context";


export default function data() {
  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const [controller, dispatch] = useMaterialUIController();
  const [instanceData, setInstanceData] = useState(() => null);

  React.useEffect(async () => {
    const getInstancesData = await getAllInstance(dispatch);
    setInstanceData(() => getInstancesData)
  }, []);

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
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Instances", accessor: "instance", width: "45%", align: "left" },
      { Header: "Users", accessor: "users", width: "10%", align: "left" },
      { Header: "Created By", accessor: "createdBy", align: "center" },
      { Header: "Created At", accessor: "createdAt", align: "center" },
      { Header: "Expires At", accessor: "expiresAt", align: "center" },
      { Header: "Edit/Show", accessor: "edit", align: "center" },
    ],

    rows: instanceData?.message?.map((elem,index) => (
      {
        instance: <Company image={logoXD} name={elem.data} />,
        users: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, elem.useremail],
            ])}
          </MDBox>
        ),
        createdBy: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {elem.createdBy.name}
          </MDTypography>
        ),
        createdAt: (
          <MDBox width="8rem" textAlign="left">
           {elem.createdAt}
          </MDBox>
        ),
        expiresAt: (
          <MDBox width="8rem" textAlign="left">
            {elem.expiresAt}
          </MDBox>
        ),
        edit: (
          <>
            <MDBox color="text" px={2}>
              <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
                more_vert
              </Icon>
            </MDBox>
            {renderMenu}
          </>
        ),
      })
    ) ?? []

  };
}
