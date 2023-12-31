
export interface Visibility {
    addCar(): boolean;
    addOffice(): boolean;
    carDetails(): boolean;
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