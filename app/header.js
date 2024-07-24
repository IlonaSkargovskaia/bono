"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
    const { selectedCauses } = useSelector((state) => state.causes);
    const [nav, setNav] = useState(false);

    useEffect(() => {
        setNav(selectedCauses.length > 0);
    }, [selectedCauses]);

    const handleClick = (e) => {
        if (!nav) {
            e.preventDefault();
            alert(
                "First you need to choose causes. Press on the button 'Let's start"
            );
        }
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link href="/" passHref>
                    <div className="logo">
                        <Image
                            src="/images/main_bono_logo.png"
                            alt="Logo"
                            width={77}
                            height={45}
                            className="logo-image"
                            priority
                        />
                    </div>
                </Link>
                <Link href="/login" passHref>
                    <button className="login-button" onClick={handleClick}>
                        Login
                    </button>
                </Link>
            </div>
        </header>
    );
};

export default Header;
