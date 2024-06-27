import "./sass/_Loader.scss"
export default function Loader(props) {
    return (
        <div className="loader">
            {
                props.type === "repos"
                    ?
                    [1, 2, 3, 4, 5, 6].map(n => {
                        return <div className="box-repos" key={Math.random()}>
                            <div className="row">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="row">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    })
                    :
                    [1, 2, 3, 4, 5, 6].map(n => {
                        return <div className="box-followers" key={Math.random()}>
                            <span></span>
                            <span></span>
                        </div>
                    })
            }
        </div>
    )
}
