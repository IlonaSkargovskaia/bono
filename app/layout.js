import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "./mainLayout";
import { ReduxProvider } from "./redux-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Bono - Home Assignment",
    description:
        "Bono is the easiest way to donate to causes you care about and see your impact.",
    openGraph: {
        title: "Bono - Home Assignment",
        description:
            "Bono is the easiest way to donate to causes you care about and see your impact.",
        siteName: "Bono",
        images: [
            {
                url: "http://localhost:3000/images/main_bono_logo.png",
                alt: "Bono Logo",
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReduxProvider>
                    <MainLayout>{children}</MainLayout>
                </ReduxProvider>
            </body>
        </html>
    );
}
