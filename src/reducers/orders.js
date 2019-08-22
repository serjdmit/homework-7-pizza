import { CREATE_NEW_ORDER } from '../modules/clients';
import { MOVE_ORDER_NEXT, MOVE_ORDER_BACK } from '../actions/moveOrder';
import { ADD_INGREDIENT } from '../actions/ingredients';

// Реализуйте редьюсер
// Типы экшенов, которые вам нужно обрабатывать уже импортированы
// Обратите внимание на `orders.test.js`.
// Он поможет понять, какие значения должен возвращать редьюсер.

let orderPosition = 0;

const nextOrder = () => {
    if (orderPosition === 4) {
        orderPosition = 3;
    }
    return orderPosition++;
};
const prevOrder = () => {
    if (orderPosition === 1) {
        orderPosition = 2;
    }
    return orderPosition--;
};


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
            nextOrder();
            return [{
                id: state[state.length - 1].id,
                ingredients: state[state.length - 1].ingredients,
                position: `conveyor_${orderPosition}`,
                recipe: state[state.length - 1].recipe
            }];
        case MOVE_ORDER_BACK:
            prevOrder();
            return [{
                id: state[state.length - 1].id,
                ingredients: state[state.length - 1].ingredients,
                position: `conveyor_${orderPosition}`,
                recipe: state[state.length - 1].recipe
            }];
        case ADD_INGREDIENT:
            return [{
                id: state[state.length - 1].id,
                ingredients: state[state.length - 1].ingredients,
                position: `conveyor_${orderPosition}`,
                recipe: state[state.length - 1].recipe
            }];

        default:
            return state;
    }
};

export const getOrdersFor = (state, position) =>
    state.orders.filter(order => order.position === position);