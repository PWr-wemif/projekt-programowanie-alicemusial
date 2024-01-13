import { Button, Group, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import UnprotectedComponent from "./auth/unprotected";
import ProtectedComponent from "./auth/protected";
import AvatarMenu from "./AvatarMenu";

export default function Header() {
    return (<>
        <div style={{
            position: 'absolute',
            top: 10,
            left: 10, 
            zIndex: 1
        }}>
        <Link to="/">
            <Image h={90} w={90} src="./public/logo.png"/>
        </Link>
        </div>
        <div style={{
            position: 'absolute',
            top: 10,
            right:10, 
            zIndex: 1
        }}>
            <UnprotectedComponent>
                <Group gap='sm'>
                    <Link to="/register">   
                        <Button variant="outline" radius="xl">
                            Register
                        </Button>
                    </Link>

                    <Link to="/login">
                        <Button radius="xl" >
                            Log in
                        </Button>
                    </Link>
                </Group>
            </UnprotectedComponent>
            <ProtectedComponent>
                <AvatarMenu />
            </ProtectedComponent>
        </div>
    </>)
}
