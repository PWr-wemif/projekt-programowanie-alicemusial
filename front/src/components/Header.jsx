import { Avatar, Button, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import UnprotectedComponent from "./auth/unprotected";
import ProtectedComponent from "./auth/protected";

export default function Header() {
    return (<>
        <div style={{
            position: 'absolute',
            top: 10,
            right:10, 
            zIndex: 1
        }}>
            <UnprotectedComponent>
                <Group gap='sm'>
                    <Button variant="outline" radius="xl">Register</Button>
                    <Link to="/login">
                        <Button radius="xl" >
                            Log in
                        </Button>
                    </Link>
                </Group>
            </UnprotectedComponent>
            <ProtectedComponent>
                <Avatar src={null} alt="no image here" />

            </ProtectedComponent>
        </div>
    </>)
}
