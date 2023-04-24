export interface ReactionType {
  uid: string;
  emoji: string;
  title: string;
}

export interface Reaction {
  uid: string;
  content_id: string;
  user_id: string;
  reaction_type_id: string;
  reaction_content: string;
}

export interface PostReaction {
  reaction_type_id: string;
  items: Reaction[];
}

export interface AvailableReactionParams {
  reactions: ReactionType[];
  data: PostReaction[];
  userId: string;
}
