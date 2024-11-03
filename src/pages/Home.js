import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-vh-100 w-100 position-relative overflow-hidden" style={{ }}>
                <div className="min-vh-100 w-100 d-flex align-items-center justify-content-center position-relative">

                <div className="text-center position-relative" style={{ zIndex: 2 }}>
                    <h1 className="display-1 fw-bold mb-3" style={{ color: 'white' }}>
                        Reel<span style={{ color: '#dc3545' }}>Haven</span>
                    </h1>
                    
                    <p className="lead text-white fs-4 mb-5">
                        Discover. Stream. Experience.
                    </p>

                    <div className="d-flex justify-content-center gap-3 mb-5">
                        <Link 
                            to="/movies" 
                            className="btn btn-danger btn-lg px-4 py-2 rounded-pill"
                        >
                            Browse Movies
                        </Link>
                        <Link 
                            to="/register" 
                            className="btn btn-outline-light btn-lg px-4 py-2 rounded-pill"
                        >
                            Join Now
                        </Link>
                    </div>

                    <div className="d-flex justify-content-center gap-5 text-white">
                        <div>
                            <h3 className="fw-bold mb-0">1000+</h3>
                            <small className="text-light">Movies</small>
                        </div>
                        <div>
                            <h3 className="fw-bold mb-0">4K</h3>
                            <small className="text-light">Quality</small>
                        </div>
                        <div>
                            <h3 className="fw-bold mb-0">HD</h3>
                            <small className="text-light">Streaming</small>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                    body, html {
                        margin: 0 !important;
                        padding: 0 !important;
                        overflow-x: hidden !important;
                        width: 100% !important;
                        background-color: #1a1a1a !important;
                    }
                    #root {
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                    }
                    .navbar {
                        padding-bottom: 1rem;
                    }
                    .navbar-brand, .nav-link {
                        color: white !important;
                        font-weight: 500;
                    }
                    .nav-link {
                        margin-left: 1.5rem;
                    }
                    .nav-link:hover {
                        color: #dc3545 !important;
                    }
                    .btn-danger {
                        background-color: #dc3545;
                        border-color: #dc3545;
                    }
                    .btn-danger:hover {
                        background-color: #bb2d3b;
                        border-color: #bb2d3b;
                    }
                `}
            </style>
        </div>
    );
}