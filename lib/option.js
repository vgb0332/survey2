exports.config = (flag) => {

 Account = {
    Profile : 1,
    Documents : 2,
    Insurance : 3,
    PaymentCards : 4,
    Password : 5,
    MakeSubscription : 6,
    UpcomingSubscriptions : 7,
    CompletedSubscriptions : 8,
    Ratings : 9,
    SignOut : 10
}
  
BodyType = {
    Any : 1,
    Sedan : 2,
    Coupe : 3,
    Wagon : 4,
    Hatchback : 5,
    Suv : 6,
    Convertible : 7,
    Rv : 8
}
  
CarType = {
    Any : 1,
    CompactCar : 2,
    ElectricCar : 3,
    FamilyCar : 4,
    PremiumCar : 5,
    Suv : 6
}
  
 Color = {
    Any : 1,
    White : 2,
    Black : 3,
    Gray : 4,
    Silver : 5,
    Red : 6,
    Blue : 7,
    DarkBlue : 8,
    Ivory : 9,
    Brown : 10,
    Yellow : 11,
    Green : 12,
    Orange : 13,
    Other : 14
  }
  
Cylinder = {
    Any : 1,
    TwoCylinder : 2,
    FourCylinder : 3,
    SixCylinder : 4
}
  
Door = {
    Any : 1,
    TwoDoor : 2,
    FourDoor : 3,
    FiveDoor : 4
}
  
Drivetrain = {
    Any : 1,
    TwoWheelDrive4x2 : 2,
    FourWheelDrive4x4 : 3,
    AllWheelDrive : 4,
    FrontWheelDrive : 5,
    RearWheelDrive : 6
}
  
Feature = {
    Hid : 1,
    Led : 2,
    PowerMirror : 3,
    Sunroof : 4,
    RoofRack : 5,
    AlloyWheel : 6,
    SteeringRemo : 7,
    PowerSteering : 8,
    Ecm : 9,
    AutomaticAc : 10,
    KeylessEntrySys : 11,
    SmartKey : 12,
    CruiseControl : 13,
    PowerDoorLock : 14,
    PowerWindows : 15,
    PowerTrunk : 16,
    Hud : 17,
    HeatedSteeringWheel : 18,
    LeatherSeat : 19,
    PowerSeatD : 20,
    PowerSeatP : 21,
    PowerSeatR : 22,
    HeatedSeatF : 23,
    HeatedSeatR : 24,
    MemorySeat : 25,
    SeatVentilation : 26,
    SeatVentilationR : 27,
    AirbagD : 28,
    AirbagP : 29,
    AirbagS : 30,
    AirbagC : 31,
    ParkingSensor : 32,
    BackupCamera : 33,
    Abs : 34,
    Tcs : 35,
    Esp : 36,
    Ecs : 37,
    Tpms : 38,
    Navigation : 39,
    HandsFree : 40,
    CdPlayer : 41,
    AvSystemFront : 42,
    AvSystemRear : 43,
    AuxPort : 44,
    UsbPort : 45,
    HiPass : 46,
    Blackbox : 47
  }
  
Fuel = {
    Any : 1,
    Diesel : 2,
    Gasoline : 3,
    GasolineLpg : 4,
    Lpg : 5,
    ElectricLpg : 6,
    ElectricGasoline : 7,
    DieselElectric : 8,
    Electric : 9
  }
  
Make = {
    Any : 1,
    Bmw : 2,
    Volkswagen : 3,
    Kia : 4,
    Ssangyong : 5,
    Infiniti : 6,
    Toyota : 7,
    Maserati : 8,
    Volvo : 9,
    Ford : 10,
    Benz : 11,
    Chevrolet : 12,
    Renaultsamsung : 13,
    Peugeot : 14,
    Honda : 15,
    Mini : 16,
    Nissan : 17,
    Landrover : 18,
    Lexus : 19,
    Jaguar : 20,
    Audi : 21,
    Hyundai : 22,
    Cadillac : 23,
    Porsche : 24,
    Jeep : 25,
    Fiat : 26,
    Citroen : 27,
    Chrysler : 28,
    Lincoln : 29,
    Genesis : 30
  }
  
SubscriptionStart = {
    Next2Days : 1,
    Next14Days : 2,
    Next30Days : 3
  }
  
SubscriptionType = {
    Any : 1,
    Bronze : 2,
    Silver : 3,
    Gold : 4
  }
  
Transmission = {
    Any : 1,
    Automatic : 2,
    Manual : 3,
    Semi : 4,
    Continuous : 5,
    Other : 6
}

switch (flag) {
    case Account:
        return Account;
    case BodyType:
        return BodyType;
    case CarType:
        return CarType;
    case Color:
        return Color;
    case Cylinder:
        return Cylinder;
    case Door:
        return Door;
    case Drivetrain:
        return Drivetrain;
    case Feature:
        return Feature;
    case Fuel:
        return Fuel;
    case Make:
        return Make;
    case SubscriptionStart:
        return SubscriptionStart;
    case SubscriptionType:
        return SubscriptionType;
    case Transmission:
        return Transmission;

    default:
        break;
}



  
}
  