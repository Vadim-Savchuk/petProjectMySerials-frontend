import './MessagesList.scss';

function MessagesList({ messages, delateMessage }) {

    return (
        <ul className="messages-list">
            {messages.map((message, index) => {
                return (
                    <li key={index}>
                        <div className='message'>
                            <p>{message}</p>
                            <button onClick={() => {delateMessage(message)}}>X</button>
                            <div className='loading'>
                                <span className='loading-line'></span>
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    );
}

export default MessagesList;
