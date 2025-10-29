import { Link, useLocation } from "react-router-dom";

export default function BreadCrumbs() {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);
  let breadCrumbPath = "";

  return (
    <div className="mb-6">
      {pathnames.length > 0 && (
        <Link to="/" className="!text-black font-semibold">
          Home
        </Link>
      )}
      {pathnames.map((name, index) => {
        breadCrumbPath += `/${name}`;

        return (
          <span key={breadCrumbPath}>
            <span className="mx-2 text-gray-500">/</span>
            {index === pathnames.length - 1 ? (
              <span className="text-gray-800 ">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
            ) : (
              <Link to={breadCrumbPath} className="!text-black font-semibold">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
