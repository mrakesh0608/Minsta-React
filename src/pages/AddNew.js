import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import { useAuthContext } from 'hooks/useAuthContext'

import 'css/AddNew.css';
import img from 'icons/img.png';

import { convertBase64 } from 'helpers/convertBase64';

const AddNew = () => {

    const navigate = useNavigate();
    const { user } = useAuthContext();

    const { fetchData, data:Post,isError, isPending } = useFetch();

    const [imgData, setImgData] = useState(img);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [isSelectedPending, setIsSelectedPending] = useState(false);
    const [quote, setQuote] = useState('');

    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    const changeHandler = async (e) => {
        setIsSelectedPending(true);

        const data = await convertBase64(e.target.files[0]);

        setSelectedFile(e.target.files[0]);
        setQuote(e.target.files[0].name);
        setImgData(data);
        setIsSelected(true);
        setIsSelectedPending(false);
    };

    const handleSubmission = async () => {

        setUploading(true);
        const newPost = {
            "userId":user._id,
            "username": user.Username,
            imgData,
            "imgName": selectedFile.name,
            "quote": quote
        }

        fetchData({ 
            path: '/posts', 
            method: "POST", 
            payload: newPost 
        }).
        then(res => {
            setUploading(false);
            setUploaded(true);
            setTimeout(() => navigate('/posts/' + res._id), 1000);
        })
    };

    return (
        <div id="AddNew">
            <div id="AddNew-content">
                <div id="soon" className="loading">
                    <h3>Upload your Posts</h3><br />
                    <p>not yet fully featured...</p><br /><br />
                    <div className='upload-img'>
                        {isSelectedPending ?
                            <div className='img-load'>Getting <br /> Image ...</div> :
                            <img src={imgData} alt="" className={isSelected ? '' : 'icons'} />
                        }
                    </div>
                    <br />
                    <br />
                    {isSelected &&
                        <div>
                            {!(uploading || uploaded) && <div>
                                <label htmlFor="qoute">Quote
                                </label>
                                <input type="text" name="quote"
                                    value={quote}
                                    onChange={e => { setQuote(e.target.value) }}
                                />
                                <br />
                                <br />
                                <button onClick={handleSubmission}>Submit</button>
                            </div>
                            }
                            {uploading && <div>
                                <p>Quote: {quote}</p>
                                <h3>Uploading ...</h3>
                            </div>
                            }
                            {uploaded && Post && <div>
                                Uploaded
                                <br />
                                <br />
                                <Link to={'/post/' + Post._id}><h3>See Post</h3></Link>
                            </div>
                            }
                        </div>
                    }
                    {!isSelected && <div>
                        <p>Select a file to post</p>
                        <input type="file" name="file" onChange={changeHandler} />
                    </div>
                    }
                    {isError && <div className='err-msg'>{isError}</div>}
                </div>
            </div>
        </div>
    );
}
export default AddNew;