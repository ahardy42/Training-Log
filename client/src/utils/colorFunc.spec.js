import colorFuncs from './colorFuncs';

describe("test suite for colorFuncs", () => {
    describe("intensity color", () => {
        it("returns transparent with no training array", () => {
            let training = [];
            expect(colorFuncs.intensityColor(training)).toBe('transparent');
        });
        it("returns green with intensity val less than 2", () => {
            let training = [{
                intensity: 1
            }];
            let green = "#2ad404";
            expect(colorFuncs.intensityColor(training)).toBe(green);
        });
    });
    describe("feeling color", () => {
        it("returns transparent with no training array", () => {
            let training = [];
            expect(colorFuncs.feelingColor(training)).toBe('transparent');
        });
        it("returns orange with feeling val less than 2", () => {
            let training = [{
                feeling: 1
            }];
            let orange = "#cf5804";
            expect(colorFuncs.feelingColor(training)).toBe(orange);
        });
    });
    describe("average val func", () => {
        it("returns nothing if array, or string are empty", () => {
            expect(colorFuncs.avgVal([], "training")).toBeUndefined();
            // expect(colorFuncs.avgVal([{intensity: 2}], "")).toBeNaN();
        });
        it("averages values in an array", () => {
            let training = [
                {intensity: 2},
                {intensity: 3},
                {intensity: 4}
            ];
            expect(colorFuncs.avgVal(training, "intensity")).toBe("3.0");
            expect(typeof colorFuncs.avgVal(training, "intensity")).toBe("string")
        });
    });
    describe("trainingColor func", () => {
        it("returns transparent if there is no training", () => {

        });
        it("returns green if the training entry is bike", () => {
            let green = "#165408";
            let training = [
                {
                    mode: "bike"
                }
            ];
            expect(colorFuncs.trainingColor(training)).toBe(green);
        });
        it("returns transparent if there is no training mode", () => {
            expect(colorFuncs.trainingColor([])).toBe("transparent");
        });
    });
    describe("coachColor func", () => {
        it("returns a color based on the string", () => {
            let green = "#165408";
            expect(colorFuncs.coachColor("bike")).toBe(green);
        })
    });
    describe("statsColor fun", () => {
        it("returns a color variant based on an object key input", () => {
            let green = "#165408";
            let newGreen = "#165408BF"
            let statsElement = {
                _id: "bike"
            }
            expect(colorFuncs.statsColor(statsElement)).toBe(newGreen);
            expect(colorFuncs.statsColor(statsElement)).not.toBe(green);
            // expect(colorFuncs.statsColor()).not.toBe("BF"); // should probably change that!
        })
    });
    describe("intensityBar func", () => {
        it("returns a style object", () => {
            let training = {
                intensity: 2
            };
            expect(colorFuncs.intensityBar(training)).toHaveProperty("backgroundColor");
            expect(colorFuncs.intensityBar(training)).toHaveProperty("width");
        });
        it("sets width based on intensity value", () => {
            let training = {
                intensity: 2
            };
            expect(colorFuncs.intensityBar(training).width).toBe("40%");
            training.intensity = 0; // changing the value to 0 for the next test assertion
            expect(colorFuncs.intensityBar(training).width).toBe("10%");
        })
    });
    describe("feelingBar func", () => {
        it("returns a style object", () => {
            let training = {
                feeling: 2
            };
            expect(colorFuncs.feelingBar(training)).toHaveProperty("backgroundColor");
            expect(colorFuncs.feelingBar(training)).toHaveProperty("width");
        });
        it("sets width based on intensity value", () => {
            let training = {
                feeling: 2
            };
            expect(colorFuncs.feelingBar(training).width).toBe("40%");
            training.feeling = 0; // changing the value to 0 for the next test assertion
            expect(colorFuncs.feelingBar(training).width).toBe("10%");
        })
    });
})