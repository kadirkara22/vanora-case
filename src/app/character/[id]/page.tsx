import Image from "next/image";
import Container from "@/views/components/container";
import styles from "./page.module.css";
import { Character, Episode } from "@/models/character";
import BackButton from "@/views/components/backButton";

async function getCharacter(id: string): Promise<Character> {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, { 
        next: { revalidate: 3600 } 
    });
    if (!res.ok) throw new Error("Failed to fetch character");
    return res.json();
}

async function getEpisodes(episodeUrls: string[]): Promise<Episode[]> {
  
    const episodeIds = episodeUrls.map(url => {
        const parts = url.split("/");
        return parts[parts.length - 1];
    });


    const res = await fetch(`https://rickandmortyapi.com/api/episode/${episodeIds.join(",")}`);
    if (!res.ok) throw new Error("Failed to fetch episodes");
    
    const data = await res.json();
   
    return Array.isArray(data) ? data : [data];
}

export default async function CharacterDetail({ params }: { params: { id: string } }) {
    const character = await getCharacter(params.id);
    const episodes = await getEpisodes(character.episode);

    return (
        <Container>
            <main className={styles.detailPage}>
                <BackButton className={styles.backBtn} />
                
                <div className={styles.header}>
                    <div className={styles.avatarWrapper}>
                        <Image 
                            src={character.image} 
                            alt={character.name}
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    </div>
                    <h1 className={styles.name}>{character.name}</h1>
                </div>

                <div className={styles.contentRow}>
                    <div className={styles.column}>
                        <h2 className={styles.columnTitle}>Informations</h2>
                        <div className={styles.infoList}>
                            <div className={styles.infoItem}>
                                <div className={styles.infoLabel}>Gender</div>
                                <div className={styles.infoValue}>{character.gender}</div>
                            </div>
                            <div className={styles.infoItem}>
                                <div className={styles.infoLabel}>Status</div>
                                <div className={styles.infoValue}>{character.status}</div>
                            </div>
                            <div className={styles.infoItem}>
                                <div className={styles.infoLabel}>Specie</div>
                                <div className={styles.infoValue}>{character.species}</div>
                            </div>
                            <div className={styles.infoItem}>
                                <div className={styles.infoLabel}>Origin</div>
                                <div className={styles.infoValue}>{character.origin.name}</div>
                            </div>
                            <div className={styles.infoItem}>
                                <div className={styles.infoLabel}>Type</div>
                                <div className={styles.infoValue}>{character.type || "Unknown"}</div>
                            </div>
                            <div className={styles.infoItem}>
                                <div className={styles.infoLabel}>Location</div>
                                <div className={styles.infoValue}>{character.location.name}</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h2 className={styles.columnTitle}>Episodes</h2>
                        <div className={styles.episodeList}>
                            {episodes.map(ep => (
                                <div key={ep.id} className={styles.episodeItem}>
                                    <div>
                                        <div className={styles.episodeCode}>{ep.episode}</div>
                                        <div className={styles.episodeName}>{ep.name}</div>
                                        <div className={styles.episodeDate}>{ep.air_date}</div>
                                    </div>
                                    <div className={styles.chevron}>&gt;</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </Container>
    );
}