import { ApiResponse, Todo } from '../types/interFaces'
import { getTabs, getTodos } from '@/helpers/TodosMethods';
import AllTodos from '@/app/component/AllTodos';


interface PC {
    all_todos?: Promise<ApiResponse<Todo[]>>;
}

function RenderWithAnimation() {
    const todosPromise = getTodos('/api/todos');
    const tabspromise = getTabs('/api/tabs');
    return (
        <div>
            <AllTodos todospromise={todosPromise} tabspromise={tabspromise} />
        </div>
    )
}

export default RenderWithAnimation