import {incrementAgeAC, incrementChildrenCountAC, userReducer} from './user-reducer';

test.skip('user reducer should increment only age', () => {
    const startState = {
        age: 20,
        childrenCount: 2,
        name: 'Dimych'
    };
    const endState = userReducer(startState, incrementAgeAC(20, 2, 'Dimych'))

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});
test('user reducer should increment only childrenCount', () => {
    const startState = {
        age: 20,
        childrenCount: 2,
        name: 'Dimych'
    };
    const newName = 'Victor'
    const endState = userReducer(startState, incrementChildrenCountAC(21, 2, newName))

    expect(endState.age).toBe(20);
    expect(endState.name).toBe('Victor');

// your code here
});