import Link from "next/link";

export default function WelcomeScreen() {
    return (
        <>
            <div className="container">
                <div className="main-container">
                    <div className="title-container">
                        <h1>Let&apos;s build your nonprofit portfolio</h1>
                        <p>
                            Join the movement and help fix the October 7th
                            aftermath
                        </p>
                    </div>
                    <div className="causes-container">
                        <ul>
                            <li>
                                <span>1</span> Choose causes
                            </li>
                            <li>
                                <span>2</span> Save your portfolio
                            </li>
                            <li>
                                <span>3</span> Subscribe to make an impact
                            </li>
                            <li>
                                <span>4</span> Receive weekly impact updates
                            </li>
                        </ul>
                    </div>
                    <Link href="/causes" passHref>
                        <button className="main-button">
                            Let&apos;s start <span className="arrow">→</span>
                        </button>
                    </Link>
                </div>
                <footer className="footer">
                    By continuing you agree to our{" "}
                    <Link href="https://www.bono.so/tc">
                        Terms And Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="https://www.bono.so/privacy-policy">
                        Privacy Policy
                    </Link>
                    .
                </footer>
            </div>
        </>
    );
}
