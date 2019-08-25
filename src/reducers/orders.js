import { CREATE_NEW_ORDER } from '../modules/clients';
import { MOVE_ORDER_NEXT, MOVE_ORDER_BACK } from '../actions/moveOrder';
import { ADD_INGREDIENT } from '../actions/ingredients';

// Реализуйте редьюсер
// Типы экшенов, которые вам нужно обрабатывать уже импортированы
// Обратите внимание на `orders.test.js`.
// Он поможет понять, какие значения должен возвращать редьюсер.

// let orders = [];

const positions = [
    'clients',
    'conveyor_1',
    'conveyor_2',
    'conveyor_3',
    'conveyor_4'
];




export default (state = [], action) => {
    switch (action.type) {
        case CREATE_NEW_ORDER:
            return [
                ...state,
                {
                    id: action.payload.id,
                    ingredients: [],
                    position: 'clients',
                    recipe: [...action.payload.recipe]
                }
            ];
        case MOVE_ORDER_NEXT:
            return state.map(order => {
                if (order.id === action.payload && order.position !== positions[positions.length - 1]) {
                    return {
                        ...order,
                        position: positions[positions.indexOf(order.position) + 1]
                    };
                }
                return order;
            });
        case MOVE_ORDER_BACK:
            return state.map(order => {
                if (order.id === action.payload && order.position !== positions[1]) {
                    return {
                        ...order,
                        position: positions[positions.indexOf(order.position) - 1]
                    };
                }
                return order;
            });
        case ADD_INGREDIENT:
            return state.map(order => {
                if (order.position === action.payload.from) {
                    order.recipe.map((product) => {
                        if (product === action.payload.ingredient && !order.ingredients.includes(action.payload.ingredient)) {
                            order.ingredients = [...order.ingredients, action.payload.ingredient];
                            return order;
                        }
                        return order;
                    });
                }
                return order;
            });
        default:
            return state;
    }
};

export const getOrdersFor = (state, position) =>
    state.orders.filter(order => order.position === position);