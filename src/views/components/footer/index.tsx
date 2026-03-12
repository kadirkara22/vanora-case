import Container from "../container";
import styles from "./index.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                <a className={styles.link} href="https://www.vanoraventures.com" title="Vanora Ventures">
                    Vanora Ventures
                </a>
            </Container>
        </footer>
    );
}
