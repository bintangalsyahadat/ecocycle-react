import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function SearchInput({ classNameGroup = "", classNameInput = "", placeHolder = "Search..."}) {
    return (
        <div className={"input-group py-2 px-3 mb-3 rounded-pill overflow-hidden border " + classNameGroup}>
            <input
                type="text"
                className={"form-control border-0 " + classNameInput}
                placeholder={placeHolder}
                aria-label="search"
                aria-describedby="button-addon2"
                style={{ boxShadow: "none" }}
            />
            <button
                className="btn border-0"
                type="button"
                id="button-addon2"
                style={{ boxShadow: "none" }}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
    )
}