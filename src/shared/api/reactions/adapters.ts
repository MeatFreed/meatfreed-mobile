import { AvailableReactionParams } from 'api';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import groupBy from 'lodash.groupby';
import orderBy from 'lodash.orderby';

export const adaptPostReaction = (
  documentSnapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
) => {
  const data = documentSnapshot.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));

  const groupedByReactionTypeId = groupBy(data, 'reaction_type_id');

  const items = Object.keys(groupedByReactionTypeId).map((key) => ({
    reaction_type_id: key,
    items: groupedByReactionTypeId[key],
  }));

  return orderBy(items, (item) => item.items.length, ['desc']);
};

export const getAvailableReactions = ({
  reactions,
  data,
  userId,
}: AvailableReactionParams) => {
  const items = data.flatMap((doc) => doc.items);

  const filteredByUserId = items.filter((doc) => doc.user_id === userId).filter(Boolean);

  const reactionIds = filteredByUserId.map((doc) => doc.reaction_type_id);

  const filteredByExist = reactions.filter(({ uid }) => !reactionIds.includes(uid));

  return filteredByExist;
};
