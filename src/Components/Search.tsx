import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



interface Prop {
    search: string,
    handleSubmit: (event : React.MouseEvent) => void;
    handleSearchChange: (event : React.ChangeEvent<HTMLInputElement>) => void,
}


const Search = (props: Prop): React.ReactElement => {
    return (
        <form className="form-inline justify-content-center m-1">
            <input
                value={props.search}
                type="text"
                placeholder="Search GIF.."
                className="form-inline"
                onChange={props.handleSearchChange}

            />
            <button
                onClick={props.handleSubmit}
                type="submit"
                className="btn btn-primary"
            >
                <span><i className="fas fa-search" aria-hidden="true" />Search</span>
            </button>
      </form>
    );
}


export default Search;