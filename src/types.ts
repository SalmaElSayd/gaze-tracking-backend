import {TopicType} from "../../client/src/api/api.types";

export interface Article {
  publisher: string;
  image: string;
  headline: string;
  text: string;
}

export enum Validity {
  TRUE = "TRUE",
  MOSTLY_TRUE = "MOSTLY TRUE",
  HALF_TRUE = "HALF TRUE",
  MOSTLY_FALSE = "MOSTLY FALSE",
  FALSE = "FALSE / PANTS ON FIRE",
}

export interface PostType {
  id: string;
  timestamp: string;
  publisherIcon: string;
  publisherName: string;
  text: string;
  image: string;
  reactions: Array<{ emoji: string; by: string }>;
  commentCount: number;
  shareCount: number;
  source: string;
  article?: Article;
  validity?: Validity;
  validityCheck?: Validity;
  topic?: TopicType
}

export interface MousePositionType {
  mouseX: number;
  mouseY: number;
}

export interface PositionType {
  x: number;
  y: number;
}

export interface CurrentElementValuesType {
  tag?: string;
  innerText?: string;
}

export interface PositionDataType
  extends PositionType,
    CurrentElementValuesType {
  selectedText?: string;
  timestamp?: number;
  postId?: string;
}

export enum ActionType {
  MOUSE_MOVE = "MouseMove",
  MOUSE_CLICK = "MouseClick",
  MOUSE_DOUBLE_CLICK = "MouseDoubleClick",
  MOUSE_SELECTION = "MouseSelection",
  EYE_MOVE = "EyeMove",
}

export interface Actions extends PositionDataType {
  action: ActionType;
}

export interface BehaviorData {
  [time: string]: Actions;
}
