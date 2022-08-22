import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from 'hooks/useAuthContext'

import useFetch from 'hooks/useFetch';

import 'css/AddNew.css';

import { imgIcon } from 'helpers/importsIcons';
import { convertBase64 } from 'helpers/convertBase64';

const AddNew = () => {

    const navigate = useNavigate();
    const { user } = useAuthContext();

    const { fetchData, data: Post, isError, isPending } = useFetch();

    const [selectedFile, setSelectedFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [isSelectedPending, setIsSelectedPending] = useState(false);

    const [imgData, setImgData] = useState([imgIcon]);
    const [quote, setQuote] = useState('');

    const [Upload, setUpload] = useState(true);

    const changeHandler = async (e) => {
        setIsSelectedPending(true);

        const data = []
        for (const file of e.target.files) {
            data.push(await convertBase64(file));
        };
        // console.log(data);
        setSelectedFile(e.target.files[0]);
        setQuote(e.target.files[0].name);
        setImgData(data);
        setIsSelected(true);
        setIsSelectedPending(false);
    };

    const handleSubmission = async () => {
        setUpload(false);

        fetchData({
            path: '/posts',
            method: "POST",
            payload: {
                "userId": user._id,
                "username": user.Username,
                imgData,
                "imgName": selectedFile.name,
                "quote": quote
            }
        }).then(res => {
            console.log(res);
            if(res._id){
                navigate('/posts/' + res._id)
            }
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
                            <img src={imgData[0]} alt="" className={isSelected ? '' : 'icons'} />
                        }
                    </div>
                    <br /><br />
                    {!isSelected ?
                        <div>
                            <p>Select a file to post</p>
                            <input type='file'
                                onChange={changeHandler}
                                multiple
                            />
                        </div> :
                        <div>
                            {Upload && <div>
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
                            {isError ?
                                <div className='err-msg' style={{ minHeight: '100px' }}>{isError}</div> :
                                (isPending ?
                                    <div>
                                        <p>Quote: {quote}</p>
                                        <h3>Uploading ...</h3>
                                    </div>:
                                    (Post && 
                                        <div>
                                            <Link to={`'/posts/'${Post._id}`}>See Post</Link>
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
export default AddNew;