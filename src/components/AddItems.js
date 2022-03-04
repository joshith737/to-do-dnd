import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./AddItems.css";

const AddItems = () => {
  const [input, setinput] = useState(" ");
  const [todos, settodos] = useState([]);

  const data = (e) => {
    console.log(e.target.value);
    setinput(e.target.value);
  };
  const add = () => {
    settodos([...todos, { task: input, id: Date() }]);
    setinput("");
  };
  const del = (id) => {
    const filtered = todos.filter((items) => items.id !== id);
    settodos(filtered);
  };
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    settodos(items);
  }

  return (
    <div className="main">
      <div className="li">
        <input onChange={data} value={input} placeholder="Add..." id="field" />
        <button id="btadd" onClick={add}>
          Add
        </button>
      </div>
      <div className="list">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="ul"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {todos.map((items, i) => (
                  <Draggable key={items.id} draggableId={items.id} index={i}>
                    {(provided) => (
                      <li
                        id="it"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {items.task}
                        <button className="btdel" onClick={() => del(items.id)}>
                          Delete
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};
export default AddItems;
