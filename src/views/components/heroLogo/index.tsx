import styles from "./index.module.css";
import RMLogo from "@/assets/rm.png"; 

export default function HeroLogo() {
    return (
        <div className={styles.hero}>
            <img src={RMLogo.src} alt="Rick and Morty Characters" />
        </div>
    );
}