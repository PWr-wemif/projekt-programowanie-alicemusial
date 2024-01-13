import { Avatar, Menu } from "@mantine/core";
import { useLogout } from "./auth/logout";
import { Link } from "react-router-dom";

export default function AvatarMenu() {
    const logout = useLogout();
    
    return (
        <Menu position="bottom-end" offset={5} withArrow>
            <Menu.Target>
                <Avatar size="lg"src={null} alt="no image here" />
            </Menu.Target>
            <Menu.Dropdown>
                <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <Menu.Item>Profile</Menu.Item>
                </Link>
                <Menu.Item color="red" onClick={logout}>Logout</Menu.Item>
            </Menu.Dropdown>
        </Menu>

    )
}


