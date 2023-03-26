import { useRouter } from "next/router";
import { HiSaveAs } from "react-icons/hi";

export const Navbar = () => {
  const { push, replace, asPath } = useRouter();

  return (
    <div
      className="  fixed w-full top-0  bg-trasparent z-40 "
      style={{
        backdropFilter: "blur(8px)",
      }}
    >
      <div className=" grid grid-cols-2 gap-x-8 py-3 px-12  ">
        <div className="flex justify-start items-center">
          <div
            className=" bg-black flex py-2 px-4 rounded-full shadow-lg cursor-pointer hover:bg-gray-800"
            onClick={() => {
              push("/");
            }}
          >
            <HiSaveAs color="white" size={25} />
          </div>
        </div>

        <div className="flex justify-end items-center gap-x-4  ">
          <p
            className="text-gray-500 hover:text-white cursor-pointer text-xs"
            onClick={() => {
              push("/information");
              // replace(asPath);
            }}
          >
            Información
          </p>
          <p
            className="text-gray-500 hover:text-white cursor-pointer text-xs"
            onClick={() => {
              push("/products");
              replace(asPath);
            }}
          >
            Productos
          </p>
        </div>
      </div>
    </div>
  );
};
