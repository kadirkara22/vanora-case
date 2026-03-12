import styles from "./index.module.css";

export default function Container(props: { children: string | JSX.Element | JSX.Element[] }) {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    );
}
