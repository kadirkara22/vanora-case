"use client";

import { useEffect, useState } from "react";

import { useRouter, usePathname, useSearchParams } from "next/navigation"; 

import styles from "./index.module.css";
import Container from "@/views/components/container";
import CharacterCard from "@/views/components/characterCard";
import FilterBar from "@/views/components/filters";
import HeroLogo from "@/views/components/heroLogo";
import { Character } from "@/models/character";
import { useDebounce } from "@/hooks/useDebounce";
import { getCharacters } from "@/services/characterService";

export default function List() {
   
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

   
    const [search, setSearch] = useState(searchParams.get("name") || "");
    const [species, setSpecies] = useState(searchParams.get("species") || "");
    const [gender, setGender] = useState(searchParams.get("gender") || "");
    const [status, setStatus] = useState(searchParams.get("status") || "");
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

    const [characters, setCharacters] = useState<Character[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);

    const debouncedSearch = useDebounce(search, 500);

   
    useEffect(() => {
        const params = new URLSearchParams();

        if (debouncedSearch) params.set("name", debouncedSearch);
        if (species) params.set("species", species);
        if (gender) params.set("gender", gender);
        if (status) params.set("status", status);
        if (page > 1) params.set("page", page.toString());

        
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [debouncedSearch, species, gender, status, page, pathname, router]);


  
    const fetchCharacters = async (reset: boolean = false) => {
        setLoading(true);
        try {
        
            const data = await getCharacters({
                page: reset ? 1 : page,
                name: debouncedSearch,
                species,
                gender,
                status
            });
            
            setCharacters(prev => reset ? data.results : [...prev, ...data.results]);
            setHasMore(data.info.next !== null);
            
        } catch (error) {
            console.error("Error fetching characters:", error);
        } finally {
            setLoading(false);
        }
    };

  
    useEffect(() => {
        setPage(1);
        fetchCharacters(true);
       
    }, [debouncedSearch, species, gender, status]);


    useEffect(() => {
        if (page > 1) {
            fetchCharacters();
        }

    }, [page]);


    return (
        <Container>
            <section className={styles.list}>
                <HeroLogo />

                <FilterBar 
                    search={search}
                    onSearchChange={setSearch}
                    species={species}
                    onSpeciesChange={setSpecies}
                    gender={gender}
                    onGenderChange={setGender}
                    status={status}
                    onStatusChange={setStatus}
                />

                {characters.length === 0 && !loading && (
                    <div className={styles.emptyState}>
                        No characters found matching your filters.
                    </div>
                )}

                <div className={styles.grid}>
                    {characters.map((char,index) => (
                        <CharacterCard key={char.id}
                         character={char} 
                          priority={index < 4}
                         />
                    ))}
                </div>

                {hasMore && characters.length > 0 && (
                    <button 
                        className={styles.loadMoreBtn} 
                        onClick={() => setPage(prev => prev + 1)}
                        disabled={loading}
                    >
                        {loading ? "LOADING..." : "LOAD MORE"}
                    </button>
                )}
            </section>
        </Container>
    );
}



