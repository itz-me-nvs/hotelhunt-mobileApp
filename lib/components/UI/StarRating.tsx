import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const StarRating = ({
  rating,
  totalStars = 5,
  size = 16,
}: {
  rating: number;
  totalStars?: number;
  size?: number;
}) => {
  const totalStarArr = Array.from({length: totalStars}, () => '');
  return (
    <View style={{flexDirection: 'row', gap: 5}}>
      {totalStarArr.map((_, index) => {
        const activeStar = Math.floor(rating) >= index + 1;
        const halfStar = Math.ceil(rating) === index + 1 && rating % 1 !== 0;

        return (
          <Icon
            key={index}
            name={activeStar ? 'star' : halfStar ? 'star-half' : 'star-outline'}
            size={size}
            color={activeStar || halfStar ? '#FFD700' : '#CCCCCC'}
          />
        );
      })}
    </View>
  );
};

export default StarRating;
