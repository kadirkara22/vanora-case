import { Character, ApiResponse } from "@/models/character"; 

const BASE_URL = "https://rickandmortyapi.com/api/character";


export interface GetCharactersParams {
    page?: number;
    name?: string;
    status?: string;
    species?: string;
    gender?: string;
}

export async function getCharacters(params: GetCharactersParams): Promise<ApiResponse<Character[]>> {
    
    const query = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            query.append(key, String(value));
        }
    });

    const res = await fetch(`${BASE_URL}?${query.toString()}`);

 
    if (res.status === 404) {
       
        return { 
            info: { count: 0, pages: 0, next: null, prev: null },
            results:[] 
        };
    }

    if (!res.ok) {
        throw new Error("Failed to fetch characters");
    }

    return res.json();
}


export async function getCharacter(id: string | number): Promise<Character> {
    const res = await fetch(`${BASE_URL}/${id}`, {

        next: { revalidate: 3600 } 
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch character with id ${id}`);
    }

    return res.json();
}