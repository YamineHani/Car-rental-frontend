
export interface Visibility {
    addCar(): boolean;
    addOffice(): boolean;
    carDetails(): boolean;
    findCar(): boolean;
    editCar(): boolean;
    reserveCar(): boolean;
    getType(): string;
}

export class Admin implements Visibility {

    addCar(): boolean {
        return true;
    }

    addOffice(): boolean {
        return true;
    }

    findCar(): boolean {
        return true;
    }

    carDetails(): boolean {
        return true;
    }

    editCar(): boolean {
        return true;
    }

    reserveCar(): boolean {
        return false;
    }
    
    getType(): string {
        return 'ADMIN';
    }
}

export class Office implements Visibility {

    addCar(): boolean {
        return true;
    }

    addOffice(): boolean {
        return false;
    }

    findCar(): boolean {
        return true;
    }

    carDetails(): boolean {
        return true;
    }

    editCar(): boolean {
        return true;
    }

    reserveCar(): boolean {
        return false;
    }

    getType(): string {
        return 'OFFICE';
    }
}

export class Client implements Visibility {

    addCar(): boolean {
        return false;
    }

    addOffice(): boolean {
        return false;
    }

    findCar(): boolean {
        return true;
    }

    carDetails(): boolean {
        return true;
    }

    editCar(): boolean {
        return false;
    }

    reserveCar(): boolean {
        return true;
    }
    
    getType(): string {
        return 'CLIENT';
    }
}