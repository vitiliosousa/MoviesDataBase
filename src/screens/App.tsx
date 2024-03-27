import Navbar from "@/components/ui/navbar";
import { Search } from "./Search";

export function App() {
    return (
        <> 
        <div className="bg-gradient-to-r from sky-500 to blue-950">
            <Navbar/>
            <Search/>
        </div>
        </>
    )
}