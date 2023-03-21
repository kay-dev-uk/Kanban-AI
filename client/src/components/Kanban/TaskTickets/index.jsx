import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "../SortableItem/Index.jsx";

const TaskTickets = () => {
  const [testTickets, setTestTickets] = useState([
    { id: 1, title: "Task 1", column: "To Do" },
    { id: 2, title: "Task 2", column: "To Do" },
    { id: 3, title: "Task 3", column: "In Progress" },
    { id: 4, title: "Task 4", column: "In Progress" },
    { id: 5, title: "Task 5", column: "Done" },
    { id: 6, title: "Task 6", column: "Done" },
  ]);

  function handleDragEnd(event) {
    console.log("Drag ended");
    const { active, over } = event;

    if (active.id !== over.id) {
      setTestTickets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    //this is where we can update the database
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        <SortableContext items={testTickets} strategy={rectSortingStrategy}>
          <Row
            title="To Do"
            testTickets={tasks.filter((task) => task.column === "To Do")}
          />
          <Row
            title="In Progress"
            testTickets={tasks.filter((task) => task.column === "In Progress")}
          />
          <Row
            title="Done"
            testTickets={tasks.filter((task) => task.column === "Done")}
          />
        </SortableContext>
        <DragOverlay>
          {({ active }) =>
            active && <Card task={active.data} isDragging={true} />
          }
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default TaskTickets;
