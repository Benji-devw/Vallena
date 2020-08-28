import React, { Fragment } from "react";
import Sections from '../components/sections/Sections';

const Layout = () => {

  // const [sidebarToggle, setSidebarOpen] = useState(false)
  // const items = useSelector(state => state.items)

  // const closeSidebar = () => {
  //   setSidebarOpen(false)
  // }
  // const openSidebar = () => {
  //   setSidebarOpen(true)
  // }


  return (
    <Fragment>
      <main>
        <div className="row no-gutters">
          <div className="col-md-12">
            <Sections/>
          </div>

          {/* <aside className={sidebarToggle ? 'sidebar sidebarOpen' : 'sidebar sidebarClosed'}>
            <div className={sidebarToggle ? "cart-btn mt-5 push-in" : "cart-btn mt-5 push-out" }
                onClick={sidebarToggle ? closeSidebar : openSidebar}
              >
            </div>
          </aside> */}
        </div>
      </main>
    </Fragment>
  );
}
export default Layout;
