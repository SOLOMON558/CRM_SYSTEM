import { Outlet } from "react-router";
import "./Auth.css"

export default function AuthLayout(): JSX.Element {
  return (
    <>
      <div className="container">
        <div className="left-column">
          <img src="https://uahistory.co/pidruchniki/matyash-biology-8-class-2016-rus/matyash-biology-8-class-2016-rus.files/image133.jpg" alt="Картинка" />
        </div>
        <div className="right-column">
          <div className="app-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
