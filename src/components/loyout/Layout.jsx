import { useSelector, useDispatch } from "react-redux";
import { removeMessage }            from "../../redux/message/messageSlice";

import Header       from "../header/Header";
import MessagesList from "../message-list/MessagesList";

function Layout({ children }) {
    const { messages }     = useSelector(state => state.message);
    const lastFiveMessages = messages.slice(-5);

    const dispatch = useDispatch();

    const delateMessage = (message) => {
        dispatch(removeMessage(message))
    }

    return (
        <div className="wrapper">
            <div className="container">
                <Header />
                {children}
                <MessagesList messages={lastFiveMessages} delateMessage={delateMessage} />
            </div>
        </div>
    );
}

export default Layout;
