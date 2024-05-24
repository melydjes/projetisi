import '../styles/navStyle.css'
import logo from '../assets/video-calling.png'
import videoAdd from '../assets/add-video.png'
import searchIcon from '../assets/search-interface-symbol.png'

function Navbar(){
    return(
        <div className='navbar'>
            <img src={logo} alt="" className='logo' />

            <div className='search-box'>
                <input type="text" placeholder='Rechercher' />
                <img src={searchIcon} alt="" className='search-img'/>
            </div>

            <div className="btn-container">
                <img src={videoAdd} alt="" className='add-video-img'/>
                <button className='logout-btn'>Se deconnecter</button>
            </div>

            
        </div>
    )
}

export default Navbar