import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from 'hooks/context/useAuthContext'

import useFetch from 'hooks/useFetch';

import 'css/AddNew.css';

import { imgIcon } from 'helpers/importIcons';
import { convertBase64 } from 'helpers/convertBase64';
import Back from 'components/common/Back';
const AddNew = () => {

    const navigate = useNavigate();
    const { user } = useAuthContext();

    const { fetchData, isError, isPending } = useFetch();

    const [selectedFile, setSelectedFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [isSelectedPending, setIsSelectedPending] = useState(false);

    const [imgData, setImgData] = useState([imgIcon]);
    const [quote, setQuote] = useState(null);

    const changeHandler = async (e) => {
        setImgData([imgIcon]);
        setIsSelectedPending(true);
        const data = [];
        for (const file of e.target.files) {
            if (file.type.includes('image')) {
                data.push(await convertBase64(file));
            }
        };
        console.log(data);
        if (data.length) {
            setSelectedFile(e.target.files[0]);
            setImgData(data);
            setIsSelected(true);
        }
        else {
            let k = 1;
            for (const file of e.target.files) {
                if (file.type.includes('video')) {
                    navigate(`/add-new-reel?quote=${quote}`);
                    k = 0;
                    break;
                }
            };
            if (k) {
                e.target.value = '';
                alert('Only image file formats are supported');
            }
        }
        setIsSelectedPending(false);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            fetchData({
                path: '/posts',
                method: "POST",
                payload: {
                    "userId": user._id,
                    "Username": user.Username,
                    imgData,
                    "imgName": selectedFile.name,
                    "quote": quote
                }
            }).then(res => {
                console.log(res);
                if (res?._id) {
                    navigate('/posts/' + res._id)
                }
            })
        }
    };

    return (
        <div id="AddNew">
            <div className="head">
                <Back />
                <p>New Post</p>
            </div>
            <div className='center-div'>
                <div className='upload-img-div'>
                    <div className='upload-img'>
                        {isSelectedPending ?
                            <div className='img-load'>Getting <br /> Image ...</div> :
                            <>
                                <img src={imgData[0]} alt="" className={isSelected ? '' : 'icons'} />
                                {imgData.length > 1 && <span>{`+${imgData.length - 1} more`}</span>}
                            </>
                        }
                    </div>
                </div>
                {isPending ?
                    <>
                        {quote &&
                            <p className='about-this-post'><span>About this post : </span>{quote}</p>
                        }
                        <div className='ele-center'>
                            <button className='upload-btn' disabled>Uploading ...</button>
                        </div>
                    </> :
                    <form className='form' onSubmit={handleUpload}>
                        <input type='file' onChange={changeHandler} multiple required accept="image/*" />
                        <label htmlFor="qoute">About this post</label>
                        <textarea
                            name="quote" id="quote"
                            onChange={(e) => setQuote(e.target.value)}
                        />
                        <button type="submit" className='upload-btn'>Upload</button>
                    </form>
                }
            </div>
            {isError && <p className='error'>{isError}</p>}
            <p className='center-text'>Want to upload reel? <Link to='/add-new-reel' className='link-blue'>Click Here</Link></p>
        </div>
    );
}
export default AddNew;