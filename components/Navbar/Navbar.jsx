import {Nav, Anchor} from "grommet";
import {Clock, Task, ChatOption, BarChart} from "grommet-icons";
import Link from "next/link";
import {useUser} from "@auth0/nextjs-auth0/client";
import styles from './Navbar.module.css'

export default function Navbar() {
    const {user, isLoading} = useUser();

    return (
        <>
            <div className={styles.navbar}>
                <Nav direction="row" background="accent-4" pad="medium" style={{padding: '1rem 2rem 1rem 2rem'}}>
                    <Link href='/'><Clock color='white'/></Link>
                    <Link href='/tasks'><Task color='white'/></Link>
                    <Link href='/analytics'><BarChart color='white'/></Link>
                    <nav className={styles.navbarItems}>
                        <Link href="/profile">Profile</Link>
                        {!user ? (
                            <Link href="/api/auth/login">Login</Link>
                        ) : (
                            <Link href="/api/auth/logout">Logout</Link>
                        )}
                    </nav>
                </Nav>
            </div>

        </>
    );
}
