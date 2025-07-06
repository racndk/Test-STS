import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

function AdminLayout({ children, user }) {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar user={user} />
      <div className="content-wrapper p-3">
        <section className="content">
          {children}
        </section>
      </div>
    </div>
  );
}

export default AdminLayout;
