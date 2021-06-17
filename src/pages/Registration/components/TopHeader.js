import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Grid
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(40),
        height: theme.spacing(40),
    },
    avatarHover: {
        "&:hover": {
            backgroundColor: '#f6a923',
            border: 'solid 5px #f6a923'
        }
    }
}));

const TopHeader = (props) => {
    const classes = useStyles();
    return (
        <Box
            className={classes.root}
            sx={{ mb: 5, mr: 1.5 }}
        >
            <Grid container spacing={3} sx={{ margin: "0 auto", width: "auto" }}>
                <Grid item xs={6}>
                    <Avatar
                        className={classes.large + ' ' + classes.avatarHover}
                        // onClick={() => setColor({ ...avtarColor, rightAvatar: '#214256', leftAvatar: '#c8d9d9' })}
                        sx={{
                            height: '85px', width: '85px', backgroundColor: '#c8d9d9', cursor: "pointer"
                        }}
                    >
                        أفراد
        </Avatar>
                </Grid>
                <Grid item xs={6}>
                    <Avatar
                        className={classes.large + ' ' + classes.avatarHover}
                        // onClick={() => setColor({ ...avtarColor, leftAvatar: '#214256', rightAvatar: '#c8d9d9' })}
                        sx={{
                            height: '85px', width: '85px', backgroundColor: '#214256', cursor: "pointer"
                        }}
                    >
                        مركز
        </Avatar>
                </Grid>
            </Grid>
        </Box>  
    )
}
export default TopHeader;
