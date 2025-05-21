import { Link } from "react-router-dom";

export default function Error(): JSX.Element {
  return (
    <>
      <h1>Not Fount Page</h1>
      <Link to="/signin">
        <h2>Вернуться в авторизацию?</h2>
      </Link>
    </>
  );
}
