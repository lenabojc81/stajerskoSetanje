export function IzracunTock(expectedDistance: number, actualDistance: number, actualTime: number, additionalPoints: number, maxNumOfPoints: number) {
    if (actualDistance === 0) {
        actualDistance = 0.01;
    }
    let distanceComparison: number = expectedDistance / actualDistance;
    let points: number = 0;
    if (distanceComparison < 0.24) {
        points = maxNumOfPoints*0.25;
    } else if (distanceComparison < 0.59) {
        points = maxNumOfPoints*0.5;
    } else if (distanceComparison < 0.84) {
        points = maxNumOfPoints*0.75;
    } else {
        points = maxNumOfPoints;
    }
    
    if (actualDistance === 0.01) {
        actualDistance = expectedDistance;
    }
    let mPerS: number = actualDistance / actualTime;
    if (mPerS < 0.5) {
        points = points * 0.5;
    } else if (mPerS < 1) {
        points = points * 0.75;
    } else {
        points = points;
    }

    points = points + additionalPoints;
    return Number(points.toFixed(0));
};