import {
    Grid,
    Link,
    Typography,
    Box,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const CredentialInfo = () => {
    return (
        <>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    xs={12}
                    md={12}
                >
                </Grid>
            </Grid>
            <Field
                sx={{ my: 3 }}
                fullWidth
                required
                label="رقم الهوية/الاقامة أو البربد الالكتروني"
                name="email"
                component={TextFieldFinal}
                type="email"
                variant="outlined"
                dir="rtl"
                className="custom-field"
            />
            <Field
                sx={{ mb: 3 }}
                fullWidth
                required
                label="كلمة المرور"
                name="password"
                component={TextFieldFinal}
                type="password"
                variant="outlined"
                dir="rtl"
                className="custom-field"
            />
            <Box
                textAlign="center"
                sx={{
                    // py: 2,
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    color="textSecondary"
                    variant="body1"
                    sx={{
                        // paddingBottom: '16px',
                        textDecoration: 'underline'
                    }}
                >
                    <Link
                        component={RouterLink}
                        to="/forgetpassword"
                        variant="h6"
                    >
                        نسيت كلمة المرور
                    </Link>
                </Typography>
            </Box>
        </>
    );
};
export default CredentialInfo;
