import React, {useState, useEffect} from 'react';
import useSound from 'use-sound';
import itemBreak from './Utils/Item Box Hit.wav';
import roulette from './Utils/yt1s.com - Mario Kart WII  Item Box  Sound Effect.mp3';
import { FaCarSide, FaMotorcycle } from 'react-icons/fa';
import { GoUnmute, GoMute } from 'react-icons/go';
const axios = require('axios').default;

const App = () => {
    const [characters, setCharacters] = useState({});
    const [vehicles, setVehicles] = useState({});

    const [character, setCharacter] = useState({});
    const [vehicle, setVehicle] = useState({});

    const [generating, setGenerating] = useState(false);

    const [surprise, setSurprise] = useState(false);
    const surpriseList = [
        'Automatic Drifting!',
        'Give a 10 second head-start!',
        'Buy lunch for every player who places above you',
        'You must touch the last item box set before racing',
        'No items. Oh well...',
        'Ignore the randomizer. Use Baby Mario with the Booster Seat',
        'Spin again!'
    ];

    const [soundEnabled, setSoundEnabled] = useState(true);
    const [playBreak] = useSound(itemBreak, {soundEnabled});
    const [playRoulette] = useSound(roulette, {soundEnabled});

    // const getCharacters = async () => {
    //     const char = await axios.get('http://localhost:5000/api/v1/characters', {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     });
    //     setCharacters(char.data);
    // }
    // const getVehicles = async () => {
    //     const vehicle = await axios.get(`http://localhost:5000/api/v1/vehicles`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
    //     setVehicles(vehicle.data);
    // }
    useEffect(() => {
        // getCharacters()
        // .then(getVehicles())
        getData();
    }, []);
    const getData = async () => {
        const data = await axios.get('https://thecapn-mec.github.io/marioKartWiiAPI/data.json', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        setCharacters(data.data.characters);
        setVehicles(data.data.vehicles);
    };

    const getCharacter = () => {
        setGenerating(true);
        setSurprise(false);
        setVehicle({});
        playBreak();
        playRoulette();
        let interval = setInterval(() => {
            setCharacter(characters[Math.floor(Math.random() * characters.length)]);
        }, 50);
        setTimeout(() => {
            clearInterval(interval);
            let char = characters[Math.floor(Math.random() * characters.length)];
            setCharacter(char);
            setTimeout(() => {
                getVehicle(char.weightClass);
            }, 500);
        }, 3500);
    };

    const getVehicle = (weightClass) => {
        playBreak();
        playRoulette();
        let interval = setInterval(() => {
            setVehicle(vehicles[Math.floor(Math.random() * vehicles.length)]);
        }, 50);
        setTimeout(() => {
            clearInterval(interval);
            let randVehicle;
            do {
                randVehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
            } while (
                !(randVehicle.weightClass === weightClass &&
                (randVehicle.driftStyle === 'inside' || !(document.getElementById('inside').checked)))
            );
            setVehicle(randVehicle);
            setGenerating(false);
            if(Math.floor(Math.random() * 10) < 1) {setSurprise(true)};
        }, 3500);
    };

    return (
        <>
            <div id="rotateScreen"><h1>Please Rotate The Screen</h1></div>

            <div className="icon">
                <img src="https://www.pngkit.com/png/full/140-1403949_mario-kart-wii-mario-kart-wii-mario-kart.png" alt="logo" />
                <h1>Randomizer</h1>
            </div>

            <img src="https://acegif.com/wp-content/gifs/race-flag-15.gif" alt="flag" className='background' />
            
            <div className="topPanel">
                <div>
                    <label htmlFor="inside"><h3>Guarantee Inside Drift&nbsp;</h3></label>
                    <input type='checkbox' name='inside' id='inside' />
                </div>
                <div>
                    <label htmlFor="surprise"><h3>"Surprises"&nbsp;</h3></label>
                    <input type='checkbox' name='surprise' id='surprise' />
                </div>
                <div className="muteBtn" onClick={() => {setSoundEnabled(!soundEnabled)}}>
                    {soundEnabled ? <GoUnmute style={{ color: '#00abee', fontSize: 'calc(1.5vw + 1.5vh)' }} /> : <GoMute style={{ color: '#00abee', fontSize: 'calc(1.5vw + 1.5vh)' }} />}
                </div>
            </div>

            <div className="combo">
                <div id="stats">
                    <div id="spd">Speed</div>
                    <div id="spdBar" className='statBar' style={{width: `${(vehicle.speed + character.speed) / 2.5}vw`, backgroundColor: `hsl(${(vehicle.speed + character.speed) * 1.5}, 100%, 50%)`}}></div>
                    <div id="wt">Weight</div>
                    <div id="wtBar" className='statBar' style={{width: `${(vehicle.weight + character.weight) / 2.5}vw`, backgroundColor: `hsl(${(vehicle.weight + character.weight) * 1.5}, 100%, 50%)`}}></div>
                    <div id="acc">Acceleration</div>
                    <div id="accBar" className='statBar' style={{width: `${(vehicle.acceleration + character.acceleration) / 2.5}vw`, backgroundColor: `hsl(${(vehicle.acceleration + character.acceleration) * 1.5}, 100%, 50%)`}}></div>
                    <div id="hand">Handling</div>
                    <div id="handBar" className='statBar' style={{width: `${(vehicle.handling + character.handling) / 2.5}vw`, backgroundColor: `hsl(${(vehicle.handling + character.handling) * 1.5}, 100%, 50%)`}}></div>
                    <div id="drift">Drift</div>
                    <div id="driftBar" className='statBar' style={{width: `${(vehicle.drift + character.drift) / 2.5}vw`, backgroundColor: `hsl(${(vehicle.drift + character.drift) * 1.5}, 100%, 50%)`}}></div>
                    <div id="or">Off-Road</div>
                    <div id="orBar" className='statBar' style={{width: `${(vehicle.offRoad + character.offRoad) / 2.5}vw`, backgroundColor: `hsl(${(vehicle.offRoad + character.offRoad) * 1.5}, 100%, 50%)`}}></div>
                    <div id="mt">Mini-Turbo</div>
                    <div id="mtBar" className='statBar' style={{width: `${(vehicle.miniTurbo + character.miniTurbo) / 2.5}vw`, backgroundColor: `hsl(${(vehicle.miniTurbo + character.miniTurbo) * 1.5}, 100%, 50%)`}}></div>
                </div>
                <div id="char">
                    <h1>{character.name}</h1>
                </div>
                <div id="vehicle">
                    <h1>{vehicle.name}&nbsp;{(vehicle.type === 'cart') ? <FaCarSide style={{ color: 'white', fontSize: 'calc(3vw + 3vh)' }} /> : (vehicle.type !== undefined) ? <FaMotorcycle  style={{ color: 'white', fontSize: 'calc(3vw + 3vh)' }} /> : ''}</h1>
                </div>
                <button className='btn' onClick={() => getCharacter()} disabled={generating}><h1>Test My Luck!</h1></button>
            </div>
            <h2 style={(surprise && document.getElementById('surprise').checked) ? {display: 'block'} : {display: 'none'}} id='surprise'>Surprise! {surpriseList[Math.floor(Math.random() * surpriseList.length)]}</h2>

            <p id='authorText'>Made by Ethan Roldan</p>
        </>
    )
}

export default App
