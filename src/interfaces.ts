export interface PickUpDropOffInterface {
  location: string;
  date: string;
  time: string;
}

export interface PickUpComponentProps {
  pickUp: PickUpDropOffInterface;
  setPickUp: React.Dispatch<React.SetStateAction<PickUpDropOffInterface>>;
}

export interface DropOffComponentProps {
  dropOff: PickUpDropOffInterface;
  setDropOff: React.Dispatch<React.SetStateAction<PickUpDropOffInterface>>;
}

export interface MarkProps {
  isPick: boolean;
}

export interface CarInterface {
  capacity: number;
  description: string;
  discount: number;
  gasoline: string;
  image: string;
  name: string;
  price: number;
  reviewers: number;
  score: number;
  steering: string;
  typeCar: string;
  _id: string;
}

export interface TagListsProps {
  title: string;
  li_1: string;
  li_2: string;
  li_3: string;
  li_4: string;
}
