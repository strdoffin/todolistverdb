'use client'
import { DeleteTodo } from "@/action/delete-todo";
import { Post } from "@prisma/client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { EditTodo } from "@/action/edit-todo";
import { CheckTodo } from "@/action/check-todo";

export const TodoItem = ({ post }: { post: Post }) => {
    const [isOpen, setOpen] = useState(false);
    const [isCheck, setCheck] = useState(post.check);

    const deletePost = async (id: number) => {
        await DeleteTodo(id);
    };

    const editPost = async (id: number) => {
        await EditTodo(id);
    };

    const handleCheckboxChange = async () => {
        const newCheckStatus = !isCheck;
        setCheck(newCheckStatus);
        await CheckTodo(post.id, newCheckStatus);
    };

    return (
        <div className="w-full border-2 rounded-xl my-2">
            <div className="p-[1vh] grid grid-cols-8">
                <div className="col-span-1">
                    <input
                        className="w-6 h-6"
                        type="checkbox"
                        name="do"
                        id="do"
                        checked={isCheck}
                        onChange={handleCheckboxChange}
                    />
                </div>
                <div className="col-span-3  ">
                    <h2 className={isCheck ? "line-through" : ""}>{post.title}</h2>
                </div>
                
                <div className="col-span-3 flex justify-center gap-5">
                    <button onClick={() => editPost(post.id)} className="text-blue-500">edit</button>
                    <button onClick={() => deletePost(post.id)} className="text-red-500">delete</button>
                </div>
                <div className="flex justify-end col-span-1">
                    <button onClick={() => setOpen(!isOpen)}>
                        <FontAwesomeIcon
                            icon={isOpen ? faChevronUp : faChevronDown}
                        />
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="p-[1vh]">
                    <div className="border-2 rounded-2xl p-2">
                        <p className="text-gray-500">Context:</p>
                        <p>{post.content}</p>
                    </div>
                </div>
            )}
        </div>
    );
};
