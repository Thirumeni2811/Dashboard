import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Tooltip, MenuItem, Avatar, Menu, Typography } from '@mui/material';
import { Menu as MenuIcon, ChatBubble as ChatBubbleIcon, Apps as AppsIcon, ReplyAll as ReplyAllIcon, ViewDay as ViewDayIcon, Settings as SettingsIcon, RemoveCircle as RemoveCircleIcon, CreditCard as CreditCardIcon, Handshake as HandshakeIcon, Email as EmailIcon } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import Projects from './Projects';
import Logo from '../assets/Logo.svg'
// import Logo2 from '../assets/Logo2.svg'
const drawerWidth = 240;
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawer = (
    <section>
      <div className='min-h-screen bg-black text-white text-3xl font-bold'>
        {/* <div className='p-4'>
          <img key="image" src={Logo2} alt="Logo" className='ml-6'/>
        </div> */}
        <Divider />
        <List>
          {[
            { text: 'Overview', icon: <AppsIcon />, link: '/overview' },
            { text: 'Mentions', icon: <ChatBubbleIcon />, link: '/mentions' },
            { text: 'Replies', icon: <ReplyAllIcon />, link: '/replies' },
            { text: 'Keywords', icon: <ViewDayIcon />, link: '/keywords' },
            { text: 'Negative Keywords', icon: <RemoveCircleIcon />, link: '/negative-keywords' },
            { text: 'Settings', icon: <SettingsIcon />, link: '/settings' },
            { text: 'Account', icon: <AccountCircleIcon />, link: '/account' },
          ].map(({ text, icon, link }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={link}>
                <ListItemIcon style={{ color: '#d63384' }}>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={<span className='text-md font-semibold'>{text}</span>} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            { text: 'Billing', icon: <CreditCardIcon />, link: '/billing' },
            { text: 'Affiliate Program', icon: <HandshakeIcon />, link: '/affiliate-program' },
            { text: 'Contact', icon: <EmailIcon />, link: '/contact' },
          ].map(({ text, icon, link }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={link}>
                <ListItemIcon style={{ color: '#d63384' }}>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={<span className='text-md font-semibold'>{text}</span>} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </section>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'white',
          color: '#121312',
          border: 'none'
        }}
      >
        <Toolbar className='flex justify-between'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          {/* Project dropdown */}

          <Projects />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        className='bg-white min-h-screen text-black'
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {/* Routes will be handled by the parent App component */}
        {props.children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node,
};

export default ResponsiveDrawer;
