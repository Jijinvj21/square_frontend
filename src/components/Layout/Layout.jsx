import { Outlet } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';



function Layout() {


  return (
    <>
      <div className="layout_container">
      <Toaster />
          <h1>header</h1>
          <Outlet />
          <h2>footer</h2>
        </div>
    </>
  );
}

export default Layout;
