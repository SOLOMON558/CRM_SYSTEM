import { Outlet } from "react-router";
import skeletWithLaptop from "./assets/skelet_with_laptop.png";
import "./Auth.css";

export default function AuthLayout(): JSX.Element {
  return (
    <main>
      <div className="auth-body">
        <img
          src={skeletWithLaptop}
          alt="skelet_with_laptop"
          className="auth-image"
          loading="lazy"
          width={1109}
          height={1080}
        />
        <div className="auth-body-form">
          <h1 className="auth-body-title">Login to your Account</h1>
          <p className="auth-body-description">
            See what is going on with your business
          </p>
          <Outlet />
        </div>
      </div>
    </main>
  );
}
