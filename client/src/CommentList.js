import React from 'react';

const CommentList = ({comments}) => {
    const renderedComments = comments.map(comment => {

        let {content} = comment;
        if (comment.status === 'pending') {
            content = 'This comment is awaiting the moderation';
        }
        if (comment.status === 'rejected') {
            content = 'This comment has been rejected';
        }
        return <li key={comment.id}>{content}</li>
    })

    return <ul>
        {renderedComments}
    </ul>
};

export default CommentList;
