import React, { forwardRef } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();
    const { pathname } = useLocation();

    const logo = (
        <Box
            ref={ref}
            component={'div'}
            sx={{
                width: 'auto',
                height: 40,
                display: 'inline-flex',
                fontWeight: 'bold',
                color: pathname === '/' ? theme.palette.primary.main : theme.palette.primary.contrastText,
                ...sx,
            }}
            {...other}
        >
            LOGO
        </Box>
    );

    if (disabledLink) {
        return logo;
    }

    return (
        <Link component={RouterLink} to="/" sx={{ display: 'contents' }}>
            {logo}
        </Link>
    );
});

export default Logo;
