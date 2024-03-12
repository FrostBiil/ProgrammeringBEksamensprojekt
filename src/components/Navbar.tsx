import React from 'react';
import { NavLink } from 'react-router-dom';
import { Group, Button } from '@mantine/core';

const Navbar: React.FC = () => {
    return (
        <Group style={{ padding: '20px', background: '#f4f4f4' }}>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
                <Button variant="default">Hjem</Button>
            </NavLink>
            <NavLink to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="default">Log Ind</Button>
            </NavLink>
        </Group>
    );
};

export default Navbar;