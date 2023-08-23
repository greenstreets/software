import React from "react";
import { Outlet} from "react-router-dom";
import "../css/footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <table className="footer-table">
          <tbody>
            <tr>
              <td>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </td>
              <td>
                inventore veritatis et quasi architecto beatae vitae dicta sunt
              </td>
              <td>sum quia dolor sit amet, consectetur, </td>
            </tr>
          </tbody>
        </table>
      </footer>
      <Outlet />
    </>
  );
};

export default Footer;
