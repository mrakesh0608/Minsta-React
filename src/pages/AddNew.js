import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import 'css/AddNew.css';
import img from 'icons/img.png';

import {REST_API_Sync} from 'helpers/REST_API';
import { convertBase64 } from 'helpers/convertBase64';

const AddNew = () => {

    const history = useHistory();

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

        setImgData(data);
        setSelectedFile(e.target.files[0]);
        setIsSelected(true);
        setIsSelectedPending(false);
    };

    const handleSubmission = async () => {
        setUploading(true);

        const imgPostData = { "imgName": selectedFile.name, imgData, "used": false }

        const imgPostResult = await REST_API_Sync({path:'/post-img',method:"POST",payload: imgPostData});
        // console.log("res-img", imgPostResult);

        if (imgPostResult.result) {

            const post = {
                "post_image_id": imgPostResult.result._id,
                "username": "srinivas",
                "img_name": selectedFile.name,
                "quote": quote,
                "likes": 0,
                "liked_users": [],
                "saved_users": []
            }
            const result2 = await REST_API_Sync({path:'/posts',method:"POST",payload: post});
            setUploading(false);
            setUploaded(result2.result._id);
            setTimeout(() => {
                history.push('/posts/' + result2.result._id);

            }, 1000);
        }
        else console.log(imgPostResult.err);
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
                            {!uploading && !uploaded && <div>
                                <label htmlFor="qoute">About
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
                            {uploaded && <div>
                                Uploaded
                                <br />
                                <br />
                                <Link to={'post/' + uploaded}><h3>See Post</h3></Link>
                            </div>
                            }
                        </div>
                    }
                    {!isSelected && <div>
                        <p>Select a file to post</p>
                        <input type="file" name="file" onChange={changeHandler} />
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}
export default AddNew;