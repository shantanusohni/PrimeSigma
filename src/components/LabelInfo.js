import React from 'react';
export default function (props) {
        return(
            <div className="p-col-12 label-info">
                <span>{props.label}: </span>
                {props.info}
            </div>
        )
}