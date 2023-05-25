import './MessagesList.scss';

function MessagesList({ messages, delateMessage }) {

    return (
        <ul className="messages-list">
            {messages.map((message, index) => {
                return (
                    <li key={index}>
                        <div className='message active'>
                            <p>{message}</p>
                            <button onClick={() => {delateMessage(message)}}>X</button>
                        </div>
                    </li>
                )
            })}
        </ul>
    );
}

export default MessagesList;
