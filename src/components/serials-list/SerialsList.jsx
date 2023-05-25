import { useState }   from 'react';

import SerialCard     from '../serial-card/SerialCard';
import WatchingSeries from '../watching-series/WatchingSeries';

import './SerialsList.scss';

function SerialsList({ serials }) {
    const [search, setSearch] = useState('');

    const serialsArr = serials.filter(serial => {
        return serial.attach === false
    })

    const filter = serialsArr.filter(seril => {
        return seril.name.toLowerCase().includes(search.toLowerCase())
    })

    const attachesList = serials.filter(serial => {
        return serial.attach === true
    })

    return (
        <section className='serials-list'>


            {attachesList.length > 0 &&
                <>
                    <div className='search-offer'>
                        <h2 className='title'>Серіали які я зараз переглядаю: {attachesList.length}</h2>
                    </div>

                    <ul className='serials'>
                        {Array.isArray(attachesList) &&
                            attachesList.reverse().map(serial => {
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
            }


            {filter && <WatchingSeries serials={serials} watching={filter} search={search} setSearch={setSearch}/>}
        </section>
    );
}

export default SerialsList;