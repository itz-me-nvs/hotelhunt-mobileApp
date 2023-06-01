import firestore from '@react-native-firebase/firestore';
import {UserStateType} from '../models/app.type';

const userRef = firestore().collection('users');
const hotelRef = firestore().collection('hotels');

/*
Interface for db service
*/

export type UserAccountType = {
  name: string;
  email: string;
  uid: string;
  mobileno: string;
  address: {
    latitude: number;
    longitude: number;
  };
  admin: {
    hotels: [];
  };
  cart: [];
  notifications: [];
};

export type HotelListType = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  ownerid: string;
  rating: number;
  totalrating: number;
  img: string;
  description: string;
  id: string;

  // extra fields
  rooms: RoomType[];
  reviews: ReviewType[];
  foods: FoodType[];

  filter?: HotelFilterType;
};

export type HotelPropsType = {
  type: 'all' | 'food' | 'room';
  lat: number;
  lon: number;
};

// Food & Room Menu

export type HotelFilterType = 'all' | 'foods' | 'rooms';

// Rooms, Review, Notification, Food Types

export type RoomType = {
  name: string;
  desc: string;
  price: string;
  tid: number;
  id?: string;
  count?: number;
};

export type FoodType = {
  count?: number;
  desc: string;
  name: string;
  price: string;
  tid: number;
  id?: string;
};

export type ReviewType = {
  authorid: string;
  content: string;
  hotelId: string;
  rating: 3;
  timestamp: string;
  id?: string;
};

export type NotificationType = {
  food: boolean;
  foods: {
    count: number;
    foodid: string;
  }[];
  hotelId: string;
  orderdate: string;
  verified: boolean;
  id?: string;
};

/*
1. Login user mobile number with OTP (Firebase Auth) verification
*/
// const {state, dispatch} = useContext<UserContextType | undefined>(
//   UserContext,
// ) as UserContextType;

export async function createUser(props: UserAccountType) {
  const snapshot = await userRef.where('mobileno', '==', props.mobileno).get();
  if (snapshot.empty) {
    const data: UserStateType = {
      name: props.name,
      email: props.email,
      uid: props.uid,
      mobileno: props.mobileno,
      address: new firestore.GeoPoint(
        props.address.latitude,
        props.address.longitude,
      ),
      admin: {
        hotels: [],
      },
      cart: [],
      notifications: [],
      isLoggedIn: true,
    };

    return await userRef
      .add(data)
      .then(snapShot => {
        return {
          ...data,
          id: snapShot.id,
        } as UserStateType;
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  } else {
    console.log('User already exists');
    const user = snapshot.docs[0];
    return user.data() as UserStateType;
  }
}

/* Get Hotel List */
export async function getHotelList(props: HotelPropsType) {
  console.log(props);

  const hotelType = props.type;
  const hotelList = await getLocationBasedHotels(
    props.lat,
    props.lon,
    hotelType,
  );
  console.log(hotelList);

  // for (let i = 0; i < hotelAll.length; i++) {
  //   const roomSnap = await hotelRef
  //     .doc(hotelAll[i].id)
  //     .collection('rooms')
  //     .get();
  //   const reviewSnap = await hotelRef
  //     .doc(hotelAll[i].id)
  //     .collection('reviews')
  //     .get();
  //   const foodSnap = await hotelRef
  //     .doc(hotelAll[i].id)
  //     .collection('foods')
  //     .get();
  //   let rooms: RoomType[] = [];
  //   let foods: FoodType[] = [];
  //   let reviews: ReviewType[] = [];
  //   roomSnap.docs.forEach(doc => {
  //     rooms.push({id: doc.id, ...doc.data()} as RoomType);
  //   });

  //   reviewSnap.docs.forEach(doc => {
  //     reviews.push({id: doc.id, ...doc.data()} as ReviewType);
  //   });

  //   foodSnap.docs.forEach(doc => {
  //     foods.push({id: doc.id, ...doc.data()} as FoodType);
  //   });
  //   hotelAll[i].rooms = rooms;
  //   hotelAll[i].reviews = reviews;
  //   hotelAll[i].foods = foods;
  // }
  return hotelList;
}

const getLocationBasedHotels = async (
  lat: number,
  lon: number,
  hotelType: 'all' | 'food' | 'room' = 'all',
) => {
  const oneDegreeOfLatitudeInMiles = 69.172;
  // approximte values for a mile
  const latitude = 1 / oneDegreeOfLatitudeInMiles;
  // const latitude = 0.0144927536231884;
  const longitude = 0.0181818181818182;
  // const longitude =

  // construct the GeoPoints
  const startBoundaryGeoPoint = new firestore.GeoPoint(
    lat - latitude * 10,
    lon - longitude * 10,
  );
  const endBoundaryGeoPoint = new firestore.GeoPoint(
    lat + latitude * 10,
    lon + longitude * 10,
  );

  const query = await hotelRef
    .where('location', '>', startBoundaryGeoPoint)
    .where('location', '<', endBoundaryGeoPoint)
    .get();

  const hotelList: HotelListType[] = []; // used to hold all the loc data
  // return a Promise that fulfills with the locations

  const snapshot = await query;
  const length = snapshot.size;

  for (let i = 0; i < length; i++) {
    const roomSnapshot = await hotelRef
      .doc(snapshot.docs[i].id)
      .collection('rooms')
      .get();
    const foodSnapshot = await hotelRef
      .doc(snapshot.docs[i].id)
      .collection('foods')
      .get();

    const reviewSnapshot = await hotelRef
      .doc(snapshot.docs[i].id)
      .collection('reviews')
      .get();

    // hotel type based list patching
    if (hotelType === 'all') {
      if (roomSnapshot.size > 0 && foodSnapshot.size > 0) {
        hotelList.push({
          id: snapshot.docs[i].id,
          ...snapshot.docs[i].data(),
          rooms: roomSnapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()} as RoomType;
          }),
          foods: foodSnapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()} as FoodType;
          }),
          reviews:
            reviewSnapshot.size > 0
              ? reviewSnapshot.docs.map(doc => {
                  return {id: doc.id, ...doc.data()} as ReviewType;
                })
              : [],
        } as HotelListType);
      }
    } else if (hotelType === 'food') {
      if (foodSnapshot.size > 0 && roomSnapshot.size === 0) {
        hotelList.push({
          id: snapshot.docs[i].id,
          ...snapshot.docs[i].data(),
          foods: foodSnapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()} as FoodType;
          }),
          rooms: [] as RoomType[],
          reviews:
            reviewSnapshot.size > 0
              ? reviewSnapshot.docs.map(doc => {
                  return {id: doc.id, ...doc.data()} as ReviewType;
                })
              : [],
        } as HotelListType);
      }
    } else if (hotelType === 'room') {
      if (roomSnapshot.size > 0 && foodSnapshot.size === 0) {
        hotelList.push({
          id: snapshot.docs[i].id,
          ...snapshot.docs[i].data(),
          rooms: roomSnapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()} as RoomType;
          }),
          foods: [] as FoodType[],
          reviews:
            reviewSnapshot.size > 0
              ? reviewSnapshot.docs.map(doc => {
                  return {id: doc.id, ...doc.data()} as ReviewType;
                })
              : [],
        } as HotelListType);
      }
    } else {
      throw new Error('Invalid hotel type');
    }
  }

  return hotelList;
};
