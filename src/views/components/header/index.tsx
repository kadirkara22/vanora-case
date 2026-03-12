import Container from "../container";
import styles from "./index.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <Container>
                <img className={styles.logo} src={require("../../../assets/logo.png").default.src} alt="Logo" />
            </Container>
        </header>
    );
}
