"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.css";

interface FilterBarProps {
    search: string;
    onSearchChange: (value: string) => void;
    species: string;
    onSpeciesChange: (value: string) => void;
    gender: string;
    onGenderChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
}

export default function FilterBar(props: FilterBarProps) {
    const { 
        search, onSearchChange, 
        species, onSpeciesChange, 
        gender, onGenderChange, 
        status, onStatusChange 
    } = props;

    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

   
    useEffect(() => {
        setMounted(true);
    },[]);

   
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isModalOpen]);


    const renderSelects = () => (
        <>
            <div className={styles.inputGroup}>
                <select value={species} onChange={(e) => onSpeciesChange(e.target.value)}>
                    <option value="">Species</option>
                    <option value="Human">Human</option>
                    <option value="Alien">Alien</option>
                    <option value="Robot">Robot</option>
                    <option value="Disease">Disease</option>
                </select>
            </div>
            <div className={styles.inputGroup}>
                <select value={gender} onChange={(e) => onGenderChange(e.target.value)}>
                    <option value="">Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Genderless">Genderless</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>
            <div className={styles.inputGroup}>
                <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
                    <option value="">Status</option>
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>
        </>
    );

    return (
        <>
        
            <div className={styles.filtersWrapper}>
                
      
                <div className={styles.searchContainer}>
                    <div className={styles.inputGroup}>
                  
                        <input 
                            type="text" 
                            placeholder="Filter by name..." 
                            value={search}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                </div>

               
                <div className={styles.desktopSelects}>
                    {renderSelects()}
                </div>

              
                <button 
                    className={styles.mobileAdvancedBtn} 
                    onClick={() => setIsModalOpen(true)}
                >
                    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z" fill="#2196F3"/>
                    </svg>
                    ADVANCED FILTERS
                </button>
            </div>

          
            {mounted && isModalOpen && createPortal(
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    
                
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>Filters</h2>
                            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
                                &times;
                            </button>
                        </div>

                     
                        <div className={styles.modalBody}>
                            {renderSelects()}
                        </div>

                        <button className={styles.applyBtn} onClick={() => setIsModalOpen(false)}>
                            APPLY
                        </button>
                    </div>

                </div>,
                document.body
            )}
        </>
    );
}