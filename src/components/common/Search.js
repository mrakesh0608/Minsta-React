import 'css/Search.css';
import {searchIcon} from 'helpers/importsIcons';

const Search = () => {    
    return (
        <div id="search" className='hideOnScroll hideOnScroll-head'>
            <div id='search-icon'><img src={searchIcon} alt="search" /></div>
            <input type="text" placeholder='Search'/>
        </div>
    );
}
export default Search;