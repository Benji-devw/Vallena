import React, { useEffect, useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import apiCallComments from '../../../../apiCall/Call_Api'


const Comments = props => {
   const product = props.product
   const [comments, setComments] = useState([]);
   const [sumNote, setSumNote] = useState([])

   useEffect(() => {
      let unmounted = true;
      /***** Get Comments *****/
      /************************/
      if (unmounted) {
         apiCallComments.getComments().then(comments => {
            
            const comment = comments.data.data
            let commentItem = []
            let calc = []
            comment.forEach(element => {
               if (element.status ) {
                  if (element.idProduct === product._id) {
                     commentItem.push(element)
                     calc.push(parseInt(element.note))
                  }
               }
            });
            setComments(commentItem)
            if (calc.length > 0) {
               let sum = calc.reduce((a, b) => {
                  return (a + b)
               }, 0)
               setSumNote(sum / calc.length)
            } else { setSumNote(0)}
            

         })
      }
      return () => { unmounted = false };
   }, [product._id])

   return (
      <div className="rating">
         <Rating style={{ fontSize: "1em" }} className="" name="half-rating-read" value={parseInt(sumNote)} precision={1} readOnly size="small" />
         <em className="ml-1" style={{ color: '#bdbdbd', fontSize: ".8em", position: "relative", top:'-3px' }}>( {comments.length} avis client )</em>
      </div>
   )
}
export default Comments