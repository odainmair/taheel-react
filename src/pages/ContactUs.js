/* eslint-disable */
import { Box, Typography } from '@material-ui/core';
import { useState } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import MainNavbar from '../components/MainNavbar';

const ContactUs = () => {
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <Box>
            <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
            <MainNavbar
                onMobileClose={() => setMobileNavOpen(false)}
                openMobile={isMobileNavOpen}
            />
            <Typography
                align="center"
                variant="h1"
                sx={{
                    fontSize: 100,
                    color: '#3c8084',
                    paddingTop: 2
                }}
            >
                Comming Soon
        </Typography>
        </Box>
    );
};

export default ContactUs;
