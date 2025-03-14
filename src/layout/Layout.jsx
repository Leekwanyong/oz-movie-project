import { Outlet } from 'react-router';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
