
import { InputWithButton } from "./InputWithButton";

function Navbar() {
  return (
    <nav className="mt-2 mx-12 flex justify-between ">
        <h1 className="text-2xl sm:text-3xl font-bold">MoviesDataBase</h1>
        <div className="flex items-center justify-center ">
            <InputWithButton/>
        </div>
    </nav>
  );
}
export default Navbar;
