import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { removeSerial, updateSerial } from '../../redux/serial/serialSlice';

import editButton from './img/edit.png';
import delateButton from './img/trash.png';
import doneButton from './img/check-mark.png';
import pinButton from './img/thumbtacks.png';
import selectButton from './img/thumbtacks-done.png';

import './SerialCard.scss';


function SerialCard({ id, name, season, series, attach }) {
    const [isEdit, setIsEdit] = useState(false);

    const [editName, setEditName] = useState(name);
    const [editSeason, setEditSeason] = useState(season);
    const [editSeries, setEditSeries] = useState(series);
    const [editAttach, setEditAttack] = useState(attach);

    const dispatch = useDispatch();

    const delateSerial = () => {
        try {
            dispatch(removeSerial(id))
        } catch (error) {
            console.log(error);
        }
    }

    const editSerial = () => {
        try {
            const updatedSerial = {
                id: id,
                name: editName,
                season: editSeason,
                series: editSeries,
                attach: editAttach,
            }

            dispatch(updateSerial(updatedSerial))
            setIsEdit(false)
        } catch (error) {
            console.log(error);
        }
    }

    const incrementOrDecrement = (e) => {
        switch (e.target.className) {
            case 'add-season':
                setEditSeason((prev) => Number(prev) + 1);
                break;
            case 'minus-season':
                setEditSeason((prev) => Number(prev) - 1);
                break;
            case 'add-series':
                setEditSeries((prev) => Number(prev) + 1);
                break;
            case 'minus-series':
                setEditSeries((prev) => Number(prev) - 1);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        editSerial();
    }, [editSeason, editSeries, editAttach]);

    return (
        <>
            <li className='serial'>
                <div className='serial_dates'>
                    {isEdit
                        ?
                        (<>
                            <input type="text" value={editName} onChange={e => setEditName(e.target.value)} />
                            <input type="number" value={editSeason} onChange={e => setEditSeason(e.target.value)} />
                            <input type="number" value={editSeries} onChange={e => setEditSeries(e.target.value)} />
                        </>)
                        :
                        (<>
                            <p className='serial_name'>"{name}"</p>
                            <p>Сезон: {season}
                                <span>
                                    <button className='add-season' onClick={incrementOrDecrement}>+</button>
                                    <button className='minus-season' onClick={incrementOrDecrement}>-</button>
                                </span>
                            </p>
                            <p>Серія: {editSeries}
                                <span>
                                    <button className='add-series' onClick={incrementOrDecrement}>+</button>
                                    <button className='minus-series' onClick={incrementOrDecrement}>-</button>
                                </span>
                            </p>

                        </>)
                    }
                </div>
                <div className='serial_buttons'>
                    {isEdit
                        ?
                        (
                            <button onClick={editSerial}>
                                <img src={doneButton} alt="Done" />
                            </button>
                        )
                        :
                        (<>
                            <button onClick={() => setEditAttack(prevEditAttach => !prevEditAttach)}>
                                <img src={attach ? selectButton : pinButton} alt="Pin serial" />
                            </button>
                            <button onClick={() => setIsEdit(true)}>
                                <img src={editButton} alt="Button edit serial" />
                            </button>
                            <button onClick={delateSerial}>
                                <img src={delateButton} alt="Button delate serial" />
                            </button>
                        </>)
                    }
                </div>
            </li>
        </>
    );
}

export default SerialCard;
