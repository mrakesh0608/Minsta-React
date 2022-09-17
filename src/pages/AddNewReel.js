import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from 'hooks/useAuthContext'

import useFetch from 'hooks/useFetch';

import 'css/AddNew.css';

import { imgIcon } from 'helpers/importsIcons';
import { convertBase64 } from 'helpers/convertBase64';

const AddNewReel = () => {

    const navigate = useNavigate();
    const { user } = useAuthContext();

    const { fetchData, data: Reel, isError, isPending } = useFetch();

    const [selectedFile, setSelectedFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [isSelectedPending, setIsSelectedPending] = useState(false);

    const [imgData, setImgData] = useState([imgIcon]);
    const [quote, setQuote] = useState('');
    const [musicName, setMusicName] = useState('');

    const [Upload, setUpload] = useState(true);

    const changeHandler = async (e) => {
        setIsSelectedPending(true);

        setSelectedFile(e.target.files[0]);
        setImgData(await convertBase64(e.target.files[0]));
        setIsSelected(true);
        setIsSelectedPending(false);
    };

    const handleSubmission = async () => {
        setUpload(false);
        // console.log(imgData);
        fetchData({
            path: '/reel',
            method: "POST",
            payload: {
                "userId": user._id,
                "username": user.Username,
                imgData,
                "imgName": selectedFile.name,
                "quote": quote,
                "musicName": musicName
            }
        }).then(res => {
            console.log(res);
            if (res._id) {
                // navigate('/reels/' + res._id)
                navigate('/reels');
            }
        })
    };

    return (
        <div id="AddNew">
            <div id="AddNew-content">
                <div id="soon" className="loading">
                    <h3>Upload your Reel</h3><br />
                    <p>not yet fully featured...</p><br /><br />
                    {!isSelected ?
                        <div>
                            <p>Select a file to Upload</p>
                            <input type='file'
                                onChange={changeHandler}
                                multiple
                            />
                        </div> :
                        <div>
                            {Upload && <div>
                                <label htmlFor="qoute">Quote
                                </label>
                                <br /><br />
                                <input type="text" name="quote"
                                    value={quote}
                                    onChange={e => { setQuote(e.target.value) }}
                                />
                                <br /><br />
                                <label htmlFor="musicName">Music Name
                                </label>
                                <br /><br />
                                <input type="text" name="musicName"
                                    value={musicName}
                                    onChange={e => { setMusicName(e.target.value) }}
                                />
                                <br />
                                <br />
                                <button onClick={handleSubmission}>Submit</button>
                            </div>
                            }
                            {isError ?
                                <div className='err-msg' style={{ minHeight: '100px' }}>{isError}</div> :
                                (isPending ?
                                    <div>
                                        <p>Quote: {quote}</p>
                                        <h3>Uploading ...</h3>
                                    </div> :
                                    (Reel &&
                                        <div>
                                            <Link to={`'/reel/'${Reel._id}`}>See Reel</Link>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
export default AddNewReel;