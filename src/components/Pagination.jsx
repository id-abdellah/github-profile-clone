import { faArrowLeft, faArrowRight, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Pagination(props) {
    return (
        <div className="pagination">
            <div className="prev-arrow" blocked={props.page.currentPage === 1 ? "true" : "false"} onClick={(e) => {
                if (props.page.currentPage === 1) return;
                props.updatePage(prevPage => {
                    return { ...prevPage, currentPage: prevPage.currentPage - 1 }
                })
            }}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <div className="page">{props.page.currentPage} / {props.page.maxPages}</div>
            <div className="next-arrow" blocked={props.page.currentPage === props.page.maxPages ? "true" : "false"} onClick={(e) => {
                if (props.page.currentPage === props.page.maxPages) return;
                props.updatePage(prevPage => {
                    return { ...prevPage, currentPage: prevPage.currentPage + 1 }
                })
            }}>
                <FontAwesomeIcon icon={faArrowRight} />
            </div>
        </div>
    )
}