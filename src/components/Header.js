import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';

// skeleton for the header with the title and navigation bar

function logout() {
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/signin";
}

function Header(props) {
    const { sections, title } = props;
    var [user, setUser] = React.useState(false);

    React.useEffect(() => {
        // Checks if user is signed in - redirects to sign in if not signed in
        fetch("http://localhost:8080/user/", {
            method: "GET",
            credentials: "include",
        }).then((res) => {
            if (res.status === 404) {
                window.location.href = "/signin";
            }
            else {
                res.json().then((json) => {
                    user = json.displayName;
                    setUser(json.displayName);
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {title}
                </Typography>
                <Typography
                    component="h3"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    Hello, {user}
                </Typography>
                <Button variant="contained" onClick={() => logout()}>
                    Logout
                </Button>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            >
                {sections.map((section) => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        sx={{ p: 1, flexShrink: 0 }}
                    >
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}

Header.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ).isRequired,
    title: PropTypes.string.isRequired,
};

export default Header;