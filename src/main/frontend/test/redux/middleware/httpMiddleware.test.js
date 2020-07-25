import httpMiddleware from "../../../src/redux/middleware/httpMiddleware";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from "fetch-mock";
import { TodoActionTypes } from "../../../src/redux/actions/actionTypes";
import { fetchTodos } from "../../../src/redux/actions/todoActions/todoActions";

const mockStore = configureMockStore([thunk, httpMiddleware]);

describe('httpMiddleware', () => {
    afterEach(() => {
        fetchMock.restore();
    })

    it('creates FETCH_TODOS_SUCCESS when fetching is done', () => {
        // given
        const todo = {
            id: 1,
            description: "todo1",
            isDone: false,
            deadline: "02-02-2020 12:12"
        };

        fetchMock.get('http://localhost:8080/api/todos', {
            body: [todo],
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // when
        const store = mockStore({});

        // then
        const expectedActions = [
            {
                type: TodoActionTypes.FETCH_TODOS_REQUEST,
                payload: {}
            },
            {
                type: TodoActionTypes.FETCH_TODOS_SUCCESS,
                payload: {},
                response: [todo]
            }
        ];

        store.dispatch(fetchTodos()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
})