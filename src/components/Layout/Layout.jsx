import { Outlet } from "react-router-dom";



function Layout() {


  return (
    <>
      <div className="layout_container">
          <h1>header</h1>
          <Outlet />
          <h2>footer</h2>
        </div>
    </>
  );
}

export default Layout;
