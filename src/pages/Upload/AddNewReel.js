import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from 'hooks/context/useAuthContext'

import useFetch from 'hooks/useFetch';

import 'css/AddNew.css';
import Back from 'components/common/Back';
import { reelIcon } from 'helpers/importIcons';
import { convertBase64 } from 'helpers/convertBase64';

const AddNewReel = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();

    const { fetchData, isError, isPending } = useFetch();

    const [selectedFile, setSelectedFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [isSelectedPending, setIsSelectedPending] = useState(false);

    const [imgData, setImgData] = useState(reelIcon);
    const [quote, setQuote] = useState('');
    const [musicName, setMusicName] = useState('');
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        console.log(params);
        if (params) {
            if(params.quote && params.quote !== 'null'){
                document.getElementById('quote').value = params.quote;
            }
        }
    }, [window.location.search]);

    const changeHandler = async (e) => {
        setIsSelectedPending(true);
        setImgData(reelIcon);
        if (e.target.files[0] && e.target.files[0].type.includes('video')) {
            setSelectedFile(e.target.files[0]);
            setQuote(e.target.files[0].name);
            setImgData(await convertBase64(e.target.files[0]));
            setIsSelected(true);
        } else {
            e.target.value = '';
            alert('Only video file formats are supported');
        }
        setIsSelectedPending(false);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        console.log(imgData);
        fetchData({
            path: '/reel',
            method: "POST",
            payload: {
                "userId": user._id,
                "Username": user.Username,
                imgData,
                "imgName": selectedFile.name,
                "quote": quote,
                "musicName": musicName
            }
        }).then(res => {
            console.log(res);
            if (res?._id) navigate('/reels');
        })
    };

    return (
        <div id="AddNew">
            <div className="head">
                <Back />
                <p>New Reel</p>
            </div>
            <div className='center-div'>
                <div className='upload-img-div'>
                    <div className='upload-video'>
                        {isSelectedPending ?
                            <div className='img-load'>Getting <br /> Reel ...</div> :
                            (imgData === reelIcon ?
                                <img src={reelIcon} alt="" className='icons' />
                                :
                                <video src={imgData} alt="" className={isSelected ? '' : 'icons'} controls />

                            )}
                    </div>
                </div>
                {isPending ?
                    <>
                        {quote &&
                            <p className='about-this-post'><span>About this reel : </span>{quote}</p>
                        }
                        <div className='ele-center'>
                            <button className='upload-btn' disabled>Uploading ...</button>
                        </div>
                    </> :
                    <form className='form' onSubmit={handleUpload}>
                        <input type='file' id='reel-file' onChange={changeHandler} required accept="video/*" />
                        <label htmlFor="qoute">About this reel</label>
                        <textarea
                            name="quote" id="quote"
                            onChange={(e) => setQuote(e.target.value)}
                        />
                        <label htmlFor="musicName">Music Name
                        </label>
                        <textarea
                            name="musicName" id="musicName"
                            onChange={(e) => setMusicName(e.target.value)}
                        />
                        <button type="submit" className='upload-btn'>Upload</button>
                    </form>
                }
            </div>
            {isError && <p className='error'>{isError}</p>}
        </div >
    );
}
export default AddNewReel;