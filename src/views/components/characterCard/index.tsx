import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import { Character } from "@/models/character";

interface CharacterCardProps {
    character: Character;
    priority?: boolean;
}

export default function CharacterCard({ character, priority = false }: CharacterCardProps) {
    return (
        <Link href={`/character/${character.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image 
                    src={character.image} 
                    alt={character.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    priority={priority}
                />
            </div>
            <div className={styles.cardInfo}>
                <h3>{character.name}</h3>
                <p>{character.species}</p>
            </div>
        </Link>
    );
}