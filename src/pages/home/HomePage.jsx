import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import AddSerial   from '../../components/add-serial/AddSerial';
import Preloader   from '../../components/preloader/Preloader';
import SerialsList from '../../components/serials-list/SerialsList';

import { getMyAllSerials } from '../../redux/serial/serialSlice';

import './HomePage.scss';

function HomePage() {
    const { serials, loading } = useSelector(state => state.serial);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyAllSerials())
    }, [dispatch])

    return (
        <>
            <AddSerial />
            <SerialsList serials={serials} />
            {loading === true && <Preloader/> }
        </>
    );
}

export default HomePage;
