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
          <Sections/>
  
          {/* <aside className={sidebarToggle ? 'sidebar sidebarOpen' : 'sidebar sidebarClosed'}>
            <div className={sidebarToggle ? "cart-btn mt-5 push-in" : "cart-btn mt-5 push-out" }
                onClick={sidebarToggle ? closeSidebar : openSidebar}
              >
            </div>
          </aside> */}
 
      </main>
    </Fragment>
  );
}
export default Layout;
