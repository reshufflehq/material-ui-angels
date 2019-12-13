import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = props => {
  const { title, subtitle, roles, users } = props;
  return (
    <div className='empty'>
      <div className='empty-icon'>
        <i className='icon icon-people'></i>
      </div>
      <p className='empty-title h5'>{title}</p>
      <p className='empty-subtitle'>{subtitle}</p>
      {roles.ADMIN ? (
        <Link
          style={{ textDecoration: 'none', color: 'black' }}
          to={{
            pathname: `/angels/admin`,
            state: {
              users: users,
            },
          }}
        >
          Admin
        </Link>
      ) : null}
    </div>
  );
};

export default EmptyState;
