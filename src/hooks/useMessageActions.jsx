import { useDispatch }               from 'react-redux';
import { addMessage, removeMessage } from '../redux/message/messageSlice';

function useMessageActions() {
    const dispatch = useDispatch();

    const addMessageFunc = (message) => {
        dispatch(addMessage(message));
        setTimeout(() => {
            dispatch(removeMessage(message));
        }, 10000);
    };

    return addMessageFunc;
}

export default useMessageActions;