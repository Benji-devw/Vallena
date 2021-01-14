import React, { useEffect, useState, useRef } from 'react'
import RowItem from './Row_Item'




function DragNDrop({ data }) {

   const [list, setList] = useState(data);
   console.log('list', list)

   const [dragging, setDragging] = useState(false);


   const dragItem = useRef();
   const dragNode = useRef();

   useEffect(() => {
      if (list[0].items.length <= 0 && list[1].items.length <= 0) {
         console.log('inf 0');
         setList(data)
      }
   })

   const handleDragStart = (e, params) => {
      // console.log('drag starting ...', params);
      dragItem.current = params;
      dragNode.current = e.target;
      dragNode.current.addEventListener('dragend', handleDragEnd)
      setTimeout(() => {
         setDragging(true)
      }, 0);
   }

   const handleDragEnter = (e, params) => {
      console.log('Entering drag...', params);
      const currentitem = dragItem.current;
      if (e.target !== dragNode.current) {
         // console.log("TAGET IS NOT THE SAME");
         setList(oldList => {
            let newList = JSON.parse(JSON.stringify(oldList));
            newList[params.grpI].items.splice(params.ItemI, 0, newList[currentitem.grpI].items.splice(currentitem.itemI, 1)[0]);
            dragItem.current = params;
            return newList;
         })
      }
   }

   const handleDragEnd = () => {
      // console.log('drag end');
      setDragging(false)
      dragNode.current.removeEventListener('dragend', handleDragEnd)
      dragItem.current = null;
      dragNode.current = null;

   }

   const getStyles = (params) => {
      const currentItem = dragItem.current
      if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI) {
         return "current"
      }
      return "dnd-item"
   }


   return (
      <div className="drag-n-drop">
         {list.map((grp, grpI) => (
            <div
               key={grp.title}
               className="dnd-group"
               onDragEnter={dragging && !grp.items.length ? (e) => { handleDragEnter(e, { grpI, itemI: 0 }) } : null}
            >
               <div className="group-title">{grp.title}</div>
               {grp.items.map((item, itemI) => (
                  <div
                     draggable
                     onDragStart={(e) => { handleDragStart(e, { grpI, itemI }) }}
                     onDragEnter={dragging ? (e) => { handleDragEnter(e, { grpI, itemI }) } : null}
                     key={itemI}
                     className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}
                  >
                     {/* {item.titleProduct} */}
                     <RowItem item={item} />
                  </div>
               ))}
            </div>
         ))}
      </div>
   );
}

export default DragNDrop;
