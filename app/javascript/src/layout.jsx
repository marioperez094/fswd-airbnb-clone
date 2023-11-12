// layout.js
import React from 'react';

const Layout = (props) => {
  const { username } = props;
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand text-danger" href="/">Airbnb</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-2">
                <a className="nav-link" href={`/my-properties`}>AirBnB Your Home!</a>
              </li>
              <li className="nav-item">
                { username 
                  ? <a className="nav-link user-icon" href={`/user/${username}`}>{ username[0] }</a>
                  : <a className='nav-link' href={`/login?redirect_url=${window.location.pathname}`}>Log in</a>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {props.children}
      <footer className="p-3 bg-light">
        <div>
          <p className="me-3 mb-0 text-secondary">Airbnb Clone</p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;