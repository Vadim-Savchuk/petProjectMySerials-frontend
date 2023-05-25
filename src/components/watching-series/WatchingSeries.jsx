import './WatchingSeries.scss'

import SerialCard from '../serial-card/SerialCard';

function WatchingSeries({serials, watching, search, setSearch}) {
    return (
        <>
            <div className='search-offer'>
                <h2 className='title'>{serials.length === 0 ? 'Ви нічого не дивитись' : 'Всього серіалів:'} {serials.length}</h2>
                {serials.length > 0 && <input type="text" placeholder='Шукати' value={search} onChange={e => setSearch(e.target.value)} />}
            </div>

            <ul className='serials'>
                {Array.isArray(serials) &&
                    watching.reverse().map(serial => {
                        return <SerialCard
                            key={serial._id}
                            id={serial._id}
                            name={serial.name}
                            season={serial.season}
                            series={serial.series}
                            attach={serial.attach}
                        />
                    })
                }
            </ul>
        </>
    );
}

export default WatchingSeries;
