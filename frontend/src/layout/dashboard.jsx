import React from "react";
import UserMenu from "../component/userMenu";
import { Outlet } from "react-router-dom";

function Dashboard () {
    return (
        <section className="bg-white">
            <div className="container mx-auto p-3 grid lg:grid-cols-[250px_1fr]">
                {/* left menu */}
                <div className=" py-4 sticky top-24 overflow-y-auto hidden lg:block border-r">
                    <UserMenu/>
                </div>

                {/* right menu */}
                <div className="">
                    <Outlet/>
                </div>
            </div>
        </section>
    )
}

export default Dashboard;