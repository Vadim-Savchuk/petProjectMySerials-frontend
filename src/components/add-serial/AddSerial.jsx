import { useState }    from 'react';
import { useDispatch } from 'react-redux'

import { addSerial } from '../../redux/serial/serialSlice';

import useMessageActions from '../../hooks/useMessageActions';

import './AddSerial.scss';

function AddSerial() {
    const [name, setName]     = useState('')
    const [season, setSeason] = useState('')
    const [series, setSeries] = useState('')

    const addMessageFunc = useMessageActions()

    const dispatch = useDispatch();

    const formHandler = () => {
        try {
            const newSerial = {
                name,
                season,
                series,
                attach: false
            }

            if (name && season && series) {
                dispatch(addSerial(newSerial));
            } else {
                addMessageFunc('Переконайтесь що всі поля заповнені')
            }

            setName('')
            setSeason('')
            setSeries('')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className='add-serial'>

            <h1 className='title'>Додавайте свій серіал</h1>

            <form className='add-from' onSubmit={e => e.preventDefault()}>

                <div className='square hero_square'>
                    <label className='label_name' htmlFor="name">Назва Серіалу</label>
                    <input
                        id='name'
                        type="text"
                        value={name}
                        className='input_name'
                        placeholder='Game Of Throne'
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className='square'>
                    <label className='label_date' htmlFor="season">Сезон</label>
                    <input
                        id='season'
                        type="number"
                        value={season}
                        placeholder='8'
                        className='input_date'
                        onChange={e => setSeason(e.target.value)}

                    />
                </div>

                <div className='square'>
                    <label className='label_date' htmlFor="series">Серія</label>
                    <input
                        id='series'
                        type="number"
                        placeholder='6'
                        value={series}
                        className='input_date'
                        onChange={e => setSeries(e.target.value)}
                    />
                </div>
                
                <button onClick={formHandler}>Зберегти</button>
            </form>
        </section>
    );
}

export default AddSerial;
