import React, { useEffect, useState } from 'react';
import { favoriteApi } from '../services/api';
import Loader from '../../shared/components/Loader';
import './Favorites.scss';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        try {
            const data = await favoriteApi.getFavorites();
            setFavorites(data.favorites);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const removeFavorite = async (songId) => {
        try {
            await favoriteApi.toggleFavorite(songId);
            fetchFavorites();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <Loader text="Loading your favorites..." />;

    return (
        <div className="favorites-page">
            <header className="page-header">
                <h1>My <span className="highlight">Favourites</span></h1>
                <p>{favorites.length} songs saved</p>
            </header>

            <div className="favorites-grid">
                {favorites.length === 0 ? (
                    <div className="empty-state glass-morphism">
                        <p>No favorites yet. Go home and discover music according to your mood!</p>
                    </div>
                ) : (
                    favorites.map((fav) => (
                        <div key={fav._id} className="favorite-card glass-morphism">
                            <div className="cover-wrapper">
                                <img src={fav.songId.thumbnail} alt={fav.songId.title} />
                                <button className="remove-btn" onClick={() => removeFavorite(fav.songId._id)}>❤️</button>
                            </div>
                            <div className="info">
                                <h3>{fav.songId.title}</h3>
                                <p>{fav.songId.album} - {fav.songId.year}</p>
                                <p>{fav.songId.mood}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Favorites;
