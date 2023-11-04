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
  pickUpDetails?: PickUpDropOffInterface | null;
  dropOffDetails?: PickUpDropOffInterface | null;
  id: number;
  attributes: {
    name: string;
    type: string;
    gasoline: number;
    steering: string;
    capacity: number;
    price: number;
    image: {
      data: {
        id: number;
        attributes: {
          name: string;
          formats: {
            small: {
              url: string;
            };
            thumbnail: {
              url: string;
            };
          };
          url: string;
        };
      };
    };
    gallery?: {
      data: [
        {
          id: number;
          attributes: {
            formats: {
              small: {
                url: string;
              };
              medium: {
                url: string;
              };
              thumbnail: {
                url: string;
              };
            };
            url: string;
          };
        },
        {
          id: 13;
          attributes: {
            formats: {
              small: {
                url: string;
              };
              thumbnail: {
                url: string;
              };
            };
            url: string;
          };
        },
        {
          id: 12;
          attributes: {
            formats: {
              small: {
                url: string;
              };
              thumbnail: {
                url: string;
              };
            };
            url: string;
          };
        }
      ];
    };
  };
}

export interface TagListsProps {
  title: string;
  li_1: string;
  li_2: string;
  li_3: string;
  li_4: string;
}

export interface FilterQuery {
  type: string[];
  capacity: string[];
  price: number;
}

export interface FilterBarProps {
  filterQuery: FilterQuery;
  setFilterQuery: React.Dispatch<React.SetStateAction<FilterQuery>>;
}

export interface DetailsCar {
  id: number;
  data: {
    pickUpDetails?: PickUpDropOffInterface;
    dropOffDetails?: PickUpDropOffInterface;
    id: number;
    attributes: {
      name: string;
      type: string;
      gasoline: number;
      steering: string;
      capacity: number;
      price: number;
      image: {
        data: {
          id: number;
          attributes: {
            name: string;
            formats: {
              small: {
                url: string;
              };
              thumbnail: {
                url: string;
              };
            };
            url: string;
          };
        };
      };
      gallery?: {
        data: [
          {
            id: number;
            attributes: {
              formats: {
                small: {
                  url: string;
                };
                medium: {
                  url: string;
                };
                thumbnail: {
                  url: string;
                };
              };
              url: string;
            };
          },
          {
            id: 13;
            attributes: {
              formats: {
                small: {
                  url: string;
                };
                thumbnail: {
                  url: string;
                };
              };
              url: string;
            };
          },
          {
            id: 12;
            attributes: {
              formats: {
                small: {
                  url: string;
                };
                thumbnail: {
                  url: string;
                };
              };
              url: string;
            };
          }
        ];
      };
    };
  };
}

export interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormValues {
  identifier: string;
  password: string;
}
