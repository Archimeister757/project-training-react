import React from 'react';
import { getPagesArray } from "../../../utils/pages";

const Pagination = ({...props}) => {
    const pagesArray = getPagesArray(props.totalPages);
    return (
        <div className="page__wrap">
            {pagesArray.map(p =>
                <span
                    onClick={() => props.changePage(p)}
                    key={p}
                    className={props.page === p ? "page page__current" : "page"}>{p}
                </span>
            )}
        </div>
    );
};
export default Pagination;