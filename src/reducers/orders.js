import { CREATE_NEW_ORDER } from '../modules/clients';
import { MOVE_ORDER_NEXT, MOVE_ORDER_BACK } from '../actions/moveOrder';
import { ADD_INGREDIENT } from '../actions/ingredients';

// Реализуйте редьюсер
// Типы экшенов, которые вам нужно обрабатывать уже импортированы
// Обратите внимание на `orders.test.js`.
// Он поможет понять, какие значения должен возвращать редьюсер.

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
        ]
        case MOVE_ORDER_NEXT:
            return state;
        case MOVE_ORDER_BACK:
            return state;
        case ADD_INGREDIENT:
            return state;

        default:
            return state;
    }
};

export const getOrdersFor = (state, position) => {
    state.orders.filter(order => order.position === position);

}
