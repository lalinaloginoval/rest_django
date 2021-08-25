import React from 'react';

export default ({term, data, update}) => {

    const dataSearch = e => {
        const value = e.target.value;

        const filter = data.filter(project => {
            return project.name.includes(value);
        });

        update({
            data: filter,
            active: 0,
            term: value
        });

    };

    return (
        <div className="searchbar form-group">
            <input
                value={term}
                type="text"
                className="form-control"
                placeholder="Название проекта"
                onChange={dataSearch}
            />
        </div>
    );
};