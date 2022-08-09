import {iconPath} from 'helpers/Path';
import 'css/Search.css';
const Search = () => {
    
    return (
        <div id="search" className='hideOnScroll hideOnScroll-head'>
            <div id='search-icon'><img src={iconPath+'search.png'} alt="search" /></div>
            <input type="text" name="" id="" placeholder='Search'/>
        </div>
    );
}
export default Search;