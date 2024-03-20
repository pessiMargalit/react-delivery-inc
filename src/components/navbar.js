import Menu from "./menu";

const Navbar = () => {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#0c64c9', color: 'white' }}>
                <Menu />
                <h3 style={{ flexGrow: 1 }}>
                    Mail Delivery Service
                </h3>
            </div>
        </div>

    );
}
export default Navbar;