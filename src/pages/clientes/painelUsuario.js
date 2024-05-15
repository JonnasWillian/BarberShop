import React, { useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importe o useHistory do React Router

import './painelUsuario.css';

function PainelUsuario() {
    const location = useLocation();

    return(
        <div className="painelUsuario">
            <div class="main-container">
                <section class="app-navigation">
                    <div class="container app-title-container">
                        <div class="content-container">
                            <div class="title-nav-box">
                                <h1>{location.state.userName}</h1>
                                <div class="nav-icon"><i class="ion-more"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="container app-navigation-container">
                        <div class="content-container">
                            <nav class="nav-app-results-info">
                                <ul class="nav-app-results-info-list">
                                    <li class="nav-app-results-info-list-item">Feedback</li>
                                    <li class="nav-app-results-info-list-item">Prototype</li>
                                    <li class="nav-app-results-info-list-item active">Results</li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                </section>

                <section class="additional-question">
                    <div class="container">
                        <div class="content-container">
                            <p>Is the App finished? <span>Integrated Analysis</span></p>
                            <div class="close-question"><i class="ion-close-round"></i></div>
                        </div>
                    </div>
                </section>

                <section class="test-results">
                    <div class="container">
                        <div class="content-container">
                            <h2>Prototype Test Averages</h2>
                            <div class="general-scores">
                                <div class="data-test">
                                    <div class="data-test-item">
                                        <div class="data-score">5.7</div>
                                        <div class="data-description">24 Testers</div>
                                    </div>
                                    <div class="data-test-item">
                                        <div class="data-score">7.7</div>
                                        <div class="data-description">Willingness to Buy</div>
                                    </div>
                                    <div class="data-test-item">
                                        <div class="data-score">8.4</div>
                                        <div class="data-description">Hesitant</div>
                                    </div>
                                    <div class="data-test-item">
                                        <div class="data-score">9.1</div>
                                        <div class="data-description">Want it now</div>
                                    </div>
                                </div>
                                <div class="score-test">
                                    <div class="data-score">7.7</div>
                                    <div class="data-description">Overall Score</div>
                                </div>
                            </div>
                            <h2>Completed tests</h2>
                            <h3>Today</h3>
                            <div class="personal-comments">
                                <div class="personal-comments-name">Mary</div>
                                <div class="personal-comments-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</div>
                                <div class="personal-comments-score">
                                    <div class="data-score">5.55</div>
                                    <div class="data-description">View more</div>
                                </div>
                            </div>

                            <div class="personal-comments">
                                <div class="personal-comments-name">John</div>
                                <div class="personal-comments-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</div>
                                <div class="personal-comments-score">
                                    <div class="data-score">5.55</div>
                                    <div class="data-description">View more</div>
                                </div>
                            </div>

                            <div class="personal-comments">
                                <div class="personal-comments-name">Eddy</div>
                                <div class="personal-comments-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</div>
                                <div class="personal-comments-score">
                                    <div class="data-score">5.55</div>
                                    <div class="data-description">View more</div>
                                </div>
                            </div>
                            </div>
                        </div>
                </section>
            </div>
        </div>
    );
}

export default PainelUsuario;