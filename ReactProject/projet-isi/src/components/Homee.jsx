import { signOut } from "firebase/auth";
import { auth, db } from '../firebase/config.js';
import '../styles/main.css'
import iconOne from '../assets/casque-de-musique.png'
import iconTwo from '../assets/download.png'
import iconThree from '../assets/lecture-video.png'
import '../styles/navStyle.css'
import logo from '../assets/video-calling.png'
import videoAdd from '../assets/add-video.png'
import searchIcon from '../assets/search-interface-symbol.png'
import React, { useState, useEffect } from 'react';
import VideoUploadForm from './VideoUploadForm'; // Importez le composant VideoUploadForm
import { collection, getDocs } from "firebase/firestore"; // Importez les fonctions nécessaires pour Firestore

function Homee() {
    const [showForm, setShowForm] = useState(false); // État pour contrôler la visibilité du formulaire
    const [videos, setVideos] = useState([]); // État pour stocker les vidéos

    // Fonction pour basculer la visibilité du formulaire
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    // Fonction pour récupérer les vidéos depuis Firestore
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "videos"));
                const videosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setVideos(videosData);
            } catch (error) {
                console.error("Error fetching videos: ", error);
            }
        };

        fetchVideos();
    }, []);

    function handleLogout() {
        if (confirm('Etes vous sur de vouloir vous déconnecter?')) {
            signOut(auth).then(() => {
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
            });
        }
    }

    return (
        <div>
            <section className='Nav-container'>
                <div className='navbar'>
                    <img src={logo} alt="" className='logo' />
                    <div className='search-box'>
                        <input type="text" placeholder='Rechercher' />
                        <img src={searchIcon} alt="" className='search-img' />
                    </div>
                    <div className="btn-container">
                        <img src={videoAdd} alt="" className='add-video-img' onClick={toggleForm} /> {/* Ajoutez onClick pour basculer le formulaire */}
                        <button onClick={handleLogout} className='logout-btn'>Se deconnecter</button>
                    </div>
                </div>
            </section>

            <section className='main-container'>
                <div className="main">
                    <h2 className='main-title'>Exprimez, Partagez, Découvrez</h2>
                    <p className='main-description'>Découvrez une plateforme où les visions se rencontrent! Capturez les moments, partagez des histoires et créez des liens à travers des vidéos qui parlent de vous.</p>
                    <div className='main-icons'>
                        <img src={iconTwo} alt="" className='icon-img-two' />
                        <img src={iconThree} alt="" className='icon-img' />
                        <img src={iconOne} alt="" className='icon-img' />
                    </div>
                </div>
            </section>

            {/* Affichez le formulaire uniquement si showForm est true */}
            {showForm && <VideoUploadForm />}

            {/* Section pour afficher les vidéos */}
            <section className='video-gallery'>
    {videos.map((video) => (
        <div key={video.id} className='video-card'>
            <a href={`/video/${video.id}`}>
                <img src={video.thumbnailURL} alt={video.title} className='video-thumbnail' />
            </a>
            <h3>{video.title}</h3>
            <p>Uploaded by: {video.username}</p>
        </div>
    ))}
         </section>          
        </div>
    )
}

export default Homee;