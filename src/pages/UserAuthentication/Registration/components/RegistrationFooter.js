
import React from 'react';
import {
    Box,
    Typography,
    Link
} from '@material-ui/core';
import { Link as RouterLink, useNavigate } from 'react-router-dom';


const RegistrationFooter = (props) => {

    return (
        <Box
            textAlign="center"
            sx={{
                py: 2,
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography
                color="textSecondary"
                variant="body1"
                sx={{
                    paddingTop: '16px',
                }}
            >
                لديك حساب على المنصة ؟
        </Typography>
            <Typography
                color="textSecondary"
                variant="body1"
            >
                <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                    sx={{
                        textDecoration: 'underline'
                    }}
                >
                    تسجيل الدخول
          </Link>
            </Typography>
        </Box>
    );

}
export default RegistrationFooter;