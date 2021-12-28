import React, {useState} from 'react';
import axios from "axios";

const PostCreate = () => {

    const [title, setTitle] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        const posts = await axios.post('http://localhost:4000/posts', {
            title
        });

        setTitle('');
    }


    return <div>
        <form action="" onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor="">Title</label>
                <input value={title} type="text" className='form-control' onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
}

export default PostCreate;