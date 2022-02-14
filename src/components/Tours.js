import React, { useEffect, useState } from 'react';
import { ErrorComponent, ToursContainer } from '../styles/Element.style';
import Tour from './Tour';

// Tours API
const API = 'https://course-api.com/react-tours-project';

export default function Tours() {
    const [loading, setLoading] = useState(true);
    const [tours, setTours] = useState([]);
    const [error, setError] = useState('');

    const fetchTours = async () => {
        setLoading(true);
        try {
            const response = await fetch(API);
            const data = await response.json();
            setLoading(false);
            setTours(data);
        } catch (err) {
            setLoading(false);
            setError('Data not Found!');
        }
    };

    useEffect(() => {
        fetchTours();
    }, []);

    const handleNoInterested = (id) => {
        setTours(tours.filter((item) => item.id !== id));
    };

    console.log(tours.length, error);

    if (loading) {
        return (
            <h1 style={{ textAlign: 'center', marginTop: 50 }}>Loading...</h1>
        );
    }

    return (
        <ToursContainer>
            {tours.length ? (
                <div>
                    <h2>Our Tours</h2>
                    {tours.map((item) => (
                        <Tour
                            {...item}
                            handleNoInterested={handleNoInterested}
                            key={item.id}
                        />
                    ))}
                </div>
            ) : (
                <ErrorComponent>
                    <h1>Sorry!</h1>
                    <h1>{error ? error : 'No Tour Available!'}</h1>
                    {!error && (
                        <button type="button" onClick={fetchTours}>
                            Refresh
                        </button>
                    )}
                </ErrorComponent>
            )}
        </ToursContainer>
    );
}
