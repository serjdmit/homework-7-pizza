import { CREATE_NEW_ORDER } from '../modules/clients';
import { MOVE_ORDER_NEXT, MOVE_ORDER_BACK } from '../actions/moveOrder';
import { ADD_INGREDIENT } from '../actions/ingredients';

// Реализуйте редьюсер
// Типы экшенов, которые вам нужно обрабатывать уже импортированы
// Обратите внимание на `orders.test.js`.
// Он поможет понять, какие значения должен возвращать редьюсер.

let orders = [];

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
            orders = state.map((order) => {
                let nextPosition = 0;
                let ordersLength = state.length;
                positions.some((position, index) => {
                    if (order.position === position && index < positions.length - 1 ) {
                        nextPosition = positions[index + 1];
                        return true;
                    }
                });
                if (order.id == ordersLength) return {
                    id: order.id,
                    ingredients: order.ingredients,
                    position: nextPosition,
                    recipe: order.recipe
                };
                if (order.id != ordersLength) return {
                    id: order.id,
                    ingredients: order.ingredients,
                    position: order.position,
                    recipe: order.recipe
                };
            });
            return orders;
        case MOVE_ORDER_BACK:
            orders = state.map((order) => {
                positions.some((position, index) => {
                    if (order.position === position && index > 1) {
                        order.position = positions[index - 1];
                        return true;
                    }
                });
                return {
                    id: order.id,
                    ingredients: order.ingredients,
                    position: order.position,
                    recipe: order.recipe
                };
            });
            return orders;
        case ADD_INGREDIENT:
            return state;

        default:
            return state;
    }
};

export const getOrdersFor = (state, position) =>
    state.orders.filter(order => order.position === position);