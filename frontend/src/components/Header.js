import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ user }) => {
    return (
        <header>
            <h1>Welcome, {user?.name || 'Guest'}</h1>
        </header>
    );
}

Header.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string
    })
};

Header.defaultProps = {
    user: {
        name: 'Guest'
    }
};

export default Header;