import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Auth } from 'aws-amplify';
import { Helmet } from 'react-helmet';

import './App.css';
import { AppContext } from './libs/contextLib';
import { onError } from "./libs/errorLib";
import Routes from './Routes';


function App() {
    const history = useHistory();
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const color = '#777777';

    useEffect(() => {
        onLoad();
    }, [])

    async function onLoad() {
        try {
            await Auth.currentSession();
            userHasAuthenticated(true);
        } catch (e) {
            if (e !== 'No current user') {
                onError(e);
            }
        }
        setIsAuthenticating(false);
    }

    async function handleLogout() {
        await Auth.signOut();

        userHasAuthenticated(false);

        history.push('/login');
    }


    return (
        !isAuthenticating &&
        <div className='App container'>
            <Helmet>
                <style>{`body { background-color: ${color}; }`}</style>
            </Helmet>
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/'>Scratch</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {isAuthenticated
                        ? <>
                            <LinkContainer to='/settings'>
                                <NavItem href='/settings'>Settings</NavItem>
                            </LinkContainer>
                            <NavItem onClick={handleLogout}>Logout</NavItem>
                            </>
                            : <>
                            <LinkContainer to='/signup'>
                                <NavItem href='/signup'>Signup</NavItem>
                            </LinkContainer>
                            <LinkContainer to='/login'>
                                <NavItem href='/login'>Login</NavItem>
                            </LinkContainer>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
                <Routes />
            </AppContext.Provider>
        </div>
    );
}



export default App;