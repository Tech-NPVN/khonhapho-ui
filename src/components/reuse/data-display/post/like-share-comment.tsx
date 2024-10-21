import { Dispatch, SetStateAction } from 'react';
import { CommentComponent } from '../comment';
import LikeComponent from '../like';
import ShareComponent from '../share';
interface IProps {
  setLikeCount?: Dispatch<SetStateAction<number>>;
  setLiked?: Dispatch<SetStateAction<boolean>>;
  liked?: boolean;
}
const LikeShareComment = ({ liked, setLikeCount, setLiked }: IProps) => {
  const handleLikeClick = () => {
    setLikeCount?.((prev) => {
      return liked ? prev - 1 : prev + 1;
    });
    setLiked?.((prev) => !prev);
  };
  return (
    <div className="w-full flex justify-between items-center">
      <button className="border-transparent bg-transparent flex-1 px-0">
        <LikeComponent liked={liked} onClick={handleLikeClick}></LikeComponent>
      </button>
      <div className="cursor-pointer border-transparent bg-transparent flex items-center gap-2 flex-1 justify-center hover:bg-black/5 h-9 my-1 rounded-lg dark:text-primary_text_d dark:hover:text-primary_text_d dark:hover:hover:bg-background_d dark:[&_svg]:hover:fill-primary_text_d px-0">
        <CommentComponent />
      </div>
      <button className="border-transparent bg-transparent flex-1 px-0">
        <ShareComponent content="/"></ShareComponent>
      </button>
    </div>
  );
};
export { LikeShareComment };
export default LikeShareComment;
