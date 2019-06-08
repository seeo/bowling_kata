import {Game, Frame} from './bowling'

describe('Game class', () => {
    test('Game can instantiate', () => {
        let game = new Game();
    });

    test('Game can roll', () => {
        let game = new Game();
        expect(() => {
            game.roll(5);
        }).not.toThrow();

        expect(game.roll(5))
    });

    test('Game shows score correctly after roll', () => {
        let game = new Game();
        game.roll(5);
        expect(game.score()).toEqual(5);

        let game2 = new Game();
        game2.roll(3);
        expect(game2.score()).toEqual(3);
    });

    test('Game shows score correctly after second roll', () => {
        let game = new Game();
        game.roll(5);
        game.roll(3);
        expect(game.score()).toEqual(8);
    });

    test('Game rolls 10 frames of 9 and miss', () => {
        let game = new Game();
        for (let i = 0; i < 10; i++) {
            game.roll(9);
            game.roll(0);
        }
        expect(game.score()).toEqual(90);
    });

    test('Game can get score correctly for spare', () => {
        let game = new Game();
        game.roll(7);
        game.roll(3);
        game.roll(4);
        game.roll(2);
        expect(game.score()).toEqual(20);
    });
})

describe('Frame class', () => {

    test('Frame can add rolls', () => {
        let frame = new Frame();
        expect(() => {
            frame.add_roll(7);
            frame.add_roll(3);
        }).not.toThrow();
    });

    test('Frame cannot add more than 2 rolls', () => {
        let frame = new Frame();
        expect(() => {
            frame.add_roll(7);
            frame.add_roll(3);
            frame.add_roll(1);
        }).toThrow();
    });

    test('Frame can check spares correctly', () => {
        let frame = new Frame();
        frame.add_roll(0);
        frame.add_roll(10);
        expect(frame.is_spare()).toEqual(true);

        let frame2 = new Frame();
        frame2.add_roll(1);
        frame2.add_roll(9);
        expect(frame2.is_spare()).toEqual(true);

        let frame3 = new Frame();
        frame3.add_roll(9);
        frame3.add_roll(1);
        expect(frame3.is_spare()).toEqual(true);

        let frame4 = new Frame();
        frame4.add_roll(10);
        frame4.add_roll(0);
        expect(frame4.is_spare()).toEqual(false);
    });
});