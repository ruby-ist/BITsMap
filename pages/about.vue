<template>
    <div>
        <header class="title-bar">
            <MainLogo class="title" />
            <button class="visit-btn"><NuxtLink to='/'>visit</NuxtLink></button>
        </header>

        <section id="about">
            <MiniLogo class="map-logo" />
            <div class="para">
                GeoBITs is an online map covering all the classes and places in Bannari Amman Institute of Technology. The idea was to help new students to get familiar with college campus and hostels and help them navigate to the places they haven't visited yet. You can also share your location with your friends and colleagues. Press or hold at any place in the map to pin point that location and share it with the popping url. Searching functionality can be used to find your day-to-day classes, exam halls and venues of their special classes. Hope it helps to navigate the campus and saves your time.
            </div>
            <button class="visit-btn bigger">
                <NuxtLink to="/">Explore the Campus!</NuxtLink>
            </button>
        </section>

        <section id="legends">
            <h1>Legends Explained</h1>
            <div class="legends-list">
                <div class="legend-box">
                    <img class="explained-legend" alt="atm" :src="require('~/static/legends/atm.svg')"/>
                    <div class="legend-name">ATM</div>
                </div>
                <div class="legend-box">
                    <img class="explained-legend" alt="cricket" :src="require('~/static/legends/cricket.svg')"/>
                    <div class="legend-name">Cricket Ground</div>
                </div>
                <div class="legend-box">
                    <img class="explained-legend" alt="football" :src="require('~/static/legends/football.svg')"/>
                    <div class="legend-name">Football Ground</div>
                </div>
                <div class="legend-box">
                    <img class="explained-legend" alt="gym" :src="require('~/static/legends/gym.svg')"/>
                    <div class="legend-name">Gym</div>
                </div>
                <div class="legend-box">
                    <img class="explained-legend" alt="hostel" :src="require('~/static/legends/hostel.svg')"/>
                    <div class="legend-name">Hostel</div>
                </div>
                <div class="legend-box">
                    <img class="explained-legend" alt="juice" :src="require('~/static/legends/juice.svg')"/>
                    <div class="legend-name">Juice Bar</div>
                </div>
                <div class="legend-box">
                    <img class="explained-legend" alt="laundry" :src="require('~/static/legends/laundry.svg')"/>
                    <div class="legend-name">Laundry</div>
                </div>
                <div class="legend-box">
                    <img class="explained-legend" alt="library" :src="require('~/static/legends/library.svg')"/>
                    <div class="legend-name">Library</div>
                </div>
                <div class="legend-box">
                    <img class="explained-legend" alt="meat and eat" :src="require('~/static/legends/meat.svg')"/>
                    <div class="legend-name">Meat and eat</div>
                </div>
                <div class="legend-box">
                    <img class="explained-legend" alt="medical" :src="require('~/static/legends/medical.svg')"/>
                    <div class="legend-name">Medical Centre</div>
                </div>
                <div class="legend-box">
                    <img class="explained-legend" alt="cafe" :src="require('~/static/legends/food.svg')"/>
                    <div class="legend-name">Mess and Cafeteria</div>
                </div>
                <div class="legend-box">
                    <img class="explained-legend" alt="parking" :src="require('~/static/legends/parking.svg')"/>
                    <div class="legend-name">Parking Area</div>
                </div>
                <div class="legend-box">
                    <img class="explained-legend" alt="PET" :src="require('~/static/legends/chess.svg')"/>
                    <div class="legend-name">PET Room</div>
                </div>
                <div class="legend-box">
                    <img class="explained-legend" alt="office" :src="require('~/static/legends/office.svg')"/>
                    <div class="legend-name">Principal Office</div>
                </div>
                <div class="legend-box">
                    <img class="explained-legend" alt="xerox" :src="require('~/static/legends/xerox.svg')"/>
                    <div class="legend-name">Reprography centres</div>
                </div>
                <div class="legend-box">
                    <img class="explained-legend" alt="snack" :src="require('~/static/legends/snacks.svg')"/>
                    <div class="legend-name">Snacks Canteen</div>
                </div>
                <div class="legend-box">
                    <img class="explained-legend" alt="wifi" :src="require('~/static/legends/wifi.svg')"/>
                    <div class="legend-name">Wifi area to sit and work with</div>
                </div>
            </div>
        </section>

        <section id="contributors">
            <h1>Credits</h1>
            <div class="credits-body">
                <div class="name-list">
                    <h2>Creators</h2>
                    <ul>
                        <li>Sriram V</li>
                        <li>Lokmithar S D</li>
                    </ul>
                </div>

                <div class="name-list">
                    <h2>Contributors</h2>
                    <ul>
                        <li>Shyam Siddharth M</li>
                        <li>Dhanush Ram D</li>
                        <li>Monish J S</li>
                        <li>Ravi Prakash B S</li>
                        <li>Kavya Sri S S</li>
                        <li>Nandhini N</li>
                        <li>Priyanka Shan S</li>
                    </ul>
                </div>
            </div>
        </section>

        <footer id="footer">
            <div class="contact">
                <div class="info">
                    As the college is continuously evolving, if you notice some place is missing or changed or the map needs an update, please contact at:
                </div>
                <div class="contact-info">
                    <div>
                        <i class="mail icon"></i>
                        <a href="mailto:sriram.cs20@bitsathy.ac.in" class="contact-name">sriram.cs20@bitsathy.ac.in</a>
                    </div>
                    <div>
                        <i class="whatsapp icon"></i>
                        <a href="https://wa.me/918344000240" class="contact-name">8344000240</a>
                    </div>
                </div>
            </div>

            <hr/>
            <div class="copyright"> © Sriram V & Lokmithar S D 2022</div>
        </footer>
    </div>
</template>

<script>
export default {
    name: "about"
}
</script>

<style scoped>
.title-bar{
    width: 100vw;
    display: flex;
    padding: 3.5vh 5vw;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background: radial-gradient(#f6f6f666, #f6f6f655, #f6f6f633);
    backdrop-filter: saturate(180%) blur(10px);
    -webkit-backdrop-filter: saturate(180%) blur(10px);
}

.title{
    width: 200px;
}

.visit-btn{
    color: black;
    border: 1px solid black;
    background: transparent;
    border-radius: 40px;
    padding: 4px 20px;
    font-size: 1.7rem;
    font-family: 'Overlock', cursive;
    transition: background-color 300ms;
    cursor: pointer;
}

.visit-btn:hover, .visit-btn:focus{
    background: var(--nav-success-text);
}

.visit-btn.bigger{
    font-size: 1.8rem;
    padding: 8px 27px;
    color: var(--nav-success-text);
    border-color: var(--nav-success-text);
    margin-top: 50px;
}

.visit-btn.bigger:hover, .visit-btn.bigger:active{
    color: black;
}

.visit-btn .nuxt-link-active{
    color: black;
}

.visit-btn.bigger .nuxt-link-active{
    color: var(--nav-success-text);
}

.visit-btn.bigger .nuxt-link-active:hover{
    color: black;
}

.nuxt-link-active:hover{
    color: black;
}

section{
    padding: 70px 10vw;
}

#about{
    min-height: 80vh;
    width: 100vw;
    background: radial-gradient(#444444bb, #111111EE , #000000);
    padding: 20vh 25vw 10vh;
    text-align: center;
}

.para{
    font-size: 2rem;
    color: var(--nav-success-text);
    margin-top: 10px;
    line-height: 1.6;
    text-align: center;
    font-family: 'Overlock', cursive;
    font-weight: 500;
}

.map-logo{
    width: 200px;
    height: 200px;
}

#legends{
    background: var(--box-background);
}

#legends h1{
    color: var(--box-primary);
    margin-bottom: 50px;
    font-size: 2.6rem;
}

.legends-list{
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
}

.legend-box{
    display: flex;
    align-items: center;
    margin: 20px;
    width: 300px;
    color: #cecece;
}

.explained-legend{
    height: 48px;
    width: 48px;
    display: inline;
}

.legend-name{
    display: inline;
    margin-left: 20px;
    font-family: 'Quicksand', sans-serif;
    font-weight: 500;
    font-size: 1.6rem;
}

#contributors{
    background: radial-gradient(farthest-corner at 200px 100px, #b4b4b4,#ffffff);
}

#contributors h1{
    font-size: 2.5rem;
    color: var(--nav-success-text);
    margin-bottom: 50px;
}

#contributors ul{
    list-style: none;
}

#contributors li{
    font-size: 1.2rem;
    margin-bottom: 8px;
}

#contributors ul li:before{
    content: "\2022";
    color: var(--nav-success-text);
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
}

#contributors h2{
    font-weight: 500;
}

.credits-body{
    padding-left: 40px;
    display: flex;
    flex-wrap: wrap;
}

.name-list{
    margin-right: 50px;
}

.name-list ul li{
    font-family: 'Quicksand', sans-serif;
}

footer{
    background: var(--nav-background);
    color: var(--box-primary);
    padding: 70px 10vw 40px;
    text-align: center;
    font-size: 1.5rem;
}

.contact-info{
    display: flex;
    margin: 50px 0 20px;
    justify-content: space-around;
    flex-wrap: wrap;
}

.contact-name{
    color: var(--box-primary);
    display: inline;
    margin-left: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 1.3rem;
}

hr{
    margin: 80px 0 30px;
    border-color: black;
}

.copyright{
    font-family: 'Special Elite', cursive;
    font-size: 1rem;
    margin: 10px;
}

.info{
    font-family: 'Nunito Sans', sans-serif;
}

@media  screen and (max-width: 450px) {
    .title-bar{
        padding: 20px 8vw;
    }

    .title{
        width: 150px;
    }

    .visit-btn{
        font-size: 1.4rem;
        padding: 5px 15px;
    }

    .map-logo{
        height: 20vw;
        width: 20vw;
    }

    .para{
        font-size: 1.3rem;
        text-align: justify;
    }

    section{
        padding: 40px 10vw;
    }

    #about{
        padding: 100px 10vw;
    }

    .visit-btn.bigger{
        font-size: 1.5rem;
    }

    #legends h1{
        font-size: 1.6rem;
        margin-bottom: 20px;
    }

    .legends-list{
        justify-content: left;
    }

    .explained-legend{
        height: 32px;
        width: 32px;
    }

    .legend-name{
        font-size: 1.3rem;
    }

    #contributors h1{
        font-size: 1.6rem;
        margin-bottom: 20px;
    }

    #contributors h2{
        font-size: 1.3rem;
    }

    #contributors li{
        font-size: 1.2rem;
    }

    #footer{
        padding: 30px 10vw 20px;
        font-size: 1.1rem;
        text-align: justify;
    }

    .contact-info{
        margin: 20px 50px 30px;
        justify-content: flex-start;
    }

    .contact-name{
        font-size: 1rem;
    }

    hr{
        margin: 30px 0 20px;
    }

    .copyright{
        text-align: center;
        font-size: 0.7rem;
    }

    .credits-body{
        padding-left: 10px;
    }
}
</style>