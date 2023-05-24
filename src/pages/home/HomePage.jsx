import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import AddSerial   from '../../components/add-serial/AddSerial';
import SerialsList from '../../components/serials-list/SerialsList';

import { getMyAllSerials  } from '../../redux/serial/serialSlice';

import './HomePage.scss';

function HomePage() {
    const { serials } = useSelector(state => state.serial);
    const dispatch    = useDispatch();

    useEffect(() => {
        dispatch(getMyAllSerials())
    }, [dispatch])

    return (
        <div>
            <AddSerial />
            <SerialsList serials={serials} />
        </div>
    );
}

export default HomePage;
