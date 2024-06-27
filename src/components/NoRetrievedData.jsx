import "./sass/_NoRetrievedData.scss"
export default function NoRetrievedData(props) {
    return (
        <div id="no-retrived-data">
            <h1>Ooops! :(</h1>
            <p className="msg">{props.message}</p>
        </div>
    )
}
