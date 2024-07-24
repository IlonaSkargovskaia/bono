import Header from "./header";


const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="main">{children}</main>
        </>
    );
};

export default MainLayout;
