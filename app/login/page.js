"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/store/slices/causesSlice";

const Login = () => {
    const dispatch = useDispatch();
    const { selectedCauses, userData } = useSelector((state) => state.causes);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedCausesId = selectedCauses.map((item) => item.id);

        // console.log(selectedCausesId, userData);

        const payload = {
            email: email,
            firstName: name,
            causes: selectedCausesId,
        };

        try {
            const response = await fetch(
                "https://dev.api.bono.so/v1/auth/register/anonymous",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                throw new Error("Error during sending information");
            }

            const data = await response.json();
            console.log("Data sent successfully", data); 

            dispatch(setUserData({ name, email }));
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    return (
        <div className="container">
             <div className="back-button-container login-back" >
                    <Link href="/causes" passHref>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="back-button"
                        />
                    </Link>
                </div>
            <div className="main-container">
               
                <div className="title-container" style={{maxWidth: "450px"}}>
                    <h1>Let’s save your portfolio</h1>
                    <p>
                        You’ll receive weekly impact reports from Bono. Your
                        email is not shared with anyone!
                    </p>
                </div>
                <div className="login-container">
                    <button className="google-button">
                        <Image
                            src="/images/google-logo.webp"
                            alt="Google logo"
                            className="google-logo"
                            width={40}
                            height={40}
                        />
                        Continue with Google
                    </button>
                    <div className="divider">or</div>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="input"
                            type="text"
                            name="name"
                            value={name}
                            required
                            placeholder="Your name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="input"
                            type="email"
                            name="email"
                            required
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="info-text">
                            You will receive a temporary password by email
                        </p>
                        <button type="submit" className="main-button">
                            Save & continue
                        </button>
                    </form>
                    {error && <div style={{marginTop: "30px", color: "red"}}>{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default Login;
